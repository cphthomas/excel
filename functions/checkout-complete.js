const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK_KEY);
const connection = require("serverless-mysql")({
    config: {
        host: "lmc8ixkebgaq22lo.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        database: "yj4gfzv5wypf9871",
        user: "ub4b7vh6mgd73b2b",
        password: "l7w4d31in0msovsc",
    },
});

exports.handler = async function ({ body, headers }, context) {
    try {
        const stripeEvent = await stripe.webhooks.constructEvent(
            body,
            headers["stripe-signature"],
            process.env.GATSBY_STRIPE_CHECKOUT_WEBHOOK
        );

        if (stripeEvent.type !== "checkout.session.completed") return;

        const subscription = await stripeEvent.data.object;
        const newSubscriptionId = await subscription.subscription;

        let plan = "0";
        if (subscription.amount_total == "4900") {
            plan = "1";
        } else if (subscription.amount_total == "6900") {
            plan = "2";
        }

        try {
            await connection.connect();

            await updateUser(
                connection,
                subscription.customer,
                stripeEvent.created,
                stripeEvent.created,
                plan
            );

            await connection.end();

            const userAllSubscriptions = await stripe.subscriptions.list({
                customer: subscription.customer,
            });

            await userAllSubscriptions.data.forEach(async (element) => {
                if (element.id != newSubscriptionId) {
                    stripe.subscriptions.update(element.id, {
                        pause_collection: { behavior: "mark_uncollectible" },
                    });
                }
            });
            return {
                statusCode: 200,
                body: JSON.stringify({ received: subscription.customer }),
            };
        } catch (error) {
            return {
                statusCode: 400,
                body: `Webhook Error: ${error.message}`,
            };
        } finally {
            if (connection) {
                await connection.end();
            }
        }

        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({ received: subscription.customer }),
        // };
    } catch (err) {
        return {
            statusCode: 400,
            body: `Webhook Error: ${err.message}`,
        };
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

async function updateUser(connection, stripeId, planEnd, planStart, plan) {
    return new Promise((resolve, reject) => {
        connection.query(
            {
                sql:
                    "UPDATE external_users SET plan_id = ?, user_subscription_end = ?, user_subscription_start = ? WHERE stripe_id = ?",
                timeout: 10000,
                values: [plan, planEnd, planStart, stripeId],
            },
            function (error, results, fields) {
                if (error) reject(err);
                resolve(results);
            }
        );
    });
}

const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK_KEY);

exports.handler = async function (event) {
    const { userStripeId } = JSON.parse(event.body);

    const subscriptions = await stripe.subscriptions.list({
        customer: userStripeId,
        limit: 3,
    });

    if (subscriptions.data[0].cancel_at_period_end) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                error: "1",
                message: "Du har allerede afmeldt dit abonnement.",
            }),
        };
    }

    await subscriptions.data.forEach(async (element) => {
        stripe.subscriptions.update(element.id, { cancel_at_period_end: true });
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            error: "0",
            message:
                "Dit abonnement er nu afmeldt, det stopper automatisk ved udløb af abonnementsperioden. Du modtager ikke flere regninger.",
        }),
    };
};

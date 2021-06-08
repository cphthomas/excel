const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK_KEY);
var uniqid = require("uniqid");

const connection = require("serverless-mysql")({
    config: {
        host: "lmc8ixkebgaq22lo.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
        database: "yj4gfzv5wypf9871",
        user: "ub4b7vh6mgd73b2b",
        password: "l7w4d31in0msovsc",
    },
});

exports.handler = async function (event) {
    const { email, name, password } = JSON.parse(event.body);

    await connection.connect();
    const existUserResult = await getUserDetail(connection, email);
    if (existUserResult[0] && existUserResult[0].user_email) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                error: "1",
                message: "User exist alredy with same email id",
            }),
        };
    }

    console.log("existUserResult = " + existUserResult);

    const customer = await stripe.customers.create({
        email: email,
    });

    // subscribe the new customer to the free plan
    await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: process.env.GATSBY_FREE_PLAN_PRICE }],
    });

    const userIp = await uniqid();

    var member = {
        user_name: name,
        user_email: email,
        user_password: password,
        stripe_id: customer.id,
        plan_id: "0",
        is_logged_in: 1,
        user_ip: userIp,
        book_access: process.env.GATSBY_BOOK_ACCESS,
    };
    try {
        var query = await connection.query({
            sql: "INSERT INTO external_users SET ?",
            timeout: 20000,
            values: [member],
        });
    } catch (e) {
        console.log(`User not created= ${e}`);
    }

    await connection.end();

    return {
        statusCode: 200,
        body: JSON.stringify({
            error: "0",
            customerId: customer.id,
            userIp: userIp,
            message:
                "User created successfully redirecting to stripe checkout...",
        }),
    };
};

async function getUserDetail(connection, email) {
    return new Promise((resolve, reject) => {
        connection.query(
            {
                sql:
                    "SELECT * FROM `external_users` WHERE `user_email` = ? AND `book_access` = ?",
                timeout: 10000,
                values: [email, process.env.GATSBY_BOOK_ACCESS],
            },
            function (error, results, fields) {
                if (error) reject(err);
                resolve(results);
            }
        );
    });
}

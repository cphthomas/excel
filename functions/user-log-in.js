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
    const { email, password } = JSON.parse(event.body);
    await connection.connect();
    const existUserResult = await getUserDetail(connection, email, password);

    if (!existUserResult[0]) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                error: "1",
                message: "Wrong Credentials",
            }),
        };
    }
    const userIp = await uniqid();

    await updateUser(connection, existUserResult[0].user_email, userIp);

    await connection.end();

    return {
        statusCode: 200,
        body: JSON.stringify({
            error: "0",
            customerId: existUserResult[0].stripe_id,
            planId: existUserResult[0].plan_id,
            emailId: existUserResult[0].user_email,
            userIp: userIp,
            message: "User logged in",
        }),
    };
};

async function getUserDetail(connection, email, password) {
    return new Promise((resolve, reject) => {
        connection.query(
            {
                sql:
                    "SELECT * FROM `external_users` WHERE `user_email` = ? AND `user_password` = ? AND `book_access` = ?",
                timeout: 10000,
                values: [email, password, process.env.GATSBY_BOOK_ACCESS],
            },
            function (error, results, fields) {
                if (error) reject(err);
                resolve(results);
            }
        );
    });
}

async function updateUser(connection, userEmail, userIp) {
    return new Promise((resolve, reject) => {
        connection.query(
            {
                sql:
                    "UPDATE external_users SET user_ip = ? WHERE user_email = ? AND `book_access` = ?",
                timeout: 10000,
                values: [userIp, userEmail, process.env.GATSBY_BOOK_ACCESS],
            },
            function (error, results, fields) {
                if (error) reject(err);
                resolve(results);
            }
        );
    });
}

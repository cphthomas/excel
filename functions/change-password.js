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
    const existUserResult = await getUserDetail(connection, email);

    if (!existUserResult[0]) {
        return {
            statusCode: 200,
            body: JSON.stringify({
                error: "1",
                message: "User not exist with entered email id.",
            }),
        };
    }

    await updateUser(connection, email, password);

    await connection.end();

    return {
        statusCode: 200,
        body: JSON.stringify({
            error: "0",
            message:
                "Password successfully changed redirecting to login page...",
        }),
    };
};

async function getUserDetail(connection, email) {
    return new Promise((resolve, reject) => {
        connection.query(
            {
                sql:
                    "SELECT * FROM `external_users` WHERE `user_email` = ? AND `book_access` = ?",
                values: [email, process.env.GATSBY_BOOK_ACCESS],
            },
            function (error, results, fields) {
                if (error) reject(err);
                resolve(results);
            }
        );
    });
}

async function updateUser(connection, userEmail, password) {
    return new Promise((resolve, reject) => {
        connection.query(
            {
                sql:
                    "UPDATE external_users SET user_password = ? WHERE user_email = ? AND `book_access` = ?",
                timeout: 10000,
                values: [password, userEmail, process.env.GATSBY_BOOK_ACCESS],
            },
            function (error, results, fields) {
                if (error) reject(err);
                resolve(results);
            }
        );
    });
}

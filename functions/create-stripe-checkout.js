const stripe = require("stripe")(process.env.GATSBY_STRIPE_SK_KEY);

exports.handler = async function (event) {
    const { email, customerId, planType } = JSON.parse(event.body);

    let price = "";
    if (planType == "pro") {
        price = "price_1IMFmTIP8uHvYRBy8XgXjweR";
    } else {
        price = "price_1IMFnPIP8uHvYRBy5DLxSubd";
    }

    const session = await stripe.checkout.sessions.create({
        customer: customerId,
        success_url: process.env.GATSBY_SITE_URL,
        cancel_url: process.env.GATSBY_SITE_URL,
        payment_method_types: ["card"],
        line_items: [{ price: price, quantity: 1 }],
        mode: "subscription",
        //customer_email: email,
    });

    return {
        statusCode: 200,
        body: JSON.stringify(session),
    };
};

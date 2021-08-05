import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

export default function CardSetupForm(props) {
    const stripe = useStripe();
    const elements = useElements();

    const [userSecret, setUserSecret] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [btnDisable, setBtnDisable] = useState(false);

    const userStripeId = props.customerId;

    useEffect(async () => {
        await fetch("/.netlify/functions/setup-intent", {
            method: "POST",
            body: JSON.stringify({ userStripeId }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setUserSecret(responseJson.client_secret);
            });
    }, []);

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        setErrorMessage("");
        setBtnDisable(true);

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmCardSetup(userSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            //alert();
            setErrorMessage(result.error.message);
            setBtnDisable(false);
        } else {
            // The setup has succeeded. Display a success message and send
            // result.setupIntent.payment_method to your server to save the
            // card to a Customer
            const pm = result.setupIntent.payment_method;
            const us = userStripeId;
            await fetch("/.netlify/functions/update-payment-method", {
                method: "POST",
                body: JSON.stringify({ us, pm }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    //setUserSecret(responseJson.client_secret);
                    setSuccessMessage("Your card added successfully.");
                });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardSection />
                <button disabled={btnDisable} className="cardBtn">
                    Gem kreditkort
                </button>
            </form>
            <p className="error">{errorMessage}</p>
            <p className="success">{successMessage}</p>
        </div>
    );
}

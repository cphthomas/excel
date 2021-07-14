import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Layout } from "../components/common";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import Cookies from "universal-cookie";
import ReactTooltip from "react-tooltip";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [planType, setPlanType] = useState("");
    const [name, setName] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    useEffect(() => {
        const cookies = new Cookies();
        if (cookies.get("loggedInUser")) {
            window.location.href = "/";
        }
    }, []);

    function validateForm() {
        return email.length > 0 && password.length > 0 && planType.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setShowMessage(false);
        if (password.length < 6) {
            setMessageColor("red");
            setMessage("Password length shouldn't be less than six.");
            setShowMessage(true);
            return;
        }
        let customerId;
        const cookies = new Cookies();
        await fetch("/.netlify/functions/sign-up", {
            method: "POST",
            body: JSON.stringify({ email, password, name }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error == "1") {
                    setMessageColor("red");
                    setMessage(responseJson.message);
                } else {
                    customerId = responseJson.customerId;
                    setMessageColor("green");
                    setMessage(responseJson.message);
                    cookies.set("loggedInUser", email, {
                        path: "/",
                        maxAge: 31536000,
                    });
                    cookies.set("loggedInUserIpAddress", responseJson.userIp, {
                        path: "/",
                        maxAge: 31536000,
                    });
                }
                setShowMessage(true);
            })
            .catch((error) => {
                console.error(error);
            });

        if (customerId) {
            await fetch("/.netlify/functions/create-stripe-checkout", {
                method: "POST",
                body: JSON.stringify({ customerId, email, planType }),
            })
                .then(async (response) => response.json())
                .then(async (responseJson) => {
                    const stripePromise = await loadStripe(
                        process.env.GATSBY_STRIPE_PK_KEY
                    );
                    const stripe = await stripePromise;
                    await stripe.redirectToCheckout({
                        sessionId: responseJson.id,
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    return (
        <Layout>
            <Helmet>
                <title>Signup</title>
                <link rel="icon" href="/tumblr-16.png" sizes="16x16"></link>
            </Helmet>
            <div className="form-div customFormDiv">
                <form onSubmit={handleSubmit}>
                    <h3 className="page-title">Sign Up</h3>

                    <div className="form-group">
                        <label>Full name</label>
                        <input
                            type="name"
                            className="form-control"
                            placeholder="Enter full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength="12"
                        />
                    </div>

                    <div className="form-group">
                        <label>Choose your subscription</label>
                        <div>
                            <label
                                data-tip="Access to pro content with, 49.00kr DKK / Month"
                                className="margin-right-20"
                            >
                                <input
                                    type="radio"
                                    name="size"
                                    id="pro"
                                    value="pro"
                                    onChange={(e) =>
                                        setPlanType(e.target.value)
                                    }
                                    required
                                />{" "}
                                Pro
                            </label>
                            <label data-tip="Full Access with, 69.00kr DKK / Month">
                                <input
                                    type="radio"
                                    name="size"
                                    id="premium"
                                    value="premium"
                                    required
                                    onChange={(e) =>
                                        setPlanType(e.target.value)
                                    }
                                />{" "}
                                Premium
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-color"
                        disabled={!validateForm()}
                    >
                        Sign Up
                    </button>
                    {showMessage ? (
                        <p className="message" style={{ color: messageColor }}>
                            {message}
                        </p>
                    ) : null}
                    <p className="forgot-password text-right">
                        Already a member ? <a href="/login">Sign In</a>
                    </p>
                    <p className="forgot-password text-right">
                        Forgot password ?{" "}
                        <a href="/forgotpassword">Click here</a>
                    </p>
                    <ReactTooltip />
                </form>
            </div>
        </Layout>
    );
}

import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import "./Login.css";
import { Layout } from "../components/common";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import Cookies from "universal-cookie";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        return email.length > 0 && password.length > 0;
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
        let planId;
        let planType = "pro";
        const cookies = new Cookies();
        await fetch("/.netlify/functions/user-log-in", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then(async (response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.error == "1") {
                    setMessageColor("red");
                    setMessage(responseJson.message);
                } else {
                    planId = responseJson.planId;
                    setMessageColor("green");
                    setMessage("Logged in successfully");
                    await cookies.set("loggedInUser", email, {
                        path: "/",
                        maxAge: 31536000,
                    });
                    await cookies.set(
                        "loggedInUserIpAddress",
                        responseJson.userIp,
                        {
                            path: "/",
                            maxAge: 31536000,
                        }
                    );
                }
                setShowMessage(true);
            })
            .catch((error) => {
                console.error(error);
            });
        if (cookies.get("loggedInUser")) {
            window.location.href = "/";
        }
    }

    return (
        <Layout>
            <Helmet>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" sizes="16x16"></link>
            </Helmet>
            <div className="form-div customFormDiv">
                <form onSubmit={handleSubmit}>
                    <h3 className="page-title">Sign In</h3>

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

                    <button
                        type="submit"
                        disabled={!validateForm()}
                        className="btn btn-primary btn-color"
                    >
                        Log In
                    </button>
                    {showMessage ? (
                        <p className="message" style={{ color: messageColor }}>
                            {message}
                        </p>
                    ) : null}
                    <p className="forgot-password text-right">
                        Not a member ? <a href="/signup">Sign up</a>
                    </p>
                    <p className="forgot-password text-right">
                        Forgot password ?{" "}
                        <a href="/forgotpassword">Click here</a>
                    </p>
                </form>
            </div>
        </Layout>
    );
}

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
        await fetch("/.netlify/functions/change-password", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then(async (response) => response.json())
            .then(async (responseJson) => {
                if (responseJson.error == "1") {
                    setMessageColor("red");
                    setMessage(responseJson.message);
                } else {
                    setMessageColor("green");
                    setMessage(responseJson.message);
                    setTimeout(function () {
                        window.location.href = "/login";
                    }, 3000);
                }
                setShowMessage(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <Layout>
            <Helmet>
                <title>Forgot Password</title>
                <link rel="icon" href="/favicon.ico" sizes="16x16"></link>
            </Helmet>
            <div className="form-div customFormDiv">
                <form onSubmit={handleSubmit}>
                    <h3 className="page-title">Forgot Password</h3>

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
                        <label>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength="12"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!validateForm()}
                        className="btn btn-primary fpwd-btn"
                    >
                        Change Password
                    </button>
                    {showMessage ? (
                        <p className="message" style={{ color: messageColor }}>
                            {message}
                        </p>
                    ) : null}
                </form>
            </div>
        </Layout>
    );
}

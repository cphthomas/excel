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
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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
        setIsFormSubmitted(true);
        if (password.length < 6) {
            setMessageColor("red");
            setMessage("Password længde skal være mindst seks.");
            setShowMessage(true);
            setIsFormSubmitted(false);
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
                    setIsFormSubmitted(false);
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
                <link rel="icon" href="/tumbler-new.png" sizes="16x16"></link>
            </Helmet>
            <div className="form-div customFormDiv">
                <form onSubmit={handleSubmit}>
                    <h1 className="page-title">Glemt Password</h1>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Skriv email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isFormSubmitted}
                        />
                    </div>

                    <div className="form-group">
                        <label>Nyt Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Skriv nyt password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            maxLength="12"
                            disabled={isFormSubmitted}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!validateForm() || isFormSubmitted}
                        className="btn btn-primary btn-color"
                    >
                        Skift Password
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

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import {
    Button,
    Dropdown,
    ButtonGroup,
    Modal,
    Row,
    Col,
} from "react-bootstrap";
import { Navigation } from ".";
import config from "../../utils/siteConfig";
import Cookies from "universal-cookie";
import "../../styles/layout.css";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardSetupForm from "./CardSetupForm";
import customJS from "../../custom.js";
import customNewJS from "../../newscript.js";
import handsonJS from "../../handson.js";

// Styles
import "../../styles/app.css";
import Search from "../search";
const searchIndices = [{ name: `Ghost`, title: `Posts` }];

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const [userLoggedIn, setUserLoggedIn] = useState("-1");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [userStripeId, setUserStripeId] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPlan, setUserPlan] = useState("");
    const [userPlanEndDate, setUserPlanEndDate] = useState("");
    const [userInvoiceUrl, setUserInvoiceUrl] = useState("");
    const [userCardBrand, setUserCardBrand] = useState("");
    const [userCardDigit, setUserCardDigit] = useState("");
    const [userCardExp, setUserCardExp] = useState("");

    const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK_KEY);

    const cookies = new Cookies();
    const site = data.allGhostSettings.edges[0].node;
    const twitterUrl = site.twitter
        ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        : null;
    const facebookUrl = site.facebook
        ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
        : null;

    let allPosts = data.allGhostPost.edges;

    allPosts = allPosts.sort(function (a, b) {
        return a.node.title.localeCompare(b.node.title, undefined, {
            numeric: true,
            sensitivity: "base",
        });
    });

    function userLogout() {
        cookies.remove("loggedInUser");
        cookies.remove("loggedInUserIpAddress");
        window.location.href = "/login";
    }

    async function cancelSubscription() {
        //const userStripeId = "";
        await fetch("/.netlify/functions/cancel-subscription", {
            method: "POST",
            body: JSON.stringify({ userStripeId }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                alert(responseJson.message);
            });
    }

    useEffect(async () => {
        customJS();
        customNewJS();
        handsonJS();

        const userEmail = cookies.get("loggedInUser");
        let customerStripeId = "";
        if (cookies.get("loggedInUser")) {
            await fetch("/.netlify/functions/get-user", {
                method: "POST",
                body: JSON.stringify({ userEmail }),
            })
                .then((response) => response.json())
                .then(async (responseJson) => {
                    if (
                        responseJson.user[0]?.user_ip !==
                        cookies.get("loggedInUserIpAddress")
                    ) {
                        cookies.remove("loggedInUser");
                        cookies.remove("loggedInUserIpAddress");
                        setUserLoggedIn("0");
                    } else {
                        setUserLoggedIn("1");
                        setUserName(responseJson.user[0].user_name);
                        if (
                            responseJson.user[0].stripe_id &&
                            responseJson.user[0].plan_id !== "0"
                        ) {
                            setIsSubscribed(true);
                            setUserStripeId(responseJson.user[0].stripe_id);
                            setUserEmail(responseJson.user[0].user_email);
                            customerStripeId = await responseJson.user[0]
                                .stripe_id;
                            if (responseJson.user[0].plan_id == 1) {
                                setUserPlan("Pro");
                            } else {
                                setUserPlan("Premium");
                            }
                            const dt =
                                responseJson.user[0].user_subscription_end +
                                "000";

                            const monthNames = [
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                            ];
                            const dateObj = new Date(parseInt(dt));
                            const month = monthNames[dateObj.getMonth()];
                            const day = String(dateObj.getDate()).padStart(
                                2,
                                "0"
                            );
                            const year = dateObj.getFullYear();
                            const output = month + " " + day + "," + year;
                            setUserPlanEndDate(output);
                        }
                    }
                });
            if (customerStripeId) {
                await fetch("/.netlify/functions/customer-payment-method", {
                    method: "POST",
                    body: JSON.stringify({ customerStripeId }),
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setUserCardBrand(responseJson.data[0].card.brand);
                        setUserCardDigit(responseJson.data[0].card.last4);
                        setUserCardExp(
                            responseJson.data[0].card.exp_month +
                                ", " +
                                responseJson.data[0].card.exp_year
                        );
                    });
                await fetch("/.netlify/functions/customer-invoices", {
                    method: "POST",
                    body: JSON.stringify({ customerStripeId }),
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setUserInvoiceUrl(
                            responseJson.data[0].hosted_invoice_url
                        );
                    });
            }
        } else {
            setUserLoggedIn("0");
        }
    }, []);

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">
                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head">
                        <div className="container">
                            <nav className="site-nav">
                                <div className="site-nav-left row">
                                    <div className="col-md-6 col-xs-3">
                                        <Navigation
                                            data={site.navigation}
                                            navClass="site-nav-item"
                                        />
                                    </div>
                                    <div className="col-md-6 col-xs-6">
                                        <li className="nav-item dropdown">
                                            <a
                                                className="nav-link  dropdown-toggle btn btn-primary"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                            >
                                                {" "}
                                                All Chapters{" "}
                                            </a>
                                            <ul className="dropdown-menu allChapterUl">
                                                {allPosts.map(({ node }) => (
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href={
                                                                "/" + node.slug
                                                            }
                                                        >
                                                            {node.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    </div>
                                </div>
                                {/* <ci-search></ci-search> */}
                                <Search indices={searchIndices} />
                                <div className="site-nav-right">
                                    {userLoggedIn == "0" ? (
                                        <Link
                                            className="site-nav-button"
                                            to="/login"
                                        >
                                            Login
                                        </Link>
                                    ) : userName ? (
                                        <li className="nav-item dropdown accountLi">
                                            <a
                                                className="nav-link dropdown-toggle account"
                                                href="#"
                                                id="navbarDropdown"
                                                role="button"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                {userName}
                                            </a>
                                            <div
                                                className="dropdown-menu"
                                                aria-labelledby="navbarDropdown"
                                            >
                                                {isSubscribed ? (
                                                    <div>
                                                        <a
                                                            className="dropdown-item"
                                                            data-toggle="modal"
                                                            data-target="#exampleModal"
                                                        >
                                                            My Account
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            data-toggle="modal"
                                                            data-target="#confirmCancelModal"
                                                        >
                                                            Cancel Subscription
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            data-toggle="modal"
                                                            data-target="#changeCardModal"
                                                        >
                                                            Change Card
                                                        </a>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                                <div className="dropdown-divider"></div>
                                                <a
                                                    className="dropdown-item"
                                                    onClick={userLogout}
                                                >
                                                    Logout
                                                </a>
                                            </div>
                                        </li>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </nav>
                        </div>
                    </header>

                    <main className="site-main">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>
                </div>
                <div
                    className="modal fade"
                    id="confirmCancelModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="confirmCancelModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="confirmCancelModalLabel"
                                >
                                    Cancel Subscription
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Are you sure, do you want to cancel your
                                    subscription?
                                </p>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button
                                            className="btn btn-primary cnfrmBtn"
                                            onClick={cancelSubscription}
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                    {/* <div className="col-md-6">
                                        <button>No</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="changeCardModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="changeCardModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="changeCardModalLabel"
                                >
                                    Add Card
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Elements stripe={stripePromise}>
                                    <CardSetupForm customerId={userStripeId} />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="exampleModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    My Account
                                </h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="marginWithBorder">
                                    <p className="detail-head">User Detail:</p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            Name: {userName}
                                        </div>
                                        <div className="col-md-6">
                                            Email: {userEmail}
                                        </div>
                                    </div>
                                </div>
                                <div className="marginWithBorder">
                                    <p className="detail-head">
                                        Subscription Detail:
                                    </p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            Current plan: {userPlan}
                                        </div>
                                        <div className="col-md-6">
                                            End date: {userPlanEndDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="marginWithBorder">
                                    <p className="detail-head">Card Detail:</p>
                                    <div className="row">
                                        <div className="col-md-4">
                                            Brand: {userCardBrand}
                                        </div>
                                        <div className="col-md-4">
                                            Last 4 digits: {userCardDigit}
                                        </div>
                                        <div className="col-md-4">
                                            Exp date: {userCardExp}
                                        </div>
                                    </div>
                                </div>
                                <div className="marginWithBorder">
                                    <p className="detail-head">
                                        Latest Invoice:
                                    </p>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <p>
                                                Click{" "}
                                                <a
                                                    target="_blank"
                                                    href={userInvoiceUrl}
                                                >
                                                    here
                                                </a>{" "}
                                                to view latest invoice
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: { eq: "ghost-icon.png" }) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
                allGhostPost(
                    filter: {
                        tags: { elemMatch: { name: { eq: "Statistik" } } }
                    }
                ) {
                    edges {
                        node {
                            ...GhostPostFields
                        }
                    }
                }
            }
        `}
        render={(data) => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;

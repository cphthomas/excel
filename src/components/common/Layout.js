import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import { Navigation } from ".";
import Cookies from "universal-cookie";
import "../../styles/layout.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardSetupForm from "./CardSetupForm";
import customNewJS from "../../newscript.js";
import handsonJS from "../../handson.js";
import amplitudeJS from "../../amplitude.js";
import highchartJS from "../../highcharts.js";
import FilterResults from "react-filter-search";

// Styles
import "../../styles/app.css";
const searchIndices = [{ name: `Excel`, title: `Posts` }];

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const helpImages = [
        "https://storage.googleapis.com/tepedu/helpvideos/koeb.mp4",
        "https://storage.googleapis.com/tepedu/helpvideos/login.mp4",
        "https://storage.googleapis.com/tepedu/helpvideos/passwordglemt.mp4",
        "https://storage.googleapis.com/tepedu/helpvideos/afmeld.mp4",
        "https://storage.googleapis.com/tepedu/helpvideos/skift.mp4",
        "https://mdbootstrap.com/img/Photos/Slides/img%20(19).jpg",
    ];
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
    const [helpModalImageSrc, setHelpModalImageSrc] = useState("");

    const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PK_KEY);

    const [value, setValue] = useState("");
    const [jsonData, setJsonData] = useState("");

    const cookies = new Cookies();
    const site = data.allGhostSettings.edges[0].node;
    const twitterUrl = site.twitter
        ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        : null;
    const facebookUrl = site.facebook
        ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
        : null;

    let allPosts = data.allGhostPost.edges;

    // allPosts = allPosts.sort(function (a, b) {
    //     return a.node.title.localeCompare(b.node.title, undefined, {
    //         numeric: true,
    //         sensitivity: "base",
    //     });
    // });

    let postPath = "";
    if (typeof window !== "undefined") {
        postPath = window.location.pathname;
    }

    function userLogout() {
        cookies.remove("loggedInUser");
        cookies.remove("loggedInUserIpAddress");
        window.location.href = "/login";
    }

    function helpModalImage(index) {
        setHelpModalImageSrc(helpImages[index]);
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
        customNewJS();
        handsonJS();
        amplitudeJS();
        highchartJS();
        searchRes();

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
                                responseJson.user[0].user_subscription_start +
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
                            dateObj.setDate(dateObj.getDate() + 30);
                            console.log(dateObj);
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

    //https://jsonplaceholder.typicode.com/users
    ///.netlify/functions/all-posts

    async function searchRes() {
        if (postPath == "/") {
            fetch("/.netlify/functions/all-posts")
                .then((response) => response.json())
                .then((json) => {
                    console.log(json.posts);
                    setJsonData(json.posts);
                });
        }
    }

    async function handleChange(event) {
        const { value } = event.target;
        setValue(value);
    }

    function handleFocus(event) {
        setTimeout(() => {
            setValue("");
        }, 300);
    }

    async function serachInPage(e) {
        let code = e.keyCode ? e.keyCode : e.which;
        if (code == 13) {
            if (
                typeof window !== "undefined" &&
                !window.find(e.target.value) &&
                e.target.value != ""
            ) {
                alert("No result!");
            }
        }
    }

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
                                                className="nav-link chapterBtn dropdown-toggle btn btn-primary"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                            >
                                                {" "}
                                                Indhold{" "}
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
                                {/* <Search indices={searchIndices} /> */}

                                {jsonData != "" && postPath == "/" ? (
                                    <div>
                                        {/* <input
                                            type="text"
                                            value={value}
                                            onChange={handleChange}
                                            className="searchInput"
                                            placeholder="Search"
                                        /> */}

                                        <div class="search-container-main">
                                            <input
                                                class="search-main"
                                                id="searchleftmain"
                                                type="search test"
                                                name="q"
                                                placeholder="Search"
                                                value={value}
                                                onChange={handleChange}
                                                //onKeyUp={(e) => handleKeyUp(e)}
                                                onBlur={(e) => handleFocus(e)}
                                            />
                                            <label
                                                class="button-main searchbutton-main"
                                                for="searchleftmain"
                                            >
                                                <span class="mglass-main">
                                                    &#9906;
                                                </span>
                                            </label>
                                        </div>

                                        <FilterResults
                                            value={value}
                                            data={jsonData}
                                            renderResults={(results) => (
                                                <div
                                                    className={`searchFilter ${
                                                        value
                                                            ? ""
                                                            : "filterHide"
                                                    }`}
                                                >
                                                    {results.map((el) => (
                                                        <div>
                                                            <a
                                                                href={
                                                                    "/" +
                                                                    el.slug
                                                                }
                                                            >
                                                                {el.title}
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        />
                                    </div>
                                ) : null}

                                {postPath != "/" ? (
                                    <div class="search-container-main">
                                        <input
                                            class="search-main"
                                            id="searchleft"
                                            type="search test"
                                            name="q"
                                            onKeyUp={(e) => serachInPage(e)}
                                            placeholder="S??g i kapitlet"
                                        />
                                        <label
                                            class="button-main searchbutton-main"
                                            for="searchleft"
                                        >
                                            <span class="mglass-main">
                                                &#9906;
                                            </span>
                                        </label>
                                    </div>
                                ) : (
                                    ""
                                )}

                                <div className="site-nav-right">
                                    {userLoggedIn == "0" ? (
                                        <Link
                                            className="site-nav-button loginBtn"
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
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#exampleModal"
                                                        >
                                                            Min konto
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#confirmCancelModal"
                                                        >
                                                            Afmeld abonnement
                                                        </a>
                                                        <a
                                                            className="dropdown-item"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#changeCardModal"
                                                        >
                                                            Skift Kreditkort
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
                                                    Log ud
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
                <div className="viewport-bottom">
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            {/* <p>
                                <a href="mailto: support@tepedu.com">Kontakt</a>{" "}
                            </p> */}
                            <div className="dropdown helpDropdown">
                                <button
                                    className="btn btn-secondary dropdown-toggle helpBtn"
                                    type="button"
                                    id="dropdownMenuButton1"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Hj??lp?
                                </button>
                                <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton1"
                                >
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal3"
                                            href="#"
                                            onClick={() => helpModalImage(0)}
                                        >
                                            Hj??lp til adgang?
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal3"
                                            href="#"
                                            onClick={() => helpModalImage(1)}
                                        >
                                            Hj??lp til login?
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal3"
                                            href="#"
                                            onClick={() => helpModalImage(2)}
                                        >
                                            Hj??lp til password?
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal3"
                                            href="#"
                                            onClick={() => helpModalImage(3)}
                                        >
                                            Hj??lp til afmelding?
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal3"
                                            href="#"
                                            onClick={() => helpModalImage(4)}
                                        >
                                            Hj??lp til kort skift?
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="/term-service"
                                            target="_blank"
                                        >
                                            Abonnementsbetingelser
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="/privacy-policy"
                                            target="_blank"
                                        >
                                            Privatlivspolitik
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="dropdown-item"
                                            href="mailto: excel@tepedu.com"
                                        >
                                            Kontakt
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
                <div
                    className="modal fade"
                    id="exampleModal3"
                    tabindex="-1"
                    aria-labelledby="exampleModal3Label"
                    aria-hidden="true"
                    //data-bs-backdrop="static"
                    //data-bs-keyboard="false"
                >
                    <div className="modal-dialog modal-lg helpModal">
                        <div className="modal-content">
                            <div className="ratio ratio-16x9">
                                <video
                                    autoPlay
                                    src={helpModalImageSrc}
                                    id="helpVideo"
                                />
                                {/* <img src={helpModalImageSrc} /> */}
                            </div>

                            <div className="text-center py-3">
                                <button
                                    type="button"
                                    className="btn btn-secondary helpModalBtn"
                                    data-bs-dismiss="modal"
                                    onClick={() => helpModalImage(5)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
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
                                <b
                                    className="modal-title"
                                    id="confirmCancelModalLabel"
                                >
                                    Afmeld abonnement
                                </b>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="font14">
                                    Er du sikker p?? du vil afmelde dit
                                    abonnement?
                                </p>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button
                                            className="btn btn-primary cnfrmBtn"
                                            onClick={cancelSubscription}
                                        >
                                            Bekr??ft
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
                                <b
                                    className="modal-title"
                                    id="changeCardModalLabel"
                                >
                                    Skift kreditkort
                                </b>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
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
                                <b
                                    className="modal-title"
                                    id="exampleModalLabel"
                                >
                                    Min konto
                                </b>
                                <button
                                    type="button"
                                    className="close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="marginWithBorder">
                                    <p className="detail-head">Bruger:</p>
                                    <div className="row font14">
                                        <div className="col-md-6">
                                            Navn: {userName}
                                        </div>
                                        <div className="col-md-6">
                                            Email: {userEmail}
                                        </div>
                                    </div>
                                </div>
                                <div className="marginWithBorder">
                                    <p className="detail-head">Abonnement:</p>
                                    <div className="row font14">
                                        <div className="col-md-6">
                                            Nuv??rende plan: {userPlan}
                                        </div>
                                        <div className="col-md-6">
                                            Fornyelse: {userPlanEndDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="marginWithBorder">
                                    <p className="detail-head">Kreditkort:</p>
                                    <div className="row font14">
                                        <div className="col-md-4">
                                            Brand: {userCardBrand}
                                        </div>
                                        <div className="col-md-4">
                                            Sidste 4 cifre: {userCardDigit}
                                        </div>
                                        <div className="col-md-4">
                                            Udl??b: {userCardExp}
                                        </div>
                                    </div>
                                </div>
                                <div className="marginWithBorder">
                                    <p className="detail-head">
                                        Sidste faktura:
                                    </p>
                                    <div className="row font14">
                                        <div className="col-md-12">
                                            <p>
                                                Klik{" "}
                                                <a
                                                    target="_blank"
                                                    href={userInvoiceUrl}
                                                >
                                                    her
                                                </a>{" "}
                                                for at se sidste faktura
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
                    sort: { order: ASC, fields: published_at }
                    filter: { tags: { elemMatch: { name: { eq: "Excel" } } } }
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

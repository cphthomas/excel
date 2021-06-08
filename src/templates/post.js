import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";
import Cookies from "universal-cookie";
import "../styles/post.css";
import { loadStripe } from "@stripe/stripe-js";
import * as tocbot from "tocbot";
import { constants } from "../utils/constants";
import { Image } from "react-bootstrap";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
    const post = data.ghostPost;
    const fisrtTagPlan = post?.tags[0] ? post.tags[0].name : "";
    //const secondTagBookAccess = post.tags[1] ? post.tags[1].name : "";
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [apiResponse, setApiResponse] = useState(false);
    const [userPlanId, setUserPlanId] = useState("");
    const [planType, setPlanType] = useState("");
    const [email, setEmail] = useState("");
    const [customerId, setCustomerId] = useState("");

    useEffect(async () => {
        const cookies = new Cookies();
        if (cookies.get("loggedInUser")) {
            const userEmail = cookies.get("loggedInUser");
            await fetch("/.netlify/functions/get-user", {
                method: "POST",
                body: JSON.stringify({ userEmail }),
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    setApiResponse(true);
                    if (
                        responseJson.user[0].user_ip ==
                        cookies.get("loggedInUserIpAddress")
                    ) {
                        setEmail(responseJson.user[0].user_email);
                        setCustomerId(responseJson.user[0].stripe_id);
                        setUserPlanId(responseJson.user[0].plan_id);
                        setUserLoggedIn(true);
                    } else {
                        cookies.remove("loggedInUser");
                        cookies.remove("loggedInUserIpAddress");
                    }
                });
            tocbot.init({
                tocSelector: ".toc",
                contentSelector: ".content-body",
                hasInnerContainers: true,
            });
            tocbot.refresh();
        } else {
            setApiResponse(true);
        }

        if ($(".toc").length && $(".post-feature-image").length) {
            var el = $(".toc");
            el.css({
                top: "580px",
            });
            var stickyTop = $(".toc").offset().top;
            var stickyHeight = $(".toc").height();

            $(window).scroll(function () {
                var limit =
                    $(".post-feature-image").offset()?.top - stickyHeight - 20;

                var windowTop = $(window).scrollTop();

                if (stickyTop < windowTop) {
                    el.css({
                        position: "fixed",
                        top: "70px",
                    });
                } else {
                    el.css({
                        position: "unset",
                        float: "right",
                    });
                }

                if (limit < windowTop) {
                    var diff = limit - windowTop;
                    el.css({});
                }
            });
        }
    }, []);

    function validateForm() {
        return planType.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
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

    async function premiumCheckout(e) {
        e.preventDefault();
        const planType = "premium";
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

    return (
        <div>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post?.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                {apiResponse &&
                (fisrtTagPlan == constants.FREE_POST ||
                    userPlanId == constants.USER_PREMIUM_PLAN_ID ||
                    (userPlanId == constants.USER_PRO_PLAN_ID &&
                        fisrtTagPlan == constants.PRO_POST)) ? (
                    <article className="content">
                        {post.feature_image ? (
                            <figure className="post-feature-image">
                                <img
                                    src={post.feature_image}
                                    alt={post.title}
                                />
                            </figure>
                        ) : null}
                        <aside className="toc-container">
                            <div className="toc"></div>
                        </aside>
                        <section className="post-full-content">
                            <h1 className="content-title">{post.title}</h1>
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{
                                    __html: post.html,
                                }}
                            />
                        </section>
                    </article>
                ) : apiResponse &&
                  !userLoggedIn &&
                  (fisrtTagPlan == constants.PRO_POST ||
                      fisrtTagPlan == constants.PREMIUM_POST) ? (
                    <div class="card">
                        <div class="card-body">
                            <h2>This post is for paying subscribers only</h2>
                            <p className="font-18">
                                Already have an account?{" "}
                                <a href="/login">Sign in</a>
                            </p>
                        </div>
                    </div>
                ) : apiResponse &&
                  userLoggedIn &&
                  userPlanId == constants.USER_NO_PLAN_ID &&
                  (fisrtTagPlan == constants.PRO_POST ||
                      fisrtTagPlan == constants.PREMIUM_POST) ? (
                    <div class="card">
                        <div class="card-body">
                            <h2>This post is for paying subscribers only</h2>
                            <div className="form-group">
                                <label className="font-size-15">
                                    Choose your subscription
                                </label>
                                <form onSubmit={handleSubmit}>
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
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-premiume"
                                        disabled={!validateForm()}
                                    >
                                        Upgrade Subscription
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : apiResponse &&
                  userLoggedIn &&
                  userPlanId == constants.USER_PRO_PLAN_ID &&
                  fisrtTagPlan == constants.PREMIUM_POST ? (
                    <div class="card">
                        <div class="card-body">
                            <h2>This post is for premium subscribers only</h2>
                            <button
                                type="submit"
                                className="btn btn-primary btn-premiume"
                                onClick={premiumCheckout}
                            >
                                Upgrade to premium
                            </button>
                        </div>
                    </div>
                ) : (
                    // <div className="loaderImgDiv">
                    //     <Image className="loaderImg" src={"/images/loader.gif"} alt="dataLoadImage" />
                    // </div>
                    <div className="loadwrap">
                        <div>
                            <div className="bounceball"></div>
                            <div className="loadText">NOW LOADING</div>
                        </div>
                    </div>
                )}
            </Layout>
        </div>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(
            slug: { eq: $slug }
            tags: { elemMatch: { name: { eq: "BOOK_TWO" } } }
        ) {
            ...GhostPostFields
        }
    }
`;

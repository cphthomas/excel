import React from "react";
import PropTypes from "prop-types";
import { withPrefix } from "gatsby";

export default function HTML(props) {
    return (
        <html {...props.htmlAttributes}>
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.10.0/tocbot.css"
                ></link>
                <script
                    type="text/javascript"
                    src="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.js"
                ></script>
                <link
                    href="https://cdnjs.cloudflare.com/ajax/libs/vis/4.21.0/vis.min.css"
                    rel="stylesheet"
                    type="text/css"
                />
                {/* <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdn.jsdelivr.net/npm/handsontable@latest/dist/handsontable.full.min.css"
                /> */}
                {/* <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://handsontable.com/static/css/main.css"
                /> */}
                {/* <script src="https://cdn.jsdelivr.net/npm/handsontable@latest/dist/handsontable.full.min.js"></script> */}
                <script src="https://cdn.jsdelivr.net/npm/handsontable@9.0.0/dist/handsontable.full.min.js"></script>
                <link
                    type="text/css"
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/handsontable@9.0.0/dist/handsontable.full.min.css"
                ></link>
                {props.headComponents}
            </head>
            <body {...props.bodyAttributes}>
                {props.preBodyComponents}
                <div
                    key={`body`}
                    id="___gatsby"
                    dangerouslySetInnerHTML={{ __html: props.body }}
                />
                {props.postBodyComponents}
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
                />
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.10.0/tocbot.min.js"></script>
                <script
                    src="https://widget.spreaker.com/widgets.js"
                    async
                ></script>
            </body>
        </html>
    );
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
};

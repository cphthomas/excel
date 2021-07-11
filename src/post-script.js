const postScript = () => {
    // (function () {
    //     var script = document.createElement("script");
    //     script.type = "text/javascript";
    //     script.src =
    //         "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"; // use the location of your MathJax

    //     var config =
    //         "MathJax.Hub.Config({" +
    //         'extensions: ["tex2jax.js"],' +
    //         'jax: ["input/TeX","output/HTML-CSS"]' +
    //         "});" +
    //         "MathJax.Hub.Startup.onload();";

    //     if (window.opera) {
    //         script.innerHTML = config;
    //     } else {
    //         script.text = config;
    //     }

    //     script.addEventListener("load", function () {
    //         MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    //     });

    //     document.getElementsByTagName("head")[0].appendChild(script);
    // })();

    waitForElement(".content-body", 8000)
        .then(function () {
            console.log("content-body element is loaded.. do stuff");
            makeAnchorTargetBlank();
            tocbot.init({
                tocSelector: ".toc",
                contentSelector: ".content-body",
                hasInnerContainers: true,
            });
            tocbot.refresh();
            mathJaxScript();
        })
        .catch(() => {
            console.log("content-body element did not load in 8 seconds");
        });
};

function waitForElement(querySelector, timeout = 0) {
    const startTime = new Date().getTime();
    return new Promise((resolve, reject) => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            if (document.querySelector(querySelector)) {
                clearInterval(timer);
                resolve();
            } else if (timeout && now - startTime >= timeout) {
                clearInterval(timer);
                reject();
            }
        }, 100);
    });
}

function makeAnchorTargetBlank() {
    //$(".content-body a").attr("target", "_blank");
    var allAnchors = $(".content-body a");
    $(allAnchors).each(function (index) {
        var href = $(this).attr("href");
        if (typeof href != "undefined" && !href.includes("#")) {
            $(this).attr("target", "_blank");
        }
    });
}

function mathJaxScript() {
    // var s = document.createElement("script");
    // //s.type = "text/javascript";
    // s.async = true;
    // s.setAttribute("id", "MathJax-script");
    // s.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    // $("head").append(s);
    // var script = document.createElement("script");
    // script.type = "text/javascript";
    // script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"; // use the location of your MathJax
    // var config =
    //     "MathJax.Hub.Config({" +
    //     'extensions: ["tex2jax.js"],' +
    //     'jax: ["input/TeX","output/HTML-CSS"]' +
    //     "});" +
    //     "MathJax.Hub.Startup.onload();";
    // if (window.opera) {
    //     script.innerHTML = config;
    // } else {
    //     script.text = config;
    // }
    // script.addEventListener("load", function () {
    //     MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    // });
    // document.getElementsByTagName("head")[0].appendChild(script);
    window.MathJax = {
        startup: {
            ready: () => {
                MathJax.startup.defaultReady();
                // MathJax is initialized and you can trigger a typeset.
            },
        },
    };
}

export default postScript;

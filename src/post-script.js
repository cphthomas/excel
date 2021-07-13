const postScript = () => {
    mathJaxScript();
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
            makeTOCFixed();
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
    var allAnchors = $(".content-body a");
    $(allAnchors).each(function (index) {
        var href = $(this).attr("href");
        if (typeof href != "undefined" && !href.includes("#")) {
            $(this).attr("target", "_blank");
        }
    });
}

function mathJaxScript() {
    window.MathJax = {
        startup: {
            ready: () => {
                MathJax.startup.defaultReady();
                // MathJax is initialized and you can trigger a typeset.
            },
        },
    };
}

function makeTOCFixed() {
    if ($(".toc").length && $(".post-feature-image").length) {
        var el = $(".toc");
        el.css({
            top: "580px",
        });
        var stickyTop = $(".toc").offset().top;
        var stickyHeight = $(".toc").height();

        $(window).scroll(function () {
            // var limit =
            //     $(".post-feature-image").offset()?.top - stickyHeight - 20;

            var windowTop = $(window).scrollTop();
            // console.log("stickyTop = " + stickyTop);
            // console.log("windowTop = " + windowTop);

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

            // if (limit < windowTop) {
            //     var diff = limit - windowTop;
            //     el.css({});
            // }
        });
        test++;
    }
}

export default postScript;

const postScript = () => {
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

export default postScript;

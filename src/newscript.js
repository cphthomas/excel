const customNewJS = () => {
    var url = window.location.href;
    var loadedHash = url.split("#")[1];

    waitForElement("#" + loadedHash, 8000)
        .then(function () {
            console.log("loadedHash is loaded.. do stuff = " + loadedHash);
            moveTocBotOnLoad(loadedHash);
        })
        .catch(() => {
            console.log("loadedHash did not load in 8 seconds");
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

function moveTocBotOnLoad(loadedHash) {
    $("html, body").animate(
        {
            scrollTop: $("#" + loadedHash).offset().top + 370,
        },
        "slow"
    );
}

export default customNewJS;

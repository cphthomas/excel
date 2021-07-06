const amplitudeJS = () => {
    waitForElement("#white-player-playlist-container", 8000)
        .then(function () {
            console.log(
                "white-player-playlist-container element is loaded.. do stuff"
            );
            amplitudePlayerScript();
        })
        .catch(() => {
            console.log(
                "white-player-playlist-container element did not load in 8 seconds"
            );
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

function amplitudePlayerScript() {
    document
        .getElementsByClassName("show-playlist")[0]
        .addEventListener("click", function () {
            document
                .getElementById("white-player-playlist-container")
                .classList.remove("slide-out-top");
            document
                .getElementById("white-player-playlist-container")
                .classList.add("slide-in-top");
            document.getElementById(
                "white-player-playlist-container"
            ).style.display = "block";
        });

    document
        .getElementsByClassName("close-playlist")[0]
        .addEventListener("click", function () {
            document
                .getElementById("white-player-playlist-container")
                .classList.remove("slide-in-top");
            document
                .getElementById("white-player-playlist-container")
                .classList.add("slide-out-top");
            document.getElementById(
                "white-player-playlist-container"
            ).style.display = "none";
        });

    document
        .getElementsByClassName("show-playlist")[1]
        .addEventListener("click", function () {
            document
                .getElementById("white-player-playlist-container2")
                .classList.remove("slide-out-top");
            document
                .getElementById("white-player-playlist-container2")
                .classList.add("slide-in-top");
            document.getElementById(
                "white-player-playlist-container2"
            ).style.display = "block";
        });

    document
        .getElementsByClassName("close-playlist")[1]
        .addEventListener("click", function () {
            document
                .getElementById("white-player-playlist-container2")
                .classList.remove("slide-in-top");
            document
                .getElementById("white-player-playlist-container2")
                .classList.add("slide-out-top");
            document.getElementById(
                "white-player-playlist-container2"
            ).style.display = "none";
        });

        document
        .getElementById("speedTextPlayer1")
        .addEventListener("click", function () {
          var currentInnerText = parseFloat(
            document.getElementById("speedUpText").innerHTML
          );
          console.log(currentInnerText);
          if (currentInnerText == 1) {
            document.getElementById("speedUpText").innerHTML = "1.5";
          } else if (currentInnerText == 1.5) {
            document.getElementById("speedUpText").innerHTML = "2";
          } else if (currentInnerText == 2) {
            document.getElementById("speedUpText").innerHTML = "1";
          }
        });

      document
        .getElementById("speedTextPlayer2")
        .addEventListener("click", function () {
          var currentInnerText = parseFloat(
            document.getElementById("speedUpText2").innerHTML
          );
          console.log(currentInnerText);
          if (currentInnerText == 1) {
            document.getElementById("speedUpText2").innerHTML = "1.5";
          } else if (currentInnerText == 1.5) {
            document.getElementById("speedUpText2").innerHTML = "2";
          } else if (currentInnerText == 2) {
            document.getElementById("speedUpText2").innerHTML = "1";
          }
        });

    Amplitude.init({
        songs: [
            {
                name:
                    "DREksamensopgave 9.7. Knudsen Properties v. Dennis Knudsen",
                    artist: "Sonny Kristoffersen",
                album: "Finansjura",
                url:
                    "https://www.dropbox.com/s/gpq1cdx74t6cphp/Podcast%20eksamensopgave%2011.3.%20Travlhed%20i%20kreditafdelingen.m4a?dl=0",
                cover_art_url:
                    "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
            },
        ],
        playlists: {
            emancipator: {
                songs: [
                    {
                        name:
                            "DREksamensopgave 9.3. Tømrermester Bertil Jaobsen og Tina Jensen",
                        artist: "Sonny Kristoffersen",
                        album: "Finansjura",
                        url:
                        "https://www.dropbox.com/s/gpq1cdx74t6cphp/Podcast%20eksamensopgave%2011.3.%20Travlhed%20i%20kreditafdelingen.m4a?raw=1",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "Dusk To Dawn",
                        artist: "Sonny Kristoffersen",
                        album: "Finansjura",
                        url:
                        "https://www.dropbox.com/s/gpq1cdx74t6cphp/Podcast%20eksamensopgave%2011.3.%20Travlhed%20i%20kreditafdelingen.m4a?raw=1",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "Eksamensopgave 9.4. Lottogevinsten",
                        artist: "Sonny Kristoffersen",
                        album: "Finansjura",
                        url:
                            "https://res.cloudinary.com/hndu2f8jv/video/upload/v1623936133/podcasts/Poscast_til_eksamensopgave_9.4._Lottogevinsten_mkzmxp.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                ],
            },
            trip_hop: {
                songs: [
                    {
                        name: "Jura Front",
                        artist: "Sonny Kristoffersen",
                        album: "Finansjura",
                        url:
                            "https://res.cloudinary.com/hndu2f8jv/video/upload/v1623936135/podcasts/Poscast_til_eksamensopgave_6.1._Ejendomsm%C3%A6glerens_st%C3%B8vler_gujuq8.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "Eksamensopgave 7.1. Børge brugtvognsforhandler",
                        artist: "Sonny Kristoffersen",
                        album: "Finansjura",
                        url:
                            "https://res.cloudinary.com/hndu2f8jv/video/upload/v1623936139/podcasts/Poscast_til_eksamensopgave_7.1._B%C3%B8rge_brugtvognsforhandler_jwsb7s.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "Anvil",
                        artist: "Sonny Kristoffersen",
                        album: "Finansjura",
                        url: "https://521dimensions.com/song/LORN - ANVIL.mp3",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                ],
            },
        },
    });
}

export default amplitudeJS;

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
                    "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625659665/podcasts/Jura%20Eksamens%20Podcast/podcast_eksamensopgave_3_1_borde_og_stole_as_unfeyo.mp3",
                cover_art_url:
                    "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
            },
        ],
        playlists: {
            jurapodcast1: {
                songs: [
                    {
                        name: "Player 2 front pod1",
                        artist: "Thomas Petersen",
                        album: "Statistik",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625659665/podcasts/Jura%20Eksamens%20Podcast/podcast_eksamensopgave_3_1_borde_og_stole_as_unfeyo.mp3",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "Eksamensopgave 7.1. Børge brugtvognsforhandler",
                        artist: "Sonny Kristoffersen",
                        album: "Finansjura",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625659665/podcasts/Jura%20Eksamens%20Podcast/podcast_eksamensopgave_3_1_borde_og_stole_as_unfeyo.mp3",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "Anvil",
                        artist: "Sonny Kristoffersen",
                        album: "Finansjura",
                        url: "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625659665/podcasts/Jura%20Eksamens%20Podcast/podcast_eksamensopgave_3_1_borde_og_stole_as_unfeyo.mp3",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                ],
            },
            statpodcasts: {
                songs: [
                    {
                        name: "1. Intro",
                        artist: "Thomas Petersen",
                        album: "Statistik",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625682955/podcasts/Statistik%20Podcasts/1._intro_soxakt.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "2 Variable",
                        artist: "Thomas Petersen",
                        album: "Statistik",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625682925/podcasts/Statistik%20Podcasts/2._Variable_ykgfat.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "3. Beskrivende statistik",
                        artist: "Thomas Petersen",
                        album: "Statistik",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625682981/podcasts/Statistik%20Podcasts/3._Beskrivende_statistik_pa1ulq.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "4. Normalfordelingen",
                        artist: "Thomas Petersen",
                        album: "Statistik",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625682984/podcasts/Statistik%20Podcasts/4._Normalfordelingen_vt9tpl.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "5. Konfidensintervaller kvantitative variable",
                        artist: "Thomas Petersen",
                        album: "Statistik",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625682961/podcasts/Statistik%20Podcasts/5._Konfidensintervaller_kvantitative_variable_iajeib.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "6.0 Hypotesetests kvantitative variable",
                        artist: "Thomas Petersen",
                        album: "Statistik",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625682996/podcasts/Statistik%20Podcasts/6.0._Hypotesetests_kvantitative_variable_gbuoox.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "6.1 Type 1 og type 2 fejl",
                        artist: "Thomas Petersen",
                        album: "Statistik",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625682936/podcasts/Statistik%20Podcasts/6.1_Type_1_og_type_2_fejl_mnarnn.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                    {
                        name: "7.0 Konfidensinterval 1 andel",
                        artist: "Thomas Petersen",
                        album: "Statistik",
                        url:
                        "https://res.cloudinary.com/hndu2f8jv/video/upload/v1625682935/podcasts/Statistik%20Podcasts/7.0_Konfidensinterval_1_andel_b63ak7.m4a",
                        cover_art_url:
                            "https://res.cloudinary.com/hndu2f8jv/image/upload/v1624045659/podcastgif/giphy_1_rrpccq.gif",
                    },
                ],
            },



            
        },
    });
}

export default amplitudeJS;

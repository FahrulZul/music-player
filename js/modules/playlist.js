import { songsList } from "../data/songs.js";
import PlayInfo from "./play-info.js";
import TrackBar from "./track-bar.js";

const Playlist = ((_) => {
    //data - state
    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);

    //cache the DOM
    const pLaylistEl = document.querySelector(".playlist");

    const init = (_) => {
        render();
        listeners();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused,
        });
    };

    const playerTriggerPLayPause = (_) => {
        togglePlayPause();
        render();
    };

    const changeAudioSrc = (_) => {
        currentSong.src = songs[currentlyPlayingIndex].url;
    };

    const togglePlayPause = (_) => {
        currentSong.paused ? currentSong.play() : currentSong.pause();
    };

    const playNext = (_) => {
        if (songs[currentlyPlayingIndex + 1]) {
            currentlyPlayingIndex++;
        } else {
            currentlyPlayingIndex = 0;
        }
        changeAudioSrc();
        togglePlayPause();
        render();
    };

    const mainPlay = (clickedIndex) => {
        if (currentlyPlayingIndex === clickedIndex) {
            console.log("same");
            togglePlayPause();
        } else {
            console.log("new");
            currentlyPlayingIndex = clickedIndex;
            changeAudioSrc();
            togglePlayPause();
        }

        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused,
        });
    };

    const listeners = (_) => {
        pLaylistEl.addEventListener("click", (event) => {
            if (event.target && event.target.matches(".fa")) {
                const listElem = event.target.parentNode.parentNode;
                const listElemIndex = [...listElem.parentNode.children].indexOf(
                    listElem
                );
                mainPlay(listElemIndex);
                render();
            }
        });

        currentSong.addEventListener("ended", () => {
            playNext();
        });

        currentSong.addEventListener("timeupdate", () => {
            TrackBar.setState(currentSong);
        });
    };

    const render = (_) => {
        let markup = "";

        const toggleIcon = (itemIndex) => {
            if (currentlyPlayingIndex === itemIndex) {
                return currentSong.paused ? "fa-play" : "fa-pause";
            } else {
                return "fa-play";
            }
        };

        songs.forEach((songObj, index) => {
            markup += `
                <li class="playlist__song ${
                    currentlyPlayingIndex === index
                        ? "playlist__song-active"
                        : ""
                }">
                    <div class="play-pause">
                    <i class="fa ${toggleIcon(index)} pp-icon"></i>
                    </div>
                    <div class="playlist__song-details">
                    <span class="playlist__song-name">${songObj.title}</span>
                    <br>
                    <span class="playlist__song-artist">${songObj.artist}</span>
                    </div>
                    <div class="playlist__song-duration">
                    ${songObj.time}
                    </div>
                </li>
            `;

            pLaylistEl.innerHTML = markup;
        });
    };

    return {
        init,
        playerTriggerPLayPause,
    };
})();

export default Playlist;

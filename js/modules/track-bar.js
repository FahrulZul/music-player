import { secondsToMinutes } from "../utils/helpers.js";

const TrackBar = ((_) => {
    const state = {
        currentTrackTime: 0,
        fullTrackTime: 0,
        fillWidth: 0,
    };

    //cache the DOM
    const trackBarFillEl = document.querySelector(".track__bar-fill");
    const trackCurTimeEL = document.querySelector(".track__current-time");
    const trackFullTimeEl = document.querySelector(".track__full-time");

    const init = (_) => {
        render();
    };

    const getPercent = (current, full) => {
        return (current / full) * 100;
    };

    const setState = (obj) => {
        state.currentTrackTime = obj.currentTime;
        state.fullTrackTime = obj.duration;
        state.fillWidth = getPercent(
            state.currentTrackTime,
            state.fullTrackTime
        );
        render();
    };

    const render = (_) => {
        trackBarFillEl.style.width = `${state.fillWidth}%`;
        trackCurTimeEL.innerHTML = `${
            !state.currentTrackTime
                ? "0:00"
                : secondsToMinutes(state.currentTrackTime)
        }`;
        trackFullTimeEl.innerHTML = `${
            !state.fullTrackTime
                ? "0:00"
                : secondsToMinutes(state.fullTrackTime)
        }`;
    };

    return {
        init,
        setState,
    };
})();

export default TrackBar;

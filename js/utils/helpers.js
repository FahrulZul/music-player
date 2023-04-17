export const secondsToMinutes = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    let formattedSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return minutes + ":" + formattedSeconds;
};

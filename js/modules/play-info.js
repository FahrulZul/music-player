import Playlist from './playlist.js';

const PlayInfo = (() => {

    const state = {
        songsLength: 0,
        isPlaying: false
    }

    const playerCountEl = document.querySelector('.player__count');
    const playerTriggerEl = document.querySelector('.player__trigger');

    const init = _ => {
        render();
        listeners();
    }

    const listeners = _ => {
        playerTriggerEl.addEventListener('click', _ => {
            // 1. Change isPLaying state
            state.isPlaying = !state.isPlaying;
            // 2. render button display
            render()
            // 3. toggle playPause from playlist and render playlist again.
            Playlist.playerTriggerPLayPause();
        })
    }

    const setState = obj => {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    }

    const render = _ => {
        playerCountEl.innerHTML = state.songsLength;
        playerTriggerEl.innerHTML = state.isPlaying ? 'Pause' : 'Play';
    }

    return {
        init,
        setState
    }

})();

export default PlayInfo;
const throttle = require('lodash.throttle');
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const currentTime = evt => {
    localStorage.setItem(LOCALSTORAGE_KEY, evt.seconds);
};

player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY));

player.on('timeupdate', throttle(currentTime, 1000));
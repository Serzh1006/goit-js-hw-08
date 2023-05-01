import { save, load } from './localestorage';

const throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const LOCALE__KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const actualTime = load(LOCALE__KEY) || 0;

player
  .setCurrentTime(actualTime)
  .then(function (seconds) {
    seconds = actualTime;
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        alert('Время было меньше 0 или больше, чем продолжительность видео');
        break;

      default:
        alert('Что-то не так');
        break;
    }
  });

player.on(
  'timeupdate',
  throttle(data => {
    save(LOCALE__KEY, data.seconds);
  }, 1000)
);

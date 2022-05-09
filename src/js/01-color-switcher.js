const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

const INTERVAL_CHANGE = 1000;
let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnStart() {
  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL_CHANGE);
  refs.btnStart.disabled = true;
}

function onBtnStop() {
  clearInterval(interval);
  refs.btnStart.disabled = false;
}

refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStop.addEventListener('click', onBtnStop);

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

const INTERVAL = 1000;
let interval = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function btnStart() {
  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, INTERVAL);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
}

function btnStop() {
  clearInterval(interval);
  refs.btnStop.disabled = true;
  refs.btnStart.disabled = false;
}

refs.btnStart.addEventListener('click', btnStart);
refs.btnStop.addEventListener('click', btnStop);

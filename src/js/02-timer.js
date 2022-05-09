import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const input = document.querySelector('input#datetime-picker');
const btnStart = document.querySelector('[data-start]');

let interval = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (selectedDates[0].getTime() < date.getTime()) {
      return window.alert('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

const funLibFlatpickr = flatpickr(input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function populateDate(formated) {
  dataDays.textContent = addLeadingZero(formated.days);
  dataHours.textContent = addLeadingZero(formated.hours);
  dataMinutes.textContent = addLeadingZero(formated.minutes);
  dataSeconds.textContent = addLeadingZero(formated.seconds);
}

function btnStartClick() {
  interval = setInterval(() => {
    const newDate = new Date();
    const selectedData = funLibFlatpickr.selectedDates[0];
    const timer = selectedData.getTime() - newDate.getTime();
    if (timer < 0) {
      clearInterval(interval);
      return;
    }
    const convertedData = convertMs(timer);
    populateDate(convertedData);
    btnStart.disabled = true;
  }, 1000);
}

btnStart.addEventListener('click', btnStartClick);

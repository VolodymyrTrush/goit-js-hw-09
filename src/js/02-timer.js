import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
  input: document.querySelector('input#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
};

let interval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (selectedDates[0].getTime() < date.getTime()) {
      window.alert('Please choose a date in the future');
      return populateDate({ days: '00', hours: '00', minutes: '00', seconds: '00' });
    } else {
      refs.btnStart.disabled = false;
    }
  },
};

const funLibFlatpickr = flatpickr(refs.input, options);

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
  refs.dataDays.textContent = addLeadingZero(formated.days);
  refs.dataHours.textContent = addLeadingZero(formated.hours);
  refs.dataMinutes.textContent = addLeadingZero(formated.minutes);
  refs.dataSeconds.textContent = addLeadingZero(formated.seconds);
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
    refs.btnStart.disabled = true;
  }, 1000);
}

refs.btnStart.addEventListener('click', btnStartClick);

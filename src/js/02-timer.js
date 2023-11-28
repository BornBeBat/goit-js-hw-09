import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    this.defaultDate = new Date();
  },
  onClose(selectedDates) {
    if (selectedDates[0] > this.defaultDate) {
      timerCounterMilisecond =
        selectedDates[0].getTime() - this.defaultDate.getTime();
      convertedTime = convertMs(timerCounterMilisecond);
      setTimer(convertedTime);
      Notify.success('You can push "Start"');
      refs.btnStart.removeAttribute('disabled');
      refs.btnStart.addEventListener('click', onBtnClick);
    }
    if (selectedDates[0] < this.defaultDate) {
      Notify.failure('Please choose a date in the future');
    }
  },
};

let timerCounterMilisecond = null;
let convertedTime = null;
let timerId = null;

refs.btnStart.setAttribute('disabled', '');
flatpickr('#datetime-picker', options);

function onBtnClick(event) {
  if (timerId === null) {
    timerId = setInterval(countdownTimer, 1000);
    // refs.btnStart.setAttribute('disabled', '');
    // refs.btnStart.removeEventListener('click', onBtnClick);
  }
}

function setTimer({ days, hours, minutes, seconds }) {
  if (+refs.days.innerHTML !== days) {
    refs.days.innerHTML = addLeadingZero(days);
  }
  if (+refs.hours.innerHTML !== hours) {
    refs.hours.innerHTML = addLeadingZero(hours);
  }
  if (+refs.minutes.innerHTML !== minutes) {
    refs.minutes.innerHTML = addLeadingZero(minutes);
  }
  if (+refs.seconds.innerHTML !== seconds) {
    refs.seconds.innerHTML = addLeadingZero(seconds);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function countdownTimer() {
  timerCounterMilisecond -= 1000;
  if (timerCounterMilisecond < 1000) {
    clearInterval(timerId);
    timerId = null;

    Notify.info('Timer stop counting');
  }
  convertedTime = convertMs(timerCounterMilisecond);
  setTimer(convertedTime);
}

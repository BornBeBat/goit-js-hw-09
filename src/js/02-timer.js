import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),
  timer: document.querySelector('.timer'),
};

let timerCounterMilisecond = null;
let convertedTime = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: null,
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

refs.btnStart.setAttribute('disabled', '');
flatpickr('#datetime-picker', options);

function onBtnClick() {
  timerId = setInterval(stepDown, 1000);
  refs.btnStart.setAttribute('disabled', '');
  refs.input.setAttribute('disabled', '');
  refs.btnStart.removeEventListener('click', onBtnClick);
}

function setTimer(date) {
  date.forEach((element, index) => {
    refs.timer.children[index].querySelector('.value').textContent =
      addLeadingZero(element);
  });
}

function stepDown() {
  timerCounterMilisecond -= 1000;
  if (timerCounterMilisecond < 1000) {
    stopCounting();
  }
  convertedTime = convertMs(timerCounterMilisecond);
  setTimer(convertedTime);
}

function stopCounting() {
  clearInterval(timerId);
  timerId = null;
  Notify.info('Timer stop counting');
  refs.btnStart.removeAttribute('disabled', '');
  refs.input.removeAttribute('disabled', '');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return [days, hours, minutes, seconds];
}

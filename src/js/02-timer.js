import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';
const btnStart = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
let timerCounterMilisecond = null;
let convertedTime = null;
let timerId = null;

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
      btnStart.removeAttribute('disabled');
    }
    if (selectedDates[0] < this.defaultDate) {
      Notify.failure('Please choose a date in the future');
    }
  },
};
btnStart.setAttribute('disabled', '');
flatpickr('#datetime-picker', options);
btnStart.addEventListener('click', onBtnClick);
function onBtnClick(event) {
  if (timerId === null) {
    timerId = setInterval(countdownTimer, 1000);
  } else {
    Notify.warning('Waiting while timer is finish   ');
  }
}
function setTimer({ days, hours, minutes, seconds }) {
  if (+timer.querySelector('[data-days]').innerText !== days) {
    timer.querySelector('[data-days]').innerText = addLeadingZero(days);
  }
  if (+timer.querySelector('[data-hours]').innerText !== hours) {
    timer.querySelector('[data-hours]').innerText = addLeadingZero(hours);
  }
  if (+timer.querySelector('[data-minutes]').innerText !== minutes) {
    timer.querySelector('[data-minutes]').innerText = addLeadingZero(minutes);
  }
  if (+timer.querySelector('[data-seconds]').innerText !== seconds) {
    timer.querySelector('[data-seconds]').innerText = addLeadingZero(seconds);
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

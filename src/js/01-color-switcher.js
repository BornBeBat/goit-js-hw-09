const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

let timerId = null;

refs.btnStart.addEventListener('click', onStartClick);
refs.btnStop.addEventListener('click', onStopClick);

function onStartClick(event) {
  refs.btnStop.removeAttribute('disabled');
  event.target.setAttribute('disabled', '');

  //   body.style.backgroundColor = getRandomHexColor();
  document.body.setAttribute(
    'style',
    `background-color: ${getRandomHexColor()}`
  );

  timerId = setInterval(() => {
    // body.style.backgroundColor = getRandomHexColor();
    document.body.setAttribute(
      'style',
      `background-color: ${getRandomHexColor()}`
    );
  }, 1000);
}

function onStopClick(event) {
  event.target.setAttribute('disabled', '');
  refs.btnStart.removeAttribute('disabled');

  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

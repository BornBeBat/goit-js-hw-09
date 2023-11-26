const body = document.querySelector('body');
let timerId = null;

body.addEventListener('click', onClick);

function onClick(event) {
  if (event.target.dataset.hasOwnProperty('start')) {
    event.target.nextElementSibling.removeAttribute('disabled');
    event.target.setAttribute('disabled', '');

    //   body.style.backgroundColor = getRandomHexColor();
    body.setAttribute('style', `background-color: ${getRandomHexColor()}`);

    timerId = setInterval(() => {
      // body.style.backgroundColor = getRandomHexColor();
      body.setAttribute('style', `background-color: ${getRandomHexColor()}`);
    }, 1000);
  }

  if (event.target.dataset.hasOwnProperty('stop')) {
    event.target.setAttribute('disabled', '');
    event.target.previousElementSibling.removeAttribute('disabled');

    clearInterval(timerId);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

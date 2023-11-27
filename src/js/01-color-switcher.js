const body = document.querySelector('body');
let timerId = null;

body.addEventListener('click', onClick);

function onClick(event) {
  const target = event.target;
  if (target.dataset.hasOwnProperty('start')) {
    target.nextElementSibling.removeAttribute('disabled');
    target.setAttribute('disabled', '');

    //   body.style.backgroundColor = getRandomHexColor();
    body.setAttribute('style', `background-color: ${getRandomHexColor()}`);

    timerId = setInterval(() => {
      // body.style.backgroundColor = getRandomHexColor();
      body.setAttribute('style', `background-color: ${getRandomHexColor()}`);
    }, 1000);
  }

  if (target.dataset.hasOwnProperty('stop')) {
    target.setAttribute('disabled', '');
    target.previousElementSibling.removeAttribute('disabled');

    clearInterval(timerId);
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const wheel = document.querySelector('.wheel');
const options = wheel.querySelector('.wheel__options');
const button = document.querySelector('.wheel__center');

let rotate = 0;
let timesRotated = 0;

function rotateWheel() {
    let currentRotate = options.style.transform;
    timesRotated++;
    currentRotate = currentRotate.replace('rotate(', '').replace('deg)', '');
    currentRotate = parseInt(currentRotate) || 0;

    rotate = Math.floor(Math.random() * (720 - 1080 + 1)) + 1080;
    options.style.transform = `rotate(${currentRotate + rotate}deg)`;

}

button.addEventListener('click', rotateWheel);
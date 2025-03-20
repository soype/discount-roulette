const wheel = document.querySelector('.wheel');
const options = wheel.querySelector('.wheel__options');
const button = document.querySelector('.wheel__center');

let rotate = 0;
let timesRotated = 0;

function rotateWheel() {
    let currentRotate = options.style.transform;
    
    currentRotate = currentRotate.replace('rotate(', '').replace('deg)', '');
    currentRotate = parseInt(currentRotate) || 0;

    rotate = Math.floor(Math.random() * (720 - 1080 + 1)) + 1080;
    // If rotate is too close to a multiple of 45 degrees, add a couple degrees to the angle
    if (Math.abs(rotate - 45) < 45) {
        rotate += 2;
    }
    options.style.transform = `rotate(${currentRotate + rotate}deg)`;

    const finalOption = Math.floor((rotate - (timesRotated * 1080 ) - 720) / 45) + 1;
    console.log('Final option: ', finalOption);
    const selectedOption = document.getElementById(`option-${finalOption}`);
    console.log(selectedOption.children[0].innerHTML)

}

button.addEventListener('click', rotateWheel);
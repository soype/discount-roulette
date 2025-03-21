document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".modal").style.opacity = 1;
  document.querySelector(".modal__backdrop").addEventListener("click", disableModal);

  if (document.cookie.includes("successCoupon")) {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("successCoupon="));
    if (cookie) {
      const result = cookie.split("=")[1];
      const [coupon, option] = result.split("__");
      const selectedOption = document.querySelector(`#option-${option}`);
      if (selectedOption) {
        showSuccess(selectedOption, coupon, false);
      }
    }
  }
});

const disableModal = () => {
  document.querySelector(".modal").style.opacity = 0;
  document.querySelector(".modal__backdrop").style.opacity = 0;
  setTimeout(() => {
    document.querySelector(".modal").style.display = "none";
    document.querySelector(".modal__backdrop").style.display = "none";
  }, 300);
};

const wheel = document.querySelector(".wheel");
const options = wheel.querySelector(".wheel__options");
const button = document.querySelector(".wheel__center");
const closeButton = document.querySelector(".modal__post-continue");

const coupons = ["SUERTE10", "SUERTE10", "SUERTE5", "ENVIOGRATIS", "SUERTE10", "SUERTE10", "SUERTE5", "ENVIOGRATIS"];

let rotate = 0;
let timesRotated = 0;

function rotateWheel() {
  let currentRotate = options.style.transform;

  currentRotate = currentRotate.replace("rotate(", "").replace("deg)", "");
  currentRotate = parseInt(currentRotate) || 0;

  rotate = Math.floor(Math.random() * (720 - 1080 + 1)) + 1080;
  // If rotate is too close to a multiple of 45 degrees, add a couple degrees to the angle
  if (Math.abs(rotate - 45) < 45) {
    rotate += 2;
  }
  options.style.transform = `rotate(${currentRotate + rotate}deg)`;

  const finalOption = Math.floor((rotate - timesRotated * 1080 - 720) / 45) + 1;
  const selectedOption = document.getElementById(`option-${finalOption}`);

  const coupon = coupons[finalOption - 1];

  showSuccess(selectedOption, coupon, true);

  document.cookie = `successCoupon=${coupon}__${finalOption};max-age=31536000;path=/`; 

}

function showSuccess(selectedOption, coupon, firstTime = true) {
  document.querySelector("#success").innerHTML = selectedOption.children[0].innerHTML;
  document.querySelector(".wheel__final-coupon").innerHTML = coupon;

  button.disabled = true;
  button.style.zIndex = 4;
  if (!firstTime) {
    document.querySelector('.wheel__options').style.opacity = 0;
    document.querySelector(".wheel__final").style.opacity = 1;
    document.querySelector(".modal__post").style.opacity = 1;
  }else{
    setTimeout(() => {
    document.querySelector(".wheel__final").style.opacity = 1;
    document.querySelector(".modal__post").style.opacity = 1;
    }, 3500)
  }
}

button.addEventListener("click", rotateWheel);
closeButton.addEventListener("click", disableModal);

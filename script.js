var timeLeft = document.querySelector(".display__time-left");
var endTime = document.querySelector(".display__end-time");
var input = document.querySelector("input");

var previousTimers = {};
function startTimer(duration) {
  var now = new Date();

  var timer = duration,
    minutes,
    seconds;

  now.setMinutes(now.getMinutes() + duration / 60);
  var ampm = now.getHours() >= 12 ? "PM" : "AM";

  endTime.textContent = `${
    now.getHours() == "12" ? 12 : now.getHours() % 12
  }:${now.getMinutes()} ${ampm}`;

  if (previousTimers.timeId) {
    window.clearInterval(previousTimers.timeId);
  }
  previousTimers.timeId = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timeLeft.textContent = minutes + ":" + seconds;

    timer--;
    if (timer < 0) {
      window.clearInterval(previousTimers.timeId);
    }
  }, 1000);
}

var form = document.querySelector("#custom");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
input.addEventListener("change", () => {
  startTimer(input.value);
});

var allButtons = document.querySelectorAll("button");

for (let button of allButtons) {
  button.addEventListener("click", (e) => {
    let target = e.target;
    let time = target.attributes["data-time"].value;
    startTimer(time);
  });
}

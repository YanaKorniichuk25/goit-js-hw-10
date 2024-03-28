import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.getElementById('datetime-picker');
const btn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let userSelectedDate;
//disable button
btn.disabled = true;

iziToast.settings({
  theme: 'dark',
  class: 'popup-window',
  timeout: 8000,
  messageColor: '#fff',
  iconUrl: './img/octagon.svg',
  resetOnHover: true,
  position: 'topRight',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
      });
      btn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      btn.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', flatpickrOptions);

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
function addZeroToTimer(timerObj) {
  days.textContent = timerObj.days.toString().padStart(2, '0');
  hours.textContent = timerObj.hours.toString().padStart(2, '0');
  minutes.textContent = timerObj.minutes.toString().padStart(2, '0');
  seconds.textContent = timerObj.seconds.toString().padStart(2, '0');
}
function resetTimer() {
  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
}

btn.addEventListener('click', () => {
  //disable pick new date after click start
  dateTimePicker.disabled = true;
  btn.disabled = true;
  const currentTime = new Date().getTime();
  let msToCount = userSelectedDate.getTime() - currentTime;
  const intervalId = setInterval(function () {
    const timerObj = convertMs(msToCount);
    addZeroToTimer(timerObj);
    msToCount -= 1000;
    if (msToCount <= 0) {
      clearInterval(intervalId);
      resetTimer();
      iziToast.show({
        message: 'Time up',
      });
    }
  }, 1000);
});

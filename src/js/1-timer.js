import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('.js-button');
const input = document.querySelector('#datetime-picker');
const day = document.querySelector('.value[ data-days ]');
const hour = document.querySelector('.value[ data-hours ]');
const minute = document.querySelector('.value[ data-minutes ]');
const second = document.querySelector('.value[ data-seconds ]');
startBtn.setAttribute('disabled', '');
let diff;
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      startBtn.setAttribute('disabled', '');
      startBtn.style.backgroundColor = '#CFCFCF';
      startBtn.style.color = '##989898';

      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        position: 'topRight',
      });
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.style.backgroundColor = '#4E75FF';
      startBtn.style.color = '#FFFFFF';
    }
  },
};

flatpickr(input, options);

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');
  input.setAttribute('disabled', '');
  startBtn.style.backgroundColor = '#CFCFCF';
  startBtn.style.color = '##989898';
  diff = userSelectedDate - Date.now();
  timerNumber(convertMs(diff));
  const intervalId = setInterval(() => {
    diff -= 1000;
    timerNumber(convertMs(diff));
    if (diff <= 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function timerNumber({ days, hours, minutes, seconds }) {
  day.textContent = `${addLeadingZero(days)}`;
  hour.textContent = `${addLeadingZero(hours)}`;
  minute.textContent = `${addLeadingZero(minutes)}`;
  second.textContent = `${addLeadingZero(seconds)}`;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

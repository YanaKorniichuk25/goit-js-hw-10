import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector('.input-delay');
let delay;

input.addEventListener('input', e => {
  delay = e.currentTarget.value;
});

form.addEventListener('submit', e => {
  e.preventDefault();

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }

  createPromise(delay, form.elements.state.value)
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59A10D',
        messageColor: '#FFFFFF',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#EF4040',
        messageColor: '#FFFFFF',
      });
    });
  form.reset();
});

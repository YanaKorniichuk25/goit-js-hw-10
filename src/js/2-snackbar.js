import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const registerForm = document.querySelector('.form');
registerForm.addEventListener('submit', handleSubmit);

iziToast.settings({
  theme: 'dark',
  icon: false,
  position: 'topRight',
  resetOnHover: true,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target.elements;
  let shouldResolve;
  let value;
  if (form.state[0].checked) {
    shouldResolve = true;
    value = `Fulfilled promise in ${form.delay.value} ms`;
  } else {
    shouldResolve = false;
    value = `Rejected promise in ${form.delay.value} ms`;
  }

  makePromise(value, form.delay.value, shouldResolve)
    .then(value =>
      iziToast.success({
        class: 'izi-toast-success-style',
        title: 'OK',
        message: value,
        backgroundColor: '#59A10D',
        iconUrl: './img/ok.svg',
        position: 'topRight',
      })
    )
    .catch(error =>
      iziToast.error({
        class: 'izi-toast-error-style',
        title: 'Error',
        message: error,
        backgroundColor: '#EF4040',
        iconUrl: '../img/octagon.svg',
        position: 'topRight',
      })
    );
  this.reset();
}

const makePromise = (value, delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(value);
      } else {
        reject(value);
      }
    }, delay);
  });
};

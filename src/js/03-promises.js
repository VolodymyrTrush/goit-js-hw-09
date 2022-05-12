import Notiflix from 'notiflix';

const form = document.querySelector('form');

let dataForm = {};

function formInput(e) {
  dataForm[e.target.name] = e.target.value;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}

function formSubmit(e) {
  e.preventDefault();

  let time = +dataForm.delay;

  for (let i = 0; i < dataForm.amount; i += 1) {
    setTimeout(() => {
      createPromise(i + 1, time + i * +dataForm.step)
        .then(message => Notiflix.Notify.success(message))
        .catch(message => Notiflix.Notify.failure(message));
    }, time + i * +dataForm.step);
  }
}

form.addEventListener('input', formInput);
form.addEventListener('submit', formSubmit);

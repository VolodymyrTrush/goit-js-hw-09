const form = document.querySelector('form');

let dataForm = {};

function FormInput(e) {
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

function FormSubmit(e) {
  e.preventDefault();

  let time = +dataForm.delay;

  for (let i = 0; i < dataForm.amount; i += 1) {
    setTimeout(() => {
      createPromise(i + 1, time + i * +dataForm.step)
        .then(message => success(message))
        .catch(message => failure(message));
    }, time + i * +dataForm.step);
  }
}

form.addEventListener('input', FormInput);
form.addEventListener('submit', FormSubmit);

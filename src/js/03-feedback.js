import { save, load } from './localestorage';
const throttle = require('lodash.throttle');
const LOCALE__KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('[name = "email"]'),
  messageEl: document.querySelector('[name = "message"]'),
};

const dataUser = {};

refs.form.addEventListener('submit', onClickSubForm);

// Проверка localeStorage на наличие данных
function getDataFromStorage() {
  const objData = load(LOCALE__KEY);
  if (objData) {
    refs.emailEl.value = objData.email;
    refs.messageEl.value = objData.message;
  }
}

getDataFromStorage();

//  Считываем данные полей в localestorage

refs.form.addEventListener(
  'input',
  throttle(e => {
    dataUser[e.target.name] = e.target.value;
    save(LOCALE__KEY, dataUser);
  }, 500)
);

// Submit Form

function onClickSubForm(e) {
  if (refs.emailEl.value === '' || refs.messageEl.value === '') {
    alert('Заполните все поля');
  } else {
    e.preventDefault();
    const objForm = {};
    new FormData(e.currentTarget).forEach((value, index) => {
      objForm[index] = value;
    });
    console.log(objForm);
    localStorage.removeItem(LOCALE__KEY);
    e.target.reset();
  }
}

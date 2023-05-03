import { save, load } from './localestorage';
const throttle = require('lodash.throttle');
const LOCALE__KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('[name = "email"]'),
  messageEl: document.querySelector('[name = "message"]'),
};

let dataUser = {
  email: '',
  message: '',
};

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
    const isHasData = load(LOCALE__KEY);
    if (isHasData !== undefined) {
      isHasData[e.target.name] = e.target.value.trim();
      save(LOCALE__KEY, isHasData);
    } else {
      dataUser[e.target.name] = e.target.value.trim();
      save(LOCALE__KEY, dataUser);
    }
  }, 500)
);

// Submit Form

function onClickSubForm(e) {
  e.preventDefault();
  if (refs.emailEl.value.trim() === '' || refs.messageEl.value.trim() === '') {
    alert('Заполните все поля');
  } else {
    const objForm = {};
    new FormData(e.currentTarget).forEach((value, index) => {
      objForm[index] = value.trim();
    });
    console.log(objForm);
    localStorage.removeItem(LOCALE__KEY);
    e.target.reset();
  }
}

const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');
const email = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

const LOCALSTORAGE_KEY = 'feedback-form-state';

const saveData = () => {
    const formData = { email: email.value, message: message.value };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
};

const sendData = evt => {
    evt.preventDefault();
    if (email.value === '' || message.value === '') {
        alert('Please fill all fields');
    } else {
        console.log({ email: email.value, message: message.value });
        evt.currentTarget.reset();
        localStorage.removeItem(LOCALSTORAGE_KEY);
    }
};

const checkedKey = key => {
    try {
        const keyForCheck = localStorage.getItem(key);
        return keyForCheck === null ? undefined : JSON.parse(keyForCheck);
    } catch (error) {
        console.error('Key checked error: ', error.message);
    }
};

const savedKey = checkedKey(LOCALSTORAGE_KEY);
if (savedKey) {
    email.value = savedKey.email;
    message.value = savedKey.message;
}

form.addEventListener('input', throttle(saveData, 500));
form.addEventListener('submit', sendData);
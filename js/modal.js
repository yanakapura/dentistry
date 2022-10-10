// Кнопки в хедере
const signupBtn = document.querySelector(".nav__sign-up");
const loginBtn = document.querySelector(".nav__login");

const overflow = document.querySelector(".overflow");
const modalSignUp = document.querySelector("#modal--sign-up");
const modalLogin = document.querySelector("#modal--login");
//Кнопка submit в модальных окнах
const modalButtonSignUp = document.querySelector("#btn__sign-up");
const modalButtonLogIn = document.querySelector("#btn__login");
// Все инпуты и лейблы в форме входа
const inputsLogin = modalLogin.getElementsByTagName("input");
const labelsErrorLogin = modalLogin.getElementsByClassName("error");
// Все инпуты и лейблы в форме регистрации
const inputsSingUp = modalSignUp.getElementsByTagName("input");
const labelsErrorSignUp = modalSignUp.getElementsByClassName("error");

const inputPassword = document.getElementById("password");
const inputPasswordRepeat = document.getElementById("password-repeat");
const labelErrorPasswordRepeat = document.querySelector("#passwordRepeatError");

let valid = false;

// Открыть/закрыть модальные окна
signupBtn.addEventListener("click", () => {
  openRegistration();
});
loginBtn.addEventListener("click", () => {
  openLogin();
});

overflow.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("overflow") ||
    e.target.classList.contains("modal__close")
  ) {
    closeLogin();
    closeRegistration();
  }
});

function openRegistration() {
  overflow.style.display = "block";
  modalSignUp.style.display = "block";
}
function closeRegistration() {
  overflow.style.display = "none";
  modalSignUp.style.display = "none";
}
function openLogin() {
  overflow.style.display = "block";
  modalLogin.style.display = "block";
}
function closeLogin() {
  overflow.style.display = "none";
  modalLogin.style.display = "none";
}

// кнопка отправки формы регистрации
modalButtonSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  validationSignUp();
  valid && registration();
});

// кнопка отправки формы входа
modalButtonLogIn.addEventListener("click", (e) => {
  e.preventDefault();
  validationLogIn();
  valid && login();
  valid && location.href.includes('account') && location.reload();
});

// Валидация входа
function validationLogIn() {
  for (let i = 0; i < inputsLogin.length; i++) {
    validation(inputsLogin[i], labelsErrorLogin[i]);
  }
}

// Валидация регистрации
function validationSignUp() {
  for (let i = 0; i < inputsSingUp.length; i++) {
    validation(inputsSingUp[i], labelsErrorSignUp[i]);
  }

  validationEqualPasswords(
    inputPassword,
    inputPasswordRepeat,
    labelErrorPasswordRepeat
  );
}

// Валидация на пустые строки
function validation(input, label) {
  if (!input.value) {
    input.classList.add("input-error");
    label.textContent = "Заполните поле";
    valid = false;
  } else {
    input.classList.remove("input-error");
    label.classList.add("hide");
    input.id !== "email" &&
      !input.classList.contains("input-password") &&
      validationLetters(input, label);

    input.classList.contains("input-password") &&
      validationLength(input, label);
    input.id === "email" && validationEmail(input, label);
  }
}

// Валидация на длинну пароля
function validationLength(input, label) {
  if (input.value.length < 6) {
    input.classList.add("input-error");
    label.classList.remove("hide");
    label.textContent = "Пароль должен содержать минимум 6 символов";
    valid = false;
  } else {
    input.classList.remove("input-error");
    label.classList.add("hide");
    valid = true;
  }
}

// Валидация, чтобы в поле были только буквы
function validationLetters(input, label) {
  if (!/^[A-Za-zА-Яа-яЁё]*$/.test(input.value)) {
    input.classList.add("input-error");
    label.classList.remove("hide");
    label.textContent = "Можно использовать только латинские буквы и кирилицу";
    valid = false;
  } else {
    input.classList.remove("input-error");
    label.classList.add("hide");
    valid = true;
  }
}

// Равенсвто пароля и повторного пароля
function validationEqualPasswords(password, repeatPassword, label) {
  if (password.value !== repeatPassword.value) {
    repeatPassword.classList.add("input-error");
    label.classList.remove("hide");
    label.textContent = "Ваши пароли не совпадают";
    valid = false;
  }
}

// Валидация email
function validationEmail(input, label) {
  if (!input.value.includes("@") || !input.value.includes(".")) {
    input.classList.add("input-error");
    label.classList.remove("hide");
    label.textContent = `Email должен содержать "@" и "."`;
    // label.classList.add("error");
    valid = false;
  } else {
    input.classList.remove("input-error");
    label.classList.add("hide");
    valid = true;
  }
}

const signupBtn = document.querySelector(".nav__sign-up");
const loginBtn = document.querySelector(".nav__login");

const overflow = document.querySelector(".overflow");
const modalSignUp = document.querySelector("#modal--sign-up");
const modalLogin = document.querySelector("#modal--login");
//Кнопка submit в модальных окнах
const modalButtonSignUp = document.querySelector("#modal__button__sign-up");
const modalButtonLogIn = document.querySelector("#modal__button__login");

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
});

// кнопка отправки формы регистрации
modalButtonLogIn.addEventListener("click", (e) => {
  e.preventDefault();
  validationLogIn();
});


// Валидация входа
function validationLogIn() {
  const inputsLogin = modalLogin.getElementsByTagName("input");
  const labelsError = modalLogin.getElementsByClassName("error");

  for (let i = 0; i < inputsSingUp.length; i++) {
    validation(inputsLogin[i], labelsError[i]);
  }

}

// Валидация регистрации
function validationSignUp() {
  const inputsSingUp = modalSignUp.getElementsByTagName("input");
  const labelsError = modalSignUp.getElementsByClassName("error");
  const inputPassword = document.getElementById("password");
  const inputPasswordRepeat = document.getElementById("password-repeat");
  const labelErrorPasswordRepeat = document.querySelector("#passwordRepeatError");

  for (let i = 0; i < inputsSingUp.length; i++) {
    validation(inputsSingUp[i], labelsError[i]);
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
    input.classList.add("input-error")
    label.textContent = "Заполните поле";
    label.classList.add("error");
  } else {
    input.classList.remove("input-error")
    label.classList.add("hide");
    input.id !== 'email' && validationLetters(input, label);

    input.classList.contains("input-password") && validationLength(input, label)
    input.id === 'email' && validationEmail(input, label)
  }
}

// Валидация на длинну пароля
function validationLength(input, label) {
  if (input.value.length < 6) {
    input.classList.add("input-error")
    label.classList.remove("hide");
    label.textContent = "Пароль должен содержать минимум 6 символов";
    label.classList.add("error");
  } else {
    input.classList.remove("input-error")
    label.classList.add("hide");
  }
}

// Валидация, чтобы в поле были только буквы
function validationLetters(input, label) {
  if (!/^[A-Za-zА-Яа-яЁё]*$/.test(input.value)) {
    input.classList.add("input-error")
    label.classList.remove("hide");
    label.textContent = "Можно использовать только латинские буквы и кирилицу";
    label.classList.add("error");
  } else {
    input.classList.remove("input-error")
    label.classList.add("hide");
  }
}

// Равенсвто пароля и повторного пароля
function validationEqualPasswords(password, repeatPassword, label) {
  if (password.value !== repeatPassword.value) {
    repeatPassword.classList.add("input-error");
    label.classList.remove("hide");
    label.textContent = "Ваши пароли не совпадают";
    label.classList.add("error");
  }
}

// Валидация email
function validationEmail(input, label) {
  if (!input.value.includes("@") || !input.value.includes(".")) {
    input.classList.add("input-error")
    label.classList.remove("hide");
    label.textContent = `Email должен содержать "@" и "."`;
    label.classList.add("error");
  } else {
    input.classList.remove("input-error")
    label.classList.add("hide");
  }
}
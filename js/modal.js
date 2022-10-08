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


// кнопка отправки формы регистрации
modalButtonSignUp.addEventListener("click", (e) => {
  validationSignUp();
  e.preventDefault();
});
// кнопка отправки формы регистрации
modalButtonLogIn.addEventListener("click", (e) => {
  validationLogIn();
  e.preventDefault();
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


// Валидация на пустые строки
function validation(inputField, inputError, message, idError) {
  if (!inputField.value) {
    inputField.style.border = "2px solid red";
    inputField.style.backgroundColor = "#ffd4d4";
    inputError.textContent = message;
    inputError.className = "error active";
    return false;
  } else {
    inputField.style.border = "1px solid black";
    inputField.style.backgroundColor = "rgba(255, 0, 0, 0)";
    idError.classList.remove("error");
    idError.classList = "hide";
    return true;
  }
  // if (inputField.value) {
  //   inputField.style.border = "1px solid black";
  //   inputField.style.backgroundColor = "rgba(255, 0, 0, 0)";
  //   idError.classList.remove("error");
  //   idError.classList = "hide";
  //   return true;
  // }
}

function validationLength(inputField, inputError, idError) {
  if (inputField.value.length < 6) {
    inputField.style.border = "2px solid red";
    inputField.style.backgroundColor = "#ffd4d4";
    inputError.textContent = "Количество символов меньше 6";
    inputError.className = "error active";
    return false;
  } else {
    inputField.style.border = "1px solid black";
    inputField.style.backgroundColor = "rgba(255, 0, 0, 0)";
    idError.classList.remove("error");
    idError.className = "hide";
  }
}

// function validationLetters(inputField, inputError, idError) {
//   function letters(inputField) {
//     let onlyLetters = /^[a-zA-Z]*$/;
//     return onlyLetters.test(String(inputField.value));
//   }

//   if (!letters(inputField)) {
//     console.log("numbers");
//     inputField.style.border = "2px solid red";
//     inputField.style.backgroundColor = "#ffd4d4";
//     inputError.textContent = "not only letters";
//     inputError.className = "error active";
//     return false;
//   } else {
//     inputField.style.border = "1px solid black";
//     inputField.style.backgroundColor = "rgba(255, 0, 0, 0)";
//     idError.classList.remove("error");
//     idError.className = "hide";
//     console.log("its ok ");
//   }
// }

// Равенсвто пароля и повторного пароля
function validationEqualPasswords(password, repeatPassword, inputError) {
  if (password.value !== repeatPassword.value) {
    repeatPassword.style.border = "2px solid red";
    repeatPassword.style.backgroundColor = "#ffd4d4";
    inputError.textContent = "Ваши пароли не совпадают";
    inputError.className = "error active";
    return false;
  } else if (password.value === repeatPassword.value) {
    return true;
  }
}

// Валидация входа
function validationLogIn() {
  const nameInput = document.getElementById("login-name");
  const surnameInput = document.getElementById("login-surname");
  const passwordInput = document.getElementById("login-password");
  const nameError = document.querySelector(".errorNameLogIn");
  const surnameError = document.querySelector(".errorSurnameLogIn");
  const passwordError = document.querySelector(".errorPasswordLogIn");
  const loginNameErr = document.getElementById("login-nameError");
  const loginSurnameErr = document.getElementById("login-surnameError");
  const loginPasswordErr = document.getElementById("login-passwordError");
  validation(nameInput, nameError, "Введите ваше имя!", loginNameErr);
  validation(
    surnameInput,
    surnameError,
    "Введите вашу фамилию !",
    loginSurnameErr
  );
  validation(
    passwordInput,
    passwordError,
    "Введите ваш пароль !",
    loginPasswordErr
  );
  // validationLetters(nameInput, nameError, loginNameErr);
}

// Валидация регистрации
function validationSignUp() {
  const nameError = document.querySelector(".errorName");
  const surnameError = document.querySelector(".errorSurname");
  const passwordError = document.querySelector(".errorPassword");
  const passwordRepeatError = document.querySelector(".errorPasswordRepeat");
  const emailError = document.querySelector(".errorEmail");
  const nameInput = document.getElementById("name");
  const surnameInput = document.getElementById("surname");
  const passwordInput = document.getElementById("password");
  const passwordRepeatInput = document.getElementById("password-repeat");
  const emailInput = document.getElementById("email");
  const nameErr = document.getElementById("nameError");
  const surnameErr = document.getElementById("surnameError");
  const passwordErr = document.getElementById("passwordError");
  const passwordRepeatErr = document.getElementById("emailError");
  const emailErr = document.getElementById("passwordRepeatError");

  validation(nameInput, nameError, "Введите ваше имя !", nameErr);
  validation(surnameInput, surnameError, "Введите вашу фамилию !", surnameErr);
  validation(passwordInput, passwordError, "Введите ваш пароль !", passwordErr);
  validation(
    passwordRepeatInput,
    passwordRepeatError,
    "Введите повторно ваш пароль !",
    passwordRepeatErr
  );
  validation(emailInput, emailError, "Введите ваш email !", emailErr);
  // validationLength(passwordInput, passwordError, passwordErr);
  // validationLength(passwordRepeatInput, passwordRepeatError, passwordRepeatErr);
  validationEqualPasswords(
    passwordInput,
    passwordRepeatInput,
    passwordRepeatError
  );
  return true;
}


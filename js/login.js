const errorTitle = document.querySelector(".errorTitle");
const accountNav = document.querySelector("#account-nav");

let data = [];

// localStorage.setItem('isLoggedIn', false)

// Берем данные из localstorage
const dataFromLocaleStorage = JSON.parse(localStorage.getItem("data"));
// Проверяем, есть ли в них что-то, и, если есть = присваиваем их переменной data, если нет, оставляем data пустым массивом
dataFromLocaleStorage ? (data = dataFromLocaleStorage) : (data = []);

// Функция регистрации
function registration() {
  // Берем данные из формы регистрации и приваиваем пустому объекту
  const newClient = {};
  newClient.firstName = modalSignUp.querySelector("#name").value;
  newClient.lastName = modalSignUp.querySelector("#surname").value;
  newClient.password = modalSignUp.querySelector("#password").value;
  newClient.email = modalSignUp.querySelector("#email").value;

  // Пушаем объект в конец массива с данными, переводим в сторку JSON и помещаем обратно в localstorage
  data.push(newClient);
  data = JSON.stringify(data);
  localStorage.setItem("data", data);

  // Вносим данные в localeStorage о том, что был выполнен вход в аккаунт
  localStorage.setItem("isLoggedIn", true);
  // Вносим в localeStorage данные об активном клиенте
  localStorage.setItem("activeAcc", JSON.stringify(newClient));

  // Отображаем в хедере аккаунт клиента
  showAccountNav(newClient);
  closeRegistration();
}

// Функция входа
function login() {
  // Берем данные из формы входа и приваиваем пустому объекту
  const inputedInfo = {};
  inputedInfo.firstName = modalLogin.querySelector("#login-name").value;
  inputedInfo.lastName = modalLogin.querySelector("#login-surname").value;
  inputedInfo.password = modalLogin.querySelector("#login-password").value;

  // Находим среди массива data элемент, у которого сходиться имя, фамилия и пароль с введенными в форму входа
  const client = data.find(
    (el) =>
      el.firstName === inputedInfo.firstName &&
      el.lastName === inputedInfo.lastName &&
      el.password === inputedInfo.password
  );

  // Если такого элемента нет, выводим ошибку
  if (!client) {
    errorTitle.classList.remove("hide");
    for (input of inputsLogin) {
      input.classList.add("input-error");
    }
  } else {
    errorTitle.classList.add("hide");

    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("activeAcc", JSON.stringify(client));

    showAccountNav(client);
    closeLogin();
  }
}

// Функция отображения аккаунта клиента в хедере
function showAccountNav(clientObj) {
  signupBtn.classList.add("hide");
  loginBtn.classList.add("hide");
  accountNav.classList.remove("hide");

  const clientName = document.querySelector(".nav__account--name");

  const name = `${clientObj.firstName} ${clientObj.lastName}`;
  clientName.textContent = name;
}

// Получаем из localeStorage данные о том, был ли выполнен вход в аккаунт, и данные активного клиента
const loggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
const activeAcc = JSON.parse(localStorage.getItem("activeAcc"));

// Если выполнен вход в аккаунт, отображаем аккаунт в хедере
function isLoggedIn() {
  if (loggedIn === true) { 
    showAccountNav(activeAcc);
  } else {
    accountNav.classList.add('hide')
  }
}

isLoggedIn();


const errorTitle = document.querySelector(".errorTitle");
const accountNav = document.querySelector("#account-nav");

// Функция регистрации
function registration() {
  // Берем данные из формы регистрации и приваиваем пустому объекту
  const newClient = {};
  newClient.firstName = modalSignUp.querySelector("#name").value;
  newClient.lastName = modalSignUp.querySelector("#surname").value;
  newClient.password = modalSignUp.querySelector("#password").value;
  newClient.email = modalSignUp.querySelector("#email").value;

  // Отправляем данные о зарегестрировавшемся клиенте на сервер
  fetch("http://localhost:5002/registration", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(newClient),
  });

  // Вносим данные в localeStorage о том, что был выполнен вход в аккаунт
  localStorage.setItem("isLoggedIn", true);
  // Вносим в localeStorage данные об активном клиенте
  const serverData = getClient({
    firstName: newClient.firstName,
    lastName: newClient.lastName,
    password: newClient.password
  });
  serverData.then((data) => {
    localStorage.setItem("activeAcc", JSON.stringify(data));
  });
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

  console.log(inputedInfo);
  // Получаем с сервера данные о клиентах
  getClient(inputedInfo).then((data) => {
    const client = data[0];

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
  });
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
    accountNav.classList.add("hide");
  }
}

isLoggedIn();

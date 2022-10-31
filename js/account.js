const accName = document.querySelector("#account-name");
const accEmail = document.querySelector("#account-email");
const accAppointments = document.querySelector(".appointments");

// Загрузка имени и email на личную страницу
function loadAccount() {
  accName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
  accEmail.textContent = activeAcc.email;
}

// console.log(activeAcc[0].firstName);

loadAccount();

// Загрузка записей на прием в таблицу на личной странице
function loadAppointments() {
  getAppointments(activeAcc.id_clients).then((appointments) => {
    // Если записей больше одной, сортируем записи по дате
    appointments.length > 1 &&
      appointments.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Получаем список всех категорий услуг из БД
    getServicesCategories().then((serviceCategories) => {
      for (appointment of appointments) {
        // Для каждой записи создаем строку таблицы
        const newAppointment = document.createElement("tr");
        newAppointment.classList.add("appointments__item");

        // Находим название услуги по id
        const caterogyName = serviceCategories.find(
          (el) => el.id_service_category === appointment.service_category_id
        ).service_category;

        newAppointment.innerHTML = `
        <td>${new Date(appointment.date).toLocaleDateString("ru-RB")}</td>
        <td>${appointment.time.slice(0, 5)}</td>
        <td>${caterogyName}</td>`;

        // Добавляем строку в таблицу
        accAppointments.appendChild(newAppointment);
      }
    });
  });
}

loadAppointments();

function findCategoryName(id) {
  getServicesCategories().then((serviceCategories) => {
    const caterogyName = serviceCategories.find(
      (el) => el.id_service_category === id
    ).service_category;
    console.log(caterogyName);
    return caterogyName;
  });
}

// Кнопка выхода из аккаунта
document
  .querySelector(".account-section__btn")
  .addEventListener("click", toLogeOut);

// Функция выхода из аккаунта
function toLogeOut() {
  const obj = JSON.stringify({});
  localStorage.setItem("isLoggedIn", false);
  localStorage.setItem("activeAcc", obj);
  accountNav.classList.add("hide");
  signupBtn.classList.remove("hide");
  loginBtn.classList.remove("hide");

  location.replace("../index.html");
}

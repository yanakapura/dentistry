const accName = document.querySelector("#account-name");
const accEmail = document.querySelector("#account-email");
const accAppointments = document.querySelector(".appointments");

// Загрузка имени и email на личную страницу
function loadAccount() {
  accName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
  accEmail.textContent = activeAcc.email;
}

loadAccount();

// Загрузка записей на прием в таблицу на личной странице
function loadAppointments() {
  // Сортируем записи по дате
  activeAcc.appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
  // Для каждой записи создаем строку таблицы
  for (appointment of activeAcc.appointments) {
    const newAppointment = document.createElement("tr");
    newAppointment.classList.add("appointments__item");
    newAppointment.innerHTML = `
    <td>${new Date(appointment.date).toLocaleDateString("ru-RB")}</td>
    <td>${appointment.time}</td>
    <td>${appointment.service}</td>`;
    // Добавляем строку в таблицу
    accAppointments.appendChild(newAppointment);
  }
}

loadAppointments();

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
}

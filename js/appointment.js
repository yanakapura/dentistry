const appointmentSection = document.getElementById("appointment")
const btnAppointment = document.querySelector(".section-appointment__button");
const appointmentName = document.querySelector("#appointment-name");
const appointmentEmail = document.querySelector("#appointment-email");
const appointmentTextAria = document.querySelector("#appointment-text");
// Все инпуты формы записи
const appointmentInputs = appointmentSection.getElementsByTagName("input");

const appointmentsArr = [];

// Кнопка записи
btnAppointment.addEventListener("click", (e) => {
  e.preventDefault();
  if (loggedIn) { //   Если выполнен вход в аккаунт, создается запись
    const appointmentObj = {};
    // Получаем данные из формы записи и присваиваем из пустому объекту
    appointmentObj.phoneNumber = document.querySelector(
      "#appointment-number"
    ).value;
    appointmentObj.date = document.querySelector("#appointment-date").value;
    appointmentObj.time = document.querySelector("#appointment-time").value;
    appointmentObj.message = appointmentTextAria.value;
    // Get value from select
    const select = document.getElementById("appointment-service");
    appointmentObj.service = select.options[select.selectedIndex].value;

    // Проверяем, есть ли в базе данные о записи и, если нет, создаем пустой масссив
    activeAcc.appointments
      ? activeAcc.appointments
      : (activeAcc.appointments = []);
    // Добавляем полученные данные о записи в обект active account и перезаписываем его в localeStorage
    activeAcc.appointments.push(appointmentObj);
    localStorage.setItem("activeAcc", JSON.stringify(activeAcc));
    // Находим в общей базе клиентов клиента, в аккаунт которого выполнен вход
    const clientIndex = data.findIndex(
      (el) =>
        el.firstName === activeAcc.firstName &&
        el.lastName === activeAcc.lastName &&
        el.password === activeAcc.password
    );
    // Обновляем данные активного клиента в общей базе
    data[clientIndex] = activeAcc;
    localStorage.setItem("data", JSON.stringify(data));

    alert("Запись добавлена!")

    // Очищаем форму записи
    clearAppoinmentForm()
  } else { //   Если не выполнен вход в аккаунт, открывается форма входа
    openLogin();
  }
});

// Функция очистки формы записи
function clearAppoinmentForm() {
    for (input of appointmentInputs) {
        input.value = ""
    }
    appointmentTextAria.value = ""
}

// Загружаем имя и email пользователя в форму записи
function loadAppointment() {
  appointmentName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
  appointmentEmail.textContent = activeAcc.email;
}
loadAppointment();

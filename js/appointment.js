const appointmentSection = document.getElementById("appointment");
const btnAppointment = document.querySelector(".section-appointment__button");
const appointmentName = document.querySelector("#appointment-name");
const appointmentEmail = document.querySelector("#appointment-email");
const appointmentTextAria = document.querySelector("#appointment-text");
const appointmentTextAriaError = document.querySelector(
  ".appointment__textaria-error"
);
const appointmentSelect = document.getElementById("appointment-service");
const appointmentSelectError = document.querySelector(
  ".appointment__service-error"
);
// Все инпуты формы записи
const appointmentInputs = appointmentSection.getElementsByTagName("input");
const appointmentLabelsError =
  appointmentSection.getElementsByClassName("error");

const appointmentsArr = [];

// Кнопка записи
btnAppointment.addEventListener("click", (e) => {
  e.preventDefault();
  validationAppointment();
  if (loggedIn) {
    //   Если выполнен вход в аккаунт, создается запись
    if (valid) {
      const appointmentObj = {};
      // Получаем данные из формы записи и присваиваем из пустому объекту
      appointmentObj.phoneNumber = document.querySelector(
        "#appointment-number"
      ).value;
      appointmentObj.date = document.querySelector("#appointment-date").value;
      appointmentObj.time = document.querySelector("#appointment-time").value;
      appointmentObj.message = appointmentTextAria.value;
      // Get value from select
      appointmentObj.service =
        appointmentSelect.options[appointmentSelect.selectedIndex].dataset.id;
      appointmentObj.id = activeAcc.id_clients;

      // Отправляем данные о записи на прием в базу данных
      makeAppointment(appointmentObj);

      // Проверяем, есть ли в базе данные о записи и, если нет, создаем пустой масссив
      activeAcc.appointments
        ? activeAcc.appointments
        : (activeAcc.appointments = []);
      // Добавляем полученные данные о записи в обект active account и перезаписываем его в localeStorage
      activeAcc.appointments.push(appointmentObj);
      localStorage.setItem("activeAcc", JSON.stringify(activeAcc));

      alert("Запись добавлена!");

      // Очищаем форму записи
      clearAppoinmentForm();
    }
  } else {
    //   Если не выполнен вход в аккаунт, открывается форма входа
    openLogin();
  }
});

// Функция валидации формы записи
function validationAppointment() {
  for (let i = 0; i < appointmentInputs.length; i++) {
    validation(appointmentInputs[i], appointmentLabelsError[i]);
  }
  validation(appointmentSelect, appointmentSelectError);
}

// Функция очистки формы записи
function clearAppoinmentForm() {
  for (input of appointmentInputs) {
    input.value = "";
  }
  appointmentTextAria.value = "";
  appointmentSelect.value = "disabled";
}

// Загружаем имя и email пользователя в форму записи
function loadAppointment() {

    if (activeAcc && Object.keys(activeAcc).length) {
      appointmentName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
      appointmentEmail.textContent = activeAcc.email;
    } else {
      appointmentName.textContent = "(зарегистрируйтесь или войдите в аккаунт)";
      appointmentEmail.textContent = "(зарегистрируйтесь или войдите в аккаунт)";
    }

  getServicesCategories().then((serviceCategories) => {
    for (service of serviceCategories) {
      const newOption = document.createElement("option");
      newOption.value = service.service_category;
      newOption.textContent = service.service_category;
      newOption.dataset.id = service.id_service_category;
      appointmentSelect.appendChild(newOption);
    }
  });
}
loadAppointment();

const appointmentSection = document.getElementById("appointment");
const btnAppointment = document.querySelector(".section-appointment__button");
const appointmentName = document.querySelector("#appointment-name");
const appointmentEmail = document.querySelector("#appointment-email");
const appointmentTextAria = document.querySelector("#appointment-text");
const appointmentTextAriaError = document.querySelector(
  ".appointment__textaria-error"
);
const appointmentTime = document.querySelector("#appointment-time");
const appointmentTimeErrorLabel = document.querySelector(
  "#span-error-appointment-time"
);
const appointmentDate = document.querySelector("#appointment-date");
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
      getPersonal().then((personal) => {
        const appointmentObj = {};
        const max = personal.length;
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

        appointmentObj.doctor = Math.round(Math.random() * (max - 1) + 1);

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
      });
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
  validationAppointmentTime();
}

// Валидация на длинну пароля
function validationAppointmentTime() {
  getAppointments(activeAcc.id_clients).then((appointments) => {
    const dateStr = appointmentDate.value + "T" + appointmentTime.value;
    const inputedDate = new Date(dateStr);

    for (appointment of appointments) {
      // Создаем дату окончания приема
      let hoursEnd = +appointment.time.slice(0, 2);
      hoursEnd = hoursEnd === 24 ? "00" : ++hoursEnd;
      const appTimeEnd = hoursEnd + appointment.time.slice(2);
      const appDateEndStr = appointment.date.slice(0, 11) + appTimeEnd;
      const appDateEnd = new Date(appDateEndStr);
      // Создаем дату до начала приема
      let hoursStart = +appointment.time.slice(0, 2);
      hoursStart = hoursStart === 0 ? 24 : --hoursStart;
      const appTimeStart = hoursStart + appointment.time.slice(2);
      const appDateStartStr = appointment.date.slice(0, 11) + appTimeStart;
      const appDateStart = new Date(appDateStartStr);

      if (inputedDate > appDateStart && inputedDate < appDateEnd) {
        appointmentTime.classList.add("input-error");
        appointmentTimeErrorLabel.classList.remove("hide");
        appointmentTimeErrorLabel.textContent =
          "У вас уже есть запись на это время";
        valid = false;
      } else {
        valid = true;
      }
    }
  });
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

  getServices().then((services) => {
    for (service of services) {
      const newOption = document.createElement("option");
      newOption.value = service.service;
      newOption.textContent = service.service;
      newOption.dataset.id = service.id_service;
      appointmentSelect.appendChild(newOption);
    }
  });
  // getServicesCategories().then((serviceCategories) => {
  //   for (service of serviceCategories) {
  //     const newOption = document.createElement("option");
  //     newOption.value = service.service_category;
  //     newOption.textContent = service.service_category;
  //     newOption.dataset.id = service.id_service_category;
  //     appointmentSelect.appendChild(newOption);
  //   }
  // });
}
loadAppointment();

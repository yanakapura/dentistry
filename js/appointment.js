const appointmentSection = document.getElementById("appointment");
const btnAppointment = document.querySelector(".section-appointment__button");
const appointmentName = document.querySelector("#appointment-name");
const appointmentEmail = document.querySelector("#appointment-email");
const appointmentTextAria = document.querySelector("#appointment-text");
const appointmentTextAriaError = document.querySelector(".appointment__textaria-error")
const appointmentSelect = document.getElementById("appointment-service");
const appointmentSelectError = document.querySelector(".appointment__service-error")
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
      appointmentObj.service = appointmentSelect.options[appointmentSelect.selectedIndex].value;

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
    validationApp(appointmentInputs[i], appointmentLabelsError[i]);
    
  }
    validationApp(appointmentSelect, appointmentSelectError)
}

function validationApp (input, label) {
    if (!input.value) {
        input.classList.add("input-error");
        label.textContent = "Заполните поле";
        valid = false;
      } else {
        input.classList.remove("input-error");
        label.classList.add("hide");
      }
}

// Функция очистки формы записи
function clearAppoinmentForm() {
  for (input of appointmentInputs) {
    input.value = "";
  }
  appointmentTextAria.value = "";
}

// Загружаем имя и email пользователя в форму записи
function loadAppointment() {
  appointmentName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
  appointmentEmail.textContent = activeAcc.email;
}
loadAppointment();

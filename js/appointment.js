const btnAppointment = document.querySelector(".section-appointment__button");
const appointmentName = document.querySelector("#appointment-name");
const appointmentEmail = document.querySelector("#appointment-email");
const appointmentInputs = document.getElementsByTagName("input");
const appointmentTextAria = document.querySelector("#appointment-text")

const appointmentsArr = [];

btnAppointment.addEventListener("click", (e) => {
  e.preventDefault();
  if (loggedIn) {
    const appointmentObj = {};
    appointmentObj.phoneNumber = document.querySelector(
      "#appointment-number"
    ).value;
    appointmentObj.date = document.querySelector("#appointment-date").value;
    appointmentObj.time = document.querySelector("#appointment-time").value;
    // Get value from select
    const select = document.getElementById("appointment-service");
    appointmentObj.service = select.options[select.selectedIndex].value;

    appointmentObj.message = appointmentTextAria.value;

    !activeAcc.appointments
      ? (activeAcc.appointments = [])
      : activeAcc.appointments;
    activeAcc.appointments.push(appointmentObj);

    localStorage.setItem("activeAcc", JSON.stringify(activeAcc));
    const clientIndex = data.findIndex(
      (el) =>
        el.firstName === activeAcc.firstName &&
        el.lastName === activeAcc.lastName &&
        el.password === activeAcc.password
    );
    data[clientIndex] = activeAcc;
    localStorage.setItem("data", JSON.stringify(data));

    alert("Запись добавлена!")

    clearAppoinmentForm()
  } else {
    openLogin();
  }
});

console.log(appointmentInputs);
function clearAppoinmentForm() {
    console.log('to clear');
    for (input of appointmentInputs) {
        console.log(input);
        input.value = ""
    }
    appointmentTextAria.value = ""
}

function loadAppointment() {
  appointmentName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
  appointmentEmail.textContent = activeAcc.email;
}

loadAppointment();

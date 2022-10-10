const btnAppointment = document.querySelector(".section-appointment__button");
const appointmentName = document.querySelector("#appointment-name");
const appointmentEmail = document.querySelector("#appointment-email");
const appointmentInputs = document.querySelector("input");
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

    // appointmentsArr.push(appointmentObj)
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

    clearAppoinmentForm()
  } else {
    openLogin();
  }
});

function clearAppoinmentForm() {
    for (input of appointmentInputs) {
        input.value = ""
    }
    appointmentTextAria.value = ""
}

function loadAppointment() {
  appointmentName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
  appointmentEmail.textContent = activeAcc.email;
}

loadAppointment();

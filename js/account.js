const accName = document.querySelector("#account-name");
const accEmail = document.querySelector("#account-email");
const accAppointments = document.querySelector(".appointments");

function loadAccount() {
  accName.textContent = `${activeAcc.firstName} ${activeAcc.lastName}`;
  accEmail.textContent = activeAcc.email;
}

loadAccount();

function loadAppointments() {
  for (appointment of activeAcc.appointments) {
    const newAppointment = document.createElement("tr");
    newAppointment.classList.add("appointments__item");
    newAppointment.innerHTML = `
    <td>${new Date(appointment.date).toLocaleDateString("ru-RB")}</td>
    <td>${appointment.time}</td>
    <td>${appointment.service}</td>`;
    accAppointments.appendChild(newAppointment);
  }
}

loadAppointments();

document
  .querySelector(".account-section__btn")
  .addEventListener("click", toLogeOut);

function toLogeOut() {
  const obj = JSON.stringify({});
  localStorage.setItem("isLoggedIn", false);
  localStorage.setItem("activeAcc", obj);
  accountNav.classList.add("hide");
  signupBtn.classList.remove("hide");
  loginBtn.classList.remove("hide");
}

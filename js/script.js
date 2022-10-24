<<<<<<< Updated upstream
const servicesCategoriesTemp = [
  "Консультация стоматолога",
  "Эстетическая стоматология",
  "Терапевтическая стоматология",
  "Детская стоматология",
];
=======
//сlient
// При загрузке страницы подключаемся к серверу
// document.addEventListener("DOMContentLoaded", getClients);
// setInterval(() => {
// }, 5000);
const loading = document.querySelector(".loading");

function connect() {
  fetch("http://localhost:5002/connect")
    .then((data) => data.json())
    .then((data) => {
      if (data === "connected") {
        loading.classList.add("hide");
      }
    })
    .catch((err) => {
      loading.classList.remove("hide");
    });
}

connect();
setInterval(() => {
  connect();
}, 5000);

// Отправляем серверу запрос на поиск клиента в БД
async function getClient(client) {
  const url = new URL("http://localhost:5002/getClient");
  url.searchParams.append("firstName", client.firstName);
  url.searchParams.append("lastName", client.lastName);
  url.searchParams.append("password", client.password);

  let response = await fetch(url);
  let { data } = await response.json();
  console.log(data);

  return data;
}

// Отправляем данные о новой записи на сервер
async function makeAppointment(data) {
  fetch("http://localhost:5002/appointment", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Отправляем данные о новом комментарии на сервер
async function addCommentBD(data) {
  fetch("http://localhost:5002/comment", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Получаем данные с сервера из таблицы appointments
async function getAppointments(id) {
  const url = new URL("http://localhost:5002/getAppointments");
  url.searchParams.append("id", id);
  let response = await fetch(url);
  let { data } = await response.json();
  return data;
}
>>>>>>> Stashed changes

let servicesCategories = JSON.parse(
  localStorage.getItem("services-categories")
);

if (!servicesCategories) {
  servicesCategories = servicesCategoriesTemp;
  localStorage.setItem(
    "services-categories",
    JSON.stringify(servicesCategories)
  );
}

//сlient
// При загрузке страницы подключаемся к серверу
document.addEventListener("DOMContentLoaded", getAll);

// Получаем данные с сервера (из таблиц MySQL)
function getAll() {
  fetch("http://localhost:5002/getAll")
    .then((response) => response.json())
    // .then((data) => console.log(data["data"]));
    .then((data) => getInfo(data["data"]));
  console.log("Клиент подключился к серверу !");
}

// Обрабатываем и приводим в нужный вид полученные данные с сервера
function getInfo(data) {
  let getName = data;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].LastName);
  }
  // console.log(getName);
  console.log(data);
}

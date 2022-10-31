const loading = document.querySelector(".loading")

// function connect() {
//   fetch("http://localhost:5002/connect")
//     .then((data) => data.json())
//     .then((data) => {
//       if (data === 'connected') {
//         loading.classList.add("hide")
//       }
//     })
//     .catch((err) => {
//       loading.classList.remove("hide")
//     });
// }

// connect()
// setInterval(() => {
//   connect()
// }, 5000);

// loading.classList.remove("hide")

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

// Получаем данные с сервера из таблицы services
async function getServicesCategories() {
  let response = await fetch("http://localhost:5002/getServicesCategories");
  let { data } = await response.json();
  return data;
}

// Получаем данные с сервера из таблицы personal
async function getPersonal() {
  let response = await fetch("http://localhost:5002/getPersonal");
  let { data } = await response.json();
  return data;
}

// Получаем данные с сервера из таблицы comments
async function getComments() {
  let response = await fetch("http://localhost:5002/getComments");
  let { data } = await response.json();
  return data;
}

// Получаем данные с сервера из таблицы clients
async function getClients() {
  let response = await fetch("http://localhost:5002/getClients");
  let { data } = await response.json();
  return data;
}

// Получаем данные с сервера из таблицы services
async function getServices() {
  let response = await fetch("http://localhost:5002/getServices");
  let { data } = await response.json();
  return data;
}

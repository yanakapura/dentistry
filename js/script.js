const servicesCategoriesTemp = [
  "Консультация стоматолога",
  "Эстетическая стоматология",
  "Терапевтическая стоматология",
  "Детская стоматология",
];

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

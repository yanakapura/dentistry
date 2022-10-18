// Весь сервер
const mysql = require("mysql");
const cors = require("cors");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

// Подключаем файл с базой данных
const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Принимаем данные от клиента
app.post("/insert", (request, response) => {
  console.log(request.body);
  const client = request.body;
  // console.log(client.firstName);
  const firstName = client.firstName;
  const lastName = client.lastName;
  const password = client.password;
  const email = client.email;

  const db = dbService.getDbServiceInstance();
  const result = db.insertNewRow(lastName, firstName, password, email);

  result
    .then((data) => response.json({ success: true }))
    .catch((err) => console.log(err));
});

// Отправляем данные из базы данных клиенту
app.get("/getAll", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getAllData();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
  // response.json(dbService);
  // console.log(dbService);
});

// Оповещаем в консоле о запуске сервера
app.listen(process.env.PORT, () => console.log("Сервер работает !"));

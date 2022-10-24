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

<<<<<<< Updated upstream
// Принимаем данные от клиента
app.post("/insert", (request, response) => {
  console.log(request.body);
=======
// Оповещаем в консоле о запуске сервера
app.listen(process.env.PORT, () => console.log("Сервер работает !"));
// app.listen(process.env.PORT, notifyClient);

app.get("/connect", (request, response) => {
  response.json("connected");
});

// Принимаем данные для регистрации от клиента
app.post("/registration", (request, response) => {
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// Отправляем данные из базы данных клиенту
app.get("/getAll", (request, response) => {
=======
// Принимаем данные о записи на прием от клиента
app.post("/comment", (request, response) => {
  const comment = request.body;
  const clientId = comment.name;
  const serviceCategory = comment.service;
  const dentistId = comment.doctor;
  const text = comment.text;
  const date = comment.date;
  const id = comment.id;

  const db = dbService.getDbServiceInstance();
  const result = db.insertNewComment(
    id,
    clientId,
    serviceCategory,
    dentistId,
    text,
    date
  );

  result
    .then((data) => response.json({ success: true }))
    .catch((err) => console.log(err));
});

// Отправляем данные о записях из базы данных клиенту
app.get("/getAppointments", (request, response) => {
  const id = request.query.id;

  const db = dbService.getDbServiceInstance();

  const result = db.getAppointments(id);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Отправляем клиенту данные о категриях услуг
app.get("/getServicesCategories", (request, response) => {
>>>>>>> Stashed changes
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

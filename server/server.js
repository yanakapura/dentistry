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

// Оповещаем в консоле о запуске сервера
app.listen(process.env.PORT, () => console.log("Сервер работает !"));
// app.listen(process.env.PORT, notifyClient);

app.get("/connect", (request, response) => {
  response.json("connected")
});

// Принимаем данные для регистрации от клиента
app.post("/registration", (request, response) => {
  const client = request.body;
  const firstName = client.firstName;
  const lastName = client.lastName;
  const password = client.password;
  const email = client.email;

  const db = dbService.getDbServiceInstance();
  const result = db.insertNewRowIntoClients(
    firstName,
    lastName,
    password,
    email
  );

  result
    .then((data) => response.json({ success: true }))
    .catch((err) => console.log(err));
});

// Находим клиента по логину и паролю в БД и отправляем клиенту
app.get("/getClient", (request, response) => {
  console.log(request.query);
  const firstName = request.query.firstName;
  const lastName = request.query.lastName;
  const password = request.query.password;

  const db = dbService.getDbServiceInstance();
  const result = db.findClient(firstName, lastName, password);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Принимаем данные о записи на прием от клиента
app.post("/appointment", (request, response) => {
  const appointment = request.body;
  const phoneNumber = appointment.phoneNumber;
  const date = appointment.date;
  const time = appointment.time;
  const message = appointment.message;
  const service = appointment.service;
  const id = appointment.id;
  const doctor = appointment.doctor;

  console.log(id,
    phoneNumber,
    date,
    time,
    message,
    service,
    doctor);

  const db = dbService.getDbServiceInstance();
  const result = db.insertNewAppointment(
    id,
    phoneNumber,
    date,
    time,
    message,
    service,
    doctor
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

// Принимаем данные о записи на прием от клиента
app.post("/comment", (request, response) => {
  const comment = request.body;
  const clientId = comment.name;
  const serviceCategory = comment.service;
  const dentistId = comment.doctor;
  const text = comment.text;
  const date = comment.date;

  const db = dbService.getDbServiceInstance();
  const result = db.insertNewComment(
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

// Отправляем клиенту данные о категриях услуг
app.get("/getServicesCategories", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getServicesCategories();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Отправляем клиенту данные о врачах
app.get("/getPersonal", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getPersonal();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Отправляем клиенту данные о комментариях
app.get("/getComments", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getComments();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Отправляем клиенту данные о клиентах
app.get("/getClients", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getClients();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Отправляем клиенту данные об услугах
app.get("/getServices", (request, response) => {
  const db = dbService.getDbServiceInstance();

  const result = db.getServices();

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Вся база данных

// Подключение всех используемых компонентов
const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

// Создаем соединение с базой данных MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "dentistry",
  password: "student",
});

// Проверяем соединения с MySQL
connection.connect((err) => {
  if (err) {
    return console.log("Error: " + err.message);
  } else {
    console.log("db" + connection.state);
  }
});

// Выбираем из таблицы
connection.query(`select * from dentistry.clients`, (err, res) => {
  for (let i = 0; i < res.length; i++) {
    let newRes = res[i];
    return console.log(newRes);
  }
});

// Главный класс для работы с базой данных
class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  // Полученне сервером данные добавляем в соответствующие таблицы в MySQL
  async insertNewRowIntoClients(firstName, lastName, password, email) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO dentistry.clients (firstName, lastName, password, email) VALUES (?,?,?,?);";
        connection.query(
          query,
          [firstName, lastName, password, email],
          (err, result) => {
            if (err) reject(new Error(err.message));
            else resolve(result.insertId);
          }
        );
      });
      //   return response;
    } catch (error) {
      console.log(error);
    }
  }

  // Полученне сервером данные добавляем в соответствующие таблицы в MySQL
  async insertNewAppointment(id, phoneNumber, date, time, message, service) {
    try {
      const newAppointment = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO dentistry.appointments (client_id, phone_number, date, time, service_category_id, message) VALUES (?,?,?,?,?,?);";
        connection.query(
          query,
          [id, phoneNumber, date, time, service, message],
          (err, result) => {
            if (err) reject(new Error(err.message));
            else resolve(result.newAppointment);
          }
        );
      });
      //   return response;
    } catch (error) {
      console.log(error);
    }
  }

  async findClient(firstName, lastName, password) {
    console.log(firstName, lastName, password);
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * from dentistry.clients WHERE firstName = "${firstName}" AND lastName = "${lastName}" AND password = "${password}" `;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          else {
            console.log(result);
            resolve(result);
          }
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // Получение данных из таблицы appointment
  async getAppointments(id) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM dentistry.appointments WHERE client_id = "${id}"`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        });
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // Получение данных из таблицы clients
  async getServicesCategories() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM dentistry.service_categories`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        });
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;

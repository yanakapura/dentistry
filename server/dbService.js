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
<<<<<<< Updated upstream
  database: "sys",
  password: "Taximoto_12345678",
=======
  database: "dentistry",
  password: "Taximoto_12345678",
  //password: "student",
>>>>>>> Stashed changes
});

// Выбираем из таблицы
connection.query(`select * from sys.Persons`, (err, res) => {
  for (let i = 0; i < res.length; i++) {
    let newRes = res[i];
    return console.log(newRes);
  }
});

// Проверяем соединения с MySQL
connection.connect((err) => {
  if (err) {
    return console.log("Error: " + err.message);
  } else {
    console.log("db" + connection.state);
  }
});

// Главный класс для работы с базой данных
class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  // Получение данных из таблиц MySQL
  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `select * from sys.Persons`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      //   console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

<<<<<<< Updated upstream
  // Полученне сервером данные добавляем в соответствующие таблицы в MySQL
  async insertNewRow(firstName, lastName, password, email) {
=======
  // Полученые сервером данные добавляем в соответствующие таблицы в MySQL
  async insertNewAppointment(id, phoneNumber, date, time, message, service) {
>>>>>>> Stashed changes
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO sys.client (LastName, FirstName,passrword, Email) VALUES (?,?,?,?);";
        connection.query(
          query,
          [lastName, firstName, password, email],
          (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertId);
          }
        );
      });
      console.log(insertId);
      //   return response;
    } catch (error) {
      console.log(error);
    }
  }
<<<<<<< Updated upstream
=======

  // Полученые сервером данные добавляем в таблицу comments
  async insertNewComment(id, clientId, serviceCategory, dentistId, text, date) {
    try {
      const newComment = await new Promise((resolve, reject) => {
        const query =
          "INSERT INTO dentistry.comments (id_comments, client_id, service_category_id, dentist_id, comment, date) VALUES (?,?,?,?,?,?);";
        connection.query(
          query,
          [id, clientId, serviceCategory, dentistId, text, date],
          (err, result) => {
            if (err) reject(new Error(err.message));
            else resolve(result.newComment);
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

  // Получение данных из таблицы service_categories
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

  //Получение данных из таблицы personal
  async getPersonal() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM dentistry.personal`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //Получение данных из таблицы comments
  async getComments() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM dentistry.comments`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //Получение данных из таблицы clients
  async getClients() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM dentistry.clients`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //Получение данных из таблицы service
  async getServices() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = `SELECT * FROM dentistry.service`;
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          else resolve(result);
        });
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
>>>>>>> Stashed changes
}

module.exports = DbService;

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
  database: "sys",
  password: "Taximoto_12345678",
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

  // Полученне сервером данные добавляем в соответствующие таблицы в MySQL
  async insertNewRow(firstName, lastName, password, email) {
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
}

module.exports = DbService;

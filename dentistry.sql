-- MySQL Script generated by MySQL Workbench
-- Mon Oct 10 21:52:16 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema dentistry
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dentistry
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dentistry` DEFAULT CHARACTER SET utf8 ;
USE `dentistry` ;

-- -----------------------------------------------------
-- Table `dentistry`.`clients`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dentistry`.`clients` (
  `id_clients` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id_clients`),
  UNIQUE INDEX `id_clients_UNIQUE` (`id_clients` ASC) VISIBLE)
ENGINE = InnoDB;

INSERT INTO `dentistry`.`clients` (`id_clients`, `firstName`, `lastName`, `password`, `email`) VALUES ('1', 'Оксана', 'Орехова', '111111', 'orechova@gmail.com');
INSERT INTO `dentistry`.`clients` (`id_clients`, `firstName`, `lastName`, `password`, `email`) VALUES ('2', 'Егор', 'Власов', '123456', 'vlasov@mail.ru');
INSERT INTO `dentistry`.`clients` (`id_clients`, `firstName`, `lastName`, `password`, `email`) VALUES ('3', 'Иван', 'Павленко', 'qwertyclients', 'vlasov@mail.ru');

-- -----------------------------------------------------
-- Table `dentistry`.`service_categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dentistry`.`service_categories` (
  `id_service_category` INT NOT NULL AUTO_INCREMENT,
  `service_category` VARCHAR(45) NULL,
  PRIMARY KEY (`id_service_category`),
  UNIQUE INDEX `id_services_UNIQUE` (`id_service_category` ASC) VISIBLE)
ENGINE = InnoDB;

INSERT INTO `dentistry`.`service_categories` (`id_service_category`, `service_category`) VALUES ('1', 'Консультация стоматолога');
INSERT INTO `dentistry`.`service_categories` (`id_service_category`, `service_category`) VALUES ('2', 'Эстетическая стоматология');
INSERT INTO `dentistry`.`service_categories` (`id_service_category`, `service_category`) VALUES ('3', 'Терапевтическая стоматология');
INSERT INTO `dentistry`.`service_categories` (`id_service_category`, `service_category`) VALUES ('4', 'Детская стоматология');


-- -----------------------------------------------------
-- Table `dentistry`.`appointments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dentistry`.`appointments` (
  `id_appointments` INT NOT NULL AUTO_INCREMENT,
  `client_id` INT NULL,
  `phone_number` VARCHAR(45) NULL,
  `date` DATE NULL,
  `time` TIME NULL,
  `service_category_id` INT NULL,
  `message` TEXT(250) NULL,
  PRIMARY KEY (`id_appointments`),
  UNIQUE INDEX `id_appointments_UNIQUE` (`id_appointments` ASC) VISIBLE,
  INDEX `FK_first_name_idx` (`client_id` ASC) VISIBLE,
  INDEX `FK_service_category_idx` (`service_category_id` ASC) VISIBLE,
  CONSTRAINT `FK_first_name`
    FOREIGN KEY (`client_id`)
    REFERENCES `dentistry`.`clients` (`id_clients`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_service_category`
    FOREIGN KEY (`service_category_id`)
    REFERENCES `dentistry`.`service_categories` (`id_service_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `dentistry`.`appointments` (`id_appointments`, `client_id`, `phone_number`, `date`, `time`, `service_category_id`) VALUES ('1', '1', '+375(44)360-86-68', '2022-10-25', '19:00', '1');
INSERT INTO `dentistry`.`appointments` (`id_appointments`, `client_id`, `phone_number`, `date`, `time`, `service_category_id`) VALUES ('2', '2', '+375(44)960-63-90', '2022-06-03', '13:30', '3');
INSERT INTO `dentistry`.`appointments` (`id_appointments`, `client_id`, `phone_number`, `date`, `time`, `service_category_id`) VALUES ('3', '1', '+375(44)360-86-68', '2022-07-14', '12:15', '2');
INSERT INTO `dentistry`.`appointments` (`id_appointments`, `client_id`, `phone_number`, `date`, `time`, `service_category_id`) VALUES ('4', '1', '+375(44)360-86-68', '2022-08-08', '11:00', '1');
INSERT INTO `dentistry`.`appointments` (`id_appointments`, `client_id`, `phone_number`, `date`, `time`, `service_category_id`) VALUES ('5', '3', '+375(29)285-84-08', '2022-09-19', '15:00', '1');
INSERT INTO `dentistry`.`appointments` (`id_appointments`, `client_id`, `phone_number`, `date`, `time`, `service_category_id`) VALUES ('6', '3', '+375(29)285-84-08', '2022-09-21', '09:00', '4');
INSERT INTO `dentistry`.`appointments` (`id_appointments`, `client_id`, `phone_number`, `date`, `time`, `service_category_id`) VALUES ('7', '3', '+375(29)285-84-08', '2022-09-30', '16:30', '4');


-- -----------------------------------------------------
-- Table `dentistry`.`service`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dentistry`.`service` (
  `id_service` INT NOT NULL,
  `service_category_id` INT NULL,
  `service` TEXT(200) NULL,
  `price` VARCHAR(100) NULL,
  PRIMARY KEY (`id_service`),
  INDEX `FK_service_categoty_idx` (`service_category_id` ASC) VISIBLE,
  CONSTRAINT `FK_service_categoty`
    FOREIGN KEY (`service_category_id`)
    REFERENCES `dentistry`.`service_categories` (`id_service_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('1', '1', 'Консультация ортопеда', '25');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('2', '1', 'Консультация хирурга по 3D снимку', '26');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('3', '1', 'Консультация хирурга с панорамным снимком', '24.85');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('4', '1', 'Консультация терапевта', '25');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('5', '1', 'Консультация ортодонта', '30');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('6', '2', 'Винир керамический', 'от 550');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('7', '2', 'Офисное отбеливание зубов (2 челюсти)', '260');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('8', '2', 'Профессиональная гигиена всей полости рта ультразвук, шлифовка, полировка', '150');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('9', '2', 'Профессиональная гигиена всей полости рта Air Flow', '180');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('10', '2', 'Винир, эстетическая реставрация переднего зуба с пломбировкой', 'от 180');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('11', '3', 'Лечение кариеса - при разрушении до 1/3 коронки зуба', 'от 85');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('12', '3', 'Лечение кариеса - при разрушении до 1/2 коронки зуба', 'от 100');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('13', '3', 'Лечение кариеса - при разрушении более 1/2 коронки зуба', 'от 130');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('14', '3', 'Пульпит - 1-канал (временная пломба). Постоянная пломба после лечения', '100');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('15', '3', 'Пульпит - 2-канал (временная пломба). Постоянная пломба после лечения', '180');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('16', '3', 'Пульпит - 3-канал (временная пломба). Постоянная пломба после лечения', '250');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('17', '3', 'Периодонтит - 1-канал (временная пломба)', 'от 160');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('18', '3', 'Периодонтит - 2-канал (временная пломба)', 'от 270');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('19', '3', 'Периодонтит - 3-канал (временная пломба)', 'от 360');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('20', '3', 'Восстановление анатомической формы зуба пломбировочным материалом, со стоимостью пломбы (без стоимости лечения каналов)', 'от 180');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('21', '3', 'Восстановление зуба со штифтом, без стоимости пломбы', 'от 70');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('22', '4', 'Консультация хирурга для ребенка', '20');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('23', '4', 'Удаление молочного зуба', '40-45');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('24', '4', 'Детская профгигиена полости рта', '70');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('25', '4', 'Кариес молочного зуба', '60-85');
INSERT INTO `dentistry`.`service` (`id_service`, `service_category_id`, `service`, `price`) VALUES ('26', '4', 'Ортодонтическая пластинка для детей', 'от 355');


-- -----------------------------------------------------
-- Table `dentistry`.`personal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dentistry`.`personal` (
  `id_personal` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `position` VARCHAR(45) NULL,
  `work_experience` VARCHAR(45) NULL,
  `appointment_time` VARCHAR(45) NULL,
  `image` VARCHAR(100) NULL,
  PRIMARY KEY (`id_personal`),
  UNIQUE INDEX `id_personal_UNIQUE` (`id_personal` ASC) VISIBLE)
ENGINE = InnoDB;

INSERT INTO `dentistry`.`personal` (`id_personal`, `name`, `position`, `work_experience`, `appointment_time`, `image`) VALUES ('1', 'Стрелков Нестор Артёмович', 'Врач-стоматолог-терапевт', '20 лет', 'пн-пт 09:00-14:00', '../image/personal/img-1.jpg');
INSERT INTO `dentistry`.`personal` (`id_personal`, `name`, `position`, `work_experience`, `appointment_time`, `image`) VALUES ('2', 'Самойлов Филипп Борисович', 'Хирург-стоматолог-имплантолог', '15 лет', 'пн-пт 09:00-14:00', '../image/personal/img-2.jpg');
INSERT INTO `dentistry`.`personal` (`id_personal`, `name`, `position`, `work_experience`, `appointment_time`, `image`) VALUES ('3', 'Якушева Василиса Вадимовна', 'Врач-стоматолог-терапевт', '20 лет', 'пн-пт 15:00-20:00', '../image/personal/img-3.jpg');
INSERT INTO `dentistry`.`personal` (`id_personal`, `name`, `position`, `work_experience`, `appointment_time`, `image`) VALUES ('4', 'Кононова Марина Максимовна', 'Врач-стоматолог-терапевт', '10 лет', 'четные дни 09:00-14:00', '../image/personal/img-4.jpg');
INSERT INTO `dentistry`.`personal` (`id_personal`, `name`, `position`, `work_experience`, `appointment_time`, `image`) VALUES ('5', 'Шуфрич Фёдор Анатолиевич', 'Врач-стоматолог-ортопед', '8 лет', 'пн-пт 15:00-20:00', '../image/personal/img-5.jpg');
INSERT INTO `dentistry`.`personal` (`id_personal`, `name`, `position`, `work_experience`, `appointment_time`, `image`) VALUES ('6', 'Котовска Вероника Ярославовна', 'Врач стоматолог-ортодонт', '15 лет', 'нечетные дни 15:00-20:00', '../image/personal/img-6.jpg');


-- -----------------------------------------------------
-- Table `dentistry`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dentistry`.`comments` (
  `id_comments` INT NOT NULL,
  `client_id` INT NULL,
  `service_category_id` INT NULL,
  `dentist_id` INT NULL,
  `comment` TEXT(300) NULL,
  `date` DATE NULL,
  PRIMARY KEY (`id_comments`),
  INDEX `FK_client_id_idx` (`client_id` ASC) VISIBLE,
  INDEX `FK_services_category_idx` (`service_category_id` ASC) VISIBLE,
  INDEX `FK_dentist_id_idx` (`dentist_id` ASC) VISIBLE,
  CONSTRAINT `FK_client_id`
    FOREIGN KEY (`client_id`)
    REFERENCES `dentistry`.`clients` (`id_clients`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_services_category`
    FOREIGN KEY (`service_category_id`)
    REFERENCES `dentistry`.`service_categories` (`id_service_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_dentist_id`
    FOREIGN KEY (`dentist_id`)
    REFERENCES `dentistry`.`personal` (`id_personal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


INSERT INTO `dentistry`.`comments` (`id_comments`, `client_id`, `service_category_id`, `dentist_id`, `comment`, `date`) VALUES ('1', '1', '2', '5', 'Безмерно благодарна доктору Шуфррич Ф.А. за проведенную манипуляцию по удалению зуба. Всё было выполнено аккуратно, доктор был предельно вежлив и внимателен, ответил на все вопросы. После процедуры также никто никуда не спешил и не торопил - было вполне достаточно внимания и времени на то, чтобы прийти в себя даже с учётом того, что, из-за личного страха перед такими манипуляциями, после процедуры у меня сильно кружилась голова и потребовалось время, чтобы этот момент нивелировать.', '2022-07-14');
INSERT INTO `dentistry`.`comments` (`id_comments`, `client_id`, `service_category_id`, `dentist_id`, `comment`, `date`) VALUES ('2', '2', '3', '2', 'Спасибо за то, что я, наконец могу улыбаться открыто, не прикрывая свой рот рукой. Тяжело было решиться на имплантацию, но там где природа дала маху, прекрасно справились Ваши доктора!', '2022-06-05');
INSERT INTO `dentistry`.`comments` (`id_comments`, `client_id`, `service_category_id`, `dentist_id`, `comment`, `date`) VALUES ('3', '3', '4', '3', 'В первый раз пошёл на лечение каналов в еверестдент. Василиса Вадимовна заложила лекарство, жду следующий приём) Жду когда пройдёт анестезия ', '2022-09-19');
INSERT INTO `dentistry`.`comments` (`id_comments`, `client_id`, `service_category_id`, `dentist_id`, `comment`, `date`) VALUES ('4', '3', '4', '3', 'Как всегда всё профессионально и технично, спасибо, что поторопили и пригласили на осмотр, очень вовремя спасли зуб).', '2022-10-01');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

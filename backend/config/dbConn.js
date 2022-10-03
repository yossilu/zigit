const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'yossil'
  });

module.exports = db;


/*tables used -> 
  CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `email` varchar(45) NOT NULL,
    `password` varchar(255) DEFAULT NULL,
    `role` varchar(45) DEFAULT NULL,
    `refreshToken` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`,`email`)
  ) 
  
  CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(254) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `endDate` varchar(255) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`name`)
  )

  CREATE TABLE `comments` (
  `idcomments` int NOT NULL AUTO_INCREMENT,
  `text` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `projectRelated` varchar(255) NOT NULL,
  PRIMARY KEY (`idcomments`,`projectRelated`)
  )
  */

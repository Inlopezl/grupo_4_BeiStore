

DROP DATABASE IF EXISTS beistore_db;
CREATE DATABASE beistore_db;
USE beistore_db;

/*******************************************/

DROP TABLE IF EXISTS `types`;

CREATE TABLE `types` (
  `id` int(10) unsigned PRIMARY KEY AUTO_INCREMENT,
  `type` char(10));

INSERT INTO `types` VALUES (1,"user"),(2,"admin");

/*******************************************/

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  id int(10) unsigned PRIMARY KEY  AUTO_INCREMENT,
  firstName varchar(30) ,
  surname varchar(30)  ,
  avatar varchar(30)  ,
  email varchar(30)  UNIQUE,
  password varchar(30) ,
  type_id int(10) unsigned ,
  FOREIGN KEY(type_id) REFERENCES types(id)
);


INSERT INTO `users` VALUES (1,"Erik","Sucasaire","file","erik.sucasai@gmail.com","$2a$10$lAu5GehaOyu33xSpDXjON.nzVnwchoOZ3aDmXKxTe2BBlwqo.2qs2",2);

/*******************************************/

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(10) unsigned PRIMARY KEY  AUTO_INCREMENT,
  `category` char(30) );

INSERT INTO `categories` VALUES (1,"destacado"), (2, "accesorios"), (3, "perifericos");

/*******************************************/


DROP TABLE IF EXISTS `brands`;

CREATE TABLE `brands` (
  `id` int(10) unsigned PRIMARY KEY AUTO_INCREMENT,
  `brand` char(30)
);

INSERT INTO `brands` VALUES (1,"kingston"), (2, "ryzen"), (3, "intel");

/*******************************************/

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  id int(10) unsigned PRIMARY KEY AUTO_INCREMENT ,
  name varchar(255)  ,
  description varchar(255),
  off int(3) ,
  price int(255) ,
  brand_id int(10) unsigned,
  FOREIGN KEY(brand_id) REFERENCES brands (id)
);

INSERT INTO `products` VALUES (1,"Memoria RAM","Descriptio","9","2500",1);

/*******************************************/

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id` int(10) unsigned PRIMARY KEY AUTO_INCREMENT,
  `image` varchar(255),
  `product_id` int(10) unsigned,
  FOREIGN KEY(product_id) REFERENCES products(id)
);

INSERT INTO `images` VALUES (1,"product1626656332159.jpg", 1 );

/*******************************************/


DROP TABLE IF EXISTS `product_category`;

CREATE TABLE `product_category` (
  	`id` int(10) unsigned PRIMARY KEY AUTO_INCREMENT,
	category_id int(10) unsigned ,
  	product_id int(10) unsigned ,
  	FOREIGN KEY(category_id) REFERENCES categories(id),
	FOREIGN KEY(product_id) REFERENCES products(id)
);
INSERT INTO `product_category` VALUES ( 1, 1, 1 ), (2, 3, 1);



/*******************************************/
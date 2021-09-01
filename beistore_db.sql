DROP DATABASE IF EXISTS beistore_db;
CREATE DATABASE beistore_db;
USE beistore_db;

/*******************************************/

DROP TABLE IF EXISTS `types`;

CREATE TABLE `types` (
  `id` int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `type` char(10) NOT NULL
);

INSERT INTO `types` VALUES (1,"user"),(2,"admin");

/*******************************************/

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  id int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstName varchar(30)  NOT NULL,
  surname varchar(30)  NOT NULL,
  avatar varchar(30)  NOT NULL,
  email varchar(30)  UNIQUE NOT NULL,
  password varchar(30)  NOT NULL,
  type_id int(10) unsigned NOT NULL,
  FOREIGN KEY(type_id) REFERENCES types(id)
);

INSERT INTO `users` VALUES (1,"test","test2","file","mail",1234,1);

/*******************************************/

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `category` char(30) NOT NULL
);

INSERT INTO `categories` VALUES (1,"Si");

/*******************************************/

DROP TABLE IF EXISTS `brands`;

CREATE TABLE `brands` (
  `id` int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `brand` char(30) NOT NULL
);

INSERT INTO `brands` VALUES (1,"naik");

/*******************************************/

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  id int(10) unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  name varchar(255)  NOT NULL,
  description varchar(255)  NOT NULL,
  category varchar(255) NOT NULL,
  off int(3) NOT NULL,
  price int(10) NOT NULL,
  brand_id int(10) unsigned NOT NULL,
  category_id int(10) unsigned NOT NULL,
  FOREIGN KEY(brand_id) REFERENCES brands(id),
  FOREIGN KEY(category_id) REFERENCES categories(id)
);

INSERT INTO `products` VALUES ("1","test","test","test","99","100",1,1);

/*******************************************/

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id` int(10) unsigned PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `image` char(30) NOT NULL
);

INSERT INTO `images` VALUES (1,"img");

/*******************************************/

DROP TABLE IF EXISTS `product_images`;

CREATE TABLE `product_images` (
	image_id int(10) unsigned NOT NULL,
  	product_id int(10) unsigned NOT NULL,
  	FOREIGN KEY(image_id) REFERENCES images(id),
	FOREIGN KEY(product_id) REFERENCES products(id)
);

/*******************************************/

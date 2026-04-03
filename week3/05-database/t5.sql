DROP DATABASE IF EXISTS wskcats;
CREATE DATABASE wskcats;
USE wskcats;

DROP USER 't5'@'localhost';
CREATE USER 't5'@'localhost' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON wskcats.* TO 't5'@'localhost';
FLUSH PRIVILEGES;

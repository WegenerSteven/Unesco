CREATE DATABASE Unesco;
use Unesco;
SELECT *FROM unesco.Members;
ALTER USER 'WegenerSteven'@'localhost' IDENTIFIED WITH mysql_native_password BY '40300912';
show plugins;
USE UNESCO;
DESCRIBE MEMBERS;
ALTER TABLE members
ADD COLUMN email VARCHAR(255) NOT NULL
AFTER Second_Name;





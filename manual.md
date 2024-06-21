Dependencies
## 
### Initialize a new Node.js project.
```bash
npm init -y
```
### Install necessary dependencies.
```bash
npm install express mysql ejs bcryptjs express-session express-validator
```
## import the mysql file in database
## to run the project locally
```bash
node.js
```
## create a database
```bash
CREATE DATABASE Unesco;
use Unesco;
CREATE TABLE members (
    First_Name VARCHAR(255) NOT NULL,
    Last_Name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    REg_No INT PRIMARY KEY,
    Password VARCHAR(255) NOT NULL
);
```


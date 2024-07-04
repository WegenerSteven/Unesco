CREATE DATABASE unesco;

USE unesco;

CREATE TABLE members (
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    regno INT NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

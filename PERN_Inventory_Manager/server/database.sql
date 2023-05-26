CREATE DATABASE inventory;

CREATE TABLE users(
    userid SERIAL PRIMARY KEY,
    username VARCHAR(20) ,
    email VARCHAR(40) ,
    password VARCHAR(20)

);

CREATE TABLE product(
   productid BIGSERIAL PRIMARY KEY,
   userid INT ,
   name VARCHAR(20),
   price BIGINT,
   category VARCHAR(20),
   company VARCHAR(20) ,
   photo BYTEA
);

CREATE TABLE buyer(
    buyerid SERIAL PRIMARY KEY,
    userid INT,
    name VARCHAR(40),
    address VARCHAR(80),
    prodname VARCHAR(20),
    total VARCHAR(20),
    datetime  VARCHAR(100)
);

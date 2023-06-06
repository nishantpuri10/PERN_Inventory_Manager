CREATE DATABASE inventory2;

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
    bemail VARCHAR(40),
    address VARCHAR(80)
 
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES buyer(buyerid) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product(productid) ON DELETE CASCADE
);


-- CREATE TABLE cart (
--     cart_id SERIAL PRIMARY KEY,
--     buyer_id INTEGER REFERENCES buyer(buyerid),
--     product_id INTEGER REFERENCES product(productid)
-- );

-- ALTER TABLE cart
-- DROP CONSTRAINT cart_product_id_fkey,
-- ADD CONSTRAINT cart_product_id_fkey
-- FOREIGN KEY (product_id)
-- REFERENCES product(productid)
-- ON DELETE CASCADE;



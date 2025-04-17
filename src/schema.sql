CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    buyer_name VARCHAR(255) NOT NULL,
    buyer_contact VARCHAR(255) NOT NULL,
    delivery_address TEXT NOT NULL,
    items JSON NOT NULL,
    status VARCHAR(50) NOT NULL
);

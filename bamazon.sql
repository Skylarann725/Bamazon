CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
  item_id INTEGER(20) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price INTEGER(30),
  stock_quantity INTEGER(50),
  PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("111", "Pen", "Office Supplies", 5, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("112", "Paper", "Office Supplies", 10, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("113", "XBox", "Electronics", 20, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("114", "Television", "Electronics", 300, 50);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("115", "Sundress", "Clothing", 20, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("116", "Bathing Suit", "Cloting", 80, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("117", "Jeans", "Clothing", 50, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("118", "Hairspray", "Cosmetics", 10, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("119", "Eye Liner", "Cosmetics", 20, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("120", "Foundation", "Cosmetics", 20, 10);
-- SQLite
-- CREATE TABLE IF NOT EXISTS tables (
--         id INTEGER PRIMARY KEY AUTOINCREMENT,
--         name VARCHAR (50) NOT NULL,
--         capacity INTEGER,
--         description TEXT,
--         status BOOLEAN,
--         customers VARCHAR(20)
--         );

-- INSERT INTO tables(name, capacity, status)
-- VALUES ('Table 1', 5, true) ;

-- CREATE TABLE IF NOT EXISTS customers (
--         id INTEGER PRIMARY KEY AUTOINCREMENT,
--         name VARCHAR (50) NOT NULL,
--         size INTEGER,
--         tableId INTEGER,
--         status VARCHAR(50)
--         );

-- INSERT INTO customers(name, size, status)
-- VALUES ('David', 4, 'Waiting for table') ;

-- CREATE TABLE IF NOT EXISTS employees (
--         id INTEGER PRIMARY KEY AUTOINCREMENT,
--         name VARCHAR (50) NOT NULL,
--         roleCategory VARCHAR (50) NOT NULL,
--         role VARCHAR (50) NOT NULL,
--         salary INTEGER,
--         debutDeContrat VARCHAR (50) NOT NULL,
--         finDeContrat VARCHAR (50) NOT NULL,
--         comments TEXT
--         );

-- INSERT INTO employees(name, roleCategory, role, salary, debutDeContrat, finDeContrat)
-- VALUES ('Robert', 'In kitchen', 'Cooker', 5000, '10/12/2022', '10/12/2023') ;

-- CREATE TABLE IF NOT EXISTS stock (
--         id INTEGER PRIMARY KEY AUTOINCREMENT,
--         productName VARCHAR (50) NOT NULL,
--         category VARCHAR (50) NOT NULL,
--         supplier VARCHAR (50) NOT NULL,
--         productBrand VARCHAR (50) NOT NULL,
--         quantity INTEGER,
--         unity VARCHAR (50) NOT NULL,
--         minimalQuantity INTEGER
--         );

-- INSERT INTO stock(productName, category, supplier, productBrand, quantity, unity, minimalquantity)
-- VALUES ('Tomatoes', 'Vegetables', 'Tom', 'Tomatoes Garden', 25, 'kg', 20) ;

-- UPDATE stock SET category = 'Food'

-- DELETE FROM tables  WHERE capacity = ''

-- CREATE TABLE IF NOT EXISTS menu (
--         id INTEGER PRIMARY KEY AUTOINCREMENT,
--         name VARCHAR (50) NOT NULL,
--         category VARCHAR(50),
--         price INTEGER,
--         recipeId INTEGER
--         );

-- INSERT INTO menu(name, category, price)
-- VALUES ('Coca Cola', 'Drink', '8') ;

-- INSERT INTO stock(productName, category, supplier, productBrand, quantity, unity, minimalquantity)
-- VALUES ('Tuna', 'Food', 'Big Fish', 'CERES', 40, 'kg', 45) ;

-- UPDATE stock SET quantity = 40 WHERE productName = 'Tuna'

-- CREATE TABLE IF NOT EXISTS suppliers (
--         id INTEGER PRIMARY KEY AUTOINCREMENT,
--         name VARCHAR (50) NOT NULL,
--         tel VARCHAR (50) NOT NULL,
--         mail VARCHAR (50) NOT NULL,
--         category VARCHAR(50) NOT NULL,
--         product VARCHAR (50) NOT NULL,
--         priceByUnity INTEGER NOT NULL,
--         unity VARCHAR (50) NOT NULL,
--         deliveryTimeInDays INTEGER NOT NULL
--         );

-- INSERT INTO suppliers(name, tel, mail, category, product, priceByUnity, unity, deliveryTimeInDays)
-- VALUES ('Big Fish', '0587918017', 'bigfish@gmail.com', 'Meat and Fish', 'Tuna', 40, 'kg', 3) ;

-- DROP TABLE OrdersList

CREATE TABLE IF NOT EXISTS OrdersList (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerId INTEGER NOT NULL,
        category VARCHAR (50) NOT NULL,
        dishId INTEGER NOT NULL,
        amount INTEGER NOT NULL
        );

-- INSERT INTO OrdersList(customerId, dishId, amount)
-- VALUES (1, 3, 2) ;

-- DELETE FROM menu WHERE id = 6;

-- CREATE TABLE IF NOT EXISTS users (
--         id INTEGER PRIMARY KEY AUTOINCREMENT,
--         name VARCHAR (50) NOT NULL,
--         email VARCHAR (50) NOT NULL,
--         password VARCHAR (50) NOT NULL,
--         permission VARCHAR (50) NOT NULL
--         );

-- INSERT INTO users(name, email, password, permission)
-- VALUES ('David', 'davidc4489@gmail.com', 'david4489', 'Direction') ;

-- UPDATE users SET permission = 'Direction'

-- CREATE TABLE IF NOT EXISTS employees (
--         id INTEGER PRIMARY KEY AUTOINCREMENT,
--         name VARCHAR (50) NOT NULL,
--         jobCategory VARCHAR (50) NOT NULL,
--         job VARCHAR (50) NOT NULL,
--         status BOOLEAN NOT NULL,
--         salary INTEGER,
--         startOfContract VARCHAR (50) NOT NULL,
--         endOfContract VARCHAR (50) NOT NULL,
--         comments TEXT
--         );

-- INSERT INTO employees(name, jobCategory, job, status, salary, startOfContract, endOfContract)
-- VALUES ('Robert', 'Kitchen Worker', 'Cooker', true, 5000, '10/12/2022', '10/12/2023') ;

-- DELETE FROM ordersList WHERE id = 8;
SELECT menu.name, menu.category, (
        SELECT SUM (amount) FROM OrdersList WHERE dishId = menu.id) as amount
FROM menu

SELECT SUM (amount) FROM OrdersList 

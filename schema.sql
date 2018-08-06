-- creates database
CREATE DATABASE bamazon_db;

USE bamazon_db;

-- creates table with columns
CREATE TABLE products (
	--id INTEGER(11) AUTO_INCREMENT NOT NULL, (commented out bc vsc hates auto_increment)
	product VARCHAR(30) NOT NULL,
	department VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stockQuantity INTEGER(11) NOT NULL,
	PRIMARY KEY (id)
);

-- inserts items into table - it's skyrim themed!!!
INSERT INTO products (product, department, price, stockQuantity)
VALUES  ('Iron Dagger', 'Weapons', 10, 25),
('Amulet of Talos', 'Apparel', 50, 2),
('Ebody Ingot', 'Miscellaneous', 15, 27),
('Dwarven Gauntlets', 'Apparel', 375, 3),
('Flawless Amethyst', 'Miscellaneous', 95, 3),
('Nord Ale', 'Food', 10, 8),
('Elven Shield', 'Weapons', 498, 1),
('Ring of Minor Majicka', 'Apparel', 392, 1),
('Potion of Healing', 'Food', 47, 12),
('Sweet Roll', 'Food', 5, 18),
('Scroll of Raise Zombie', 'Magic', 400, 2),
('Daedric Armor', 'Apparel', 5081, 1),
('Steel Greatsword', 'Weapons', 470, 2),
('Hunting Bow', 'Weapons', 50, 7),
('Iron Arrow', 'Weapons', 10, 68),
('Skooma', 'Food', 15, 4),
('The Lusty Argonian Maid Vol. 1', 'Books', 50, 1),
('Lockpick', 'Miscellaneous', 6, 12);

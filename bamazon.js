var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root', 
	password: 'root',
	database: 'bamazon_db'
});

connection.connect(function (err) {
	if (err) {
		console.log('Uh oh, something is wrong!');
		throw err;
	}
});

// displays table with products from database and prompts user input
var bamazon = function() {

	connection.query("SELECT * FROM products", function(err, res) {

		// creates cute table thanks to cli-table
		var table = new Table({ 
			head: [
				"ID",
				"Product",
				"Department",
				"Price",
				"Quantity in Stock"
			]
		});

		// skyrim-style store feat. belethor's creepiest line!
		console.log("Welcome to Belethor's General Goods! Everything's for sale, my friend. Everything. If I had a sister, I'd sell her in a second.");

		// displays all items for sale
		console.log("Trinkets, odds and ends, that sort of thing:");

		for (var i= 0; i < res.length; i++) {
			table.push([
				res[i].id,
				res[i].product,
				res[i].department,
				res[i].price.toFixed(2),
				res[i].stockQuantity 
			])
		};

		// populates table with items 
		console.log(table.toString());
		
		// inquirer prompts for user to enter itemID & quantity
		inquirer.prompt([{
			name: "itemID",
			type: "input",
			message: "Enter the item ID of the item you would like to purchase",

			validate: function(value) {
				if (isNaN(value) == false) {
					return true;
				} else {
					return false;
				}
			}
		}, {
			name: "quantity",
			type: "input",
			message: "Enter the item amount you would like to puchase",

			validate: function(value) {
				if (isNaN(value) == false) {
					return true;
				} else {
					return false;
				}
			}
		}]).then(function(answer) {

			var userID = answer.itemID - 1
			var userProduct = res[userID]
			var userQuantity = answer.quantity

			if (userQuantity < res[userID].stockQuantity) {

				// calculates total from user input and returns price 
				console.log("The total for " + "(" + answer.quantity + ")" + " - " + res[userID].product + " is: " + res[userID].price.toFixed(2) * userQuantity + " septims");
				console.log("Do come back...");
			
				// updates database with new stock quantity
				connection.query("UPDATE products SET ? WHERE ?", [{

					stockQuantity: res[userID].stockQuantity - userQuantity
				}, {
					id: res[userID].id
				}], function(err, res) {
					console.log("///////////////////////////////////////////////////");
					bamazon();
				});
			} else {
				console.log("Insufficient quantity, please make another choice.");
				console.log("///////////////////////////////////////////////////");
				bamazon();
			}
		});
	})	
}

bamazon();
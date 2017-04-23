var mysql = require("mysql"); // for mysql package
var inquirer = require("inquirer"); // for inquirer package
var Table = require('cli-table'); // for table

// mysql connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "Bamazon"
});

// mysql connection id
connection.connect(function(err, res) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

var managerOptions = function() {
    inquirer.prompt([{
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    }]).then(function(answers) {
        switch (answers.options) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewInventory();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
        }
    });
}; // end of managerOptions function

var viewProducts = function() {
        // to display all of the products
        connection.query("SELECT * FROM products", function(err, res) {
                if (err) throw err;

                var table = new Table({
                    head: ["Item ID: ", "Product Name: ", "Price: ", "Department: ", "In Stock: "],
                    chars: {
                        'top': '═',
                        'top-mid': '╤',
                        'top-left': '╔',
                        'top-right': '╗',
                        'bottom': '═',
                        'bottom-mid': '╧',
                        'bottom-left': '╚',
                        'bottom-right': '╝',
                        'left': '║',
                        'left-mid': '╟',
                        'mid': '─',
                        'mid-mid': '┼',
                        'right': '║',
                        'right-mid': '╢',
                        'middle': '│'
                    }
                });
                for (i = 0; i < res.length; i++) {
                    table.push(
                        [res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]
                    );
                }
                console.log(table.toString());
            }); // end of query function
        }; // end of viewProducts function

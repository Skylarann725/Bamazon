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

// to display all of the products
connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    // to create the table in the terminal
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
    // for loop to display all of the products
    for (i = 0; i < res.length; i++) {
        table.push(
            [res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]
        );
    }
    // to console log the table
    console.log(table.toString());

    // calls the customerPurchase function
    customerPurchase();
});

var customerPurchase = function() {
  // questions for inquire prompt
    var questions = [{
        type: 'list',
        name: 'Item_Id',
        message: 'What is the ID of the product that you would like to buy?',
        choices: ['111', '112', '113', '114', '115', '116', '117', '118', '119', '120'],
    }, {
        type: 'input',
        name: 'Quantity',
        message: 'How many units of this product would you like to buy?',
    }];

    inquirer.prompt(questions).then(function(answers) {
        connection.query("SELECT * FROM `products` WHERE `item_id`=?", [answers.Item_Id], function(err, res) {
            if (err) throw err;
            // converts answers.Quantity from a string into an integer
            answers.Quantity = parseInt(answers.Quantity);
            // if statement to see if we have a certain product in stock
            if (res[0].stock_quantity < answers.Quantity) {
                console.log('I am sorry. We are currently out of that item. Please check back soon.');
                customerPurchase();
            } else {
                // new stock quantity variable = current stock quantity minus how many items the customer took
                var newQuantity = res[0].stock_quantity - answers.Quantity;
                // query to update the table with the new stock quantity
                connection.query("UPDATE `products` SET ? WHERE ?", [{
                    stock_quantity: newQuantity
                }, {
                    item_id: answers.Item_Id
                }]);

                // query to show the new table with the updated stock quantities
                connection.query("SELECT * FROM products", function(err, res) {
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
                    }) // end of query function
                // total for the client = price times client's quantity amount
                var total = res[0].price * answers.Quantity;
                // converts total to an integer
                var customerTotal = parseInt(total);
                console.log("Your total is: $" + customerTotal);
                console.log("Thank you! Come again soon!")
            } // end of else statement
            connection.end();
        }); // end of first query function
    }); // end of answers function
}; // end of customer purchase function

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
});


var managerOptions = function() {
	// question prompt
    inquirer.prompt([{
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
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
            case 'Exit':
                connection.end();
                break;
        }
    });
}; // end of managerOptions function
managerOptions(); // calls managerOptions function

var viewProducts = function() {
    // to display all of the products
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // code for table
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
        }); // end of new table

        // for loop to display products table
        for (i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        managerOptions();
    }); // end of query function
}; // end of viewProducts function

var viewInventory = function() {
	// if the quantity is less than 5, show only those products
    connection.query("SELECT * FROM `products` WHERE `stock_quantity` <=5", function(err, res) {
        if (err) throw err;

        // to show the table
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

        // for loop to list all of the products
        for (i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]
            );
        }
        console.log(table.toString());
        managerOptions();

    }); // end of query function
}; // end of viewInventory function

var addInventory = function() {
    // to display all of the products
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        // table to display all of the products
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
        // for loop to display all of the products in the table
        for (i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]
            );
        }
        // console log table to the terminal
        console.log(table.toString());
        // questions for inquirer prompt
        var questions = [{
            type: 'list',
            name: 'add',
            message: 'What is the ID of the product for which you would like to add inventory?',
            choices: ['111', '112', '113', '114', '115', '116', '117', '118', '119', '120'],
        }, {
            type: 'input',
            name: 'quantity',
            message: "How many units of this product would you like to add?",
        }];
        // inquirer prompt to ask questions in the terminal
        inquirer.prompt(questions).then(function(answers) {
        	// selects products by id
            connection.query('SELECT * FROM `products` WHERE item_id=?', [answers.add], function(err, res) {
                if (err) throw err;
                // converts client's answer from string to integer
                answers.quantity = parseInt(answers.quantity);
                // new quanitity = stock quantity plus client's answer to second prompt
                var newQuantity = res[0].stock_quantity + answers.quantity;
                // query to update the products table
                connection.query("UPDATE `products` SET ? WHERE ?", [{
                    stock_quantity: newQuantity
                }, {
                    item_id: answers.add
                }]);
                // shows all updated products in the table
                connection.query("SELECT * FROM products", function(err, res) {
                    // shows table
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
                    // for loop to display products table
                    for (i = 0; i < res.length; i++) {
                        table.push(
                            [res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]
                        );
                    }
                    console.log(table.toString());
                    managerOptions();
                }); // end of third query function
            }); // end of second query function
        }); // end of answers function
    }); // end of first query function
}; // end of addInventory function

var addProduct = function() {
	// questions for inquirer prompt
    var questions = [{
        type: 'input',
        name: 'name',
        message: 'What is the name of the product that you would like to add?',
    }, {
        type: 'input',
        name: 'department',
        message: 'Which department does your product belong to?',
    }, {
        type: 'input',
        name: 'price',
        message: 'How much does your product cost?',
    }, {
        type: 'input',
        name: 'quantity',
        message: 'How many units of the product would you like to add?',
    }];
    inquirer.prompt(questions).then(function(answers) {
    	// query to insert new products into the table
        connection.query('INSERT INTO `products` SET ?', {
            product_name: answers.name,
            department_name: answers.department,
            price: answers.price,
            stock_quantity: answers.quantity
        }, function(err, res) {
        	// query to show the products table
            connection.query('SELECT * FROM `products`', function(err, res) {
                if (err) throw err;
                // displays the new table
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
                }); // end of new table function
                // for loop to display products
                for (i = 0; i < res.length; i++) {
                    table.push(
                        [res[i].item_id, res[i].product_name, res[i].price, res[i].department_name, res[i].stock_quantity]
                    );
                }
                console.log(table.toString());
                managerOptions();
            }); // end of second query function
        }); // end of function
    }); // end of answers function
}; // end of addProduct function

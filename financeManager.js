const inquirer = require('inquirer');
const { Database } = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const chalk = require('chalk');

const adapter = new FileSync('db.json');
const db = new Database(adapter);

// Initialize DB with defaults if empty
db.defaults({ transactions: [] }).write();

async function addTransaction() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Transaction type:',
            choices: ['Income', 'Expense']
        },
        {
            type: 'input',
            name: 'amount',
            message: 'Amount:',
            validate: value => !isNaN(value) ? true : 'Please enter a number.'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description:'
        }
    ]);

    const transaction = {
        id: shortid.generate(),
        type: answers.type,
        amount: parseFloat(answers.amount),
        description: answers.description,
        date: new Date().toISOString()
    };

    db.get('transactions').push(transaction).write();
    console.log(chalk.green('Transaction added successfully.'));
}

function generateReport() {
    const transactions = db.get('transactions').value();
    // Implement your logic to display or analyze transactions
    console.log(chalk.yellow('Finance report generated.'));
    // Display the report
}

module.exports = { addTransaction, generateReport };

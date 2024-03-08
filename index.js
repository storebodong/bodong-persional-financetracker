const inquirer = require('inquirer');
const chalk = require('chalk');
const { addTransaction, generateReport } = require('./financeManager');

async function mainMenu() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'Add a transaction',
                'Generate finance report',
                'Exit'
            ]
        }
    ]);

    switch (answers.action) {
        case 'Add a transaction':
            await addTransaction();
            break;
        case 'Generate finance report':
            generateReport();
            break;
        case 'Exit':
            console.log(chalk.blue('Thank you for using Personal Finance Tracker CLI!'));
            process.exit();
    }
}

mainMenu();

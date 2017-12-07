const Promise = require('bluebird');
const chalk = require('chalk');
const childProcess = require('child_process');

/**
 * run command list
 *
 * @param  {Array}    list - command list
 * @return {Promise}
 */
const run = (list) => {
    return new Promise((resolve, reject) => {
        childProcess.exec(list.join(' && '), (err, stdout, stderr) => {
            console.log(chalk.green(`${stdout}`));
            console.log(chalk.yellow(`${stderr}`));

            if (err) {
                console.error(chalk.red(`exec error: ${err}`));
                reject(err);
            }
            resolve(`${stdout} \n ${stderr} \n`);
        });
    });
};

/**
 * run command list without error
 *
 * @param  {Array}    list - command list
 * @return {Promise}
 */
const runWithoutErrorInterrupt = (list) => {
    return new Promise((resolve) => {
        childProcess.exec(list.join(' && '), (err, stdout, stderr) => {
            console.log(chalk.green(`${stdout}`));
            console.log(chalk.yellow(`${stderr}`));
            if (err) {
                console.error(chalk.red(`exec error: ${err}`));
                resolve(err);
            }
            resolve(`${stdout} \n ${stderr}`);
        });
    });
};

module.exports = {
    run : run,
    runWithoutErrorInterrupt : runWithoutErrorInterrupt
};


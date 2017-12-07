'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { QuickPickItem } from 'vscode';
const open = require('open');
const paths = require('./path').default;


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "edu-module-module-doc" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    function action(type: number) {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user

        // vscode.window.showInformationMessage('Hello World!');

        function fail(reason) {
            // vscode.commands.executeCommand("setContext", "inProjectManagerList", false);
            vscode.window.showInformationMessage("Error open: ${reason}");
        }

        // promisses
        function succ(selected) {
            // vscode.commands.executeCommand("setContext", "inProjectManagerList", false);
            if (!selected) {
                return;
            }

            if(selected.label === 'edu-front-doc'){
                open('http://59.111.96.42');
                return;
            }

            if(type === 1){
                open(selected.description + '/blob/master/README.md');
            }else if(type ===2){
                open(selected.description + '/blob/master/CHANGELOG.md');
            }
        }

        let placeHolder = '';
        if(type === 1){
            placeHolder = 'Select project to check readme.md';
        }else if(type ===2){
            placeHolder = 'Select project to check changelog.md';
        }

        const options = < vscode.QuickPickOptions > {
            matchOnDescription: true,
            matchOnDetail: false,
            placeHolder: placeHolder
        };

        let items: Array < vscode.QuickPickItem > = [];
        paths.forEach(element => {
            items.push( < vscode.QuickPickItem > {
                description: element.path,
                label: element.name
            });
        });

        vscode.window.showQuickPick < vscode.QuickPickItem > (items, options).then(succ, fail);
    }

    let disposable1 = vscode.commands.registerCommand('extension.listProjectREADME', function(){
        action(1)
    });
    let disposable2 = vscode.commands.registerCommand('extension.listProjectCHANGELOG', function(){
        action(2)
    });
    context.subscriptions.push(disposable1);
    context.subscriptions.push(disposable2);

}

// this method is called when your extension is deactivated
export function deactivate() {}
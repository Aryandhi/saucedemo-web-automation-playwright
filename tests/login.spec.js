import {test} from '@playwright/test';
import * as fs from "fs/promises";

const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');

test.describe('Login Functionality', () => {
    test('Login with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        //process the test data from the json file
        const testData = await fs.readFile('./test-data/users.json', 'utf8');
        const parseData = JSON.parse(testData);

        for(const user of parseData.validUser){
            await loginPage.goto();
            await loginPage.login(user.username, user.password);
            await inventoryPage.validateTitle();
        }
    });

    test('Login with invalid credentials', async({page}) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.goto();

        // enter invalid username and password
        await loginPage.login('wrong_user', 'wrong_password');

        // verify that an error message is displayed
        await loginPage.validateErrorMessage('Epic sadface: Username and password do not match any user in this service');
        
    });

    test('Login with empty username', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        // leave username and password fields empty and click login
        await loginPage.login('', 'password');

        // verify that an error message 'username is required' is displayed
        await loginPage.validateErrorMessage('Epic sadface: Username is required');
    });

    test('Login with empty password', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        // leave password field empty and click login
        await loginPage.login('standard_user', '');

        //expect an error message 'password is required' to be displayed
        await loginPage.validateErrorMessage('Epic sadface: Password is required');
    });
});


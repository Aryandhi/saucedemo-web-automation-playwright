import {test} from '@playwright/test';
import {describe} from 'node:test';

const LoginPage = require('../pages/login.page');
const InventoryPage = require('../pages/inventory.page');
const CheckoutPage = require('../pages/checkout.page');

describe('Checkout', () => {
    test('checkout 1 product', async ({page}) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.validateTitle();

        await inventoryPage.clickAddToCartBtn();
        await inventoryPage.clickCartIcon();
        
        await checkoutPage.clickCheckoutBtn();
        await checkoutPage.inputCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.clickContinueBtn();
        await checkoutPage.clickFinishBtn();
        await checkoutPage.validateSuccessCheckout();
    })
});
import {test, expect} from '@playwright/test';

test.describe('Functionality on product page', () => {

    test.beforeEach(async({page}) => {
        //Login with valid credentials
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });

    test.afterEach(async ({ page }, testInfo) => {
        // Cleanup setelah setiap test
        console.log(`Test "${testInfo.title}" completed with status: ${testInfo.status}`);
        await page.close(); // Tutup halaman spesifik ini
    });


    test('Filter products by price (low to high)', async({page}) => {
        
        //Filter products by "Price (low to high)"
        const dropdown = page.locator('[data-test="product-sort-container"]');
        await dropdown.selectOption('lohi');

        //Get all product prices
        const prices = await page.locator('.inventory_item_price').allTextContents();

        //convert prices to numbers and verify they are in ascending order
        const priceValues = prices.map(prices => parseFloat(prices.replace('$', '')));
        const sortedPrices = [...priceValues].sort((a, b) => a - b);
        expect(priceValues).toEqual(sortedPrices);
    });
});

test.describe('Product search & Add to cart', () => {
    test.beforeEach(async({page}) => {
        //Login with valid credentials
        await page.goto('https://www.saucedemo.com/');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
    });

    test.afterEach(async ({ page }, testInfo) => {
        // Cleanup setelah setiap test
        console.log(`Test "${testInfo.title}" completed with status: ${testInfo.status}`);
        await page.close(); // Tutup halaman spesifik ini
    });

    test('Add product to cart', async({page}) => {

        //verify on the inventory page
        await expect(page).toHaveURL(/inventory.html/);

        //get product name berfore adding to cart
        const productName = await page.locator('.inventory_item_name').first().textContent();

        //click the first add to cart button
        await page.locator('.btn_inventory').first().click();

        //verify cart badge appears with number 1
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');

        //click cart icon
        await page.locator('.shopping_cart_link').click();

        //verify that the product added to cart is visible in the cart page
        await expect(page).toHaveURL(/cart.html/);
        const cartProductName = await page.locator('.inventory_item_name').textContent();
        expect(cartProductName).toBe(productName);
    });

    test('Add multiple products to cart', async({page}) => {
        
        //get all "add to cart" buttons 
        const addToCartButtons = page.locator('.btn_inventory');
        const buttonCount = await addToCartButtons.count();

        //click the first 3 "add to cart" buttons
        const productsToAdd = 3;
        for(let i =0; i < productsToAdd; i++){
            await addToCartButtons.nth(i).click();
        }

        //verify cart badge appears with number 3
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText(productsToAdd.toString());

        //Go to cart and verify
        await page.locator('.shopping_cart_link').click();
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(productsToAdd);
    });

    test('Remove product from cart', async({page}) => {
        
        //add a product to cart
        await page.locator('.btn_inventory').first().click();
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

        //Go to inventory page
        await page.goto('https://www.saucedemo.com/inventory.html');

        //click remove button
        await page.locator('.btn_inventory').first().click();

        //verify cart badge is not visible
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).not.toBeVisible();
    });
});
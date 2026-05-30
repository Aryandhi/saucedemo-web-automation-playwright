const {expect} = require('@playwright/test');

class InventoryPage {
    constructor(page) {
        this.productTitle = page.locator('[data-test="title"]');
        this.addToCartBtn = page.locator('.btn_inventory');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async validateTitle() {
        await expect(this.productTitle).toHaveText('Products');
    }

    async clickAddToCartBtnbyIndex(index) {
        index = index === 0 ? 0 : index - 1;
        const listAddToCartBtn = await this.addToCartBtn.all();
        await listAddToCartBtn.at(index).click();
    }

    async clickAddToCartBtn() {
        await this.clickAddToCartBtnbyIndex(1);
    }

    async clickCartIcon() {
        await this.cartIcon.click();
    }
}

module.exports = InventoryPage;
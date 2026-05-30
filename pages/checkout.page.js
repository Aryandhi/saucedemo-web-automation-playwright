import { expect } from "@playwright/test";

class CheckoutPage {
    constructor(page) {
        this.checkoutBtn = page.locator('[data-test="checkout"]');
        this.firstNameField = page.locator('[data-test="firstName"]');
        this.lastNameField = page.locator('[data-test="lastName"]');
        this.postalCodeField = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.checkoutCompleteTitle = page.locator('[data-test="complete-header"]');
    }

    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }

    async inputCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
    }

    async clickContinueBtn() {
        await this.continueBtn.click();
    }

    async clickFinishBtn() {
        await this.finishBtn.click();
    }

    async validateSuccessCheckout() {
        await expect(this.checkoutCompleteTitle).toHaveText('Thank you for your order!');
    }

}

module.exports = CheckoutPage;
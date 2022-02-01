class ProductPage {
    get productTitle() {
        return $('div.title-group > h1 > span[itemprop="name"]');
    }

    get addToCartButton() {
        return $("a#addToBasket_inf041");
    }

    get productPrice() {
        return $("span#cena_d");
    }

    async getProductPrice():Promise<string> {
        const price:WebdriverIO.Element = await this.productPrice;
        await price.waitForDisplayed();
        return await price.getText();
    }

    async getProductTitleValue():Promise<string> {
        const title:WebdriverIO.Element = await this.productTitle;
        await title.waitForDisplayed;
        return await title.getText();
    }

    async clickOnAddToCartButton() {
        const button:WebdriverIO.Element = await this.addToCartButton;
        await button.waitForDisplayed();
        await button.click();
    }

    async addToCartButtonIsVisible() {
        const button:WebdriverIO.Element = await this.addToCartButton;
        await button.waitForDisplayed();
    }

    async productTitleIsVisible() {
        const title:WebdriverIO.Element = await this.productTitle;
        await title.waitForDisplayed();
    }
}

export default new ProductPage();
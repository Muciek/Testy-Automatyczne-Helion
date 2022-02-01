import {cartUrl, helionHomeUrl, searchProductUrl} from "../../config/pagesUrl";
import SearchbarPage from "../../pages/components/SearchbarPage";
import {alertMessage, deletedProductMessage, searchPhrase} from "../../config/data";
import SearchResultPage from "../../pages/SearchResultPage";
import ProductPage from "../../pages/ProductPage";
import CartPage from "../../pages/CartPage";

let productTitle: string = "";
let price: string = "";

describe("E2E - Products", async() => {
    before(() => {
        browser.url(helionHomeUrl);
    })

    it("Should type search phrase and click search icon", async() => {
        await SearchbarPage.typeSearchPhrase(searchPhrase);
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(searchProductUrl);
    })

    it("Should click on first book", async() => {
        await SearchResultPage.clickOnFirstBookItem();
        await ProductPage.productTitleIsVisible();
        await ProductPage.addToCartButtonIsVisible();
        productTitle = await ProductPage.getProductTitleValue();
        price = await ProductPage.getProductPrice();
    })

    it("Should click on add to cart button", async() => {
        await ProductPage.clickOnAddToCartButton();
        await expect(browser).toHaveUrlContaining(cartUrl);
        await expect(await CartPage.getSuccessAlertValue()).toContain(productTitle);
        await expect(await CartPage.getTotalPriceValue()).toContain(price);
    })

    it("Should delete product from cart", async() => {
        await CartPage.clickOnCheckbox();
        await CartPage.clickOnDeleteSelectedLabel();
        await expect(await browser.getAlertText()).toContain(alertMessage);
        await CartPage.acceptDeleteAlert();
        await expect(await CartPage.getDeletedAlertMessageValue()).toContain(deletedProductMessage);
    })
})
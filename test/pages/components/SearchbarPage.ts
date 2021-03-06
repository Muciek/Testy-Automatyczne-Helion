class SearchbarPage {
    get searchInput() {
        return $("#inputSearch");
    }

    get searchIcon() {
        return $("#szukanie > fieldset > a > button");
    }

    get suggestPopup() {
        return $("form#szukanie div.suggest-list");
    }

    get seeAllBooksButton() {
        return $("#szukanie > fieldset > div.suggest-list > ol > li.wszystkie > p > a");
    }

    get notFoundAlert() {
        return $("div.not-found");
    }

    async getNotFoundAlertText():Promise<string> {
        const alert:WebdriverIO.Element = await this.notFoundAlert;
        await alert.waitForDisplayed();
        return await alert.getText();
    }

    async getInputValue():Promise<string> {
        const input:WebdriverIO.Element = await this.searchInput;
        await input.waitForDisplayed();
        return await input.getValue();
    }

    async clearSearchBar() {
        const input:WebdriverIO.Element = await this.searchInput;
        await input.waitForDisplayed();
        await input.clearValue();
    }

    async clickOnSeeAllBooksButton() { //coś jest skopane z wprowadzaniem/zatwierdzaniem inputa
        const button:WebdriverIO.Element = await this.seeAllBooksButton;
        await button.waitForDisplayed();
        await button.scrollIntoView();
        await button.click();
    }

    async suggestPopupIsVisible() {
        const popup:WebdriverIO.Element = await this.suggestPopup;
        await popup.waitForDisplayed();
    }

    async typeSearchPhrase(value:string) {
        const input:WebdriverIO.Element = await this.searchInput;
        await input.waitForDisplayed();
        await input.setValue(value);
        await browser.pause(1000);
    }

    async clickOnSearchIcon() {
        const icon:WebdriverIO.Element = await this.searchIcon;
        await icon.waitForDisplayed();
        await icon.click();
    }

    async searchBarIsVisible() {
        const input:WebdriverIO.Element = await this.searchInput;
        await input.waitForDisplayed();
    }
}

export default new SearchbarPage();
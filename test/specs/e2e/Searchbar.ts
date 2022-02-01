import GlobalPage from "../../pages/GlobalPage";
import {helionHomeUrl, searchPageUrl} from "../../config/pagesUrl";
import SearchbarPage from "../../pages/components/SearchbarPage";
import {incorrectSearchPhrase, notFoundMessage, notFoundUrl, searchPhrase, searchResultTitle} from "../../config/data";
import SearchResultPage from "../../pages/SearchResultPage";

describe("E2E - SearchBar", async() => {
    it("Should open Helion home page and verify URL and visible searchbar", async() => {
        await GlobalPage.openPage(helionHomeUrl, helionHomeUrl);
        await SearchbarPage.searchBarIsVisible();
    })

    it("Should click on search icon, and verify url", async() => {
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(helionHomeUrl);
    })

    it("Should type search value and verify visible popup", async() => {
        await SearchbarPage.typeSearchPhrase(searchPhrase);
        await SearchbarPage.suggestPopupIsVisible();
    })

    it("Should click on see all books button", async() => {
        await browser.pause(2000);
        await SearchbarPage.clickOnSeeAllBooksButton();
        await expect(browser).toHaveUrl(searchPageUrl);
    })

    it("Should verify visible correctly title and numer of books", async() => {
        const title:string = await SearchResultPage.getPageTitle();
        const numberOfBooks:number = await SearchResultPage.getNumberOfBooks();
        await expect(title).toContain(searchResultTitle);
        await expect(numberOfBooks).toEqual(20);
    })

    it("Should clear input value", async() => {
        await SearchbarPage.clearSearchBar();
        await expect(await SearchbarPage.getInputValue()).toContain("");
    })

    it("Should type incorrect book name and verify message", async() => {
        await SearchbarPage.typeSearchPhrase(incorrectSearchPhrase);
        await SearchbarPage.clickOnSearchIcon();
        await expect(await SearchbarPage.getNotFoundAlertText()).toContain(notFoundMessage);
    })

    it("Should clear input value and click on search icon", async() => {
        await SearchbarPage.clearSearchBar();
        await browser.pause(500);
        await SearchbarPage.clickOnSearchIcon();
        await expect(browser).toHaveUrl(notFoundUrl);
        await expect(await SearchbarPage.getInputValue()).toContain(incorrectSearchPhrase);
    })
})
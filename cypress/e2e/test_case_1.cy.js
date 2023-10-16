const testData = require('../fixtures/test_data_case_1.json');

const browserUrl = Cypress.config().baseUrl;

describe('find a product by a specific title and check that it\'s openable', () => {
    beforeEach(() => {
        cy.openPage([1920, 1080], browserUrl);
        cy.checkPageStatus(browserUrl, browserUrl);
    });
    context('search by one item', () => {
        testData.searchValue.forEach((e) => {
            it(`Search ${e} element and try to open`, () => {
                cy.searchItem(e);
                cy.checkPageStatus(
                    browserUrl + "?q=" + (e.includes(" ") ? e.split(" ").join("%20") : e),
                    browserUrl + "search?q=" + (e.includes(" ") ? e.split(" ").join("%20") : e) + "&page=1");
                cy.foundItemOnList(e);
                cy.openItem(e);
                cy.itemIsDisplayed(e);
            });
        });
    });

    context('search all', () => {
        it(`Search all items one by one`, () => {
            testData.searchValue.forEach((e) => {
                cy.searchItem(e);
                cy.checkPageStatus(
                    browserUrl + "?q=" + (e.includes(" ") ? e.split(" ").join("%20") : e),
                    browserUrl + "search?q=" + (e.includes(" ") ? e.split(" ").join("%20") : e) + "&page=1");
                cy.foundItemOnList(e);
                cy.openItem(e);
                cy.itemIsDisplayed(e);
            });
        });
    });
});
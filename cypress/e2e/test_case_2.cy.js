const testData = require('../fixtures/test_data_case_2.json');

const browserUrl = Cypress.config().baseUrl;

describe('find a product by a specific title and check that it’s openable', () => {
    beforeEach(() => {
        cy.openPage([1920, 1080], browserUrl);
        cy.checkPageStatus(browserUrl, browserUrl);
    });
    let names = Object.keys(testData.arbitrary_products);
    Object.values(testData.arbitrary_products).forEach((e, index) => {
        it(`check that all items are found on the list: ${names[index]}`, () => {
            cy.intercept({ path: "**/search?q=STAR%20WARS&page=1" }).as("r1610get");
            cy.searchItem("STAR WARS");
            cy.checkPageStatus(browserUrl + "?q=STAR%20WARS");

            cy.wait("@r1610get").then(getResult => {
                cy.log(JSON.stringify(getResult.response.body));
                console.log(JSON.stringify(getResult.response.body));

                cy.foundArrayOnList(e, JSON.stringify(getResult.response.body))
            })
        });
    })
});
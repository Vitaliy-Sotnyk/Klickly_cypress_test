const browserUrl = Cypress.config().baseUrl;

describe(' products on the first page are all different from the products on the second page', () => {
    beforeEach(() => {
        cy.openPage([1920, 1080], browserUrl);
        cy.checkPageStatus(browserUrl, browserUrl);
    });

    it(`scroll window`, () => {
        cy.intercept({ path: "**/search?q=STAR%20WARS&page=1" }).as("resPgOne")
        cy.intercept({ path: "**/search?q=STAR%20WARS&page=2" }).as("resPgTwo")

        cy.searchItem("STAR WARS");
        cy.checkPageStatus(browserUrl + "?q=STAR%20WARS");

        cy.wait("@resPgOne").then(pageOne => {
            cy.scrollTheList('bottom');
            cy.wait("@resPgTwo").then(pageTwo => {
                expect(pageOne.response.body).to.not.equal(pageTwo.response.body)
            })
        })
    });

});
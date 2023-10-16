// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("openPage", (size, browserUrl) => {
    cy.viewport(...size);
    cy.visit(browserUrl);
});

Cypress.Commands.add("checkPageStatus", (expectedUrl, requestUrl) => {
    cy.url().should("eq", expectedUrl);
    if (requestUrl) {
        cy.request(requestUrl)
            .then((response) => {
                expect(response.status).to.eq(200);
            });
    }
});

Cypress.Commands.add("searchItem", (itemName) => {
    cy.get(".sc-dxcDKg.fjZlts")
        .should("be.visible")
        .wait(500)
        .clear()
        .type(itemName)
    cy.get(".ant-btn-primary.ant-btn-sm.sc-jlZhew.iSSsmS.sc-eulNck")
        .should("be.visible")
        .click();
});

Cypress.Commands.add("getListOfItem", () => {
    cy.get(".sc-hQfNDv.hRtXTw")
        .find(".sc-cwHptR h3.ant-typography")
        .should("be.visible");
});

Cypress.Commands.add("foundItemOnList", (itemName) => {
    cy.getListOfItem()
        .then(($els) => {
            return Cypress.$.makeArray($els)
                .map((el) => {
                    return el.innerText;
                });
        })
        .should("contain", itemName);
});

Cypress.Commands.add("openItem", (itemName) => {
    cy.getListOfItem()
        .then(($els) => {
            return Cypress.$.makeArray($els)
                .forEach(el => {
                    if (el.innerText == itemName) {
                        el.click();
                    }
                });
        });
});

Cypress.Commands.add("itemIsDisplayed", (itemName) => {
    cy.get(".styles__StyledProductInfoWrapper-sc-1h5zpst-0.ftuJku")
        .should("exist")
        .find(".ant-typography")
        .should("be.visible")
        .and("contain", itemName)
});

Cypress.Commands.add("foundArrayOnList", (itemArray, responseBody) => {
    cy.getListOfItem()
        .then(($els) => {
            let state = [false, false];
            let errorMessage;
            const values = itemArray;
            Cypress.$.makeArray($els)
                .filter((el) => {
                    if (el.innerText == values[0]) {
                        state[0] = !state[0];
                    } else if (el.innerText == values[1]) {
                        state[1] = !state[1];
                    }
                });
            if (state.some(el => !el)) {
                state.forEach((e, index) => {
                    if (!e) {
                        errorMessage = `Element: ${values[index]} not found \n Response body: ${responseBody}\n`
                    }
                })
            }
            expect(state.every(e => e), errorMessage).to.eq(true);
            return state;
        })
});

Cypress.Commands.add("scrollTheList", (direction) => {
    cy.get('.sc-huFNyZ.jzubQT').scrollTo(direction);
    cy.wait(3000);

});
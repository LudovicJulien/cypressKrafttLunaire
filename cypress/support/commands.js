/**
 * Asserts that an element with the given `data-cy` attribute is visible
 * and contains the expected text.
 *
 * @param {string} dataCy       - The `data-cy` attribute of the target element.
 * @param {string} expectedText - The expected text content of the element.
 */
Cypress.Commands.add('assertVisibleText', (dataCy, expectedText) => {
  cy.get(`[data-cy=${dataCy}]`)
    .should('be.visible')
    .and('contain', expectedText);
});

/**
 * Asserts that a link is visible, contains the expected text and href,
 * then clicks on it and checks that the redirection is correct.
 *
 * @param {string} dataCy       - The `data-cy` attribute of the link.
 * @param {string} expectedText - The expected visible text.
 * @param {string} expectedHref - The expected href value.
 * @param {string} [expectedPath=expectedHref] - The expected redirected pathname.
 */
Cypress.Commands.add('assertVisibleLinkAndRedirection', (dataCy, expectedText, expectedHref, expectedPath = expectedHref) => {
  cy.get(`[data-cy=${dataCy}]`)
    .scrollIntoView()
    .should('be.visible')
    .and('contain', expectedText)
    .and('have.attr', 'href', expectedHref)
    .click();

  cy.location('pathname').should('eq', expectedPath);
});

/**
 * Asserts that all elements with the specified `data-cy` values are visible.
 *
 * @param {string[]} dataCyList - A list of `data-cy` values for the elements to check.
 */
Cypress.Commands.add('assertImagesVisible', (dataCyList) => {
  dataCyList.forEach((dataCy) => {
    cy.get(`[data-cy=${dataCy}]`).should('be.visible');
  });
});

/**
 * Asserts that a product slider displays each product's image and name,
 * and optionally its price.
 *
 * @param {Array<{img: string, nom: string, prix?: string}>} productSelectors - 
 *   An array of product identifiers with `data-cy` attributes.
 * @param {boolean} [checkPrix=true] - Whether to also check the price is visible.
 */
Cypress.Commands.add('assertProduitSliderVisible', (productSelectors, expectedHref, expectedPath = expectedHref, checkPrix = true) => {
  productSelectors.forEach(({ img, nom, prix, btn }) => {
    cy.get(`[data-cy=${img}]`).should('exist');
    cy.get(`[data-cy=${nom}]`).invoke('text').should('not.be.empty');

    if (checkPrix && prix) {
      cy.get(`[data-cy=${prix}]`).invoke('text').should('not.be.empty');
    }
  });
});
  
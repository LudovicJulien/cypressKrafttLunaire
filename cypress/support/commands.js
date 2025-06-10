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
      .then($el => {
        const actualText = $el.text().trim();
        if (!actualText.includes(expectedText)) {
          Cypress.log({
            name: 'assertVisibleText',
            message: `Options attendues : "${expectedText}" | Options trouvées : "${actualText}"`,
          });
          throw new Error(`Le texte visible ne contient pas le texte attendu.\nAttendu : "${expectedText}"\nTrouvé : "${actualText}"`);
        }
      });
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
/**
 * Asserts that a <select> element identified by the given `data-cy` selector
 * contains exactly the expected list of options (by their visible text).
 *
 * @param {string} selector         - The `data-cy` attribute of the <select> element.
 * @param {string[]} expectedOptions - The array of expected option texts, in order.
 */
Cypress.Commands.add('assertSelectOptions', (selector, expectedOptions) => {
  cy.log('Options expecté :', JSON.stringify(expectedOptions));
  cy.get(`[data-cy=${selector}]`).find('option')
      .then(options => {
        const actual = [...options].map(o => o.text.trim());
        Cypress.log({
          name: 'assertSelectOptions',
          message: `Options trouvées : ${JSON.stringify(actual)}`,
        });
        return actual;
      })
      .then(actual => {
        expect(actual).to.deep.eq(expectedOptions);
      });
});
/**
 * Intercepts an API request matching the given method and URL pattern,
 * and responds with either a fixture file or a direct response body.
 *
 * @param {string} aliasName       - Alias name to identify the intercepted request.
 * @param {string} method          - HTTP method to intercept (GET, POST, etc.).
 * @param {string|RegExp} urlPattern - URL or pattern of the API endpoint to intercept.
 * @param {number} statusCode      - HTTP status code to respond with.
 * @param {string|Object} fixtureOrBody - Fixture filename (string) or direct response body (object).
 */
Cypress.Commands.add('interceptApiWithResponse', (aliasName, method, urlPattern, statusCode, fixtureOrBody) => {
  const isFixture = typeof fixtureOrBody === 'string';

  cy.intercept(method, urlPattern, (req) => {
    if (isFixture) {
      req.reply({
        statusCode: statusCode,
        fixture: fixtureOrBody
      });
    } else {
      req.reply({
        statusCode: statusCode,
        body: fixtureOrBody
      });
    }
  }).as(aliasName);
});
/**
 * Custom Cypress command that asserts the content of a product card element.
 * This command is chained off a previously selected DOM element (the card),
 * and checks that the product title, price, and image match the expected product data.
 *
 * @param {Object} subject             - The product card DOM element (passed automatically via `.wrap()`).
 * @param {Object} expectedProduct     - The expected product data, usually from a fixture or mock response.
 * @param {string} expectedProduct.titre   - Expected title of the product.
 * @param {string|number} expectedProduct.prix_min - Expected price of the product.
 * @param {string} expectedProduct.photo1  - Expected image filename of the product (e.g., "bague.jpg").
 */
Cypress.Commands.add('checkProduct', { prevSubject: true }, (subject, expectedProduct) => {
  cy.wrap(subject).within(() => {
    cy.get('[data-cy="produit-titre"]').should('contain', expectedProduct.titre);
    cy.get('[data-cy="produit-prix"]').should('contain', expectedProduct.prix_min);
    cy.get('[data-cy="produit-image"]')
        .invoke('attr', 'src')
        .should('include', `../img/${expectedProduct.photo1}`);
    cy.get('[data-cy="produit-image"]')
        .invoke('attr', 'alt')
        .should('include', expectedProduct.titre);
  });
});
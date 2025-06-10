import { ROUTES, API_ROUTES } from '../support/routes';
import { JEWELRY_SELECTORS } from '../support/selectors';
import  produits   from '../fixtures/produits.json';
import { JEWELRY_TEXTS } from '../support/texts';

describe('Page jewelry', () => {
    beforeEach(() => {
        cy.intercept('GET', API_ROUTES.produits).as('getProduits');
        cy.visit(ROUTES.jewelry);
    });

    context('Affichage initial', () => {

        it('devrait afficher le titre correctement', () => {
            cy.assertVisibleText(JEWELRY_SELECTORS.titre, JEWELRY_TEXTS.pageTitles.products);
        });

        it('devrait afficher au moins un produit', () => {
            cy.get(`[data-cy=${JEWELRY_SELECTORS.produitCard}]`).should('have.length.at.least', 1);
        });

        it('devrait afficher les deux sélecteurs de filtre', () => {
            cy.get(`[data-cy=${JEWELRY_SELECTORS.sortSelect}]`).should('exist');
            cy.get(`[data-cy=${JEWELRY_SELECTORS.collectionSelect}]`).should('exist');
            cy.get(`[data-cy=${JEWELRY_SELECTORS.collectionSelect}]`).should('be.visible');
        });

        it('devrait contenir les bonnes options de tri', () => {
            cy.assertSelectOptions(JEWELRY_SELECTORS.sortSelect, JEWELRY_TEXTS.filterOptions.sort);
        });

        it('devrait contenir les bonnes options de collection', () => {
            cy.assertSelectOptions(JEWELRY_SELECTORS.collectionSelect, JEWELRY_TEXTS.filterOptions.collection);
        });
    });

    context('Gestion de l\'API', () => {

        it('fait bien un appel réseau au chargement', () => {
            cy.wait('@getProduits').its('response.statusCode').should('eq', 200);
        });

        it('renvoie une liste de produits non vide', () => {
            cy.wait('@getProduits').then((interception) => {
                const responseBody = JSON.parse(interception.response.body);
                expect(responseBody).to.be.an('array').and.to.have.length.greaterThan(0);
            });
        });

        it('devrait afficher un message d’erreur si l’API renvoie une erreur 500', () => {

            cy.interceptApiWithResponse('getProduitsFailed', 'GET', API_ROUTES.produits, 500, {});
            cy.visit(ROUTES.jewelry);
            cy.wait('@getProduitsFailed');
            cy.assertVisibleText(JEWELRY_SELECTORS.error, JEWELRY_TEXTS.errorMessages.loadingError);
        });

        it('devrait gérer correctement une réponse vide de l’API', () => {
            cy.interceptApiWithResponse('getProduitsEmpty', 'GET', API_ROUTES.produits, 200, {});
            cy.visit(ROUTES.jewelry);
            cy.wait('@getProduitsEmpty');
            cy.assertVisibleText(JEWELRY_SELECTORS.error, JEWELRY_TEXTS.errorMessages.invalidData);
        });

        it('devrait gérer les données mal formatées retournées par l’API', () => {
            const malformedData = { invalid: 'data' };
            cy.interceptApiWithResponse('getMalformedData', 'GET', API_ROUTES.produits, 200, malformedData);
            cy.visit(ROUTES.jewelry);
            cy.wait('@getMalformedData');
            cy.assertVisibleText(JEWELRY_SELECTORS.error, JEWELRY_TEXTS.errorMessages.invalidData);
        });

        it('affiche les produits avec une fixture mockée', () => {
            cy.interceptApiWithResponse('getProduitsMock', 'GET', API_ROUTES.produits, 200, produits);
            cy.visit(ROUTES.jewelry);
            cy.wait('@getProduitsMock');
            cy.get(`[data-cy=${JEWELRY_SELECTORS.produitCard}]`).should('have.length', produits.length);
            cy.get(`[data-cy=${JEWELRY_SELECTORS.produitCard}]`).each((card, index) => {
                cy.wrap(card).checkProduct(produits[index]);
            });
        });

    });
});
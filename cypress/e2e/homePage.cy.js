import { ROUTES } from '../support/routes';
import { HOME_SELECTORS } from '../support/selectors';
import { HOME_TEXTS } from '../support/texts';

describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    context('Hero section', () => {

        it('should display the main title correctly', () => {
            cy.assertVisibleText(
                HOME_SELECTORS.hero.title, 
                HOME_TEXTS.hero.title
            );
        });
        it('should display the slogan correctly', () => {
            cy.assertVisibleText(
                HOME_SELECTORS.hero.slogan, 
                HOME_TEXTS.hero.slogan
            );
        });
        it('should display the Shop Now button correctly and redirect properly', () => {
            cy.assertVisibleLinkAndRedirection(
                HOME_SELECTORS.hero.btnShop, 
                HOME_TEXTS.hero.btnShop, 
                ROUTES.jewelry
            );
        });
    });
  
    context('About Us section', () => {

        it('should display the Our Brand title correctly', () => {
            cy.assertVisibleText(
                HOME_SELECTORS.about.title, 
                HOME_TEXTS.about.title
            );
        });
        it('should display the Our Brand text correctly', () => {
            cy.assertVisibleText(
                HOME_SELECTORS.about.text,
                HOME_TEXTS.about.text
                );
        });
        it('should display the View Now button correctly and redirect properly', () => {
            cy.assertVisibleLinkAndRedirection(
                HOME_SELECTORS.about.btnView, 
                HOME_TEXTS.about.btnView, 
                ROUTES.brand
            );
        });
        it('should display both Our Brand images', () => {
            cy.assertImagesVisible(
                HOME_SELECTORS.about.images
            );
        });
    });

    context('Best Sellers section', () => {

        it('should display the Best Sellers title', () => {
            cy.assertVisibleText(
                HOME_SELECTORS.bestSellers.title, 
                HOME_TEXTS.bestSellers.title
            );
        });
        it('should display Best Seller products with image, name, and price', () => {
            cy.assertProduitSliderVisible(
                HOME_SELECTORS.bestSellers.products,
            );
        });
    });
    
    context('Contact section', () => {

        it('should display the Contact title correctly', () => {
            cy.assertVisibleText(
                HOME_SELECTORS.contact.title, 
                HOME_TEXTS.contact.title
            );
        });
        it('should display the contact text correctly', () => {
            cy.assertVisibleText(
                HOME_SELECTORS.contact.text, 
                HOME_TEXTS.contact.text
            );
        });
        it('should redirect correctly after clicking the View Now link', () => {
            cy.assertVisibleLinkAndRedirection(
                HOME_SELECTORS.contact.button, 
                HOME_TEXTS.contact.btnView, 
                ROUTES.contact
            );
        });
    });
    
    context('Collection section', () => {

        it('should display the Collection title', () => {
              cy.assertVisibleText(
                HOME_SELECTORS.collection.title, 
                HOME_TEXTS.collection.title
            );
        });
        it('should display all available collections', () => {
            cy.assertProduitSliderVisible(
                HOME_SELECTORS.collection.items, 
                false
            );
        });
    });
});

# cypressKrafttLunaire
End-to-end UI tests using Cypress for the home page of Kraftt Lunaire, a jewelry brand website.

Ce projet comprend une suite de tests end-to-end écrits avec [Cypress](https://www.cypress.io/) pour vérifier le bon fonctionnement de différentes sections d'une page d'accueil e-commerce.

## ✅ Tous les tests passent

![Tests passant avec succès](./screenshots/tests-passing.png)

## Objectif

L'objectif est de tester l'affichage et la navigation des sections suivantes du site :

### PagePrinicipale
- **Hero**
- **About Us**
- **Best Sellers**
- **Collection**
- **Contact**

### PageJewelry
- **Filtres**
- **Affichage des Produits**

## Outils utilisés

- Cypress 14.3.3
- JavaScript (ES6)
- HTML / CSS

## Convention adoptée : 
### utilisation stricte de `data-cy`

Tous les tests utilisent **exclusivement des attributs `data-cy`** pour cibler les éléments HTML.

### Pourquoi ce choix ?

- 🔒 **Séparation claire entre code et tests** : les sélecteurs `data-cy` ne sont pas liés au style ou au comportement de l'application.
- ⚙️ **Résilience aux changements** : contrairement aux `id` ou aux `class`, les `data-cy` ne changent pas sauf en cas de modification volontaire des tests.
- 🔍 **Lisibilité et maintenabilité** : ils permettent d’écrire des tests compréhensibles et robustes.

**Exemple d’utilisation :**
```html
<button data-cy="btnShop">Shop Now</button>
```

### Externalisation des textes attendus

Pour des raisons de maintenance et de lisibilité, tous les textes attendus (assertions) pour chaque page sont regroupés dans des fichiers .js externes dédiés.
### Pourquoi ce choix ?

- 📖 **Lisibilité des tests** : Les fichiers de test `.cy.js` restent concis et 
  se concentrent uniquement sur les actions et les validations, sans être encombrés par de longs textes d'assertion.
- 🔄 **Maintenance simplifiée** : Si un texte affiché sur l'interface 
  utilisateur change, seule une modification dans le fichier de texte externe est nécessaire, et non dans chaque test qui l'utilise.
- ✅ **Centralisation** : Tous les textes attendus sont stockés à un seul 
  endroit, ce qui facilite leur gestion et leur vérification

**Exemple d’utilisation :**
```js
  it('should display the main title correctly', () => {
  cy.assertVisibleText(
          HOME_SELECTORS.hero.title,
          HOME_TEXTS.hero.title
  );
});
```

## Défi rencontré : le composant Swiper

L'un des défis rencontrés lors de l'écriture des tests a été lié à la **section Best Sellers**, qui utilise un **slider Swiper**. Par défaut, Swiper masque les éléments non actifs (`overflow: hidden`), ce qui empêche Cypress de les détecter comme visibles.

### Problème :

Timed out retrying after 4000ms: expected '<img#imgBest1>' to be 'visible'

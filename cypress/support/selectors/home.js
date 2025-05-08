// Centralized selectors for Home Page to improve test maintainability and readability
export const HOME_SELECTORS = {
    hero: {
      title: 'titre',
      slogan: 'slogan',
      btnShop: 'btnShop',
    },
    about: {
      title: 'titreOurBrand',
      text: 'textOurBrand',
      btnView: 'btnView',
      images: ['imageOurBrand1', 'imageOurBrand2'],
    },
    bestSellers: {
      title: 'titreBest',
      products: [
        { 
          img: 'imgBest1', 
          nom: 'nomBest1', 
          prix: 'prixBest1',
          btn: 'btnBest1', 
        },
        { 
          img: 'imgBest2', 
          nom: 'nomBest2', 
          prix: 'prixBest2',
          btn: 'btnBest2', 
        },
        { 
          img: 'imgBest3', 
          nom: 'nomBest3', 
          prix: 'prixBest3',
          btn: 'btnBest3', 
        },
      ],
    },
    contact: {
      title: 'titreContact',
      text: 'textContact',
      button: 'boutonContact',
    },
    collection: {
      title: 'titreCollection',
      items: [
        { img: 'imgCollection1', nom: 'nomCollection1' },
        { img: 'imgCollection2', nom: 'nomCollection2' },
        { img: 'imgCollection3', nom: 'nomCollection3' },
      ],
      cubanLinkHref: 'a[href="/products?collection=cubanLink"]',
    },
  };
  
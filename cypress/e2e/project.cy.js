// check if the website is real + test if login works
describe('checking if its real', () => {
  beforeEach(() => {
    cy.visit("https://r1035499-realbeans.myshopify.com/");
    // Log in met het wachtwoord
    cy.get("input").eq(1).type("dahwhu");
    cy.get("button").click();
  });

  // Test 1: Controleer dat de cataloguspagina de juiste producten toont
  it('shows products on catalog page', () => {
    cy.visit("https://r1035499-realbeans.myshopify.com/collections/all");

    // Check dat Blended coffee 5kg aanwezig is
    cy.get('#product-card-AVld1aElqMERtRmFyR__product-card > .product-card__content > .user-select-text > .spacing-style > p')
      .contains("Blended coffee 5kg");

    // Check dat Roasted coffee beans 5kg aanwezig is
    cy.get('#product-card-AVld1aElqMERtRmFyR__product-card-1 > .product-card__content > .user-select-text > .spacing-style > p')
      .contains("Roasted coffee beans 5kg");
  });

  // Test 2: Controleer dat sorteren op prijs de volgorde effectief verandert
  it('sort items price work', () => {
    cy.visit("https://r1035499-realbeans.myshopify.com/collections/all");

    // Open de sort dropdown
    cy.get('[data-testid="sorting-filter-component-desktop"] > accordion-custom > #Sorting-template--26717089038634__main > .facets__summary')
      .click();

    // Klik op "Price, low to high"
    cy.get('#sorting-options-template--26717089038634__main-desktop > .sorting-filter__options-inner > [for="sort-option-price-ascending-template--26717089038634__main"] > .sorting-filter__option')
      .click();

    // Wacht tot de URL de sorteerparameter bevat
    cy.url().should('include', 'sort_by=price-ascending');

    // Check dat Blended ($55) niet eerste staat want Roasted ($40) is goedkoper
    cy.get('.product-card__content > .user-select-text > .spacing-style > p')
      .first()
      .should('not.contain', 'Blended coffee 5kg');

    // Kleine pauze zodat je de sortering kan zien
    cy.wait(2000);

    // Open de sort dropdown opnieuw
    cy.get('[data-testid="sorting-filter-component-desktop"] > accordion-custom > #Sorting-template--26717089038634__main > .facets__summary')
      .click();

    // Klik op "Price, high to low"
    cy.get('#sorting-options-template--26717089038634__main-desktop > .sorting-filter__options-inner > [for="sort-option-price-descending-template--26717089038634__main"] > .sorting-filter__option')
      .click();

    // Wacht tot de URL de sorteerparameter bevat
    cy.url().should('include', 'sort_by=price-descending');

    // Check dat Roasted ($40) niet eerste staat want Blended ($55) is duurder
    cy.get('.product-card__content > .user-select-text > .spacing-style > p')
      .first()
      .should('not.contain', 'Roasted coffee beans 5kg');
  });

  // Test 3a: Controleer dat de productdetailpagina de juiste beschrijving en prijs toont
  it('Product detail page shows correct description and price', () => {
    cy.visit("https://r1035499-realbeans.myshopify.com/collections/all");

    // Klik op het product om naar de detailpagina te gaan
    cy.get('#product-card-AVld1aElqMERtRmFyR__product-card > .product-card__content > .card-gallery > .contents > slideshow-component > slideshow-container > slideshow-slides > [aria-hidden="false"] > .product-media > .product-media__image')
      .click();

    // Check dat je op de juiste pagina bent
    cy.url().should('include', '/products/blended-coffee-5kg');
    cy.wait(1000);

    // Check dat de beschrijving correct is
    cy.get('.text-block--ASkZwWk92Tzl0eFBCW__text_aEtTtq > p')
      .contains('RealBeans coffee, ready to brew.');

    // Check dat de prijs correct is
    cy.get('.rte > [ref="priceContainer"] > .price__regular > .price')
      .contains('$55.00');
  });

  // Test 3b: Controleer dat alle varianten klikbaar zijn op de productdetailpagina
  it('Product detail page variants are clickable', () => {
    cy.visit("https://r1035499-realbeans.myshopify.com/products/blended-coffee-5kg");
    cy.wait(1000);

    // Klik op elke variant
    cy.contains('label', 'Excelsa').click();
    cy.wait(1000);
    cy.contains('label', 'Arabica').click();
    cy.wait(1000);
    cy.contains('label', 'Liberica').click();
  });

  // Test 3c: Controleer dat de add to cart knop werkt
  it('Product detail page add to cart works', () => {
    cy.visit("https://r1035499-realbeans.myshopify.com/products/blended-coffee-5kg");
    cy.wait(1000);

    // Klik op "Add to cart"
    cy.get('[data-testid="standalone-add-to-cart"]').click();
  });

  // Test 4: Controleer dat de About pagina de juiste historische tekst toont
  it('the about me shows the right text', () => {
    cy.visit("https://r1035499-realbeans.myshopify.com/pages/about-me");

    // Check dat de geschiedenis paragraaf aanwezig en correct is
    cy.get('#shopify-block-AU3lsRlMwU3lPY1JNV__page-content > rte-formatter > p')
      .contains('From a small Antwerp grocery to a European coffee staple, RealBeans honors tradition while innovating for the future. Our beans are roasted in-house, shipped from Antwerp or Stockholm, and loved across the continent.');
  });

  // Test 5: Controleer dat de homepage de juiste intro tekst en productlijst toont
  it('The homepages intro text, and product list appear correctly', () => {
    cy.visit("https://r1035499-realbeans.myshopify.com/");

    // Check dat de intro tekst correct is
    cy.get('.text-block--AcVlRWUFCOHpJMkNzZ__text_YLPk4p').contains('Browse our latest products');

    // Check dat de "Shop all" knop aanwezig is
    cy.contains('a', 'Shop all').should('be.visible');

    // Check dat het eerste product zichtbaar is en de juiste naam heeft
    cy.get('#product-card-AQ2ZhK21HL24yOHZze__static-product-card > .product-card__content > .card-gallery > .contents > slideshow-component > slideshow-container > slideshow-slides > [aria-hidden="false"] > .product-media > .product-media__image')
      .should('be.visible');
    cy.get('#product-card-AQ2ZhK21HL24yOHZze__static-product-card').contains('Blended coffee 5kg');

    // Check dat het tweede product zichtbaar is en de juiste naam heeft
    cy.get('#product-card-AQ2ZhK21HL24yOHZze__static-product-card-1 > .product-card__content > .card-gallery > .contents > slideshow-component > slideshow-container > slideshow-slides > .product-media-container > .product-media > .product-media__image')
      .should('be.visible');
    cy.get('#product-card-AQ2ZhK21HL24yOHZze__static-product-card-1').contains('Roasted coffee beans 5kg');
  });
});
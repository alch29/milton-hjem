describe('Milton Hjem app, user flows test', () => {
    beforeEach(() => {
        //Visit the url and login before each test
        cy.visit('http://localhost:5173/milton-hjem/');
      });
      
    it('Login as client and view timeline events', () => {
        cy.get('.input-field__input').type('livjensen@mail.dk');
        cy.get('.input-field__input').type('123456');
        cy.get('button', 'Add').click();
    });

    it('Login as consultant and upload image', function() {
    
        cy.get('#app input[type="text"]').click();
        cy.get('#app input[type="text"]').type('christensen.alek@gmail.com');
        cy.get('#app input[type="password"]').click();
        cy.get('#app input[type="password"]').type('alch290902');
        cy.get('#app div.button').click();
        cy.get('#app div:nth-child(1) > div.card__content').click();
        cy.get('#app img[alt="Upload"]').click();
        cy.get('#app div:nth-child(1) > div.card__content > img.upload-media-view__icon').click();
        cy.get('#app div.upload-media__field').click();
        cy.get('#app input.input-field__input').click();
        cy.get('#app input.input-field__input').type('test billede');
        cy.get('#app div.upload-media__category-buttons div:nth-child(4) div.button').click();
        cy.get('#app div.button--cta-primary').click();
    });

    it('Login as consultant and upload document', function() {
        cy.visit('http://localhost:5173/milton-hjem/')
        
        cy.get('#app input[type="text"]').click();
        cy.get('#app input[type="text"]').type('christensen.alek@gmail.com');
        cy.get('#app input[type="password"]').click();
        cy.get('#app input[type="password"]').type('alch290902');
        cy.get('#app div.button').click();
        cy.get('#app div.consultant-projects-view__projects-container > div:nth-child(1)').click();
        cy.get('#app img[alt="Upload"]').click();
        cy.get('#app div:nth-child(2) > div.card__content').click();
        cy.get('#app div.upload-media__field p').click();
        cy.get('#app input.input-field__input').click();
        cy.get('#app input.input-field__input').type('Test dokument');
        cy.get('#app div:nth-child(2) > div.button').click();
        cy.get('#app div.button--cta-primary').click();
    });
  });
describe('Milton Hjem app, user flows test', () => {
    beforeEach(() => {
        //Visit the url before each test
        cy.visit('https://milton-hjem.web.app/');
      });
      
    it('Login as client and view timeline events', () => {
        // Type email into the first input field
        cy.get('.input-field__input').eq(0).type('livjensen@mail.dk');

        // Type password into the second input field
        cy.get('.input-field__input').eq(1).type('123456');

        // Click the login button
        cy.get('.button').click();

        // Expand the timeline by clicking the icon
        cy.get('.timeline-preview__icon').click();

        // Check that the timeline events are visible
        cy.get('.timeline-view').should('be.visible');

        // Click on the calendar icon to view the calendar
        cy.get('.timeline__icon').eq(0).click();

        // Check that the calendar view is visible
        cy.get('.calendar').should('be.visible');
    });

    it('Login as consultant and upload image', () => {
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

    it('Login as consultant and upload document', () => {
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


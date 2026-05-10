describe('Milton Hjem app, user flows test', () => {
    beforeEach(() => {
        //Visit the url and login before each test
        cy.visit('http://localhost:5173/milton-hjem/');
      });
      
    it('Login as client and view timeline events', () => {
        //Login
        cy.get('.input-field__input').type('livjensen@mail.dk');
        cy.get('.input-field__input').type('123456');
        cy.get('.button', 'Add').click();

        
    });
  });
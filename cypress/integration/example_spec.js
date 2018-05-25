//
// **** Kitchen Sink Tests ****
//
// This app was developed to demonstrate
// how to write tests in Cypress utilizing
// all of the available commands
//
// Feel free to modify this spec in your
// own application as a jumping off point

// Please read our "Introduction to Cypress"
// https://on.cypress.io/introduction-to-cypress

describe('Choices', () => {
  context('Misc', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });

    it('.end() - end the command chain', () => {
      // cy.end is useful when you want to end a chain of commands
      // and force Cypress to re-query from the root element

      // https://on.cypress.io/end
      cy.get('.misc-table').within(() => {
        // ends the current chain and yields null
        cy.contains('Cheryl').click().end();

        // queries the entire table again
        cy.contains('Charles').click();
      });
    });

    it('cy.exec() - execute a system command', () => {
      // cy.exec allows you to execute a system command.
      // so you can take actions necessary for your test,
      // but outside the scope of Cypress.

      // https://on.cypress.io/exec
      cy.exec('echo Jane Lane')
        .its('stdout').should('contain', 'Jane Lane');

      // we can use Cypress.platform string to
      // select appropriate command
      // https://on.cypress/io/platform
      cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`);

      if (Cypress.platform === 'win32') {
        cy.exec('print cypress.json')
          .its('stderr').should('be.empty');
      } else {
        cy.exec('cat cypress.json')
          .its('stderr').should('be.empty');

        cy.exec('pwd')
          .its('code').should('eq', 0);
      }
    });

    it('cy.focused() - get the DOM element that has focus', () => {
      // https://on.cypress.io/focused
      cy.get('.misc-form').find('#name').click();
      cy.focused().should('have.id', 'name');

      cy.get('.misc-form').find('#description').click();
      cy.focused().should('have.id', 'description');
    });

    it('cy.screenshot() - take a screenshot', () => {
      // https://on.cypress.io/screenshot
      cy.screenshot('my-image');
    });

    it('cy.wrap() - wrap an object', () => {
      // https://on.cypress.io/wrap
      cy.wrap({ foo: 'bar' })
        .should('have.property', 'foo')
        .and('include', 'bar');
    });
  });
});

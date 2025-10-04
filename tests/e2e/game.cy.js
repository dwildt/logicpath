describe('LogicPath Game', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the game', () => {
    cy.contains('LogicPath').should('be.visible');
    cy.get('.game-board').should('be.visible');
    cy.get('.command-panel').should('be.visible');
  });

  it('should have control buttons', () => {
    cy.get('.btn-play').should('be.visible');
    cy.get('.btn-restart').should('be.visible');
    cy.get('.btn-map').should('be.visible');
    cy.get('.btn-about').should('be.visible');
  });

  it('should have available command blocks', () => {
    cy.get('[data-command="forward"]').should('be.visible');
    cy.get('[data-command="left"]').should('be.visible');
    cy.get('[data-command="right"]').should('be.visible');
  });

  it('should open map selector', () => {
    cy.get('.btn-map').click();
    cy.get('.map-selector-modal').should('be.visible');
    cy.get('.map-thumbnail').should('have.length.greaterThan', 0);
  });

  it('should open about modal', () => {
    cy.get('.btn-about').click();
    cy.get('.about-modal').should('be.visible');
    cy.contains('About LogicPath').should('be.visible');
    cy.contains('Claude Code').should('be.visible');
  });

  it('should place blocks in command slots', () => {
    cy.get('[data-command="forward"]').click();
    cy.get('.block-slot.filled').should('have.length', 1);
  });

  it('should clear commands on restart', () => {
    cy.get('[data-command="forward"]').click();
    cy.get('[data-command="forward"]').click();
    cy.get('.block-slot.filled').should('have.length', 2);

    cy.get('.btn-restart').click();
    cy.get('.block-slot.filled').should('have.length', 0);
  });
});

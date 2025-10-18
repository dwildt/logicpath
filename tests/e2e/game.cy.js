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

    // Verify blocks are in the Commands section
    cy.get('.blocks-container .block-forward').should('exist');
    cy.get('.blocks-container .block-left').should('exist');
    cy.get('.blocks-container .block-right').should('exist');
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

  it('should place blocks in command slots via drag and drop', () => {
    // Verify blocks can be dragged to slots
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('commandType', 'forward');

    cy.get('.blocks-container .block-forward').trigger('dragstart', { dataTransfer });
    cy.get('.block-slot').first().trigger('drop', { dataTransfer });

    cy.get('.block-slot.filled').should('have.length', 1);
  });

  it('should clear commands on restart', () => {
    // Add a block
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('commandType', 'forward');
    cy.get('.blocks-container .block-forward').trigger('dragstart', { dataTransfer });
    cy.get('.block-slot').first().trigger('drop', { dataTransfer });
    cy.get('.block-slot.filled').should('have.length', 1);

    // Restart should clear the block
    cy.get('.btn-restart').click();
    cy.get('.block-slot.filled').should('have.length', 0);
  });
});

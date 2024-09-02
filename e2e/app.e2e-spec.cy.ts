describe('E2E tests for Stocks functionality', () => {
  it('should visit stocks dashboard and drill down to details', () => {
    cy.visit('/');
    cy.url().should('include', '/');
    cy.get('#searchStocksText').should('exist');
    cy.get('.stocks-container').should('exist');
    cy.get('#searchStocksText').as('searchTB');

    // Perform search of non existing stock
    cy.get('@searchTB').type('TENCENT');
    cy.get('.alert').should('exist');
    cy.get('@searchTB').clear();

    // Perform some search and drill down
    cy.get('@searchTB').type('AMZN');
    cy.get('.card-title').should('contain', 'AMZN');
    cy.get('.details-btn').click();

    // Check details page
    cy.get('.card-title').should('contain', 'AMZN');
    cy.get('table').should('exist');
    cy.get('table tbody tr').should(($trs) => {
      expect($trs).to.have.length(5);
    })
    cy.get('canvas').as('chart');
    cy.get('@chart').should('exist');
    cy.get('@chart').should('have.attr', 'style');
    cy.get('@chart').should('have.attr', 'width');
    cy.get('@chart').should('have.attr', 'height');

    // Back to main page
    cy.get('.navbar-brand').click();
    cy.url().should('include', '/');
  });
});
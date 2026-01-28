describe('Position Kanban Page Load', () => {
    const positionId = 11; // Senior Full-Stack Engineer

    beforeEach(() => {
        cy.visit(`/positions/${positionId}`);
    });

    it('should load the position page and display the correct title', () => {
        // Assert on the specific title from seeded data
        cy.get('h2').should('contain.text', 'Senior Full-Stack Engineer');
    });

    it('should render all kanban columns (phases)', () => {
        // Based on StageColumn.js, using .card-header for titles
        const expectedPhases = ['Initial Screening', 'Technical Interview', 'Manager Interview'];
        
        cy.get('.card-header').should('have.length', 3);
        expectedPhases.forEach((phase) => {
            cy.get('.card-header').should('contain.text', phase);
        });
    });

    it('should render candidates in their respective columns', () => {
        // Based on CandidateCard.js structure
        
        // "Initial Screening" column verification
        // Finding the column by its header, then checking body for specific candidate
        cy.contains('.card', 'Initial Screening').within(() => {
            cy.contains('.card-title', 'Carlos García').should('be.visible');
        });

        // "Technical Interview" column verification
        cy.contains('.card', 'Technical Interview').within(() => {
            cy.contains('.card-title', 'John Doe').should('be.visible');
            cy.contains('.card-title', 'Jane Smith').should('be.visible');
        });

        // "Manager Interview" column verification (should be empty initially)
        cy.contains('.card', 'Manager Interview').within(() => {
            cy.get('.card-body .card').should('not.exist');
        });
    });
});

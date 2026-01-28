describe('Candidate Drag and Drop Flow', () => {
    const positionId = 11;

    beforeEach(() => {
        cy.visit(`/positions/${positionId}`);
        // Intercept specific backend calls
        cy.intercept('PUT', 'http://localhost:3010/candidates/*').as('updateCandidate');
    });

    it('should drag a candidate to a new phase and update the backend', () => {
        // Target candidate "John Doe" in "Technical Interview" column
        // We use the candidate name to find the specific card
        cy.contains('.card-title', 'John Doe')
            .closest('.card') // Get the card container
            .as('candidateCard');

        // Verify initial state: John Doe is in Technical Interview
        cy.contains('.card-header', 'Technical Interview')
            .parent()
            .within(() => {
                cy.contains('John Doe').should('be.visible');
            });

        // Perform Drag and Drop using Keyboard (Accessiblity mode for react-beautiful-dnd)
        // 1. Focus the card
        cy.get('@candidateCard').focus().trigger('keydown', { keyCode: 32, force: true }); // Space to lift
        cy.wait(200);

        // 2. Move right (ArrowRight) to next column (Manager Interview)
        // Adjust number of presses based on UI. Assuming Manager Interview is next.
        cy.get('@candidateCard').trigger('keydown', { keyCode: 39, force: true }); // ArrowRight
        cy.wait(200);

        // 3. Drop
        cy.get('@candidateCard').trigger('keydown', { keyCode: 32, force: true }); // Space to drop
        cy.wait(500); // Wait for animation/update

        // Backend Verification
        cy.wait('@updateCandidate').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            // Verify payload or part of it if possible
            expect(interception.request.body).to.have.property('currentInterviewStep');
        });

        // Visual Verification: Candidate should now be in "Manager Interview"
        cy.contains('.card-header', 'Manager Interview')
            .parent()
            .within(() => {
                cy.contains('John Doe').should('exist');
            });
    });
});

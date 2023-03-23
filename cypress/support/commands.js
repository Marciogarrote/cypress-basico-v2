Cypress.Commands.add('fillMandatoryFieldsAndSubmit',function(){
    cy.get('#firstName').type('Marcio')
    cy.get('#lastName').type('Garrote')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type('Teste vindo do Commands') 
    cy.contains('button','Enviar').click()
    
})
//it('testa a página da política de privacidade de forma independente',function(){
    //cy.visit('./src/privacy.html')
    //cy.contains('Talking About Testing').should('be.visible')   
//})

//Testando o Lodash
// .times é uma função que recebe como primeiro argumento quantas vezes serão executados os testes
Cypress._.times(3, function(){
    it('testa a página da política de privacidade de forma independente',function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')   
    })
})
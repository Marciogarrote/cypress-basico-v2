// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

///<reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function(){
        //Função de callback
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE'

        cy.get('#firstName').type('Marcio')
        cy.get('#lastName').type('Garrote')
        cy.get('#email').type('teste@gmail.com')
        //Quando deseja digitar uma texto longo podemos usar o delay como segundo argumento, para isso criamos uma variavel, passamos essa variaval mais um segundo argumento = 0 
        cy.get('#open-text-area').type(longText,{delay:0}) 
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Marcio')
        cy.get('#lastName').type('Garrote')
        cy.get('#email').type('testegmail.com') 
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Marcio')
        cy.get('#lastName').type('Garrote')
        cy.get('#email').type('teste@gmail.com') 
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste') 
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')   
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Marcio')
            .should('have.value', 'Marcio')
            .clear()
            .should('have.value','')
        cy.get('#lastName')
            .type('Garrote')
            .should('have.value', 'Garrote')
            .clear()
            .should('have.value','')
        cy.get('#email')
            .type('teste@gmail.com')
            .should('have.value','teste@gmail.com')
            .clear()
            .should('have.value','')
        cy.get('#phone')
            .type('123456789')
            .should('have.value','123456789')
            .clear()
            .should('have.value','')
    })

    it('chamado exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') 
    })

    

})

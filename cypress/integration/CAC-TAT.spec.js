// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

///<reference types="Cypress" />
  
describe('Central de Atendimento ao Cliente TAT', function(){
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function(){
        //Função de callback
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    //SEÇÃO 3 - Digitando em campos e clicando em elementos
    
   it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE'
        cy.get('#firstName').type('Marcio')
        cy.get('#lastName').type('Garrote')
        cy.get('#email').type('teste@gmail.com')
        //Quando deseja digitar uma texto longo podemos usar o delay como segundo argumento, para isso criamos uma variavel, passamos essa variaval mais um segundo argumento = 0 
        cy.get('#open-text-area').type(longText,{delay:0}) 
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')
    })
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Marcio')
        cy.get('#lastName').type('Garrote')
        cy.get('#email').type('testegmail.com') 
        cy.get('#open-text-area').type('Teste') 
        cy.contains('button','Enviar').click()
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
        cy.contains('button','Enviar').click()
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
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible') 
    })

    //Comando customizado
    it('envia o formulário com sucesso usando um comando customizado',function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    //SEÇÃO 4 - Selecionando opções em campos de seleção suspensa
    it('seleciona um produto (YouTube) por seu texto',function(){
        cy.get('#product').select('YouTube').should('have.value','youtube')
        
    })

    it('seleciona um produto (Mentoria) por seu valor (value)',function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria') 
    })

    it('seleciona um produto (Blog) por seu índice',function(){
        cy.get('#product').select(1).should('have.value','blog')
    })
    
    //SEÇÃO 5 - marca o tipo de atendimento "Feedback"

    //É importante sempre utilizar o ckeck ou o uncheck para campos de radio, porque se utilizarmos o .click se por uma acaso 
    //o campo que está sendo testado estiver marcado utilizando o .click ele será desmarcado e o teste irá falhar
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento',function(){
       cy.get('input[type="radio"]').should('have.length',3) //verificação intermediaria para saber quantos tipos radio tem
       .each(function($radio){ 
        cy.wrap($radio).check() //Empacota o elemento e pode mandar comandos do cypress
        cy.wrap($radio).should('be.checked')
       })
    })

    //SEÇÃO 6 - Marcando (e desmarcando) inputs do tipo checkbox    
    it('marca ambos checkboxes, depois desmarca o último',function(){
        cy.get('input[type="checkbox"]') //verifica todos os checkbox
        .check() //marca todos os check box
        .should('be.checked') //verifica que ambos checkbox estão marcados
        .last()     //verifica o último checkbox
        .uncheck()  //desmarca o último checkbox
        .should('not.be.checked') //verifica se o último checkbox foi desmarcado
    })   

    it('mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Marcio')
        cy.get('#lastName').type('Garrote')
        cy.get('#email').type('teste@gmail.com') 
        cy.get('#phone-checkbox').check() // alteração do teste de telefone marcado de .click para .check para a semantica
        cy.get('#open-text-area').type('Teste') 
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //SEÇÃO 7 - Fazendo upload de arquivos com Cypress

    //Pegou o elemento verificou que não tinha valor, fez o select file e anexou o evento e verificou o nome do arquivo
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]#file-upload') //que tem o seletor e o id ou somente o input do tipo file
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')//encadeou um should
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })

    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('input[type="file"]#file-upload')
        .should('not.have.value')
        //Primeiro argumento é o arquivo e o segundo argumento é o objeto
        //Simula como se tivesse arrastando o arquivo para cima da aplicação
        .selectFile('./cypress/fixtures/example.json',{action:'drag-drop'}) 
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as ('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile') //pode passar o caminho relativo interio ou dar um Alias para a fixture
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //SEÇÃO 8 - Lidando com links que abrem em outra aba
    //existe uma parte dessa aula que faz parte do privacy.spec.js
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        //Fez um seletor para pegar o nosso ancor, que esta dentro do elemento com o id privacy
        //vizemos uma verificação com o should 
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    //SEÇÃO 9 : Simulando as dimensões de um dispositivo móvel
    //As Aulas da Seção 9 foram todas no Package.json onde foram criados 
    //"cy:open:mobile":"cypress open --config viewportWidth=410 viewportHeight=860", que serve para configurar o navegador do Cypress para ficar mobile
    //test:mobile":"cypress run --config viewportWidth=410,viewportHeight=860" para rodar via viewport sem navegador


    //SEÇÃO 12: Avançando no uso do Cypress
    it('preenche os campos obrigatórios e envia o formulário', function(){
        const longText = 'TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE, TESTE'

        cy.clock() //congelar o relogio do navegador

        cy.get('#firstName').type('Marcio')
        cy.get('#lastName').type('Garrote')
        cy.get('#email').type('teste@gmail.com')
        //Quando deseja digitar uma texto longo podemos usar o delay como segundo argumento, para isso criamos uma variavel, passamos essa variaval mais um segundo argumento = 0 
        cy.get('#open-text-area').type(longText,{delay:0}) 
        cy.contains('button','Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS) // avança no tempo no caso 3 segundos

        cy.get('.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()
        cy.get('#firstName').type('Marcio')
        cy.get('#lastName').type('Garrote')
        cy.get('#email').type('testegmail.com') 
        cy.get('#open-text-area').type('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida') 
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.clock()
        cy.get('#firstName').type('Marcio')
        cy.get('#lastName').type('Garrote')
        cy.get('#email').type('teste@gmail.com') 
        cy.get('#phone-checkbox').check() // alteração do teste de telefone marcado de .click para .check para a semantica
        cy.get('#open-text-area').type('mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário') 
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('chamado exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.clock()
        cy.contains('button','Enviar').click()
        cy.get('.error').should('be.visible') 
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado',function(){
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    //Testando loadsh
    Cypress._.times(6, function(){
        it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
            cy.get('#phone')
                .type('abcdefghij')
                .should('have.value', '')
        })
    })
    
    //Invoke
    //Show vai mostrar o objeto
    //Hide esconde o objeto
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      it('preenche a area de texto usando o comando invoke', function(){
        const longText = Cypress._.repeat('0123456789', 20)

        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
      })

        //Teste que estou fazendo para vez se é possivel testar botão
      it('teste Cypress._.repeat', function(){
        const test = Cypress._.repeat(cy.get('#phone-checkbox').check(), 20)
      }) 

        //Com o Cypress da para fazer requisição a nivel de rede, nesse caso abaixo fazemos um GET para esse URL, depois mandamos um should para fazer a verificação
        //e dentro do should passamos a function de callback e essa function recebe a resposta da requisição , assim desistrtuturamos o status, statusText e o body 
      it('faz uma requisição HTTP',function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response){
            //Desistruturação de objeto função do JS
            //Para desistruturar abrimos o const
            const {status, statusText, body} = response
            expect(status).to.equal (200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
            })
      })

      it('encontre o gato escondido', function(){
        //Desmarcando um DisplayNone
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
        //Alterando o Texto do TITULO e SUBTITULO
        cy.get('#title')
            .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu estou aprendendo Cypress 💀')
      })
})

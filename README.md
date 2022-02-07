# api.hublab-test

O teste consiste em construir um sistema de chat simples com autenticação de usuário via token jwt, criação de salvas, envio e recebimento de mensagens.

## Tecnologias
* Nodejs
* Express
* Socket.io
* Mongodb
* Mongoose
* Typescript

## Requerimentos
Para rodar a api localmente é necessário:

* [docker](https://docs.docker.com/engine/install/) e [docker-compose](https://docs.docker.com/compose/install/)
  * São necessários pois o banco de dados é construido localmente via docker utilizando o docker-compose.
* [npm](https://www.npmjs.com/) ou [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
* nodejs

## Configurando e iniciando a api
1 - Para inciar a api, deve-se primeiro instalar as dependencias necessárias, para isso, acesse a pasta raiz do projeto e rode um dos comandos abaixo:
  * `npm install` ou `yarn`
  
2 - Depois das depêndencias instaladas, é preciso configurar o banco. Para isso, com o docker e o docker-compose já instalados, ainda na pasta raiz da api e rode o comando ` docker-compose up -d`

3 - Após isso, ainda na pasta raiz, basta rodar alguns dos comandos abaixo: 
  * `npm run dev` ou `yarn dev` : Inicia a api em modo de desenvolvimento com auto reload
  * `npm start` ou `yarn start`: Inicia a api em modo de "produção"

Pronto! A api estará rodando na porta padrão (3000) ou na porta que você configurou o .env (caso o tenha modificado)

Quando a api é inciada, é criado um usuário de testes para a api e também uma sala (Olympus) que pode ser vista no fron na tela de 'join room': 
```
  {
	  "email": "cleitonbomdeguerra@olimpus.com",
	  "password": "ihatezeus123"
  } 
```

## Utilizando a api
A api funciona no protocoolo REST com os seguintes endpoints:
  *OBS:* _É necessário a utilização de um Bearer token no header de autenticação em alguns endpoints_
  
  *Exemplo de Authorization header* : ` Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmE5NmVhOWZhM2Y4YjZhZmIzNzE1OSIsImlhdCI6MTY0MzkzNTI1NCwiZXhwIjoxNjQzOTM4ODU0fQ.cZHXz3hOCRn_S7Smhc_vkzg-v56rdT9EN4t9AL-5NpY `
    
     O token é retornado no enndpoint `/auth`
  
  * [/](http://localhost:3000) : 
    * `GET` : Serve apenas como healthcheck da api.
    
  * [/auth](http://localhost:3000/auth) : 
    * `POST`: Serve para autenticar um usuário, passando o seguinte peyload:
      ```
        {
	        "email": "email",
	        "password": "senha"
        } 
      ```
      Se a autenticação funcionar, será retornado um token jwt que será utilizado no header `Authentication`.
      
  * [/user](http://localhost:3000/user) :
    * `POST`: Serve para criação de um usuário, passando o seguinte payload: 
      ```
        {
	        "email": "email",
	        "password": "senha",
          "name": "nome"
        } 
      ```
  
  * [/room](http://localhost:3000/room) :
    * Necessário a utilização do header de autenticação
    * `POST`: Serve para criação de uma sala de chat, passando o seguinte payload: 
      ```
        {
          "name": "nome"
        } 
      ```
      
  * [/room](http://localhost:3000/room/all) :
    * Necessário a utilização do header de autenticação
    * `GET`: Retorna todas as salas existentes no banco


* Para uma utilização visual, e para utilizar as funções de chat
	* Acesse o frontend: https://github.com/mateusdreher/app.hublab-test

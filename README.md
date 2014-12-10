DownloaderServer
================

Projeto em NodeJS que consiste em montar um servidor que recebe URLs de arquivos, para serem baixados.



Como Instalar
================

Para que seja possível instalar é preciso baixar o NodeJS( http://nodejs.org/download/ ).


Após a instalação é preciso baixar o conteúdo (https://github.com/acbp/DownloaderServer/archive/master.zip).


Extraía o conteúdo,  no diretório abra a linha de comando no diretório e digite o comando:


        npm install


Agora espere termina a instalação.


Como Usar
================

Para iniciar o servidor em NodeJS, é preciso abrir a linha de comando no diretório e digitar:


        node server.js


Para mandar o servidor baixar o conteúdo, é preciso acessar:

    http://'IP/endereço do servidor':666/add/<URL1>
  
  
Para criar uma lista de download, usar '!!!' entre as URLs:


    http://'IP/endereço do servidor':666/add/<URL1>'!!!'<URL2>
  
  
  ignorar os '<>'

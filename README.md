DownloaderServer
================

Projeto em NodeJS que consiste em montar um servidor que recebe URLs de arquivos, para serem baixados.


Como Usar
================

Para mandar o servidor baixar o conteúdo, é preciso acessar:
  http://'IP/endereço do servidor':666/add/<URL1>
  
Para criar uma lista de download, usar '!!!' entre as URLs:
  http://'IP/endereço do servidor':666/add/<URL1>'!!!'<URL2>
  
  ignorar o '<>'

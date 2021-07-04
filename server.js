const env = { PORT: process.env.PORT || 1337 }
const http = require('http')
const fs = require('fs')

const ce = console.error;
const cl = console.log;

// Separar o conteúdo por queryParams ou por body
const serverFn = ( q,r )=>{
    
}

// subprocesso que fazer o download e escrita do arquivo no disco
// todo: verificar se espaço no disco
// todo: pegar arquivo
// todo: escrever stream em disco
const child = ()=>{}

// fazer o download do elemento em disco
const downloader = (url)=>{}

// escreve em disco
const writer = ()=>{}

// access files on disk, can write/read
const writeFile = ({name, content, flag = "w+", append = false}) => {
    try{
        if(!append) fs.writeFile(`./${name}`, content, { flag })
        if(append) fs.appendFile(`./${name}`, content)
    }
    catch(e){
        ce('[ writeFile ] err',{params:{name,flag,append}, err:e})
    }
}

// logger - cria arquivo, escreve na ultima linha o IP, tamanho e url pra cada ação
const logger = ()=>{}

http.createServer(serverFn).listen(env.PORT,()=> console.log(`Running on ${env.PORT}`))

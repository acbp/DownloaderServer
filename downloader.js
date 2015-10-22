//Pacotes usados
var express = require("express"), //importa express
    app = express(), //defina app com express
    bodyParser = require("body-parser"), // parser de html
    url = require('url'), // paser de url
    fs = require('fs'), // maniplua arquivos do sistema ( file system )
    http = require('http'), // maniular https
    https = require('https'), // manipular https

    port = process.env.PORT || 666; //configura porta

//Permite usar o bodyParser 
// para pegar o POST 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// VÁRAVÉIS GLOBAIS
var dir = './Downloads/' || '../../../downloads/FromBot/',
    working = false,
    arr,
    log = "File names:",
    fileType,
    file;


//Pegar a url, cria/abre arquivo em disco
function get( url ) {

    if (url) {
        var _file= arr[0].substr(arr[0].lastIndexOf('/') + 1, arr[0].length);
        
        
        console.log('::',_file);
        
        //Cria arquivo em disco
        file = fs.createWriteStream( dir+ _file );
        console.log("...file created...");

        if (url.match("https")) {
            console.log('...https...');
            https.get(url, download);
        } else {
            console.log('...http...');
            http.get(url, download);
        }
    }

    //    return;
    //    name = url.substr(url.lastIndexOf('/') + 1, url.length);
    //
    //    fs.exists(name, validFile);
};

//Responsável por baixar os arquvios
function download(response) {
    var dados=response.headers['content-type'];
    fileType='.'+dados.substr(dados.lastIndexOf('/')+1 , dados.length);
    console.log('...Downloading...');
    response
        .on('data', writeFile)
        .on('end', processFile);
    //console.log("ok");
};

//Escreve dados para um arquivo
function writeFile(data) {
    file.write( data );
}
//Salvar arquivo em disco e manda baixar proximo da lista
function processFile() {
    // Termina escrita de arquivo
    file.end();
   
    // marca nome do arquivo
   var fileName = arr[0].substr(arr[0].lastIndexOf('/') + 1, arr[0].length);

    log += '\n' + fileName;
    
    console.log('...downloaded ! '+fileName,  (new Date()));
    
    // remove elemento em 0
    arr.shift();

    // valida se elemento existe
    if (arr[0]) {
        
        // remove elemento
        while (arr[0] === "") {
            arr.shift();
        }

        // recursiva para proximo arquivo da lista
         return get(arr[0]);
    } //if(arr[0])
    
    //Marca como processo de download terminado
    working = false;
    
    console.log(log);
} // processFile


// ROTAS DA API
var rota = express.Router(); // pega instância

// middleware para usada para todas as rotas
rota.use(function (req, rsp, nxt) {
    var fail = true,     i,   
        shortUrl = req.url,
        urlLength = shortUrl.length,
        hasAdd = shortUrl.indexOf('add') < 1;
    
    
    // valida se tem algo pra adicionar
    if (hasAdd||shortUrl.indexOf('data:')>-1) {
        return rsp.json('Nope! ' + (new Date()));
    }
    
    // fazer tratamento para 'data:image/jpeg;base64, (dados)'
    

    // instancia array 
    if (!arr) {
        arr = []
    }

    // Recorta url com HTTP
    url = shortUrl.substr(5, urlLength);

    // Separa elementos por !!!
    arr = arr.concat(url.split('!!!'));

    i=arr.length;
    while( i--){
        if(arr[i].match('//')===null){
           arr.splice(i,1); 
        }
    }
    
    // Dispara função para baixar conteúdo 
    //SE não estiver funcionando
    if ( working ===false )
        get(arr[0]);

    rsp.json('Ok! on ' + (new Date()));

});

//prefixa as rotas para /api
app.use('/', rota);

//inicia servidor
app.listen(port);
console.log("Ouvindo porta:[ " + port + " ] ♪");

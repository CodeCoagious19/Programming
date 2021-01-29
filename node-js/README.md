# Node.js

- [Node.js](#nodejs)
  - [Cos'è node](#cosè-node)
  - [Install node](#install-node)
  - [Prima applicazione nodejs](#prima-applicazione-nodejs)
  - [Non esiste l'oggetto window](#non-esiste-loggetto-window)
  - [global objects](#global-objects)
  - [Modules](#modules)
  - [Creiamo un modulo](#creiamo-un-modulo)
  - [Moduli built-in](#moduli-built-in)
  - [Modulo path](#modulo-path)
  - [Modulo OS](#modulo-os)
  - [Modulo File System](#modulo-file-system)
  - [Eventi](#eventi)
  - [Modulo HTTP](#modulo-http)
  - [Approfondimenti](#approfondimenti)
    - [Passare dei parametri esterni](#passare-dei-parametri-esterni)
    - [My first IO sync](#my-first-io-sync)
    - [My first IO async](#my-first-io-async)
  - [Filtered](#filtered)

## Cos'è node

Node è un programma c++ che include l'engine javascript V8 di Chrome javascript che ti permette di programmare il server con Javascript

## Install node

Verifica se hai già installato node

```cmd
node --version
```
Se il comando `node` non è riconosciuto significa che lo hai installato, quindi installalo da [qui](https://nodejs.org/it/download/)

Lancia nuovamente:

```cmd
node --version
```

A questo punto dovrebbe rispondere con la versione appena installata:

```cmd
v14.15.4 
```

## Prima applicazione nodejs

Crea un file `.js` ad esempio `app.js` e scrivi codice javascript

```js
function sayHello(name){
    console.log(name);
}

sayHello('simone');
```

Adesso, digitando da terminale:

```cmd
node app.js
```

Vedrai:

```cmd
simone
```

node eseguirà direttamente il codice sul terminale. Il programma di node trasferirà il codice all'engine V8 il quale poi verrà tradotto in c++ per essere letto dalla macchina (?almeno credo?)

## Non esiste l'oggetto window

non esiste l'oggetto globale window poichè fa parte del runtime environment che si ha nei browser

```js
console.log(window);
```

```cmd
ReferenceError: window is not defined  
```

In nodejs l'oggetto globale si chiama `global` ed è condiviso e accessibile ovunque

## global objects

Hai accesso a tutte le funzionalità definite da javascript grazie all'oggetto `global`

```js
global.console.log(); 

global.setTimeout();
global.clearTimeout();
 
global.setInterval();
global.clearInterval();
```

L'oggetto `global` è implicito quindi puoi sempre ometterlo

```js
console.log(); 

setTimeout();
clearTimeout();
 
setInterval();
clearInterval();
```

**Locale o globale?**

```js
//Javascript nel tuo browser
//Globale
var message = '';

```

In Javascript è una variabile **globale**, poichè viene aggiunta all'oggetto `window`. In node questa assume uno scope **locale** al file. In altre parole non viene aggiunta all'oggetto `global`

```js
//nodejs
//Locale
var message = '';
console.log(global.message);

//undefined
```

Attenzione che, dichiarando una variabile, assume uno scope **locale** al file contrariamente a quanto accadeva con Javascript. Infatti con Javascript una variabile 

## Modules

Il concetto di modulo serve proprio a incapsulare la definizione di variabili, classi e quantaltro evitando quindi eventuali problemi di conflitto tra calssi o variabili che verrebbero brutalmente sovraiscritti.

nel concetto di nodejs, ogni file è considerato un modulo

Se si parla di OOP, si potrebbe dire che all'interno di ogni file tutti gli oggetti sono privati al container che è il file.

Se vuoi utilizzare ed esportare dei dati esternamente devi renderli pubblici esplicitamente

Ogni applicazione nodejs ha un modulo `main`

Per adesso non abbiamo ancora definito un modulo node ma a breve lo faremo.
`module` è un oggetto richiamabile esattamente come `global` o `window` nel caso di javascript all'interno di un browser

```js
console.log(module);

/**
 * Module {
  id: '.',
  path: 'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\first-app',
  exports: {},
  parent: null,
  filename: 'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\first-app\\app.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\first-app\\node_modules',  
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\node_modules',
    'C:\\Users\\Di Ricco\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}
 */
```

## Creiamo un modulo

In questo esempio creeremo un modulo, quindi un file `js` chiamato `logger.js`. In questo file definiremo una funzione e una variabile ed esporteremo la funzione esternamente. In realtà dovremmo parlare di **metodo** poichè di fatto è appartenente al modulo `logger.js` che è racchiuso in un oggetto

```js
var url = 'http://mylogger.io/log';

function log(message) {
    //send an HTTP request
    console.log(message);
}

//esporto esternamente il metodo log (appartenente a questo modulo "logger.js")
module.exports.log = log;


//module.exports.url = url;
```

Nel file `app.js` andremo a richiamare l'oggetto restituito

```js
//require ritorna l'oggetto esportato dal modulo
var logger = require('./logger');
console.log(logger);

/**
 * { log: [Function: log] }
 */
```

la variabile `logger` ritorna ciò che esporta il modulo `logger.js`

infatti stampando `module` da `logger.js` avremo:

```js
var url = 'http://mylogger.io/log';

function log(message) {
    //send an HTTP request
    console.log(message);
}

//esporto esternamente il metodo log (appartenente a questo modulo "logger.js")
module.exports.log = log;

console.log(module);

//module.exports.url = url;

/*
Module {
  id: '.',
  path: 'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\first-app',
  exports: { log: [Function: log] },
  parent: null,
  filename: 'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\first-app\\logger.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\first-app\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\node_modules',
    'C:\\Users\\Di Ricco\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}
*/
```

la property `exports` è l'oggetto esportato esternamente.

Ad ogni modo, adesso posso usare il metodo `log` del modulo `logger`.

```js
/*logger.js*/

var url = 'http://mylogger.io/log';

function log(message) {
    //send an HTTP request
    console.log(message);
}

//esporto esternamente il metodo log (appartenente a questo modulo "logger.js")
module.exports.log = log;
```

```js
/*app.js*/

//require ritorna l'oggetto esportato dal modulo
var logger = require('./logger');

logger.log('ciao');
```

```cmd
>node .\app.js
ciao
```

**E' buona norma utilizzare il qualificatore `const` per i moduli importati** questo perchè non vogliamo in nessun modo che vengano sovraiscritti erroneamente. Se accidentalmente si prova a cambiare il valore di una costante, viene sollevato un errore a runtime

```js
/*app.js*/

//require ritorna l'oggetto esportato dal modulo
const logger = require('./logger');

logger.log('ciao');
```

di sotto vedrai come esportare la funzione `log` in quanto funzione e non come metodo di un oggetto

```js
/*logger.js*/

var url = 'http://mylogger.io/log';

function log(message) {
    //send an HTTP request
    console.log(message);
}

//esporto esternamente il metodo log (appartenente a questo modulo "logger.js")
module.exports = log;
```

```js
/*app.js*/

//require ritorna l'oggetto esportato dal modulo
var log = require('./logger');

log('ciao');
```

```cmd
>node .\app.js
ciao
```

Stampiamo in questo caso cosa esporta il modulo `logger`

```js
/*logger.js*/

var url = 'http://mylogger.io/log';

function log(message) {
    //send an HTTP request
    console.log(message);
}

//esporto esternamente il metodo log (appartenente a questo modulo "logger.js")
module.exports = log;

console.log(module);

/*
Module {
  id: '.',
  exports: [Function: log],
  parent: null,
  filename: 'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\first-app\\logger.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\first-app\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\node_modules',
    'C:\\Users\\Di Ricco\\Google Drive\\node_modules',
    'C:\\Users\\Di Ricco\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}
*/
```

## Moduli built-in

Sulla pagina ufficiale di node.js puoi trovare la sezione relativa alla [documentazione]([https://link](https://nodejs.org/dist/latest-v14.x/docs/api/)).



## Modulo path

Nel prossimo esempio useremo il modulo `path` che fornisce delle utility per lavorare con file e directory.

Utilizzeremo in particolare il metodo `parse()`

Il metodo `parse()` restituisce un oggetto le cui proprietà rappresentano elementi significativi del percorso.

L'oggetto ritorna le seguenti proprietà:

- `dir <string>`
- `root <string>`
- `base <string>`
- `name <string>`
- `ext <string>`

Vediamo un esempio:

```js
const path = require('path');
const pathObj = path.parse('./app.js');

console.log(pathObj);

/**
 * { root: '', dir: '.', base: 'app.js', ext: '.js', name: 'app' }
 */
```

## Modulo OS

La documentazione del modulo `os` la trovi [qui]([https://link](https://nodejs.org/dist/latest-v14.x/docs/api/os.html))

In questo esempio vedremo come usare il modulo `os` e in particolare i metodi `totalmem()` e `freemem()` che restituiscono informazioni rispettivamente sulla memoria totale di sistema e la memoria libera

```js
const os = require('os');

const totalMemory = os.totalmem();
const freeMemory = os.freemem();

console.log('Total Memory ' + totalMemory);
console.log(`Free Memory: ${freeMemory}`);

/**
 * Total Memory 8502140928
 * Free Memory: 4154499072
 */
```

## Modulo File System

Puoi trovare l'intera documentazione [qui](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html). In particolare vedremo il metodo [fs.readdirSync(path[, options])](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readdirsync_path_options) e il metodo [fs.readdir(path[, options], callback)](https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_fs_readdir_path_options_callback)

Metodo sincrono `readdirSync()`. Ritorna un array di elementi contenuti al path passato come parametro.

E' un metodo sincrono!

I metodi sincroni sono anche detti bloccanti in quanto impegnano la CPU per tutto il tempo necessario al completamento dell'attività impedendo al codice di proseguire e servire le altre attività.
Questo è il funzionamento tipico della programmazione procedurale sincrona

```js
const fs = require('fs');

//Metodo sincrono
const files = fs.readdirSync('./');

console.log(files);
```

Metodo asincrono `readdir()`. Ritorna (attraverso la callback) un array di elementi contenuti al path passato come primo parametro. Esegue la callback passata come secondo parametro.

I metodi asincroni sono anche detti non-bloccanti in quanto impegnano la CPU solo al momento di partenza dell'attività. In questo caso il codice può proseguire con le altre attività. Una volta che il metodo avrà concluso l'attività, verrà eseguita una cosìdetta "callback" una funzione in grado di comunicare se il risultato è andato a buon fine oppure no. In una funzione "callback", il primo parametro rappresenta l'errore (eventuale), il secondo parametro rappresenta il valore di ritorno del metodo. Nel caso della `readdir()` rappresenta l'array di file contenuti al path specificato come primo parametro della `readdir()` 


```js
const fs = require('fs');

//Metodo asincrono
fs.readdir('./', function(err, files){
    if(err) console.log('Error', err);
    else console.log('Result', files);
});

/*
Result [ 'app.js', 'logger.js' ]
*/
```

Simuliamo un errore:

```js
const fs = require('fs');

//Metodo asincrono

fs.readdir('aaaaa', function(err, files){
    if(err) console.log('Error', err);
    else console.log('Result', files);
});

/*
Error [Error: ENOENT: no such file or directory, scandir 'C:\Users\Di Ricco\Google Drive\Intecs\Saleri\Appunti-nodejs\first-app\aaaaa'] {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'scandir',
  path: 'C:\\Users\\Di Ricco\\Google Drive\\Intecs\\Saleri\\Appunti-nodejs\\first-app\\aaaaa'
}
*/
```

## Eventi

La documentazione sugli eventi, in particolare la classe `EventEmitter` la puoi trovare [qui]([https://link](https://nodejs.org/dist/latest-v14.x/docs/api/events.html#events_class_eventemitter))

Per poter far scattare un evento hai bisgono di:
- `emitter.on()`: Il metodo `on()` si mette in ascolto dell'evento passato come primo parametro. Questa pratica in inglese si chiama "to register a listener". Inolte in questa fase stabilisci cosa fare quando l'evento scatta tramite una callback.
- `emitter.emit()`: Il metodo `emit()` fa scattare un evento. Quando scatta torna al listener come callback.

```js
//events ritorna una classe, la classe degli eventi
const EventEmitter = require('events');
//in questo modo ho istanziato un oggetto della classe EventEmitter, chiamando il suo costruttore senza nessun parametro
const emitter = new EventEmitter();

//Register a listener.
//devi registrare un listener prima che l'evento scatti.
//E' un po' come abilitare l'interrupt per un particolare evento nei sistemi embedded e implementare l'ISR
emitter.on('messageLogged', function(){
    console.log('listener called')
})

//Raise an event
//L'evento può scattare solo dopo che è stato registrato il listener.
emitter.emit('messageLogged');
```

E' possibile ritornare un parametro al listener. Normalmente questo parametro viene passato come oggetto per maggiore chiarezza. La funzione di callback si aspetta un parametro. Vediamo un esempio:

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

//Register a listener.
emitter.on('messageLogged', function(eventArg){
    console.log('listener called', eventArg)
})

//Raise an event
emitter.emit('messageLogged', {id: 1, url: 'https://'});

/*
listener called { id: 1, url: 'https://' }
*/
```

Puoi usare anche la sintassi "arrow function"

```js
const EventEmitter = require('events');
const emitter = new EventEmitter();

//Register a listener.
emitter.on('messageLogged', (eventArg) => {
    console.log('listener called', eventArg)
})

//Raise an event
emitter.emit('messageLogged', {id: 1, url: 'https://'});
```

Normalmente gli eventi possono scattare da ogni modulo ma vorresti averne il controllo sul tuo main module.
Vedremo adesso come mettersi in ascolto da eventi che possono scattare da altri moduli facendo uso delle classi

```js
/*logger.js*/
const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

//"Logger" contiene tutti i metodi e le proprietà di "EventEmitter"
class Logger extends EventEmitter {
    log(message) {
        //send an HTTP request
        console.log(message);
    
        //Raise an event
        this.emit('messageLogged', {id: 1, url: 'https://'});
    }
}

module.exports = Logger;
```

```js
/*app.js*/
const Logger = require('./logger');
const logger = new Logger();

//Register a listener.
logger.on('messageLogged', (eventArg) => {
    console.log('listener called', eventArg)
})
logger.log('message');

/*
message
listener called { id: 1, url: 'https://' }
*/
```

## Modulo HTTP

Se lanci questa applicazione con node.js
```js
const http = require('http');
const server = http.createServer();

server.on('connection', (socket) => {
    console.log('New connection');
})

server.listen(3000);

console.log('Listening on port 3000..');
```

e poi dal tuo browser digiti `localhost:3000` vedrai stampato `New connection`

```js
const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('hello world');
        res.end();
    }

    if(req.url === '/api/courses'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});


server.listen(3000);

console.log('Listening on port 3000..');
```

## Approfondimenti 

Alcuni riferimenti utili:

- puoi imparare node su [nodeschoold](https://nodeschool.io/it/#workshoppers). Cliccando su `learnyounode` Ti suggerirà di scaricare tramite `npm` un simpatico software per l'apprendimento di node. 
- puoi imparare le nuoe features di es6 su [es6 features](http://es6-features.org/#BlockScopedVariables)

### Passare dei parametri esterni

Eseguiremo l'esercizio `baby-steps` suggerito da learnyounode

```js
/*baby-steps.js*/
const argArray = process.argv;

let sum = 0;

argArray.forEach( (element, index) => {
    if (index >= 2) sum += Number(element);
});

console.log(sum);
```

Esegui ad esempio:
```cmd
node .\baby-steps.js 1 2 3
```

Vedrai:

```cmd
6
```

### My first IO sync

Nel prossimo esempio leggeremo un file di testo e stamperemo il numero di caratteri `a capo`. Faremo uso del modulo `fs` e del metodo `readFileSync()` per la lettura dei file in modo sincrono

```js
const fs = require('fs');


const buf = fs.readFileSync('./myFile.txt');
const str = buf.toString();
const strArr = str.split('\n');

console.log(buf);
console.log(str);
console.log(strArr);
console.log(strArr.length - 1);

/*
<Buffer 63 69 61 6f 20 0a 61 20 0a 74 75 74 74 69 0a 71 75 61 6e 74 69>
ciao 
a 
tutti
quanti
[ 'ciao ', 'a ', 'tutti', 'quanti' ]
3
*/
```
Di default `readFileSync()` resistutisce un oggetto della classe `Buffer` che puoi approfondire direttamente sulla documentazione di nodejs. 
In pratica comunque resitituisce i caratteri decodificandoli in binario attraverso `utf8` che è equivalente al codice ASCII.

Se vuoi verificare, basta tu prenda una tabella ASCII e tu legga il valore esadecimale per ogni lettera. Questo sistema potrebbe essere molto interessante per la comunicazione con un microcontrollore.

Se vuoi tuttavia convertire direttamente in stringa puoi specificare il tipo di codifica `utf8` come secondo parametro. Il codice si semplifica e diventa

```js
const fs = require('fs');


const str = fs.readFileSync('./myFile.txt', 'utf8');
const strArr = str.split('\n');

console.log(str);
console.log(strArr);
console.log(strArr.length);
/*
ciao 
a 
tutti
quanti
[ 'ciao ', 'a ', 'tutti', 'quanti' ]
3
*/
```

### My first IO async

In questo esempio vedremo invece lo stesso esempio ma utilizzando la programmazione asincrona e quindi tramite il metodo `readFile()`. Questo metodo non ritorna niente, il suo output è in realtà la funzione di callback passata come secondo parametro che viene chiamata solo quando si è raggiunto un risultato

```js
const fs = require('fs');

console.log('before');

fs.readFile('./myFile.txt', 'utf8', (err, data) => { //fs.readFile('./myFile.txt', 'utf8', function(err, data){
    console.log(data);
    console.log(data.split('\n').length - 1);
})

console.log('after');

/*
before
after
ciao 
a 
tutti
quanti
3
*/
```

**Attenzione** Quello che devi notare è che con questo sistema, al contrario del sistema sincrono, l'evoluzione del programma continua una volta chiamato il metodo `readFile()`. Per questo ho inserito `console.log('before');` e `console.log('after');`, per dimostrare in output che il risultato non è quello atteso

In genere conviene sempre fare il check di eventuali errori.

Poichè la callback come primo parametro riceve anche un errore segnalandoci se qualcosa è andato storto, è buona norma utilizzarlo per sollevare un'eccezione attraverso `throw` oppure qualsiasi altra operazione desiderata

```js
const fs = require('fs');

console.log('before');

fs.readFile('./myFile.txt', 'utf8', (err, data) => {
    if (err)
        throw err
    console.log(data);
    console.log(data.split('\n').length - 1);
})

console.log('after');

/*
before
after
ciao 
a 
tutti
quanti
3
*/
```

## Filtered

In questo esempio vedrai come stampare il contenuto dei file all'interno di una directory con una particolare estensione. Il path e l'estensione vengono passati come parametri esterni allo script

```js
/*05-filtered-ls.js*/
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const ext = process.argv[3];

fs.readdir(dir, (err, files) => {
    files.forEach((elem)=>{
        if (path.extname(elem) == ext)
            console.log(elem)
    })
})
```

Otterrai:

```cmd
>node 05-filtered-ls.js ./ .js

01-hello-node.js
02-baby-steps.js
03-my-first-io-async.js
04-my-first-io.js
05-filtered-ls.js
```

Puoi renderlo migliore..

In questo esempio utilizzero il metodo `filter` e passerò l'estensione del file senza dover specificare il `.`

```js
const fs = require('fs');
const path = require('path');

const dir = process.argv[2];
const ext = `.${process.argv[3]}`;

fs.readdir(dir, (err, files) => {
    if (err) throw err;
    const filesFiltered = files.filter((file) => path.extname(file) === ext);
    filesFiltered.forEach((file) => console.log(file));
});
```
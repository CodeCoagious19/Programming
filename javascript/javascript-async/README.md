# Promise

Puoi trovare degli approfondimenti utili sull'argomento qua:

- [MDN](https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Gli oggetti Promise sono usati per computazioni in differita e asincrone. Una Promise rappresenta un'operazione che non è ancora completata, ma lo sarà in futuro.

```javascript
new Promise(function(resolve, reject) { ... });
```

Una `promise` accetta come argomento una funzione che ha due parametri: `resolve` e `reject`.  Tale funzione viene chiamata immediatamente dall'implementazione della Promise, passando i due argomenti `resolve` e `reject`, che sono due funzioni. Le due funzioni `resolve` e `reject`, quando chiamate, risolvono o rigettano la promise. L'esecutore inizia del lavoro (solitamente asincrono), e, una volta completato, chiama `resolve` per risolvere la promise, o `reject` se c'è stato qualche errore. Se un errore viene sollevato nella funzione di esecuzione (executor) la promise viene rigettata.

Una Promise consente di associare degli handlers con il successo o il fallimento di un'azione asincrona. Questo in pratica consente di utilizzare dei metodi asincroni di fatto come se fossero sincroni.

Una Promise può presentarsi in uno dei seguenti stati:

- `pending` (attesa): stato iniziale, né soddisfatto né respinto.
- `fulfilled` (soddisfatto): significa che l'operazione si è conclusa con sucesso.
- `rejected` (respinto): significa che l'operazione à fallita.

Una promise in pending può evolvere sia in `fulfilled`, sia in `rejected` con la possibilità in entrambi i casi di passare valori. Quando accade una di queste situazioni, vengono chiamati gli handler associati che sono stati accodati dal metodo `then` della promise. 

Poichè i metodi `.then` e `.catch` restituiscono delle `promise`, è possibile concatenarli tramite l'operazione di `composition`.

### Un esempio semplice

In questo esempio creo una `promise` in cui chiamerò la funzione `setTimeout()`. Una volta che `setTimeout()` sarà completata la promise entrerà nello stato `fulfilled` ritornando un messaggio di successo rappresentato dal parametro della funzione `resolve()`. Poichè mi aspetto che non ci siano errori in questa situazione, ho aggiunto una variabile esterna in modo da simulare una qualsiasi condizione di errore. Con la variabile booleana `ForceRejected` forzo la `promise` ad entrare nello stato di `rejected`, ritornando il valore identificato dal parametro della funzione `reject()`.

Una volta che la `Promise` ha terminato ed è passata da `pending` a `fulfilled` è possibile restituire il risultato tramite il metodo `.then` della `Promise`. Tale metodo accetta come parametro una callbackc che come parametro ha il valore passato da `resolve()`. Allo stesso modo, quando la `Promise` ha terminato ed è passata da `pending` a `rejected` viene restituito il valore passato a `reject()` alla callback del metodo `catch()`

```javascript
const ForceRejected = false;

console.log("Inizio");
let myFirstPromise = new Promise((resolve, reject) => {
  if (ForceRejected) {
    reject("Error");
  } else {
    setTimeout(function(){
      resolve("Success!"); 
    }, 1000);
  }
});

myFirstPromise.then((successMessage) => {
  console.log("Yee! " + successMessage);
}).catch((errorMessage) => {
  console.log("...! " + errorMessage);
})
console.log("Fine");
```

Il risultato sarà:

```bash
Inizio
Fine
Yee! Success!
```

Se esegui il codice con `const ForceRejected = true;` avrai come risultato:

```bash
Inizio
Fine
...! Error
```

Nota che ho inserito anche due extra-stampe `Inizio`, `Fine` per evidenziare che il processo è asincrono e quindi continua la sua esecuzione nel mentre che la `Promise` cerca di evolvere da `pending` a `fulfilled` o `rejected`
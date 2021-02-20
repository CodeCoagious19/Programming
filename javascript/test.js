const fs = require('fs');

//Promise
//costrutto che permette di trattare le chiamate asicnrone come se fossero sincrone
//non perdendo quindi il concetto di sequenzialità di un programma
function readFile(fileName){
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err){
        reject(err);
        return;
      }
      resolve(data);
    })
  });
}

function wait(time){
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}

let main = async function(){
  console.log('start');
  await wait(5000);
  console.log('sono passati 5 sec');
  let data = await readFile('./data.txt');
  await wait(5000);
  console.log(data.toString());
  console.log('end');
}

main();
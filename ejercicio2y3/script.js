let contador=0;
const MAX = 4;
let resultado=0;

// CREAR promesa
function promesaIncrementar(){    
    let promesa=new Promise (function(llamarAlThen, llamarAlCatch){
            function incrementar(){
                if (contador < MAX){
                        contador++;
                        llamarAlThen(contador)
                }
                    else
                        llamarAlCatch("No se puede incrementar el contador porque ha llegado al máximo")
            }
            setTimeout(incrementar, 3000);
           
    })
    return promesa;
    
}

// USAR promesa 4 veces
//
console.log(`1. Incrementar usando promesa. Valor actual de contador=${contador}`)
promesaIncrementar().then(nuevoValor=>{
                                        resultado += nuevoValor;
                                        console.log(`1. El valor del contador es ${nuevoValor}`)
                                    })
                    .catch(error=>console.log(error))
//
console.log(`2. Incrementar usando promesa. Valor actual de contador=${contador}`)
promesaIncrementar().then(nuevoValor=>{
                                        resultado += nuevoValor;
                                        console.log(`2. El valor del contador es ${nuevoValor}`)
                                    })
                    .catch(error=>console.log(error))
//
console.log(`3. Incrementar usando promesa. Valor actual de contador=${contador}`)
promesaIncrementar().then(nuevoValor=>{
                                        resultado += nuevoValor;
                                        console.log(`3. El valor del contador es ${nuevoValor}`)
                                    })
                    .catch(error=>console.log(error))
//
console.log(`4. Incrementar usando promesa. Valor actual de contador=${contador}`)
promesaIncrementar().then(nuevoValor=>{
                                        resultado += nuevoValor;
                                        console.log(`4. El valor del contador es ${nuevoValor}`)
                                    })
                    .catch(error=>console.log(error))
//
console.log(`El resultado es ${resultado}`)







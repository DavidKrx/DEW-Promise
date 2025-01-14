let contadorDeClicks=0;
let contadorDeTeclas=0;
document.addEventListener("click", ()=>{
    contadorDeClicks++;                                  
    console.log("CLICK!!");                                         
                                        });
document.addEventListener("keydown", ()=>{
    contadorDeTeclas++;
    console.log("tecla!!");                                                                                    
                                            });

let promesa4CLicks;
let promesa4Teclas;
// CREAR promesa
function prometer4Clicks(){    
    let promesa=new Promise (function(llamarAlThen, llamarAlCatch){
            function comprobarPromesa(){
                if (contadorDeClicks >= 4)
                        llamarAlThen("3. SI ¡¡Muy Bien!! ... Has cumplido tu promesa de hacer 4 clicks en 5 segundos")
                    else
                        llamarAlCatch("3. NO ¡¡VAYA!! NO has cumplido tu promesa de hacer 4 clicks en 5 segundos")
            }
            setTimeout(comprobarPromesa, 5000);
           
    })
    return promesa;
    
}

function prometer4Teclas(){    
    let promesa=new Promise (function(llamarAlThen, llamarAlCatch){
            function comprobarPromesa(){
                if (contadorDeTeclas >= 4)
                        llamarAlThen("6. SI ¡¡Muy Bien!! ... Has cumplido tu promesa de hacer 4 teclas en 5 segundos")
                    else
                        llamarAlCatch("6. NO ¡¡VAYA!! NO has cumplido tu promesa de hacer 4 teclas en 5 segundos")
            }
            setTimeout(comprobarPromesa, 5000);
           
    })
    return promesa;
    
}

// USAR promesa
async function iniciarPromesa4Clicks(){
    promesa4CLicks= await prometer4Clicks()
    .then(respuesta=>{
        console.log(respuesta);
        iniciarPromesa4Teclas();
        console.log("4. Iniciar promesa de hacer 4 teclas");
        console.log("5. Dispones de 5 segundos para cumplirla");})
    .catch(respuesta=>console.log(respuesta))
}

async function iniciarPromesa4Teclas(){
    promesa4Teclas= await prometer4Teclas()
    .then(respuesta=>console.log(respuesta))
    .catch(respuesta=>console.log(respuesta))
}

console.log("1. Iniciar promesa de hacer 4 clicks");
console.log("2. Dispones de 5 segundos para cumplirla");
iniciarPromesa4Clicks();



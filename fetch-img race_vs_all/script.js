let contadorDeClicks=0;
document.addEventListener("click", ()=>{contadorDeClicks++});
let promesa;
let img1=document.getElementById("img1");
let img2=document.getElementById("img2");
let urlImgs=["https://www.thecocktaildb.com/images/ingredients/gin-Small.png", "https://www.thecocktaildb.com/images/media/drink/mql55h1643820632.jpg"];
// Quitar y pone comentarios para probar los ejemplos
// Ejemplo 1
mostrarCuandoLleguenTodas_All();
// Ejemplo 2
//mostrarPrimeraQueLlegue()
//
// Ejemplo utilizando método "all"
function mostrarCuandoLleguenTodas_All(){
  let promesa1= fetch(urlImgs[0]).then(res => res.blob())
  let promesa2= fetch(urlImgs[1]).then(res => res.blob())
  Promise.all([promesa1,promesa2])
        .then(function([r1,r2]){
          // Cargar los blobs en los elementos img
          img1.src = URL.createObjectURL(r1);
          img2.src = URL.createObjectURL(r2);
        })
  
}
//Mostrar la primera imagen que llegue
function mostrarPrimeraQueLlegue(){
  let promesa1= fetch(urlImgs[0]).then(res => res.blob())
  let promesa2= fetch(urlImgs[1]).then(res => res.blob())
  Promise.race([promesa1,promesa2])
        .then(function(r){
          // Cargar el blob
          img1.src = URL.createObjectURL(r);
        })
  
}
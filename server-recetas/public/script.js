const DOM={
    fotos:document.getElementById('fotos'),
  };

  let recetasData = []; // Inicializar como un array vacío     
  function mostrarTabla(){
  fetch('http://localhost:3000/recetas').then(response=>response.json())
  .then(respuestaFormat=> {
    jsonData=JSON.stringify(respuestaFormat);
    recetasData = respuestaFormat;
    DOM.fotos.innerHTML = '';
    respuestaFormat.filter(receta=>receta.cuisine=="Italian")
    .map((receta) => {
      console.log(receta.image);

      fetch(receta.image)
      .then(res=>res.blob())
      .then(blob=>createElement(blob));

    });
  })
  .catch(error => console.error('Error al cargar los recetas:', error));
}

function createElement(blobImg){
  let div, img;
  div=document.createElement("div");
  img=document.createElement("img");
  img.src=URL.createObjectURL(blobImg);
  div.appendChild(img);
  DOM.fotos.append(div);
}

mostrarTabla();

/*
      let blobImg;
      console.log(receta.image);

      fetch(receta.image)
      .then(res=>res.blob())
      .then(blob=>blobImg=blob);
      */
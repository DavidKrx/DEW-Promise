const result=document.getElementById('result');

fetch('http://localhost:3000/alumnos').then(response=>response.json()).then(respuestaFormat=> result.innerHTML=JSON.stringify(respuestaFormat)).catch(error => {
  console.error(error);
});

function Create(){
  let DatosCrear={
    nombre:'a',
    grupo:"B"
  }
  fetch('http://localhost:3000/alumnos', {
    method: 'POST',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(DatosCrear)
  })
  .then(response=>response.json()).catch(error => {
    console.error(error);
  })
  .then(respuestaFormat=> console.log(respuestaFormat))
}

function Update(id,name,grupo){
  let DatosCrear={
    nombre:name,
    grupo:grupo
  }
  fetch('http://localhost:3000/alumnos/'+id, {
    method: 'PUT',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(DatosCrear)
  })
  .then(response=>response.json()).catch(error => {
    console.error(error);
  })
  .then(respuestaFormat=> console.log(respuestaFormat))
}
function UpdatePath(id,name,grupo){
  let DatosCrear={
    nombre:name,
    grupo:grupo
  }
  fetch('http://localhost:3000/alumnos/'+id, {
    method: 'PATCH',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(DatosCrear)
  })
  .then(response=>response.json()).catch(error => {
    console.error(error);
  })
  .then(respuestaFormat=> console.log(respuestaFormat))
}

function Delete(id){
  fetch('http://localhost:3000/alumnos/'+id, {
    method: 'DELETE',
    headers:{
      "Content-type":"application/json"
    },
  })
  .then(response=>response.json()).catch(error => {
    console.error(error);
  })
  .then(respuestaFormat=> console.log(respuestaFormat))
}

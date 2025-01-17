const result=document.getElementById('result');
const tabla=document.getElementById('tabla');
fetch('http://localhost:3000/alumnos').then(response=>response.json())
.then(respuestaFormat=> {
  jsonData=JSON.stringify(respuestaFormat);
  result.innerHTML=jsonData;
  respuestaFormat.map((alumnos) => {
    //let modongo=`<tr><td>${alumnos.id}</td><td>${alumnos.nombre}</td><td>${alumnos.grupo}</td></tr>`;
    let id=document.createElement("td");
    id.textContent=alumnos.id;

    let nombre=document.createElement("td");
    nombre.textContent=alumnos.nombre;

    let grupo=document.createElement("td");
    grupo.textContent=alumnos.grupo;

    let tr=document.createElement("tr");
    tr.append(id);
    tr.append(nombre);
    tr.append(grupo);

    tabla.append(tr);
  });
})
.catch(error => {
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
//Modifica parcialmente el objeto
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

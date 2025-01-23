    const DOM={
      tabla:document.getElementById('tabla'),
      inputId:document.getElementById('inputId'),
      nombre:document.getElementById('nombre'),
      grupo:document.getElementById('grupo'),

      idDelete:document.getElementById('idDelete'),

      errorId:document.getElementById('errorId'),
      errorNombre:document.getElementById('errorNombre'),
      errorGrupo:document.getElementById('errorGrupo'),
      
      errorIdDelete:document.getElementById('errorIdDelete')
    };

    let alumnosData = []; // Inicializar como un array vacío     
    function mostrarTabla(){
    fetch('http://localhost:3000/alumnos').then(response=>response.json())
    .then(respuestaFormat=> {
      jsonData=JSON.stringify(respuestaFormat);
      alumnosData = respuestaFormat;
      DOM.tabla.innerHTML = '';
      respuestaFormat.map((alumnos) => {
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
    .catch(error => console.error('Error al cargar los alumnos:', error));
  }

  function limpiarFormulario(){
    DOM.inputId.value="";
    DOM.nombre.value="";
    DOM.grupo.value="";
    DOM.errorIdDelete.value="";
  }

    fetch('http://localhost:3000/grupos')
          .then(response => response.json())
          .then(grupos => {
              const grupoSelect = document.getElementById('grupo');
              
              grupos.forEach(grupo => {
                  // Creating select option
                  const option = document.createElement('option');
                  option.value = grupo.grupo;
                  option.textContent = grupo.grupo;

                  grupoSelect.appendChild(option);
              });
          })
          .catch(error => console.error('Error al cargar los grupos:', error));
    
    function Crear(){
      if(DOM.inputId.value=="" && !DOM.nombre.value=="" && !DOM.grupo.value==""){
        Create(DOM.nombre.value,DOM.grupo.value);
        DOM.errorNombre.textContent="";
        DOM.errorGrupo.textContent="";
        DOM.errorId.textContent="";
      } else{
        if(DOM.nombre.value==""){ DOM.errorNombre.textContent="Rellena el campo nombre";}
        if(!DOM.inputId.value==""){ DOM.errorId.textContent="El id tiene que estar vacio";}
        if(DOM.grupo.value==""){ DOM.errorGrupo.textContent="Selecciona un grupo";}
      }
    }
   
    function Editar(){
      if (!DOM.inputId.value==""){
        DOM.errorNombre.textContent="";
        DOM.errorId.textContent="";
        function filtrarPorId(id) {
          if (Array.isArray(alumnosData) && alumnosData.length > 0) {
            const alumno = alumnosData.find(alumno => alumno.id == id);
            if (alumno) {
              console.log(`Nombre del alumno con ID ${id}:`, alumno.nombre);
              return alumno.id; // Retornar el nombre del alumno
            } else {
              console.log(`No se encontró ningún alumno con ID ${id}`);
              return null;
            }
          } else {
            console.log('No hay datos cargados aún.');
            return null;
          }
        }

        if(filtrarPorId(DOM.inputId.value)==DOM.inputId.value && !DOM.nombre.value=="" && !DOM.grupo.value==""){
          let DatosCrear={
            id:DOM.inputId.value,
            nombre:DOM.nombre.value,
            grupo:DOM.grupo.value
          }
          UpdatePath(DatosCrear);
          console.log("Update");
          DOM.errorNombre.textContent="";
          DOM.errorId.textContent="";
        } else{
          if(filtrarPorId(DOM.inputId.value)==DOM.inputId.value && !DOM.nombre.value=="" && DOM.grupo.value==""){
            let DatosCrear={
              id:DOM.inputId.value,
              nombre:DOM.nombre.value,
            }
            
            UpdatePath(DatosCrear);
            console.log("Update");
            DOM.errorNombre.textContent="";
            DOM.errorId.textContent="";
          } else{
            if(DOM.nombre.value=="" && DOM.grupo.value==""){ DOM.errorNombre.textContent="Tiene que rellenar 1 de los campos: nombre o grupo";}
            if(filtrarPorId(DOM.inputId.value)!=DOM.inputId.value){ DOM.errorId.textContent="El id tiene que existir en la tabla";}
          }
  
          if(filtrarPorId(DOM.inputId.value)==DOM.inputId.value && DOM.nombre.value=="" && !DOM.grupo.value==""){
            let DatosCrear={
              id:DOM.inputId.value,
              grupo:DOM.grupo.value
            }
            UpdatePath(DatosCrear);
            console.log("Update");
            DOM.errorNombre.textContent="";
            DOM.errorId.textContent="";
          } else{
            if(DOM.nombre.value=="" && DOM.grupo.value==""){ DOM.errorNombre.textContent="Tiene que rellenar 1 de los campos: nombre o grupo";}
            if(filtrarPorId(DOM.inputId.value)!=DOM.inputId.value){ DOM.errorId.textContent="El id tiene que existir en la tabla";}
          }
        }

      } else {
        DOM.errorId.textContent="El id no puede estar vacio";
      }
    }

    function Create(Name,Grupo){
      let DatosCrear={
        nombre:Name,
        grupo:Grupo
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
      .then(a=>{
        mostrarTabla();
        limpiarFormulario();})
    }
    //Modifica parcialmente el objeto
    function UpdatePath(DatosCrear){
      fetch('http://localhost:3000/alumnos/'+DatosCrear.id, {
        method: 'PATCH',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(DatosCrear)
      })
      .then(response=>response.json()).catch(error => {
        console.error(error);
      })
      .then(a=>{
        mostrarTabla();
        limpiarFormulario();})
    }
    

    function Borrar(){
      if (!DOM.idDelete.value==""){

        function filtrarPorId(id) {
          if (Array.isArray(alumnosData) && alumnosData.length > 0) {
            const alumno = alumnosData.find(alumno => alumno.id == id);
            if (alumno) {
              console.log(`Nombre del alumno con ID ${id}:`, alumno.nombre);
              return alumno.id; // Retornar el nombre del alumno
            } else {
              console.log(`No se encontró ningún alumno con ID ${id}`);
              return null;
            }
          } else {
            console.log('No hay datos cargados aún.');
            return null;
          }
        }

        if(filtrarPorId(DOM.idDelete.value)==DOM.idDelete.value){
          Delete(DOM.idDelete.value);
          DOM.errorIdDelete.textContent="";
        } else {
          DOM.errorIdDelete.textContent="El id tiene que existir en la tabla";
        }
        }
        else {
          DOM.errorIdDelete.textContent="El id no puede estar vacio";
        }
    }

    function Delete(id){
      if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      fetch('http://localhost:3000/alumnos/'+id, {
        method: 'DELETE',
        headers:{
          "Content-type":"application/json"
        },
      })
      .then(response=>response.json()).catch(error => {
        console.error(error);
      })
      .then(a=>{
        mostrarTabla();
        limpiarFormulario();})
    }
  }

    mostrarTabla();
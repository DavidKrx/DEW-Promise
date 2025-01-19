    const result = document.getElementById('result');
    const tabla = document.getElementById('tabla').getElementsByTagName('tbody')[0];
    const formCrear = document.getElementById('formCrear');
    const formEditar = document.getElementById('formEditar');
    const editId = document.getElementById('editId');
    const editNombre = document.getElementById('editNombre');
    const editGrupo = document.getElementById('editGrupo');

    // Leer los alumnos desde el servidor y mostrar en la tabla
    function listarAlumnos() {
      fetch('http://localhost:3000/alumnos')
        .then(response => response.json())
        .then(alumnos => {
          tabla.innerHTML = ''; // Limpiar la tabla
          alumnos.forEach(alumno => {
            const tr = document.createElement("tr");

            let id = document.createElement("td");
            id.textContent = alumno.id;

            let nombre = document.createElement("td");
            nombre.textContent = alumno.nombre;

            let grupo = document.createElement("td");
            grupo.textContent = alumno.grupo;

            let acciones = document.createElement("td");

            // Botón Editar
            const btnEditar = document.createElement("button");
            btnEditar.textContent = "Editar";
            btnEditar.onclick = () => editarAlumno(alumno.id, alumno.nombre, alumno.grupo);
            acciones.appendChild(btnEditar);

            // Botón Eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar";
            btnEliminar.onclick = () => eliminarAlumno(alumno.id);
            acciones.appendChild(btnEliminar);

            tr.append(id, nombre, grupo, acciones);
            tabla.append(tr);
          });
        })
        .catch(error => console.error(error));
    }

    // Crear un nuevo alumno
    formCrear.addEventListener('submit', function(event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const grupo = document.getElementById('grupo').value;
      const nuevoAlumno = { nombre, grupo };

      fetch('http://localhost:3000/alumnos', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoAlumno)
      })
        .then(response => response.json())
        .then(() => {
          listarAlumnos(); // Recargar la lista de alumnos
          formCrear.reset(); // Limpiar formulario
        })
        .catch(error => console.error(error));
    });

    // Editar un alumno
    function editarAlumno(id, nombre, grupo) {
      formEditar.style.display = 'block'; // Mostrar formulario de editar
      editId.value = id;
      editNombre.value = nombre;
      editGrupo.value = grupo;
    }

    formEditar.addEventListener('submit', function(event) {
      event.preventDefault();
      const id = editId.value;
      const nombre = editNombre.value;
      const grupo = editGrupo.value;

      const datosActualizar = { nombre, grupo };

      fetch(`http://localhost:3000/alumnos/${id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizar)
      })
        .then(response => response.json())
        .then(() => {
          listarAlumnos(); // Recargar la lista de alumnos
          formEditar.reset(); // Limpiar formulario
          formEditar.style.display = 'none'; // Ocultar formulario de editar
        })
        .catch(error => console.error(error));
    });

    // Eliminar un alumno
    function eliminarAlumno(id) {
      if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
        fetch(`http://localhost:3000/alumnos/${id}`, {
          method: 'DELETE',
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(() => {
            listarAlumnos(); // Recargar la lista de alumnos
          })
          .catch(error => console.error(error));
      }
    }
    document.addEventListener('DOMContentLoaded', () => {
      // Cargar los grupos desde la API
      fetch('http://localhost:3000/grupos')
          .then(response => response.json())
          .then(grupos => {
              // Llenar el select de grupos en el formulario de crear
              const grupoSelectCrear = document.getElementById('grupo');
              const grupoSelectEditar = document.getElementById('editGrupo');
              
              grupos.forEach(grupo => {
                  // Crear la opción para el select
                  const option = document.createElement('option');
                  option.value = grupo.grupo;
                  option.textContent = grupo.grupo;
  
                  // Añadir al select de crear
                  grupoSelectCrear.appendChild(option);
  
                  // Añadir al select de editar
                  grupoSelectEditar.appendChild(option.cloneNode(true)); // Clonar la opción para editar
              });
          })
          .catch(error => console.error('Error al cargar los grupos:', error));
  
      // Aquí puedes añadir el resto de tu lógica para crear, editar y eliminar alumnos
  });
  
    listarAlumnos();
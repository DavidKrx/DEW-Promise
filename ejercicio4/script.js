let deportistas=[
    {nombre: 'Antonio', apellido1: 'García', apellido2: 'González', sexo: 'H', edad:25, equipo: 'Trotamundos',
                participaEn:[ {carrera: 'ochoKm',tiempoEnSegundos: 1855, distanciaKm: 8},
                              {carrera: 'mediaMaraton',tiempoEnSegundos: 4855, distanciaKm: 21},
                              {carrera: 'maraton',tiempoEnSegundos: 6055, distanciaKm: 42}
                            ]},
    {nombre: 'Juan', apellido1: 'Carballo', apellido2: 'Delgado', sexo: 'H', edad:45, equipo: 'Clator',
                participaEn:[ {carrera: 'ochoKm',tiempoEnSegundos: 1955, distanciaKm: 8},
                              {carrera: 'maraton',tiempoEnSegundos: 6155, distanciaKm: 42}
                            ]},
    {nombre: 'Ayoze', apellido1: 'Mesa', apellido2: 'Herrera', sexo: 'H', edad:38, equipo: 'Clator',
                participaEn:[ {carrera: 'ochoKm',tiempoEnSegundos: 1975, distanciaKm: 8},
                              {carrera: 'mediaMaraton',tiempoEnSegundos: 4985, distanciaKm: 21},
                              {carrera: 'maraton',tiempoEnSegundos: 6188, distanciaKm: 42}
                            ]},
    {nombre: 'Antonio', apellido1: 'Galván', apellido2: 'Vera', sexo: 'H', edad:61, equipo: 'Trotamundos',
                participaEn:[ {carrera: 'cuatroKm',tiempoEnSegundos: 995, distanciaKm: 4},
                              {carrera: 'ochoKm',tiempoEnSegundos: 2055, distanciaKm: 8},
                              {carrera: 'mediaMaraton',tiempoEnSegundos: 5855, distanciaKm: 21}
                            ]},
    {nombre: 'Carmen', apellido1: 'Morales', apellido2: 'Vera', sexo: 'M', edad:35, equipo: 'Trotamundos',
                participaEn:[ {carrera: 'cuatroKm',tiempoEnSegundos: 1055, distanciaKm: 4},
                              {carrera: 'ochoKm',tiempoEnSegundos: 2255, distanciaKm: 8},
                              {carrera: 'mediaMaraton',tiempoEnSegundos: 5985, distanciaKm: 21}
                            ]}
  ]

function obtenerKmDeportista(nombre) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const deportista = deportistas.find(d => d.nombre === nombre);
  
        if (deportista) {
          // Calculamos el total de kilómetros recorridos
          const totalKm = deportista.participaEn.reduce((total, carrera) => total + carrera.distanciaKm, 0);
          resolve(totalKm);
        } else {
          reject(`El deportista ${nombre} no existe.`);
        }
      }, 4000); // Transcurren 4 segundos
    });
  }

  // Usamos la promesa para Juan y Carmen
let totalKmJuan = 0;
let totalKmCarmen = 0;

obtenerKmDeportista('Juan')
  .then(km => {
    totalKmJuan = km;
    return obtenerKmDeportista('Carmen');
  })
  .then(km => {
    totalKmCarmen = km;
    console.log(`Juan: ${totalKmJuan} km`);
    console.log(`Carmen: ${totalKmCarmen} km`);
    console.log(`Total de kilómetros recorridos por Juan y Carmen: ${totalKmJuan + totalKmCarmen} km`);
  })
  .catch(error => {
    console.error(error);
  });

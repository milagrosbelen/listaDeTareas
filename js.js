window.addEventListener('DOMContentLoaded', function() {
  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

  // Mostrar tareas guardadas al cargar
  dias.forEach(dia => {
    const contenedor = document.querySelector(`#${dia} .divInput`);
    const tareas = JSON.parse(localStorage.getItem(dia)) || [];

    tareas.forEach(texto => {
      mostrarTareaGuardada(dia, texto, contenedor);
    });
  });

  // Botón "Agregar tareas"
  const botones = document.querySelectorAll('.btn');
  botones.forEach(boton => {
    boton.addEventListener('click', function () {
      const contenedor = boton.nextElementSibling;

      const divTarea = document.createElement('div');
      divTarea.style.marginBottom = '10px';

      const input = document.createElement('input');
      const btnAceptar = document.createElement('button');
      btnAceptar.textContent = 'Aceptar';
      const btnEliminarEdicion = document.createElement('button');
      btnEliminarEdicion.textContent = 'Eliminar';

      btnAceptar.addEventListener('click', function () {
        const texto = input.value.trim();
        if (texto !== '') {
          const dia = boton.parentElement.parentElement.id;
          const tareasPrevias = JSON.parse(localStorage.getItem(dia)) || [];
          tareasPrevias.push(texto);
          localStorage.setItem(dia, JSON.stringify(tareasPrevias));

          divTarea.remove(); // Saco el input

          mostrarTareaGuardada(dia, texto, contenedor); // Muestro la tarea
        }
      });

      btnEliminarEdicion.addEventListener('click', function () {
        divTarea.remove();
      });

      divTarea.appendChild(input);
      divTarea.appendChild(btnAceptar);
      divTarea.appendChild(btnEliminarEdicion);
      contenedor.appendChild(divTarea);
    });
  });

  // Función para mostrar tarea guardada
  function mostrarTareaGuardada(dia, texto, contenedor) {
    const divTarea = document.createElement('div');
    divTarea.style.marginBottom = '10px';

    const tareaTexto = document.createElement('span');
    tareaTexto.textContent = texto;
    tareaTexto.style.marginRight = '10px';
    tareaTexto.style.textTransform = 'uppercase';
    tareaTexto.style.fontSize = '15px';

    const btnHecho = document.createElement('button');
    btnHecho.textContent = 'Hecho ✅';

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar ❌';
    btnEliminar.style.marginLeft = '5px';

    btnHecho.addEventListener('click', function () {
      tareaTexto.style.color = 'green';
      btnHecho.remove();
      btnEliminar.remove();
    });

    btnEliminar.addEventListener('click', function () {
      divTarea.remove();
      const tareas = JSON.parse(localStorage.getItem(dia)) || [];
      const nuevasTareas = tareas.filter(t => t !== texto);
      localStorage.setItem(dia, JSON.stringify(nuevasTareas));
    });

    divTarea.appendChild(tareaTexto);
    divTarea.appendChild(btnHecho);
    divTarea.appendChild(btnEliminar);

    contenedor.appendChild(divTarea);



    const recargarBotones = document.querySelectorAll('.btn-recargar');
    recargarBotones.forEach(boton =>{
        boton.addEventListener('click' , function(){
            const dia = boton.parentElement.parentElement.id;
            const contenedor = boton.previousElementSibling;//divinput


            //borrar localstorage
            localStorage.removeItem(dia)

            //borrar del dom
            contenedor.innerHTML = '';
        })
    })
  }
});

const btn = document.querySelectorAll('.btn');

btn.forEach(function(boton){
    boton.addEventListener('click', function(){
        // encontrar el contenedor correspondiente (div siguiente al botón)
        const contenedor = boton.nextElementSibling;

        // Crear el div contenedor de la tarea
        const divTarea = document.createElement('div');
        divTarea.style.marginBottom = '10px';

        // crear elementos: input, botones Aceptar y Eliminar
        const input = document.createElement('input');
        const btnAceptar = document.createElement('button');
        btnAceptar.textContent = 'Aceptar';
        const btnEliminarEdicion = document.createElement('button');
        btnEliminarEdicion.textContent = 'Eliminar';

        // Evento para el botón "Aceptar"
        btnAceptar.addEventListener('click', function(){
            const texto = input.value.trim();

            if(texto !== ''){
                // Vaciar div tarea para mostrar texto y botones nuevos
                divTarea.innerHTML = '';

                // Crear el span para mostrar el texto
                const tareaTexto = document.createElement('span');
                tareaTexto.textContent = texto;
                tareaTexto.style.marginRight = '10px';
                tareaTexto.style.textTransform = 'uppercase';// Mayúsculas
                tareaTexto.style.fontSize = '15px';// Tamaño grande

                // Crear botón "Hecho"
                const btnHecho = document.createElement('button');
                btnHecho.textContent = 'Hecho ✅';

                // Crear botón "Eliminar"
                const btnEliminarGuardada = document.createElement('button');
                btnEliminarGuardada.textContent = 'Eliminar ❌';
                btnEliminarGuardada.style.marginLeft = '5px';

                // Evento botón "Hecho"
                btnHecho.addEventListener('click', function(){
                    tareaTexto.style.color = 'green';
                    btnHecho.remove();
                    btnEliminarGuardada.remove();
                });

                // Evento botón "Eliminar" para tarea guardada
                btnEliminarGuardada.addEventListener('click', function(){
                    divTarea.remove();
                });

                // Agregar texto y botones al div
                divTarea.appendChild(tareaTexto);
                divTarea.appendChild(btnHecho);
                divTarea.appendChild(btnEliminarGuardada);
            }
        });

        // Evento botón "Eliminar" en modo edición
        btnEliminarEdicion.addEventListener('click', function(){
            divTarea.remove();
        });

        // Agregar input y botones modo edición al div tarea
        divTarea.appendChild(input);
        divTarea.appendChild(btnAceptar);
        divTarea.appendChild(btnEliminarEdicion);

        // Agregar el div tarea al contenedor del día
        contenedor.appendChild(divTarea);
    });
});

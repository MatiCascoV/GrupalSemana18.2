document.addEventListener('DOMContentLoaded', function () {
    const btnGet = document.getElementById('btnGet1');
    const btnPost = document.getElementById('btnPost');
    const btnPut = document.getElementById('btnPut');
    const btnDelete = document.getElementById('btnDelete');
    const resultsContainer = document.getElementById('results');

    // Función para habilitar o deshabilitar los botones según el estado de los campos
    function toggleButtons() {
        const inputGetId = document.getElementById('inputGet1Id').value.trim();
        const inputPostNombre = document.getElementById('inputPostNombre').value.trim();
        const inputPostApellido = document.getElementById('inputPostApellido').value.trim();
        const inputPutId = document.getElementById('inputPutId').value.trim();
        const inputDelete = document.getElementById('inputDelete').value.trim();

        btnPost.disabled = inputPostNombre === '' || inputPostApellido === '';
        btnPut.disabled = inputPutId === '';
        btnDelete.disabled = inputDelete === '';
    }

    // Agregar evento para actualizar estado de botones cuando cambian los campos
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', toggleButtons);
    });

    btnGet.addEventListener('click', function () {
        const inputGetId = document.getElementById('inputGet1Id').value.trim();

        if (inputGetId === '') {
            fetch('https://65427e1fad8044116ed37871.mockapi.io/users')
                .then(response => response.json())
                .then(data => {
                    resultsContainer.innerHTML = '';
                    data.forEach(user => {
                        resultsContainer.innerHTML += `<li>ID: ${user.id}, Nombre: ${user.name}, Apellido: ${user.lastname}</li>`;
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Algo salió mal al obtener los registros.');
                });
        } else {
            fetch(`https://65427e1fad8044116ed37871.mockapi.io/users/${inputGetId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Registro no encontrado');
                    }
                    return response.json();
                })
                .then(data => {
                    resultsContainer.innerHTML = `<li>ID: ${data.id}, Nombre: ${data.name}, Apellido: ${data.lastname}</li>`;
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('No se encontró el registro.');
                });
        }
    });

    btnPost.addEventListener('click', function () {
        const inputPostNombre = document.getElementById('inputPostNombre').value.trim();
        const inputPostApellido = document.getElementById('inputPostApellido').value.trim();

        if (inputPostNombre === '' || inputPostApellido === '') {
            alert('Por favor, complete todos los campos.');
            return;
        }

        fetch('https://65427e1fad8044116ed37871.mockapi.io/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: inputPostNombre,
                lastname: inputPostApellido
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el registro');
            }
            return response.json();
        })
        .then(data => {
            // Realizar acciones adicionales si el registro se agrega exitosamente
            console.log('Registro agregado:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    btnPut.addEventListener('click', function () {
        const inputPutId = document.getElementById('inputPutId').value.trim();

        fetch(`https://65427e1fad8044116ed37871.mockapi.io/users/:id${inputPutId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('inputPutNombre').value = data.name;
                document.getElementById('inputPutApellido').value = data.lastname;
                // Mostrar el modal con los datos para modificar
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    btnDelete.addEventListener('click', function () {
        const inputDelete = document.getElementById('inputDelete').value.trim();

        fetch(`https://65427e1fad8044116ed37871.mockapi.io/users/:id${inputDelete}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el registro');
            }
            return response.json();
        })
        .then(data => {
            // Realizar acciones adicionales si el registro se elimina exitosamente
            console.log('Registro eliminado:', data);
            // Por ejemplo, puedes volver a cargar la lista de registros
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

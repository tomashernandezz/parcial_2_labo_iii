const insertarObra = document.getElementById("guardarObra");

insertarObra.addEventListener("click", async () => {
    // Crear un objeto FormData
    const formData = new FormData();

    // Agregar datos al FormData
    formData.append("nombre", document.getElementById("nombre").value);
    formData.append("anioDeCreacion", document.getElementById("anio").value);
    formData.append("tipo", document.getElementById("tipo").value);
    formData.append("img", document.getElementById("imagen").files[0]); // Archivo de imagen
    formData.append("activo", document.getElementById("activo").checked);

    try {
        // Enviar la solicitud con fetch
        const respuesta = await fetch("http://localhost:3000/obras", {
            method: "POST",
            body: formData, // Enviar FormData directamente
        });

        if (respuesta.ok) {
            const resultado = await respuesta.json();
            console.log("Obra creada exitosamente:", resultado);
            alert("Obra guardada con éxito");
        } else {
            console.error("Error al crear la obra:", await respuesta.text());
            alert("Hubo un error al guardar la obra");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("Error al conectarse con el servidor");
    }
});



console.log("hola")
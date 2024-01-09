document.addEventListener("DOMContentLoaded", function () {
    // Inicializar variables
    let descuento = 0;
    let envio = 0;

    // Obtener elementos del DOM
    let botonQuitarControl = document.querySelector('.botonQuitarControl')
    let botonQuitarTeclado = document.querySelector('.botonQuitarTeclado')
    let botonQuitarMouse = document.querySelector('.botonQuitarMouse')
    let totalProductosCarrito = document.querySelector("#mispan");
    let spanTotal = document.querySelector("#totalApagaraaa");
    let cambioDeNumero = document.querySelector("#descuentospan");

    // Evento para quitar producto del carrito (control)
    botonQuitarControl.addEventListener('click', () => {
        let cardProducto = botonQuitarControl.closest('.card.my-4');
        cardProducto.remove();
        actualizarTotales();
    });
    botonQuitarTeclado.addEventListener('click', () => {
        let cardProducto = botonQuitarTeclado.closest('.card.my-4');
        cardProducto.remove();
        actualizarTotales();
    });
    botonQuitarMouse.addEventListener('click', () => {
        let cardProducto = botonQuitarMouse.closest('.card.my-4');
        cardProducto.remove();
        actualizarTotales();
    });

    // Evento para cambios en la cantidad de productos
    let botonesControlCantidad = document.querySelectorAll(".botonControl");
    botonesControlCantidad.forEach(botoncito => {
        botoncito.addEventListener("click", (evento) => {
            let h5Producto = document.querySelector(`#${evento.target.dataset.idCantidad}`);
            let valorActualTotal = parseInt(spanTotal.innerText);
            let cantidadActual = h5Producto.innerText;

            if (evento.target.dataset.accion == 'restar') {
                if (cantidadActual > 1) {
                    cantidadActual = parseInt(cantidadActual) - 1;
                    totalProductosCarrito.innerText = parseInt(totalProductosCarrito.innerText) - 1;
                    valorActualTotal = valorActualTotal - parseInt(evento.target.dataset.precio);
                }
            } else {
                cantidadActual = parseInt(cantidadActual) + 1;
                totalProductosCarrito.innerText = parseInt(totalProductosCarrito.innerText) + 1;
                valorActualTotal = valorActualTotal + parseInt(evento.target.dataset.precio);
            }

            // Aplicar descuento solo una vez al llegar a 7 productos
            if (totalProductosCarrito.innerText >= 7 && descuento === 0) {
                descuento = 100000;
            } else if (totalProductosCarrito.innerText < 7 && descuento > 0) {
                // Restaurar descuento si el total es menor a 7
                descuento = 0;
            }

            // Actualizar el contenido HTML con el descuento
            spanTotal.innerHTML = valorActualTotal - descuento;
            h5Producto.innerHTML = cantidadActual;
            cambioDeNumero.innerHTML = descuento;
            actualizarTotales();
        });
    });

    // Evento para seleccionar método de envío
    let botonEnvioo = document.querySelectorAll(".envioo");
    botonEnvioo.forEach(tipoDeEnvio => {
        tipoDeEnvio.addEventListener('click', (evento) => {
            if (evento.target.dataset.envio == 'priori') {
                envio = 5000;
            } else if (evento.target.dataset.envio == 'noPriori') {
                envio = 0;
            }
            actualizarTotales();
        });
    });

    // Evento de redirección al hacer clic en el botón de pago con transferencia
    document.getElementById("pagoTransferencia").addEventListener("click", function () {
        window.location.href = "https://www.pse.com.co/pse1";
    });

    // Evento de redirección al hacer clic en el botón de pago contraentrega
    document.getElementById("pagoContraentrega").addEventListener("click", function () {
        window.location.href = "Pagocontraentrega.html";
    });
    document.getElementById("pagoTC").addEventListener("click", function () {
        window.location.href = "Pagotc.html"
    });
    
    

    // Evento para borrar el carrito
    document.querySelector('#btnBorrarCarro').addEventListener('click', () => {
        let seccionCarrito = document.querySelector('#contenidoProductos');
        seccionCarrito.innerHTML = '';
        totalProductosCarrito.innerHTML = "0";
        spanTotal.innerHTML = "0";
        cambioDeNumero.innerHTML = "0";
        descuento = 0;
        envio = 0;
        Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
        });
        actualizarTotales();
    });

    // Función para actualizar totales
    function actualizarTotales() {
        let totalPagar = parseInt(spanTotal.innerText) + envio;
        document.querySelector("#totalApagaraaa").innerHTML = totalPagar;
    }

});


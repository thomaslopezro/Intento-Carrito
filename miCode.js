let contadorProductos=0
let productoControl=0


let botonesRestar = document.querySelectorAll(".botonControl")
botonesRestar.forEach(boton => {
    boton.addEventListener("click", (evento) => {
        productoControl=productoControl-1
        console.log(productoControl);
    })
})
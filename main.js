let arrayPalabras = [
  "MICROSCOPIO", "FOTOGRAFIA", "TELESCOPIO", "UNIVERSIDAD", "COMPUTADORA", "ENCICLOPEDIA",
  "AEROPUERTO", "TELEVISION", "BIBLIOTECA", "MARIPOSA"
];

let ayudas = [
  "Instrumento que permite observar objetos muy pequeños al ampliarlos varias veces.", // MICROSCOPIO
  "Imagen obtenida mediante la captación de la luz en una superficie sensible.", // FOTOGRAFIA
  "Instrumento óptico que permite ver objetos distantes, especialmente en astronomía.", // TELESCOPIO
  "Institución de educación superior donde se imparten enseñanzas y se realizan investigaciones.", // UNIVERSIDAD
  "Máquina electrónica que procesa datos y ejecuta programas para realizar diversas tareas.", // COMPUTADORA
  "Conjunto de libros que recogen conocimientos sobre diversas materias, ordenados alfabéticamente.", // ENCICLOPEDIA
  "Instalación donde se gestionan vuelos y aviones, con áreas para pasajeros y carga.", // AEROPUERTO
  "Aparato que recibe y reproduce imágenes y sonidos emitidos a distancia.", // TELEVISION
  "Lugar donde se guardan libros y otros materiales de lectura para consulta o préstamo.", // BIBLIOTECA
  "Insecto con dos pares de alas coloridas y cuerpo alargado" // MARIPOSA
];

let palabrasJugadas = [];
let intentosRestantes = 5;
let posActual;
let arrayPalabraActual = [];
let cantidadAcertadas = 0;
let divsPalabraActual = [];
let totalQueDebeAcertar;
let correctas = 0;
let incorrectas = 0;

function cargarNuevaPalabra() {
  if (palabrasJugadas.length === arrayPalabras.length) {
    mostrarPantallaFinal();
    return;
  }

  let palabra;
  do {
    posActual = Math.floor(Math.random() * arrayPalabras.length);
    palabra = arrayPalabras[posActual];
  } while (palabrasJugadas.includes(palabra));

  arrayPalabraActual = palabra.split('');
  totalQueDebeAcertar = palabra.length;
  cantidadAcertadas = 0;

  document.getElementById("palabra").innerHTML = "";
  document.getElementById("letrasIngresadas").innerHTML = "";

  for (let i = 0; i < palabra.length; i++) {
    var divLetra = document.createElement("div");
    divLetra.className = "letra";
    document.getElementById("palabra").appendChild(divLetra);
  }

  divsPalabraActual = document.getElementsByClassName("letra");

  intentosRestantes = 5;
  document.getElementById("intentos").innerHTML = intentosRestantes;
  document.getElementById("ayuda").innerHTML = ayudas[posActual];
}

function mostrarPantallaFinal() {
  document.getElementById("gameSection").style.display = "none";
  document.getElementById("finalScreen").style.display = "block";
  document.getElementById("correctas").innerText = correctas;
  document.getElementById("incorrectas").innerText = incorrectas;
  document.getElementById("volverMenu").style.display = "inline-block";
}

function resetGame() {
  palabrasJugadas = [];
  correctas = 0;
  incorrectas = 0;
  document.getElementById("gameSection").style.display = "block";
  document.getElementById("finalScreen").style.display = "none";
  document.getElementById("volverMenu").style.display = "none";
  cargarNuevaPalabra();
}

function volverAlMenu() {
  window.location.href = "https://juegos-5to-baco.onrender.com";
}

document.addEventListener('DOMContentLoaded', (event) => {
  cargarNuevaPalabra();
  generarTeclado();
});

function generarTeclado() {
  let teclado = document.getElementById("teclado");
  let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  teclado.innerHTML = '';
  letras.forEach(letra => {
    let boton = document.createElement('button');
    boton.innerHTML = letra;
    boton.onclick = () => comprobarLetra(letra);
    teclado.appendChild(boton);
  });
}

function comprobarLetra(letra) {
  if (arrayPalabraActual.includes(letra)) {
    for (let i = 0; i < arrayPalabraActual.length; i++) {
      if (arrayPalabraActual[i] === letra) {
        divsPalabraActual[i].innerHTML = letra;
        divsPalabraActual[i].classList.add("pintar");
        cantidadAcertadas++;
      }
    }
    if (cantidadAcertadas === totalQueDebeAcertar) {
      correctas++;
      setTimeout(cargarNuevaPalabra, 1000);
    }
  } else {
    intentosRestantes--;
    document.getElementById("intentos").innerHTML = intentosRestantes;
    document.getElementById("letrasIngresadas").innerHTML += letra + ' ';
    if (intentosRestantes === 0) {
      incorrectas++;
      setTimeout(cargarNuevaPalabra, 1000);
    }
  }
}

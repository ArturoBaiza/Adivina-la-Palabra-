 let arrayPalabras = [
  "GUITARRA", "ELEFANTE", "TURQUESA", "MARIELA", "TECLADO", "INGLATERRA",
  "COMPUTADORA", "PROGRAMACION", "BICICLETA", "MARIPOSA", "MUSICA",
  "TELEFONO", "CALCULADORA", "LENGUAJE", "ELECTRICIDAD", "AEROPUERTO",
  "DRAGON", "PIZARRA", "RELOJ", "BIBLIOTECA"
];

let ayudas = [
  "Induce oscilaciones en un sustrato elástico mediante perturbaciones mecánicas", // GUITARRA
  "Cuadrúpedo de gran envergadura con probóscide prominente", // ELEFANTE
  "Color que yace en el espectro cromático entre el verde y el azul", // TURQUESA
  "Nombre común en algunos países hispanohablantes", // MARIELA
  "Instrumento digital para la producción de texto mediante métodos electrónicos", // TECLADO
  "Un enclave insular reconocido por su infusión emblemática y su soberano", // INGLATERRA
  "Dispositivo automatizado para el procesamiento y gestión de información", // COMPUTADORA
  "El arte de formular algoritmos para la automatización de procesos", // PROGRAMACION
  "Medio de transporte de tracción humana con un par de ruedas", // BICICLETA
  "Insecto volador que representa el proceso de metamorfosis", // MARIPOSA
  "Manifestación creativa que se experimenta a través del sentido del oído", // MUSICA
  "Instrumento móvil para la transmisión y recepción de información verbal o escrita", // TELEFONO
  "Utensilio matemático para operaciones manuales avanzadas", // CALCULADORA
  "Red de interacción mediante la transmisión oral y textual", // LENGUAJE
  "Corriente de partículas dotadas de carga eléctrica en movimiento", // ELECTRICIDAD
  "Facilidad destinada al mantenimiento y operación de aeronaves", // AEROPUERTO
  "Ente legendario capaz de proyectar flamas con intensidad", // DRAGON
  "Tablero de enseñanza destinado a la inscripción de datos en salas académicas", // PIZARRA
  "Dispositivo destinado a la cuantificación temporal", // RELOJ
  "Local destinado a la adquisición de literatura y publicaciones" // BIBLIOTECA
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
}

function resetGame() {
  correctas = 0;
  incorrectas = 0;
  palabrasJugadas = [];
  cargarNuevaPalabra();
  document.getElementById("gameSection").style.display = "block";
  document.getElementById("finalScreen").style.display = "none";
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
      palabrasJugadas.push(arrayPalabraActual.join('')); // Guardar palabra jugada
    }
  } else {
    intentosRestantes--;
    document.getElementById("intentos").innerHTML = intentosRestantes;
    document.getElementById("letrasIngresadas").innerHTML += letra + ' ';
    if (intentosRestantes === 0) {
      incorrectas++;
      setTimeout(cargarNuevaPalabra, 1000);
      palabrasJugadas.push(arrayPalabraActual.join('')); // Guardar palabra jugada
    }
  }
}

//Selecciono todas las casillas del tablero
const casillas = document.querySelectorAll(".casilla");

//Selecciono el texto por encima del tablero
const texto = document.getElementById("texto");

//Selecciono el botón de reinicio del juego, este está oculto hasta que el juego termina
const restartButton = document.getElementById("restart");

//Variable auxiliar para representar las posiciones de la contradiagonal en el tablero
//Se usa luego en la función para determinar si algún jugador marco sus fichas en la misma
const antiDiagonal = ["0-2", "1-1", "2-0"];

//Son dos spans cuyo innerText contendrá la cantidad de victorias de cada jugador
const xWinsSpan = document.getElementById("xWins");
const oWinsSpan = document.getElementById("oWins");

//Variables acumuladoras de la cantidad de victorias de cada jugador
let xWins = 0;
let oWins = 0;

//Esta bandera, determina si es el turno de X o no
let juegaX = true;

//Estos arrays contienen las posiciones de las casillas marcadas por cada jugador respectivamente
const xPosition = [];
const oPosition = [];

//Función que maneja la lógica del juego
const handleClick = (event) => {
  texto.innerText = !juegaX ? "Juega X" : "Juega O";
  if (juegaX) {
    event.target.innerText = "X";
    xPosition.push(event.target.id);
  } else {
    event.target.innerText = "O";
    oPosition.push(event.target.id);
  }
  juegaX = !juegaX;
  event.target.removeEventListener("click", handleClick);
  if (xPosition.length === 3) {
    if (didPlayerWin(xPosition)) {
      console.log("gana x");
      texto.innerText = "¡¡¡Gana X!!!";
      xWins++;
      xWinsSpan.innerText = xWins;
      endGame();
    } else {
      xPosition.length = 0;
    }
  }
  if (oPosition.length === 3) {
    if (didPlayerWin(oPosition)) {
      console.log("gana o");
      texto.innerText = "¡¡¡Gana O!!!";
      oWins++;
      oWinsSpan.innerText = oWins;
      endGame();
    } else {
      console.log("empate");
      texto.innerText = "Empate";
      endGame();
    }
  }
};

/**
 * Función que determina si cierto jugador ganó el juego
 * Para eso, llama a 4 funciones auxiliares que le ayudan a determinar
 * si algun jugador marco 3 casillas seguidas en la contradiagonal, horizontalmente,
 * verticalmente o en la diagonal. Si todas las funciones le devuelven falso, ese jugador
 * no ganó. Si al menos una le devuelve verdadero, el jugador ganó.
 */
const didPlayerWin = (array) => {
  if (checkArrayEqualityNoOrder(array, antiDiagonal)) {
    return true;
  }
  const rows = array.map((x) => x.charAt(0));
  if (rowColumnChecker(rows)) {
    return true;
  }
  const columns = array.map((x) => x.charAt(2));
  if (rowColumnChecker(columns)) {
    return true;
  }
  if (checkArrayEqualityOrder(rows, columns)) {
    return true;
  }
  return false;
};

/**
 * Función para comprobar si los elementos de un array son iguales.
 * Devuelve true cuando todos los elementos son iguales.
 * Devuelve false en caso contrario.
 */
const rowColumnChecker = (array) => {
  return array.every((x) => x === array[0]);
};

/**
 * Función auxiliar que checkea si dos arrays tienen los mismos valores, considerando tambien si
 * tienen el mismo orden
 */
const checkArrayEqualityOrder = (arr1, arr2) => {
  return JSON.stringify(arr1) == JSON.stringify(arr2);
};

/**
 * Funcion que checkea si dos arrays tienen los mismos valores, sin considerar el orden
 */
const checkArrayEqualityNoOrder = (arr1, arr2) => {
  return (
    arr1.every((item) => arr2.includes(item)) &&
    arr2.every((item) => arr1.includes(item))
  );
};

/**
 * Función usada para bloquear el click las casillas restantes, luego de que un jugador
 * haya sido determinado ganador
 */
const blockRemaining = () => {
  casillas.forEach((x) => {
    x.removeEventListener("click", handleClick);
  });
};

/**
 * Función usada para llamar al bloqueo de casillas y mostrar el botón de reinicio del juego
 */
const endGame = () => {
  blockRemaining();
  restartButton.style.visibility = "visible";
};

/**
 * Función que sirve para reiniciar el juego a su estado inicial
 */
const resetGame = () => {
  casillas.forEach((x) => {
    x.innerText = "";
    xPosition.length = 0;
    oPosition.length = 0;
    x.addEventListener("click", handleClick);
  });
  texto.innerText = "Juega X";
  juegaX = true;
  restartButton.style.visibility = "hidden";
};

restartButton.addEventListener("click", resetGame);

casillas.forEach((x) => {
  x.addEventListener("click", handleClick);
});

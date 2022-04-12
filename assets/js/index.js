const casilla = document.querySelectorAll(".casilla");
const texto = document.getElementById("texto");
const restartButton = document.getElementById("restart");
const antiDiagonal = ["0-2", "1-1", "2-0"];
const xWinsSpan = document.getElementById("xWins");
const oWinsSpan = document.getElementById("oWins");

let xWins = 0;
let oWins = 0;

xWinsSpan.innerText = xWins;
oWinsSpan.innerText = oWins;

let juegaX = true;
const xPosition = [];
const oPosition = [];

const handleClick = (event) => {
  texto.innerText = !juegaX ? "Juega X" : "Juega O";
  if (juegaX) {
    event.target.innerText = "❌";
    xPosition.push(event.target.id);
  } else {
    event.target.innerText = "🅾";
    oPosition.push(event.target.id);
  }
  juegaX = !juegaX;
  event.target.removeEventListener("click", handleClick);
  console.log(xPosition, oPosition);
  if (xPosition.length === 3) {
    if (didPlayerWin(xPosition)) {
      texto.innerText = "Gana X";
      xWins++;
      xWinsSpan.innerText = xWins
      endGame();
    } else {
      xPosition.length = 0;
    }
  }
  if (oPosition.length === 3) {
    if (didPlayerWin(oPosition)) {
      console.log("gana o");
      texto.innerText = "Gana O";
      oWins++;
      oWinsSpan.innerText = oWins
      endGame();
    } else {
      console.log("empate");
      texto.innerText = "Empate";
      endGame();
    }
  }
};

const didPlayerWin = (array) => {
  const rows = array.map((x) => x.charAt(0));
  if (antiDiagonalChecker(array, antiDiagonal)) {
    return true;
  }
  if (rowColumnChecker(rows)) {
    return true;
  }
  const columns = array.map((x) => x.charAt(2));
  if (rowColumnChecker(columns)) {
    return true;
  }
  if (diagonalChecker(rows, columns)) {
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
 * Función que pregunta si los arrays de columna y fila contienen
 * los mismos valores, si es así, quiere decir que alguno de los jugadores
 * completo una de las dos diagonales
 */
const diagonalChecker = (rows, columns) => {
  if (checkArrayEquality(rows, columns)) {
    return true;
  }
  return false;
};

/**
 * Función auxiliar que checkea si dos arrays tienen los mismos valores, sin importar el orden
 */
const checkArrayEquality = (arr1, arr2) => {
  return JSON.stringify(arr1) == JSON.stringify(arr2);
};

/**
 *
 */
const antiDiagonalChecker = (arr1, arr2) => {
  return (
    arr1.every((item) => arr2.includes(item)) &&
    arr2.every((item) => arr1.includes(item))
  );
};

const blockRemaining = () => {
  casilla.forEach((x) => {
    x.removeEventListener("click", handleClick);
  });
};

const endGame = () => {
  blockRemaining();
  restartButton.style.visibility = "visible";
};

const resetGame = () => {
  casilla.forEach((x) => {
    x.innerHTML = "";
    xPosition.length = 0;
    oPosition.length = 0;
    x.addEventListener("click", handleClick);
  });
  texto.innerText = "Juega X";
  juegaX = true;
  restartButton.style.visibility = "hidden";
};

restartButton.addEventListener("click", resetGame);

casilla.forEach((x) => {
  x.addEventListener("click", handleClick);
});

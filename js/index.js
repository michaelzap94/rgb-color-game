/**
 * Created by zapatacajas on 07/06/2016.
 */
var newGameBtn = document.getElementById("newGame");
var easyGameBtn = document.getElementById("easyGame");
var hardGameBtn = document.getElementById("hardGame");
var hard = document.getElementsByClassName("hard");
var easy = document.getElementsByClassName("easy");
var allSq = document.getElementsByClassName("allSq");
var chooseToWin = document.getElementById("chooseToWin");
var eventMessage = document.getElementById("eventMessage");
var header = document.getElementById("header");

var varWin;

function randomSelector(arr, specify) {

  var x = Math.random(); //random number
  if (specify === "easy") {
    x = 2 * x; //if we want "say" a random number 0-3
  } else {
    x = 5 * x; //if we want "say" a random number 0-5

  }

  x = Math.round(x);

  var varWinTemp = arr[x];
  chooseToWin.textContent = varWinTemp;

  return varWinTemp;

}

var randomNumber = function() {
  var rgbArray = [];
  for (var i = 0; i < 3; i++) {
    var x = Math.random(); //random number
    x = 255 * x; //if we want "say" a random number 0-255
    x = Math.round(x); //////  rounds a number;
    rgbArray.push(x);
  }

  return rgbArray;
}

var arrRandom = function() {
  var rgbArrayRandomGenerator = randomNumber();

  var rgbColor = "rgb(" + rgbArrayRandomGenerator[0] + ", " + rgbArrayRandomGenerator[1] + ", " + rgbArrayRandomGenerator[2] + ")";

  return rgbColor;
}

function newColorsEasy() {
  // this.classList.add("mySelected");

  header.style.background = "";
  var easyArr = [];

  for (var i = 0; i < allSq.length; i++) {
    allSq[i].style.background = "";

    //////AVOIDS INTERACTION WITH MOUSE.
    allSq[i].style.pointerEvents = "none";
    //////////////////////////////////
  }
  for (var i = 0; i < easy.length; i++) {

    //////RESTORE INTERACTION WITH MOUSE.
    easy[i].style.pointerEvents = "";
    /////////////////////////////////////////

    var arrRandomGrb = arrRandom();
    easyArr.push(arrRandomGrb);
    easy[i].style.background = arrRandomGrb;
  }

  console.log(easyArr);
  varWin = randomSelector(easyArr, "easy");
  console.log(varWin);

  //////DISABLES BUTTON.
  easyGameBtn.disabled = true;
  easyGameBtn.classList.add("mySelected");

  //////ENABLES BUTTON.
  hardGameBtn.disabled = false;
  hardGameBtn.classList.remove("mySelected");

}

function newColors() {
  header.style.background = "";

  // this.classList.add("mySelected");

  var hardArr = [];

  for (var i = 0; i < allSq.length; i++) {
    allSq[i].style.pointerEvents = "";

    var arrRandomGrb = arrRandom();
    hardArr.push(arrRandomGrb);
    allSq[i].style.background = arrRandomGrb;
  }
  hardGameBtn.disabled = true;
  hardGameBtn.classList.add("mySelected");

  easyGameBtn.disabled = false;
  easyGameBtn.classList.remove("mySelected");

  console.log(hardArr);
  varWin = randomSelector(hardArr);
  console.log(varWin);

}
//////////CALLS ITSELF WHEN REFRESH(default)
(newColors());
///////////////
function allReset() {
  for (var i = 0; i < allSq.length; i++) {
    allSq[i].style.background = "";
    allSq[i].style.pointerEvents = "none";
  }
}

function finalWin(winTemp) {

  header.style.background = winTemp;
  for (var i = 0; i < allSq.length; i++) {
    allSq[i].style.background = winTemp;
  }

}

easyGameBtn.addEventListener("click", newColorsEasy);
hardGameBtn.addEventListener("click", newColors);

for (var i = 0; i < allSq.length; i++) {
  allSq[i].addEventListener("click", function() {

    if (this.style.background.toString() === varWin) {
      eventMessage.textContent = "Success";
      allReset();
      finalWin(varWin);

    } else {
      eventMessage.textContent = "Try Again";
      this.style.background = "";
    }

  });
}

newGameBtn.addEventListener("click", function() {
  if (hardGameBtn.disabled === true) {
    newColors();
  } else {
    newColorsEasy();
  }
});
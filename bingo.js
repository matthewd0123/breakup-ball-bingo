/* Borrowed from https://github.com/noahpen/bingo-js/blob/master/scripts/bingo.js for the BINGO logic */

function setUsername() {
    user = String(document.getElementById("uname").value);
    for (i = 0; i < 25; i++) {
      firebase.database().ref("users/" + user + "/cell" + i).set({
        clicked: "no"
      });
    }
//window.location.replace("./bingo.html");	
}

function addYesData(cell, user) { // keeps track of selected cells of the bingo boards with user
    firebase.database().ref("users/" + user + "/" + cell).set({
      clicked: "yes"
    });
}

function addNoData(cell, user) { // keeps track of selected cells of the bingo boards with user
    firebase.database().ref("users/" + user + "/" + cell).set({
        clicked: "no"
    });
}

function checkForBingo(cell, user) {
   var verticalBingo, horizontalBingo, diagonalBingo = false;
   markSquare(cell, user); // marks the cell that the user clicks
   // checks for BINGO!
   verticalBingo = checkVerticalBingo();
   horizontalBingo = checkHorizontalBingo();
   diagonalBingo = checkDiagonalBingo();
   if (verticalBingo || horizontalBingo || diagonalBingo) {
       firebase.database().ref("users/" + user + "/bingo?").set({
           clicked: "true"
       });
   }
}

function pullData() {
    firebase.database().ref('/users/').once('value').then(function(snapshot) {
    var  allData = snapshot.val()
    var keysObj = Object.keys(allData)
    var valuesObj = Object.values(allData)
    var table = document.getElementById("dataTable");
    for (i = 0; i < keysObj.length; i++) {
	var row = table.insertRow(i);
 	var cell1 = row.insertCell(0);
 	cell1.innerHTML = keysObj[i];
	var cell2 = row.insertCell(1)
	yeses = 0;
	for (j = 0; j < Object.values(valuesObj[i]).length; j++) {
  	    if (Object.values(Object.values(valuesObj[i])[j])[0] == "yes") {
    	    	yeses ++;
  	    }
	}
    cell2.innerHTML = yeses
    }
    });
}

function markSquare(cell, user) {
    var currentSquare = document.getElementById(cell);
    if (currentSquare.style.backgroundColor == "rgb(218, 165, 32)") {
	addNoData(cell, user);
        currentSquare.style.backgroundColor = "white";
        currentSquare.style.color = "rgb(33, 37, 41)";
        currentSquare.style.borderColor = "rgb(218, 165, 32)";
    }
    else {
        addYesData(cell, user);
	currentSquare.style.backgroundColor = "rgb(218, 165, 32)";
        currentSquare.style.color = "white";
        currentSquare.style.borderColor = "white";
    }
    return;
}

function checkVerticalBingo() {
    for (var i = 0; i < 5; i++) {
        var cell1 = document.getElementById('cell' + i);
        var cell2 = document.getElementById('cell' + (i + 5));
        var cell3 = document.getElementById('cell' + (i + 10));
        var cell4 = document.getElementById('cell' + (i + 15));
        var cell5 = document.getElementById('cell' + (i + 20));

        return checkLines(cell1, cell2, cell3, cell4, cell5);
    }
}

function checkHorizontalBingo() {
    j = 0;
    for (var i = 0; i < 5; i++) {
        switch(i) {
            case 0:
                var cell1 = document.getElementById('cell' + i);
                var cell2 = document.getElementById('cell' + (i + 1));
                var cell3 = document.getElementById('cell' + (i + 2));
                var cell4 = document.getElementById('cell' + (i + 3));
                var cell5 = document.getElementById('cell' + (i + 4));
                break;
            case 1:
                var cell1 = document.getElementById('cell' + (i + 4));
                var cell2 = document.getElementById('cell' + (i + 5));
                var cell3 = document.getElementById('cell' + (i + 6));
                var cell4 = document.getElementById('cell' + (i + 7));
                var cell5 = document.getElementById('cell' + (i + 8));
                break;
            case 2:
                var cell1 = document.getElementById('cell' + (i + 8));
                var cell2 = document.getElementById('cell' + (i + 9));
                var cell3 = document.getElementById('cell' + (i + 10));
                var cell4 = document.getElementById('cell' + (i + 11));
                var cell5 = document.getElementById('cell' + (i + 12));
                break;
            case 3:
                var cell1 = document.getElementById('cell' + (i + 12));
                var cell2 = document.getElementById('cell' + (i + 13));
                var cell3 = document.getElementById('cell' + (i + 14));
                var cell4 = document.getElementById('cell' + (i + 15));
                var cell5 = document.getElementById('cell' + (i + 16));
                break;
            case 4:
                var cell1 = document.getElementById('cell' + (i + 16));
                var cell2 = document.getElementById('cell' + (i + 17));
                var cell3 = document.getElementById('cell' + (i + 18));
                var cell4 = document.getElementById('cell' + (i + 19));
                var cell5 = document.getElementById('cell' + (i + 20));
                break;
        }
        return checkLines(cell1, cell2, cell3, cell4, cell5);
    }
}

function checkDiagonalBingo() {
    for (var i = 0; i < 2; i++) {
        switch(i) {
            case 0:
                var cell1 = document.getElementById('cell' + 0);
                var cell2 = document.getElementById('cell' + 6);
                var cell3 = document.getElementById('cell' + 12);
                var cell4 = document.getElementById('cell' + 18);
                var cell5 = document.getElementById('cell' + 24);
                break;
            case 1:
                var cell1 = document.getElementById('cell' + 4);
                var cell2 = document.getElementById('cell' + 8);
                var cell3 = document.getElementById('cell' + 12);
                var cell4 = document.getElementById('cell' + 16);
                var cell5 = document.getElementById('cell' + 20);
                break;
        }
        return checkLines(cell1, cell2, cell3, cell4, cell5);
    }
}

function checkLines(cell1, cell2, cell3, cell4, cell5) {
    if (cell1.style.backgroundColor == "rgb(218, 165, 32)" &&
        cell2.style.backgroundColor == "rgb(218, 165, 32)" &&
        cell3.innerText == "FREE SPACE" &&
        cell4.style.backgroundColor == "rgb(218, 165, 32)" &&
        cell5.style.backgroundColor == "rgb(218, 165, 32)") {
	    	alert("BINGO! You win!");
	        return true;
    }
    else if (cell1.style.backgroundColor == "rgb(218, 165, 32)" &&
            cell2.style.backgroundColor == "rgb(218, 165, 32)" &&
            cell3.style.backgroundColor == "rgb(218, 165, 32)" &&
            cell4.style.backgroundColor == "rgb(218, 165, 32)" &&
            cell5.style.backgroundColor == "rgb(218, 165, 32)") {
	    	alert("BINGO! You win!");
	        return true;
    }
}

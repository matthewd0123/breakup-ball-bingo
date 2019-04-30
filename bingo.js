/* Borrowed from https://github.com/noahpen/bingo-js/blob/master/scripts/bingo.js for the BINGO logic */

function checkForBingo(cell) {
   markSquare(cell); // marks the cell that the user clicks
   // checks for BINGO!
   checkVerticalBingo();
   checkHorizontalBingo();
   checkDiagonalBingo();
}

function markSquare(cell) {
    var currentSquare = document.getElementById(cell);
    if (currentSquare.style.backgroundColor == "rgb(218, 165, 32)") {
        currentSquare.style.backgroundColor = "white";
        currentSquare.style.color = "rgb(33, 37, 41)";
    }
    else {
        currentSquare.style.backgroundColor = "rgb(218, 165, 32)";
        currentSquare.style.color = "white";
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

        checkLines(cell1, cell2, cell3, cell4, cell5);
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
        checkLines(cell1, cell2, cell3, cell4, cell5);
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
        checkLines(cell1, cell2, cell3, cell4, cell5);
    }
}

function checkLines(cell1, cell2, cell3, cell4, cell5) {
    if (cell1.style.backgroundColor == "rgb(218, 165, 32)" &&
        cell2.style.backgroundColor == "rgb(218, 165, 32)" &&
        cell3.innerText == "FREE SPACE" &&
        cell4.style.backgroundColor == "rgb(218, 165, 32)" &&
        cell5.style.backgroundColor == "rgb(218, 165, 32)") {
	    	alert("BINGO! You win!");
    }
    else if (cell1.style.backgroundColor == "rgb(218, 165, 32)" &&
            cell2.style.backgroundColor == "rgb(218, 165, 32)" &&
            cell3.style.backgroundColor == "rgb(218, 165, 32)" &&
            cell4.style.backgroundColor == "rgb(218, 165, 32)" &&
            cell5.style.backgroundColor == "rgb(218, 165, 32)") {
	    	alert("BINGO! You win!");
    }
}

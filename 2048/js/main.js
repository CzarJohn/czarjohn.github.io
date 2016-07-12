//code level: noob

var tableArray = [];
var gameOver = false;

$(document).ready(function(){


	$(document).on("swipeleft", function(){
		if(!gameOver){
			moved = moveLeft();	
			setTimeout(function(){
				if(moved){
			    	randomTile();	
					updateTable();
				   	if(status() == true){
				   		$('#start').delay(500).fadeIn(300);
						$('#table').delay(500).fadeOut(300);
						$('#itable').delay(500).fadeOut(300);
				   	}
			    }
		    }, 300);
		}
	});

	$(document).on("swipeleft", function(){
		if(!gameOver){
			moved = moveLeft();	
			setTimeout(function(){
				if(moved){
			    	randomTile();	
					updateTable();
				   	if(status() == true){
				   		$('#start').delay(500).fadeIn(300);
						$('#table').delay(500).fadeOut(300);
						$('#itable').delay(500).fadeOut(300);
				   	}
			    }
		    }, 300);
		}
	});

	$(document).on("swipeup", function(){
		if(!gameOver){
			moved = moveUp();	
			setTimeout(function(){
				if(moved){
			    	randomTile();	
					updateTable();
				   	if(status() == true){
				   		$('#start').delay(500).fadeIn(300);
						$('#table').delay(500).fadeOut(300);
						$('#itable').delay(500).fadeOut(300);
				   	}
			    }
		    }, 300);
		}
	});

	$(document).on("swipedown", function(){
		if(!gameOver){
			moved = moveDown();	
			setTimeout(function(){
				if(moved){
			    	randomTile();	
					updateTable();
				   	if(status() == true){
				   		$('#start').delay(500).fadeIn(300);
						$('#table').delay(500).fadeOut(300);
						$('#itable').delay(500).fadeOut(300);
				   	}
			    }
		    }, 300);
		}
	});

	$(document).on("swiperight", function(){
		if(!gameOver){
			moved = moveRight();	
			setTimeout(function(){
				if(moved){
			    	randomTile();	
					updateTable();
				   	if(status() == true){
				   		$('#start').delay(500).fadeIn(300);
						$('#table').delay(500).fadeOut(300);
						$('#itable').delay(500).fadeOut(300);
				   	}
			    }
		    }, 300);
		}
	});



	$('#table').hide();
	$('#itable').hide();
});

$('#start').click(function(){
	$('#start').fadeOut(300);
	$('#table').fadeIn(300);
	$('#itable').fadeIn(300);

	startGame();
	document.onkeydown = checkKey;
});

$('#hello').click(function(){
	$('#hello').animate({
		marginLeft: "+=100px"
	}, 500, function() {});
});

function checkKey(e) {
    e = e || window.event;
    var moved = false;
    if(gameOver){

    }
    else if (e.keyCode == '37') { //left
    	moved = moveLeft();
    }
    else if (e.keyCode == '38') { //up
    	moved = moveUp();
    }
    else if (e.keyCode == '39') { //right
    	moved = moveRight();
    }
    else if (e.keyCode == '40') { //down
    	moved = moveDown();	
    }
    setTimeout(function(){
		if(moved){
	    	//console.log(moved);
	    	randomTile();	
			updateTable();
		   	if(status() == true){
		   		$('#start').delay(500).fadeIn(300);
				$('#table').delay(500).fadeOut(300);
				$('#itable').delay(500).fadeOut(300);
		   	}
	    }
    }, 300);
}

function status(){
	gameOver = true;
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			if(tableArray[i][j] == 0){
				gameOver = false;
			}
		}
	}
	return gameOver;
}

function init(){
	for(var i=0; i<4; i++){
		tableArray[i] = [];
		for(var j=0; j<4; j++){
			tableArray[i][j] = 0;
			$('#itile-'+i+'-'+j).css('background-image', 'none');
			//$('itile-'+i+'-'+j).fadeOut(0);
			//$('#itile-'+i+'-'+j).offset($('#tile-'+i+'-'+j).offset());
		}
	}
}

function startGame(){
	gameOver = false;
	init();
	for(var i=0; i<2; i++){
		randomTile();
	}
	updateTable();
}

function randomTile(){
	var clear = false;
	while( !(clear) ){
		var tempi = Math.floor(4+(-4)*Math.random());
		var tempj = Math.floor(4+(-4)*Math.random());
		var temp = Math.floor(3+(-2)*Math.random());
		if(tableArray[tempi][tempj] == 0)  {
			if(temp == 1)
				tableArray[tempi][tempj] = 2;
			else
				tableArray[tempi][tempj] = 4;
			clear = true;
		}
	}
}

function updateTable(){
	for(var i=0; i<4; i++) {
		for(var j=0; j<4; j++) {
			if(tableArray[i][j] > 0){
				$('#tile-'+i+'-'+j).css('background-image',"url('images/"+tableArray[i][j]+".jpg')");
			}
			else{
				$('#tile-'+i+'-'+j).css('background-image',"url('images/0.jpg')");
			}
			$('#itile-'+i+'-'+j).offset($('#tile-'+i+'-'+j).offset());
			$('#itile-'+i+'-'+j).css('background-image', 'none');
			//$('#itile-'+i+'-'+j).fadeOut(0);
		}
	}
}

function moveLeft(){
	var moved = false;
	for(var j=1; j<4; j++){
		for(var i=0; i<4; i++){
			if(tableArray[i][j] > 0){
				for(var j2=j-1; j2>=0; j2--){
					if(j2 == 0){
						if(tableArray[i][j2] == 0 || tableArray[i][j2] == tableArray[i][j]){
							move(i,j, i,j2, 1);
							moved = true;
						}
						else break;
					}
					else {
						if(tableArray[i][j2] == 0 && tableArray[i][j2-1] != 0 && tableArray[i][j2-1] != tableArray[i][j]){
							move(i,j, i,j2, 1);
							moved = true;
						}
						else if(tableArray[i][j2] == tableArray[i][j]){
							move(i,j, i,j2, 1);
							moved = true;
						}
						else if(tableArray[i][j2] != 0 && tableArray[i][j2] != tableArray[i][j]){
							break;
						}	
					}
				}
			}
		}
	}
	//setTimeout(function(){return moved;}, 500);
	return moved;
}


function moveUp(){
	var moved = false;
	for(var i=1; i<4; i++){
		for(var j=0; j<4; j++){
			if(tableArray[i][j] > 0){
				for(var i2=i-1; i2>=0; i2--){
					if(i2 == 0){
						if(tableArray[i2][j] == 0 || tableArray[i2][j] == tableArray[i][j]){
							move(i,j, i2,j, 2);
							moved = true;
						}
						else break;
					}
					else {
						if(tableArray[i2][j] == 0 && tableArray[i2-1][j] != 0 && tableArray[i2-1][j] != tableArray[i][j]){
							move(i,j, i2,j, 2);
							moved = true;
						}
						else if(tableArray[i2][j] == tableArray[i][j]){
							move(i,j, i2,j, 2);
							moved = true;
						}
						else if(tableArray[i2][j] != 0 && tableArray[i2][j] != tableArray[i][j]){
							break;
						}	
					}
				}
			}
		}
	}
	//setTimeout(function(){return moved;}, 500);
	return moved;
}

function moveRight(){
	var moved = false;
	for(var j=2; j>=0; j--){
		for(var i=0; i<4; i++){
			if(tableArray[i][j] > 0){
				for(var j2=j+1; j2<4; j2++){
					if(j2 == 3){
						if(tableArray[i][j2] == 0 || tableArray[i][j2] == tableArray[i][j]){
							move(i,j, i,j2, 3, 2);
							moved = true;
						}
						else break;
					}
					else {
						if(tableArray[i][j2] == 0 && tableArray[i][j2+1] != 0 && tableArray[i][j2+1] != tableArray[i][j]){
							move(i,j, i,j2, 3);
							moved = true;
						}
						else if(tableArray[i][j2] == tableArray[i][j]){
							move(i,j, i,j2, 3);
							moved = true;
						}
						else if(tableArray[i][j2] != 0 && tableArray[i][j2] != tableArray[i][j]){
							break;
						}	
					}
				}
			}
		}
	}
	//setTimeout(function(){return moved;}, 500);
	return moved;
}

function moveDown(){
	var moved = false;
	for(var i=2; i>=0; i--){
		for(var j=0; j<4; j++){
			if(tableArray[i][j] > 0){
				for(var i2=i+1; i2<4; i2++){
					if(i2 == 3){
						if(tableArray[i2][j] == 0 || tableArray[i2][j] == tableArray[i][j]){
							move(i,j, i2,j, 4);
							moved = true;
							//console.log("1");
						}
						else break;
					}
					else {
						if(tableArray[i2][j] == 0 && tableArray[i2+1][j] != 0 && tableArray[i2+1][j] != tableArray[i][j]){
							move(i,j, i2,j, 4);
							moved = true;
							//console.log("2");
						}
						else if(tableArray[i2][j] == tableArray[i][j]){
							move(i,j, i2,j, 4);
							moved = true;
							//console.log("3");
						}
						else if(tableArray[i2][j] != 0 && tableArray[i2][j] != tableArray[i][j]){
							break;
						}	
					}
				}
			}
		}
	}
	//setTimeout(function(){return moved;}, 500);
	return moved;
}

function move(i1, j1, i2, j2, type){
	var source = tableArray[i1][j1];
	var destination = tableArray[i2][j2];

	tableArray[i2][j2] = source+destination;
	tableArray[i1][j1] = 0;


	$('#itile-'+i1+'-'+j1).offset($('#tile-'+i1+'-'+j1).offset());
	$('#tile-'+i1+'-'+j1).css('background-image',"url('images/0.jpg')");
	$('#itile-'+i1+'-'+j1).css('background-image',"url('images/"+source+".jpg')");
	$('#itile-'+i1+'-'+j1).fadeIn(0);

	if(type == 1 || type == 3){
		var dist = j2-j1;
		$('#itile-'+i1+'-'+j1).animate({
			marginLeft: "+="+(125*dist)+"px"
		}, 300, function() {
			tableArray[i2][j2] = source+destination;
		});
	}
	else if(type == 2 || type == 4){
		var dist = i2-i1;
		$('#itile-'+i1+'-'+j1).animate({
			marginTop: "+="+(125*dist)+"px"
		}, 300, function() {
			tableArray[i2][j2] = source+destination;
		});
	}
}

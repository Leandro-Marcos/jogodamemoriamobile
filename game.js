function ScoreBoardGameControl (){
	//var score = 0;
	var POINT_GAME = 10;
	var TEXT_SCORE = "Placar : "

	var TOTAL_CORRECT = 20;
	var corrects = 0;

	// this.updateScore =  function (){
		// var scoreDiv = document.getElementById("score");
		// scoreDiv.innerHTML =  TEXT_SCORE + score;
	// }

	// this.incrementScore =  function (){
		// corrects++;
		// score+= POINT_GAME;
		// if (corrects ==  TOTAL_CORRECT){
			// alert("Fim de Jogo! Seu Placar foi " + score);
		// }
	// }

	// this.decrementScore =  function (){
		// score-= POINT_GAME;
	// }
}

function Card(picture){
	var FOLDER_IMAGES = 'resources/'
	var IMAGE_QUESTION  = "question.png"
	this.picture = picture;
	this.visible = true;
	this.block = false;

	this.equals =  function (cardGame){
		if (this.picture.valueOf() == cardGame.picture.valueOf()){
			return true;
		}
		return false;
	}
	this.getPathCardImage =  function(){
		return FOLDER_IMAGES+picture;
	}
	this.getQuestionImage =  function(){
		return FOLDER_IMAGES+IMAGE_QUESTION;
	}	
}

function ControllerLogicGame(){
	var firstSelected;
	var secondSelected;
	var block = false;
	var TIME_SLEEP_BETWEEN_INTERVAL = 1000;
	var eventController = this;

	this.addEventListener =  function (eventName, callback){
		eventController[eventName] = callback;
	};

	this.doLogicGame =  function (card,callback){
		if (!card.block && !block) {
			if (firstSelected == null){
				firstSelected = card;
				card.visible = true;
			}else if (secondSelected == null && firstSelected != card){
				secondSelected = card;
				card.visible = true;
			}

			if (firstSelected != null && secondSelected != null){
				block = true;
				var timer = setInterval(function(){
					if (secondSelected.equals(firstSelected)){
						firstSelected.block = true;
						secondSelected.block = true;
						eventController["correct"](); 
					}else{
						firstSelected.visible  = false;
						secondSelected.visible  = false;
						eventController["wrong"]();
					}        				  		
					firstSelected = null;
					secondSelected = null;
					clearInterval(timer);
					block = false;
					eventController["show"]();
				},TIME_SLEEP_BETWEEN_INTERVAL);
			} 
			eventController["show"]();
		};
	};
}

function CardGame (cards , controllerLogicGame,scoreBoard){
	var LINES = 8;
	var COLS  = 5;
	this.cards = cards;
	var logicGame = controllerLogicGame;
	var scoreBoardGameControl = scoreBoard;
	var pontos = 20;
	var cartas = 0;

	this.clear = function (){
		var game = document.getElementById("game");
		game.innerHTML = '';
	}

	this.show =  function (){
		this.clear();
		//scoreBoardGameControl.updateScore();
		var cardCount = 0;
		var game = document.getElementById("game");
		for(var i = 0 ; i < LINES; i++){
			for(var j = 0 ; j < COLS; j++){
				card = cards[cardCount++];
				var cardImage = document.createElement("img");
				if (card.visible){
					cardImage.setAttribute("src",card.getPathCardImage());
				}else{
					cardImage.setAttribute("src",card.getQuestionImage());
				}
				cardImage.onclick =  (function(position,cardGame) {
					return function() {
						card = cards[position];
						var callback =  function (){
							cardGame.show();
						};
						logicGame.addEventListener("correct",function (){
							//scoreBoardGameControl.incrementScore();
							//scoreBoardGameControl.updateScore();
							cartas++;
							if( cartas == pontos){alert("Fim de Jogo! Seu Placar foi de 200 pontos!");}
						});
						logicGame.addEventListener("wrong",function (){
							//scoreBoardGameControl.decrementScore();
							//scoreBoardGameControl.updateScore();
						});

						logicGame.addEventListener("show",function (){
							cardGame.show();
						});

						logicGame.doLogicGame(card);
						
					};
				})(cardCount-1,this);

				game.appendChild(cardImage);
			}
			var br = document.createElement("br");
			game.appendChild(br);
		}
	}

		this.viraCarta = function(){
/* 			var count = 5;
			while ((count - 1) >= 0){
				count -= 1;
				if (count == 0) {
					count = "fim";
					}else if(count < 10){
						count = "0" + count;
					} */
			var intervalo = setInterval(function (){cardGame.show()},11000);
			//}
			for(var contador = 0; contador < 41; contador++ ){
			cards[contador].visible = false;
			}
			clearInterval(intervalo);
			
		};
	}

function BuilderCardGame(){
	var pictures = new Array (
		'1.png','1.png',
		'2.png','2.png',
		'3.png','3.png',
		'4.png','4.png',
		'5.png','5.png',
		'6.png','6.png',
		'7.png','7.png',
		'8.png','8.png',
		'9.png','9.png',
		'10.png','10.png',
		'11.png','11.png',
		'12.png','12.png',
		'13.png','13.png',
		'14.png','14.png',
		'15.png','15.png',
		'16.png','16.png',
		'17.png','17.png',
		'18.png','18.png',
		'19.png','19.png',
		'20.png','20.png'
		);
		
	this.doCardGame =  function (){
		shufflePictures();
		cards  = buildCardGame();
		cardGame =  new CardGame(cards, new ControllerLogicGame(), new ScoreBoardGameControl())
		cardGame.clear();
		return cardGame;
	}

	var shufflePictures = function(){
		var i = pictures.length, j, tempi, tempj;
		if ( i == 0 ) return false;
		while ( --i ) {
			j = Math.floor( Math.random() * ( i + 1 ) );
			tempi = pictures[i];
			tempj = pictures[j];
			pictures[i] = tempj;
			pictures[j] = tempi;
		}
	}

	var buildCardGame =  function (){
		var countCards = 0;
		cards =  new Array();
		for (var i = pictures.length - 1; i >= 0; i--) {
			card =  new Card(pictures[i]);
			cards[countCards++] = card;
		};
		return cards;
	}
}

function GameControl (){

}

GameControl.createGame = function(){
	var builderCardGame =  new BuilderCardGame();
	cardGame = builderCardGame.doCardGame();
	//cardGame.start();
	cardGame.show();
	cardGame.viraCarta();
}
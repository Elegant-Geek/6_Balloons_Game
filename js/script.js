//script
let colors = ['yellow', 'red', 'blue', 'violet', 'green'];
let windowWidth = window.innerWidth;
let body = document.body;
let windowHeight = window.innerHeight;
let scores = document.querySelectorAll('.score');
let num = 0;
let total = 100;
let currentBalloon = 0;
let gameOver = false;
let totalShadow = document.querySelector('.total-shadow');
let startBtn = document.querySelector('.start-game-button');

function createBalloon() {
	let div = document.createElement('div');
	let rand = Math.floor(Math.random() * colors.length); //using colors.length to include all elements of array! (this way the +1 is also accounted for)
	div.className = 'balloon balloon-' + colors[rand]; //this assigns a classname to the div created in line 6? Applies balloon class to the variable div!!!!
//adding this function to the webpage!
	
	rand = Math.floor(Math.random() * (windowWidth - 100)); //tells program that max width of screen has to allow the 100px balloon to fit completely on the page
	div.style.left = rand + 'px'; //tells css the assigned random position for the balloon!
	div.dataset.number = currentBalloon;
	currentBalloon  ++;


	body.appendChild(div); //creating document.body as variable "body" means this is only calculated once and speeds up webpage
	animateBalloon(div);
}

function animateBalloon(elem) {
	let pos = 0;
	let random = Math.floor(Math.random() * 6 - 3);
	//balloon must stop floating at the top
	let interval = setInterval(frame, 12 - Math.floor(num / 10) + random); //excutes frame function, every 10 milliseconds*

	function frame() {
		// console.log(pos);
		if(pos >= (windowHeight + 200) && (document.querySelector('[data-number="'+elem.dataset.number+'"]') !== null)) {
			clearInterval(interval); //program stops the animation once balloon is offscreen (windowheight plus 200px, the height of the balloon div)
			gameOver = true;
		} else {
			pos ++; //increases position by 1 ... px.
			elem.style.top = windowHeight - pos + 'px'; //updates the css stylesheet position for balloon div
		}
	}
}
function deleteBalloon(elem) {
	elem.remove();
	num ++; //increase score by 1 each time balloon is popped
	updateScore();
	playPopSound();
}						
function playPopSound() {
	let audio = document.createElement('audio');
	audio.src = 'sounds/pop.mp3';
	audio.play();
}

function playBGMusic() {
	let audio = document.createElement('audio');
	audio.src = 'sounds/bg-music.mp3';
	audio.play();
}

function updateScore() {
	for(let i = 0; i < scores.length; i++) {
		scores[i].textContent = num;
	}
}
function startGame() { //automating balloon creation each 800 milliseconds.
	restartGame();
	let timeout = 0;
	let loop = setInterval(function() { //loop is the name given to the set time interval function that repeats every 800 ms
		timeout = Math.floor(Math.random() * 600 - 100);
		if(!gameOver && num !== total) { //if gameover is not equal to true and the total of popped balloons is not equal to 100, program keeps creating new balloons.
			createBalloon();
		} else if(num !== total) {
			clearInterval(loop); //we end the loop if gameOver = true.
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.lose').style.display = 'block';
		} else {
			clearInterval(loop); //we end the loop if gameOver = true.
			totalShadow.style.display = 'flex';
			totalShadow.querySelector('.win').style.display = 'block';
		}
	}, 800 + timeout); // timeout adds a bit of variance for WHEN a balloon is released 
}
function restartGame() {
	let forRemoving = document.querySelectorAll('.balloon');
	for(let i = 0; i < forRemoving.length; i++) {
		forRemoving[i].remove();		//deletes all balloons from webpage
	}
	gameOver = false;
	num = 0; //puts no balloons on webpage
	updateScore(); //updates score
}
// ===== EVENT DELEGATION IN JS ========== (delete balloon if clicked on)
document.addEventListener('click', function(event) { //adding event listener to whole webpage
	if(event.target.classList.contains('balloon')) {
		deleteBalloon(event.target);
	}
})
//for the yes button:
document.querySelector('.restart').addEventListener('click', function () {
	totalShadow.style.display = 'none';
	totalShadow.querySelector('.win').style.display = 'none';
	totalShadow.querySelector('.lose').style.display = 'none';
	startGame();
})

//for the no button:
document.querySelector('.cancel').addEventListener('click', function () {
	totalShadow.style.display = 'none';
})


startBtn.addEventListener('click', function() {
	startGame();
	document.querySelector('.bg-music').play();
	document.querySelector('.start-game-window').style.display = 'none';
});
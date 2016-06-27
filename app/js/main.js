'use strict';

var canvas = document.getElementById('pong');
var c = canvas.getContext('2d');

var randomNum = function(min, max) {
	return Math.random() * (max - min) + min;
}

var playerScore = 0;
var opponentScore = 0;

var animate = (function() {
	return window.requestAnimationFrame || function(callback) {
		return window.setTimeout(callback, 1000/60);
	};
}) ();

function init() {
	animate(draw);
}

function clear() {
	// Field - This is the entire field, colored black.
	c.clearRect(0,0,canvas.width,canvas.height);
	canvas.style.backgroundColor = "black";
	c.save();

	// Center Division - Divides player sides
	c.strokeStyle = "white";
	c.setLineDash([10, 5]);
	c.beginPath();
	c.moveTo(349,0);
	c.lineTo(349, 401);
	c.stroke();
	c.save();
}


// Player Brick
var player = {
	x: 40,
	y: mouse,
	width: 20,
	height: 60,
	color: "white",
	draw: function() {
		c.fillStyle = this.color;
		c.fillRect(this.x,this.y,this.width,this.height);
	}
};

// Maps player brick to mouse's Y position for movement
var mouse = canvas.addEventListener('mousemove', function(e) {
	player.y = e.offsetY;
});

// Opponent Brick
var opponent = {
	x: 640,
	y: 120,
	width: 20,
	height: 60,
	color: "white",
	draw: function() {
		c.fillStyle = this.color;
		c.fillRect(this.x,this.y,this.width,this.height);
	}
};

function opponentMove() {
	// Opponent tracks balls and hits in random place, simulating AI
	// FIXME: Must put a margin of error here so the AI doesn't cheat
	opponent.y = ball.y - randomNum(30,30);
}

// Ball Object
var ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	vx: 5,
	vy: 5,
	width: 8,
	height: 8,
	color: "white",
	draw: function() {
		c.fillStyle = this.color;
		c.fillRect(this.x,this.y,this.width,this.height);
	}
};

function score() {
	// FIXME: Bruh, you gotta fix this. Can't do much else without it.
	// debugger;
	if (ball.x + ball.vx > canvas.width) {
		playerScore++;
	}
	if (ball.x + ball.vx < 5) {
		opponentScore++;
	}
	c.font = "36px sans-serif";
	c.fillStyle = "white";
	c.fillText(playerScore, 165, 30);

	c.font = "36px sans-serif";
	c.fillStyle = "white";
	c.fillText(opponentScore, 520, 30);
}
// Draws everything on the Canvas
function draw() {
	clear();
	player.draw();
	opponent.draw();
	opponentMove();
	score();

	ball.draw();
	// Ball Velocity
	ball.x += ball.vx;
	ball.y += ball.vy;

	// Ball Collision with Walls
	if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
		ball.vy = -ball.vy;
	}
	// Ball reappears in center if crossing the "goals"
	if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
		ball.x = canvas.width / 2; // Make the ball reappear in the center.
		ball.y = canvas.height / 2;
		ball.vx = 5;
		ball.vy = 5;
	}

	// Player Collision with Ball
	if ((ball.x + ball.vx) < (player.x + player.width) && (ball.x + ball.width) > player.x && (ball.y + ball.vy) < (player.y + player.height) && (ball.y + ball.height) > player.y) {
		// Makes the ball's speed vary when hitting player brick
		ball.vx = -ball.vx - randomNum(2,4);
		ball.vy = -ball.vy - randomNum(2,4);
		if (ball.x + ball.vx > 7) {
			ball.x + ball.vx == 5;
		}
	}
	// Opponent Collision with Ball
	if ((ball.x + ball.vx) < (opponent.x + opponent.width) && (ball.x + ball.width) > opponent.x && (ball.y + ball.vy) < (opponent.y + opponent.height) && (ball.y + ball.height) > opponent.y) {
		// Makes the ball's speed vary when hitting opponent brick
		ball.vx = -ball.vx - randomNum(2,4);
		ball.vy = -ball.vy - randomNum(2,4);
		if (ball.x + ball.vx > 7) {
			ball.x + ball.vx == 5;
		}
	}

	animate(draw);
}

init();

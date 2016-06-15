'use strict';

var canvas = document.getElementById('pong');
var c = canvas.getContext('2d');
// var origin = c.fillRect(312,154,8,8);
var rAF = (function() {
	return window.requestAnimationFrame || function(callback) {
		return window.setTimeout(callback, 1000/60);
	};
}) ();

function init() {
	rAF(draw);
}

function clear() {
	// Field - This is the entire field, colored black.
	c.clearRect(0,0,canvas.width,canvas.height);
	canvas.style.backgroundColor = "black";

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
	y: 40,
	width: 20,
	height: 60,
	color: "white",
	draw: function() {
		c.fillStyle = this.color;
		c.fillRect(this.x,this.y,this.width,this.height);
	}
};

// Maps player brick to mouse's Y position for movement
canvas.addEventListener('mousemove', function(e) {
	player.y = e.clientY;
});

// Opponent Brick
var opponent = {
	x: 640,
	y: 120,
	vy: 5,
	width: 20,
	height: 60,
	color: "white",
	draw: function() {
		c.fillStyle = this.color;
		c.fillRect(this.x,this.y,this.width,this.height);
	}
};

// Ball Object
var ball = {
	x: 312,
	y: 154,
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


// Draws everything on the Canvas
function draw() {
	clear();
	player.draw();
	opponent.draw();

	ball.draw();
	// Ball Velocity
	ball.x += ball.vx;
	ball.y += ball.vy;

	// Ball Collision with Walls
	if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
		ball.vy = -ball.vy;
	}
	if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
		ball.vx = -ball.vx;
	}
	// Ball Collision with Player and Opponent
	if (ball.x + ball.vx == player.draw() || ball.x + ball.vx == opponent.draw()) {
		ball.vx = -ball.vx;
	}
	if (ball.y + ball.vy == player.draw() || ball.y + ball.vy == opponent.draw()) {
		ball.vy = -ball.vy;
	}

	rAF(draw);
}

init();

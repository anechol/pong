var canvas = document.getElementById('pong')
var c = canvas.getContext('2d');

// Clear
c.clearRect(0,0,canvas.width,canvas.height);
c.save();

// Field
canvas.style.backgroundColor = "black";
	// Center Division
c.strokeStyle = "white";
c.setLineDash([10, 5]);
c.beginPath();
c.moveTo(349,0);
c.lineTo(349, 401);
c.stroke();


// Player Brick
var player = {
	x: 40,
	y: 40,
	vy: 5,
	width: 20,
	height: 60,
	color: "white",
	draw: function() {
		c.fillStyle = this.color;
		c.fillRect(this.x,this.y,this.width,this.height);
	}
};

player.draw();

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

opponent.draw();

var ball = {
	x: 312,
	y: 154,
	width: 8,
	height: 8,
	color: "white",
	draw: function() {
		c.fillStyle = this.color;
		c.fillRect(this.x,this.y,this.width,this.height);
	}
};

ball.draw();

function draw() {

}

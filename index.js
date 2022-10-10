var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

//Create circle object
function Circle(x, y, dx, dy, radius){
	this.x = x; 
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		c.strokeStyle = 'blue';
		c.stroke();
		c.fill(); // will fill circles
	}

	this.update = function(){
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0  ) /*for edge of circle*/ /*used to have circle bounce on other side of screen*/
		{
			this.dx = -this.dx;
		}
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
		{
			this.dy = -this.dy;
		}
			this.x += this.dx; // dx pixels per frame refresh to the right
			this.y += this.dy; // dy pixels per frame refresh starting up

			this.draw();
		}
}

var circleArray = []; // stores object into an array

for (var i = 0; i < 1000; i++){
	//random to make more? Math.random()
	var radius = Math.random() * 30;
	var x = Math.random() * (innerWidth - radius * 2) + radius; 
	var y = Math.random()* (innerHeight - radius * 2) + radius; //use a variable to change values of arc
	var dx = (Math.random() - 0.5) ;  // -0.5 allows to get either negative or positive value
	var dy = (Math.random() - 0.5) ; // speed of movement variable
	
	circleArray.push(new Circle(x, y, dx, dy, radius)); // pushes new value to end of open array
}

console.log(circleArray); // tests that array is working and randomizing

function clearCanvas(){
  var dirka = c.clearRect(0, 0, innerWidth, innerHeight);
  return dirka;
}

function animate(){
 
	requestAnimationFrame(animate); // will create a loop for us
	//c.clearRect(0, 0, innerWidth, innerHeight); // clears the canvs
  clearCanvas();

// for loop to call circle method using circle array and create moving circles due to length of circlearrry
	for (var i=0; i < circleArray.length; i++){
		circleArray[i].update();
	}
}

animate(); // requests animate function
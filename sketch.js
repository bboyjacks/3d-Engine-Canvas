let cube;
let angle;
function setup() {
	createCanvas(400, 400);
	cube = new Cube(
		[100, 300, 200],
		[100, 100, 200],
		[300, 300, 200],
		[300, 100, 200],
		[300, 300, 0],
		[300, 100, 0],
		[100, 300, 0],
		[100, 100, 0],
	);

	angle = 0;
}

function draw() {
	background(0);
	
	cube.reset();
	cube.rotateX(angle);
	cube.rotateY(angle);
	cube.rotateZ(angle);
	// cube.fill(0, 100, 135);
	cube.draw();
	angle += 1;
}
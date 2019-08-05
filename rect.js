class Rect {
	constructor(v0, v1, v2, v3) {
		this.t0 = new Triangle(v0, v1, v2);
		this.t1 = new Triangle(v2, v1, v3);
	}

	rotateX(angle) {
		this.t0.rotateX(angle);
		this.t1.rotateX(angle);
	}

	rotateY(angle) {
		this.t0.rotateY(angle);
		this.t1.rotateY(angle);
	}

	rotateZ(angle) {
		this.t0.rotateZ(angle);
		this.t1.rotateZ(angle);
	}

	fill(r, g, b) {
		this.t0.fill(r, g, b);
		this.t1.fill(r, g, b);
	}

	reset() {
		this.t0.reset();
		this.t1.reset();
	}

	draw() {
		this.t0.draw();
		this.t1.draw();
	}
}
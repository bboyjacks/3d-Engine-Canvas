class Cube {
	constructor(v0, v1, v2, v3, v4, v5, v6, v7) {
		this.r0 = new Rect(v0, v1, v2, v3);
		this.r1 = new Rect(v2, v3, v4, v5);
		this.r2 = new Rect(v4, v5, v7, v6);
		// this.r3 = new Rect(v7, v6, v0, v1);
	}

	reset() {
		this.r0.reset();
		this.r1.reset();
		this.r2.reset();
		// this.r3.reset();
	}

	fill(r, g, b) {
		this.r0.fill(r, g, b);
		this.r1.fill(r, g, b);
		this.r2.fill(r, g, b);
		// this.r3.fill(r, g, b);
	}

	rotateX(angle) {
		this.r0.rotateX(angle);
		this.r1.rotateX(angle);
		this.r2.rotateX(angle);
		// this.r3.rotateX(angle);
	}

	rotateY(angle) {
		this.r0.rotateY(angle);
		this.r1.rotateY(angle);
		this.r2.rotateY(angle);
		// this.r3.rotateY(angle);
	}

	rotateZ(angle) {
		this.r0.rotateZ(angle);
		this.r1.rotateZ(angle);
		this.r2.rotateZ(angle);
		// this.r3.rotateZ(angle);
	}

	draw() {
		this.r0.draw();
		this.r1.draw();
		this.r2.draw();
		// this.r3.draw();
	}
}
const proj2d = [
	[1, 0, 0],
	[0, 1, 0]
]

const X = 0;
const Y = 1;
const Z = 2;

class Triangle {
	constructor(v0, v1, v2) {
		this.v0 = this._convertTo3dOrigin(v0);
		this.v1 = this._convertTo3dOrigin(v1);
		this.v2 = this._convertTo3dOrigin(v2);
		this.tv0 = this.v0;
		this.tv1 = this.v1;
		this.tv2 = this.v2;
		this.r = 255;
		this.g = 0;
		this.b = 0;
	}

	reset() {
		this.tv0 = this.v0;
		this.tv1 = this.v1;
		this.tv2 = this.v2;
	}

	rotateX(angle) {
		const mat = [
			[1, 0, 0],
			[0, cos(radians(angle)), -sin(radians(angle))],
			[0, sin(radians(angle)), cos(radians(angle))]
		];

		this.tv0 = matMul(mat, this.tv0);
		this.tv1 = matMul(mat, this.tv1);
		this.tv2 = matMul(mat, this.tv2);
	}

	rotateY(angle) {
		const mat = [
			[cos(radians(angle)), 0, sin(radians(angle))],
			[0, 1, 0],
			[-sin(radians(angle)), 0, cos(radians(angle))],
		];

		this.tv0 = matMul(mat, this.tv0);
		this.tv1 = matMul(mat, this.tv1);
		this.tv2 = matMul(mat, this.tv2);
	}

	rotateZ(angle) {
		const mat = [
			[cos(radians(angle)), -sin(radians(angle)), 0],
			[sin(radians(angle)), cos(radians(angle)), 0],
			[0, 0, 1],
		];

		this.tv0 = matMul(mat, this.tv0);
		this.tv1 = matMul(mat, this.tv1);
		this.tv2 = matMul(mat, this.tv2);
	}

	fill(r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	_getPerspectiveProj2d(z) {
		return [
			[1 / (1 - z), 0, 0],
			[0 , 1 / (1 - z), 0]
		];
	}

	draw() {
		let v0 = matMul(this._getPerspectiveProj2d(this.tv0[Z]), this.tv0);
		let v1 = matMul(this._getPerspectiveProj2d(this.tv1[Z]), this.tv1);
		let v2 = matMul(this._getPerspectiveProj2d(this.tv2[Z]), this.tv2);

		let x0 = map(v0[X], -0.5, 0.5, 0, width);
		let y0 = map(v0[Y], -0.5, 0.5, 0, width);
		let x1 = map(v1[X], -0.5, 0.5, 0, width);
		let y1 = map(v1[Y], -0.5, 0.5, 0, width);
		let x2 = map(v2[X], -0.5, 0.5, 0, width);
		let y2 = map(v2[Y], -0.5, 0.5, 0, width);

		// stroke(255);
		// line(x0, y0, x1, y1);
		// line(x1, y1, x2, y2);
		// line(x2, y2, x0, y0);

		let normalProjectionVal = this._getNormal();
		stroke(this.r * normalProjectionVal, this.g * normalProjectionVal, this.b * normalProjectionVal);
		for (let j = 0; j < height; j++) {
			for (let i = 0; i < width; i++) {
				if (
					this._edgeFunc(i, j, [x0, y0], [x1, y1]) &&
					this._edgeFunc(i, j, [x1, y1], [x2, y2]) &&
					this._edgeFunc(i, j, [x2, y2], [x0, y0])
				) {
					point(i, j);
				}
			}
		}
	}

	_getNormal() {
		let v0 = [(this.tv0[X] - this.tv1[X]),
							(this.tv0[Y] - this.tv1[Y]),
							(this.tv0[Z] - this.tv1[Z])];
		let v1 = [(this.tv0[X] - this.tv2[X]),
							(this.tv0[Y] - this.tv2[Y]),
							(this.tv0[Z] - this.tv2[Z])];

		const cross = (v0, v1) => {
			const cp = [
				(v0[Y] * v1[Z] - v0[Z] * v1[Y]),
				(v0[X] * v1[Z] - v0[Z] * v1[X]),
				(v0[X] * v1[Y] - v0[Y] * v1[X]),
			];

			const mag = sqrt(cp[0] * cp[0] + cp[1] * cp[1] + cp[2] * cp[2]);
			return cp.map(i => {
				return i / mag;
			});
		}

		let camera = [0, 0, 1];

		const dot = (v0, v1) => {
			return (v0[X] * v1[X] + v0[Y] * v1[Y] + v0[Z] * v1[Z]);
		}

		let normal = cross(v0, v1);
		let val = dot(normal, camera);
		return val;
	}

	_getMaxZ(a) {
		let max = -1000;
		for (const i in a) {
			if (i > max)
				max = i;
		}
		return max;
	}

	_getMinZ(a) {
		let min = 1000;
		for (const i in a) {
			if (i < min) 
				min = i;
		}
		return min;
	}

	_edgeFunc(px, py, v0, v1) {
		return (px - v0[X]) * (v1[Y] - v0[Y]) - (py - v0[Y]) * (v1[X] - v0[X]) <= 0;
	}

	_convertTo3dOrigin(v) {
		return v.map(i => {
			return map(i, 0, width, -0.5, 0.5);
		})
	}
}
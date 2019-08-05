function matMul(mat, v) {
	let result = [];
	for (let j = 0; j < mat.length; j++) {
		let sum = 0;
		for (let i = 0; i < mat[0].length; i++) {
			sum += (mat[j][i] * v[i]);
		}
		result.push(sum);
	}
	return result;
}
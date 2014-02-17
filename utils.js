getRandomLocation = function(w, h) {
	var x = Math.floor(Math.random() * w),
		y = Math.floor(Math.random() * h);
	return x + "," + y;
}

generateRandomColor = function() {
	var r = Math.round(Math.random() * 255);
	var g = Math.round(Math.random() * 255);
	var b = Math.round(Math.random() * 255);
	return "rgb(" + r + "," +  g + "," +  b + ")";
}
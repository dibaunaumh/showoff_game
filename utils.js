getRandomLocation = function(w, h) {
	var x = Math.floor(Math.random() * w),
		y = Math.floor(Math.random() * h);
	return x + "," + y;
}

generateRandomColor = function() {
	var r = 128 + Math.round(Math.random() * 127);
	var g = 128 + Math.round(Math.random() * 127);
	var b = 128 + Math.round(Math.random() * 127);
	return "rgb(" + r + "," +  g + "," +  b + ")";
}
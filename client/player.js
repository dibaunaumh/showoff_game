

player = {
	
	getPlayersLocation: function() {
		var playerLocation = {};
		_.each(Players.find().fetch(), function(p) {
			playerLocation[p.location] = p;
		});
		return playerLocation;
	},
	
	getCurrentPlayer: function() {
		return Players.findOne({ user_id: Meteor.user()._id });
	},
	
	move: function(dx, dy) {
		var data = Players.findOne({ user_id: Meteor.user()._id });
		var loc = data.location.split(",");
		var new_x = parseInt(loc[0]) + dx;
		var new_y = parseInt(loc[1]) + dy;
		if (new_x >= 0 && new_x < BOARD_WIDTH && new_y >= 0 && new_y < BOARD_HEIGHT) {
			var new_loc = new_x + "," + new_y;
			Players.update({ _id: data._id }, { $set: { location: new_loc }});
			showoff.checkCollision(new_x, new_y);
		}
		
	}
	
};



showoff = {
	
	getShowoffsLocation: function() {
		var showoffLocation = {};
		_.each(Showoffs.find().fetch(), function(s) {
			showoffLocation[s.location] = s;
		});
		return showoffLocation;
	},
	
	checkCollision: function(x, y) {
		var showoffLocation = this.getShowoffsLocation();
		Session.set("current_showoff", showoffLocation[x + "," + y]);
	}
	
	
};
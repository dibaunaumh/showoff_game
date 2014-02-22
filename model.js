BOARD_WIDTH = 80;
BOARD_HEIGHT = 25;

Players = new Meteor.Collection("players");
Showoffs = new Meteor.Collection("showoffs");
Likes = new Meteor.Collection("likes");

createPlayer = function(data) {
	Players.insert(data);
}

createShowoff = function(data) {
	Showoffs.insert(data);
}

addLike = function(showoff) {
	if (Meteor.user()._id === showoff.user_id) {
		alert("We already know you like this - you showed it off..");
	}
	else {
		Showoffs.update({_id: showoff._id}, 
			{
				$set: { likes: showoff.likes + 1 }
			});		
	}
	Likes.insert({user_id: Meteor.user()._id, showoff_id: showoff._id});
}

Likes.allow({
	insert: function(user_id, like) { 
		if (user_id != like.user_id) return false;
		var existing_likes = Likes.find({user_id: user_id, showoff_id: like.showoff_id}).fetch();
		return existing_likes.length == 0;
		 
	},
	update: function() { return true},
	remove: function() { return true},
});

Showoffs.allow({
	insert: function() { return true},
	remove: function() { return true},
	update: function(user_id, showoff) {
		var existing_likes = Likes.find({user_id: user_id, showoff_id: showoff._id}).fetch();
		return existing_likes.length == 0;
	}
})
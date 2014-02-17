BOARD_WIDTH = 60;
BOARD_HEIGHT = 30;

Players = new Meteor.Collection("players");
Showoffs = new Meteor.Collection("showoffs");


createPlayer = function(data) {
	Players.insert(data);
}

createShowoff = function(data) {
	Showoffs.insert(data);
}

addLike = function(showoff) {
	if (Meteor.user()._id === showoff.user_id) {
		alert("Sorry, you can't add like to your own showoff..");
	}
	else {
		Showoffs.update({_id: showoff._id}, 
			{
				$set: { likes: showoff.likes + 1 }
			});		
	}
}
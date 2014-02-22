Deps.autorun(function() {
	Meteor.subscribe("players");
});

Deps.autorun(function() {
	Meteor.subscribe("showoffs");
});


Template.controls.events({
	'click #move-up': function() { player.move(0, -1); },
	'click #move-right': function() { player.move(1, 0); },
	'click #move-left': function() { player.move(-1, 0); },
	'click #move-down': function() { player.move(0, 1); },
	
	'click #show-off': function() {
		var name = prompt("What are you showing-off?");
		if (!name) return;
		var p = player.getCurrentPlayer();
		createShowoff({
			user_id: p.user_id,
			user_name: p.name,
			user_picture: p.picture,
			name: name,
			likes: 0,
			location: p.location,
			color: p.color
		})
	}
});


Template.showoff.helpers({
	"current_showoff": function() {
		return Session.get("current_showoff");
	},
	"showoff_url": function() {
		var showoff = Session.get("current_showoff");
		if (showoff) {
			var keywords = encodeURIComponent(showoff.name); 
			return "http://www.google.com/search?q=" + keywords + "&btnI";
		}
	},
	"list": function() {
		return Showoffs.find({}, {sort: {likes: -1}});
	} 
});

Template.showoff.events({
	'click .like': function(e) {
		var showoff = Session.get("current_showoff");
		var $el = $(e.target);
		var showoffId = $el.attr("showoff") || $el.parent().attr("showoff");
		if (showoffId) {
			showoff = Showoffs.findOne({_id: showoffId});
		};
		addLike(showoff);
	}
});


Template.game.rendered = function() {
	var self = this;
	
	if (!self.display) {
		self.display = initDisplay();
	}
	
    if (!self.handle) {
        self.handle = Deps.autorun(function () {	
			self.display.clear();
			var playerLocation = player.getPlayersLocation();
			var showoffLocation = showoff.getShowoffsLocation();
	
			for (var x = 0; x < BOARD_WIDTH; x++) {
				for (var y = 0; y < BOARD_HEIGHT; y++) {
					var loc = x + "," + y;
					var p = playerLocation[loc];
					var s = showoffLocation[loc];
					if (s) {
						self.display.draw(x, y, "#", s.color, "white");
					}
					if (p) {
						self.display.draw(x, y, p.glyph, p.color);
					}
				}
			}
		});
		
	}
}


initDisplay = function() {
	var display = null;
	if (!ROT.isSupported()) {
		alert("The rot.js library isn't supported by your browser.");
	} else {
		display = new ROT.Display({
				domElement: "display", 
				width:BOARD_WIDTH, 
				height:BOARD_HEIGHT
			});
			document.getElementById("display").appendChild(display.getContainer());
	}
	return display;
}
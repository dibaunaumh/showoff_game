Meteor.publish("players", function() {
    return Players.find();
});

Meteor.publish("showoffs", function() {
    return Showoffs.find();
});




Accounts.onCreateUser(function(options, user) {
	
    if (user.services.google){
        var accessToken = user.services.google.accessToken,
            result,
            profile;

        result = Meteor.http.get("https://www.googleapis.com/oauth2/v3/userinfo?alt=json", {
            params: {
                access_token: accessToken
            }
        });

        if (result.error)
            throw result.error;

        profile = _.pick(result.data,
            "login",
            "name",
            "avatar_url",
            "picture",
            "url",
            "company",
            "blog",
            "location",
            "email");

        user.profile = profile;

    }
	
	var data = {
		name: user.profile.name,
		picture: user.profile.picture,
		location:  getRandomLocation(BOARD_WIDTH, BOARD_HEIGHT),
		color: generateRandomColor(),
		glyph: user.profile.name[0],
		score: 0,
		user_id: user._id
	};
	createPlayer(data);
	return user;
});
var path = require('path');

var friends = require('../data/friends.js');

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        var addFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: JSON.parse(req.body.scores)
        }
        var friendArr = [];

        friends.forEach(function(item, index) {
            var difference = 0;
            for (var i = 0; i < item.scores.length; i++) {
                difference += Math.abs(item.scores[i] - addFriend.scores[i]);
            }
            friendArr.push({ "difference": difference, "index": index });
        });

        friendArr.sort(function(a, b) {
            return a.difference - b.difference;
        });

        friends.push(addFriend);
        res.json(friends[friendArr[0].index]);

    });
}
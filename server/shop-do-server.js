Meteor.startup(function () {
    return Meteor.methods({
        //removeItem: function(id) {
        //    return FoundItem.remove({id: id});
        //}
    });
});

Kijiji = Meteor.npmRequire( 'kijiji-scraper' );

Meteor.methods({
    'KijijiSearch' : function(keywords) {
        var results;

        Async.runSync(function(done) {
            Kijiji.query(
                {"locationId":"9001"},
                {"keywords": keywords},
                function(error, data) {
                    results = data;
                    done(error, data);
                });
        });
        return results;
    }
});
SavedAds = new Meteor.Collection('SavedAds')

//TODO: add expiry date
SavedAds.schema = new SimpleSchema({
    searchId: {
        type: String,
        label: "parent search",
        max: 200
    },
    title: {
        type: String,
        label: "item title",
        max: 200
    },
    url: {
        type: String,
        label: "item url",
        max: 200
    },
    image: {
        type: String,
        label: "image url",
        max: 200
    },
    userId: {
        type: String,
        autoValue: function(){
            if (this.isInsert) {
                return this.userId;
            }
        }
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();  // Prevent user from supplying their own value
            }
        }
    }
});

SavedAds.attachSchema(SavedAds.schema);
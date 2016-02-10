SavedSearches = new Meteor.Collection('SavedSearches')

SavedSearches.schema = new SimpleSchema({
    keywords: {
        type: String,
        label: "keywords",
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

SavedSearches.attachSchema(SavedSearches.schema);
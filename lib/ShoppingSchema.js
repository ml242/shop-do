SavedSearches = new Meteor.Collection('SavedSearches')

// FoundItem is saved shopping item
FoundItem = new Meteor.Collection('FoundItem')

var Schemas = {};

Schemas.SavedSearch = new SimpleSchema({
    search: {
        type: String,
        label: "search",
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

SavedSearches.attachSchema(Schemas.SavedSearch);


//have to add expiry date

Schemas.FoundItem = new SimpleSchema({
    keywords: {
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

FoundItem.attachSchema(Schemas.FoundItem);

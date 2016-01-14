BigList = new Meteor.Collection('BigList')

var Schemas = {};

Schemas.BigList = new SimpleSchema({
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
    },
});

BigList.attachSchema(Schemas.BigList);
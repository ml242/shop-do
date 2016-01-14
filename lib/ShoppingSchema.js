BigList = new Meteor.Collection('BigList')

var Schemas = {};

Schemas.BigList = new SimpleSchema({
    text: {
        type: String,
        label: "Title",
        max: 200
    }
});

BigList.attachSchema(Schemas.BigList);
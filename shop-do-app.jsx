/**
 * Created by mattlucas on 1/11/16.
 */

App = React.createClass({

    mixins: [ReactMeteorData],

    componentDidMount() {
    },
    componentWillUnmount() {
    },

    getShoppingList() {
        return [
            { _id: 1, text: "This is item 1" },
            { _id: 2, text: "This is item 2" },
            { _id: 3, text: "This is item 3" }
        ];
    },

     //Loads items from the Tasks collection and puts them on this.data.tasks
    getMeteorData() {
        //let query = {};

        //if (this.state.hideCompleted) {
        //    // If hide completed is checked, filter tasks
        //    query = {checked: {$ne: true}};
        //}

        return {
            //tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
            //incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
            currentUser: Meteor.user()
        };
    },

    renderItems() {
        return this.getShoppingList().map((item) => {
            return <Item key={item._id} item={item} />;
        });
    },

    render: function() {
        if ( this.data.currentUser ) {
            return (
                <div>
                    <AccountsUIWrapper />
                    <ul>
                        {this.renderItems()}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <AccountsUIWrapper />
                </div>
            )
        }


    }

});
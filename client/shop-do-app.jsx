/**
 * Created by mattlucas on 1/11/16.
 */

App = React.createClass({

    mixins: [ReactMeteorData],

    componentDidMount() {
    },

    componentWillUnmount() {
    },

     //Loads current logged-in user.
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },

    render: function() {
        if ( this.data.currentUser ) {
            return (
                <div>
                    <AccountsUIWrapper />
                    <ShoppingList userId={this.data.currentUser._id} />
                    <KijijiSearchFeature />
                </div>
            )
        } else {
            return (
                <div>
                    <AccountsUIWrapper />
                    <p>No user is logged in.</p>
                </div>
            )
        }
    }

});

Meteor.startup(function () {
    // Use Meteor.startup to render the component after the page is ready
    ReactDOM.render(<App />, document.getElementById("render-target"));
});
/**
 * Created by mattlucas on 1/11/16.
 */

ShopDoApp = React.createClass({
    componentDidMount() {
    },
    componentWillUnmount() {
    },

    isLoggedIn(){
        return Meteor.user()
    },

    renderHello(){
        return (
            <h1>Hello</h1>)
    },

    render: function() {
        if (this.isLoggedIn()) {
            return (
                <div>
                    <AccountsUIWrapper />
                    <h1> hello </h1>
                </div>
            )

        } else {
            return <AccountsUIWrapper />
        }


    }

});
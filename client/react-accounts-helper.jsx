/**
 * Created by mattlucas on 1/11/16.
 */

AccountsUIWrapper = React.createClass({
    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    },
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    },
    render() {
        // Just render a placeholder container that will be filled in
        return <div ref="container" className="row" />;
    }
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

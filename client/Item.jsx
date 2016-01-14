// Item component - represents a single shopping item
Item = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        item: React.PropTypes.object.isRequired
    },
    render() {
        return (
            <li><span>{this.props.item.search}</span></li>
        );
    }
});
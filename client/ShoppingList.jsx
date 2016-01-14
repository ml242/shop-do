ShoppingList = React.createClass({

    mixins: [ReactMeteorData],

    // Loads items from the shopping collection and puts them on this.data.shoppingList
    getMeteorData() {
        return {
            shoppingList: BigList.find({ userId: this.props.userId }).fetch()
        }
    },

    getInitialState() {
        return {
            shoppingList: []
        }
    },

    componentDidMount() {

    },

    renderItems() {
        return this.data.shoppingList.map((item) => {
            return <Item key={item._id} item={item} />;
        });
    },

    render() {
        return (
            <ul className="shopping-list">
                { this.renderItems()}
            </ul>
        );
    }
});
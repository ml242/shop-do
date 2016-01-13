ShoppingList = React.createClass({

    mixins: [ReactMeteorData],

    // Loads items from the shopping collection and puts them on this.data.shoppingList

    getMeteorData() {
        return {
            shoppingList: [
                { _id: 1, text: "This is item 1" },
                { _id: 2, text: "This is item 2" },
                { _id: 3, text: "This is item 3" }
            ]
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
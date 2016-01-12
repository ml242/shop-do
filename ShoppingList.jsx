ShoppingList = React.createClass({
    
    getInitialState() {
        return {
            shoppingList: []
        }
    },

    fetchFakeData() {
        return {    
            shoppingList: [
                { _id: 1, text: "This is item 1" },
                { _id: 2, text: "This is item 2" },
                { _id: 3, text: "This is item 3" }
            ]
        }
    },
    
    getShoppingList() {
        //TODO: fetch real data from server.
        this.setState(this.fetchFakeData());
    },

    componentDidMount() {
        this.getShoppingList();
    },

    renderItems() {
        return this.state.shoppingList.map((item) => {
            return <Item key={item._id} item={item} />;
        });
    },

    render() {
        return (
            <ul className="shopping-list">
                {this.renderItems()}
            </ul>
        );
    }
});
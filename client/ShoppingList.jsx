// Item component - represents a single shopping item
SearchItem = React.createClass({


    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        item: React.PropTypes.object.isRequired
    },

    renderSavedListings(){
        return this.data.shoppingItem.map((item) => {
            if (this.data.shoppingList.search === item){
            }
        });
    },

    render() {
        debugger;
        return (
            <li>
                <span>{this.props.item.search}</span>
            </li>
        );
    }
});

ShoppingList = React.createClass({

    mixins: [ReactMeteorData],

    // Loads items from the shopping collection and puts them on this.data.shoppingList
    getMeteorData() {
        return {
            shoppingList: BigList.find({ userId: this.props.userId }).fetch(),
            shoppingItem: FoundItem.find({userId: this.props.userId}).fetch()
        }
    },

    getInitialState() {
        return {
            shoppingList: [],
            shoppingItem: []
        }
    },

    componentDidMount() {

    },

    renderItems() {

        return this.data.shoppingList.map((keyword) => {
            return <SearchItem key={keyword._id} item={keyword} />;
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
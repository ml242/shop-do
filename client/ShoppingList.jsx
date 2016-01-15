// Item component - represents a single shopping item
SearchItem = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData(){
        return {
            shoppingItems: FoundItem.find({userId: Meteor.userId(), keywords: this.props.item.search}).fetch()
        }
    },

    getInitialState() {
        return {
            shoppingItems: []
        }
    },

    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        item: React.PropTypes.object.isRequired
    },

    renderSaved() {
        return this.data.shoppingItems.map((item) => {
            return <li> {item.title} {item.url} </li>;
        });
    },

    render() {
        if (this.data.shoppingItems.length > 0){
            return (
                <li>
                    <span>{this.props.item.search}</span>
                        <ul>
                            { this.renderSaved() }
                        </ul>
                </li>
            );
        } else {
            return (
                <li>
                    <span>{this.props.item.search}</span>
                </li>
            );
        }
    }
});

ShoppingList = React.createClass({

    mixins: [ReactMeteorData],

    // Loads items from the shopping collection and puts them on this.data.shoppingList
    getMeteorData() {
        return {
            shoppingList: BigList.find({ userId: this.props.userId }).fetch(),
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
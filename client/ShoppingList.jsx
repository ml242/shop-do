// Item component - represents a single shopping item
SavedSearch = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData(){
        return {
            shoppingItems: SavedAds.find({userId: Meteor.userId(), keywords: this.props.item.search}).fetch()
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

    removeItem(){
        SavedAds.remove({_id: this.data.shoppingItems[0]._id })
    },

    removeSearch(){
        SavedSearches.remove({_id: this.props.item._id});
    },

    renderSaved() {
        return this.data.shoppingItems.map((item) => {
            return (
                    <ul>
                        <li> {item.title}</li>
                        <li> {item.url} </li>
                        <li> <img src={item.image}></img></li>
                        <li><button data={item._id} onClick={this.removeItem}> remove </button></li>
                    </ul>

                )
        });
    },

    reSearch(){
    // TODO   How to pass the search to a different state and have it redraw?
    },

    render() {
        if (this.data.shoppingItems.length > 0){
            return (
                <li>
                    <span>{this.props.item.search}</span>

                    { this.renderSaved() }

                </li>
            );
        } else {
            return (
                <li>
                    <span><span onClick={this.reSearch}>{this.props.item.search}</span><button className="btn btn-warning" onClick={this.removeSearch}>remove</button></span>
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
            shoppingList: SavedSearches.find({ userId: this.props.userId }).fetch(),
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
            return <SavedSearch key={keyword._id} item={keyword} />;
        });
    },

    render() {
        return (
            <div className="row">
                <ul className="shopping-list list-unstyled">
                    { this.renderItems()}
                </ul>
            </div>
        );
    }
});
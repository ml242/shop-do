// Item component - represents a saved search, contains a list of associated ads
SavedSearch = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData(){
        return {
            shoppingItems: SavedAds.find({userId: Meteor.userId(), keywords: this.props.search.keywords}).fetch()
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
        search: React.PropTypes.object.isRequired
    },

    removeItem(){
        SavedAds.remove({_id: this.data.shoppingItems[0]._id })
    },

    removeSearch(){
        SavedSearches.remove({_id: this.props.search._id});
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
                    <span>{this.props.search.keywords}</span>

                    { this.renderSaved() }

                </li>
            );
        } else {
            return (
                <li>
                    <span><span onClick={this.reSearch}>{this.props.search.keywords}</span><button className="btn btn-warning" onClick={this.removeSearch}>remove</button></span>
                </li>
            );
        }
    }
});

ShoppingList = React.createClass({

    mixins: [ReactMeteorData],

    // Loads SavedSearches from the shopping collection and puts them on this.data.shoppingList
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
        return this.data.shoppingList.map((savedSearch) => {
            return <SavedSearch key={savedSearch._id} search={savedSearch} />;
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
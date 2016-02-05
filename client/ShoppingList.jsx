SavedAd = React.createClass({
    
    propTypes: {
        ad: React.PropTypes.object.isRequired,
        onRemove: React.PropTypes.func.isRequired
    },

    handleRemove() {
        this.props.onRemove(this.props.ad._id);
    },

    render() {
        return (
            <div className="saved-ad">
                <h3> {this.props.ad.title}</h3>
                <p> {this.props.ad.url} </p>
                <img src={this.props.ad.image}/>
                <button onClick={this.handleRemove}>remove</button>
            </div>
        );        
    }
});

// Item component - represents a saved search, contains a list of associated ads
SavedSearch = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData(){
        return {
            shoppingItems: SavedAds.find({userId: this.props.userId, searchId: this.props.search._id}).fetch()
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
        search: React.PropTypes.object.isRequired,
        userId: React.PropTypes.string.isRequired
    },

    removeItem(id){
        SavedAds.remove({_id: id});
    },

    removeSearch(){
        SavedSearches.remove({_id: this.props.search._id});
    },

    renderSavedItems() {
        return this.data.shoppingItems.map((item) => {
            return (
                <li key={item._id}>
                    <SavedAd ad={item} onRemove={this.removeItem} />
                </li>
            );
        });
    },

    reSearch(){
    // TODO   How to pass the search to a different state and have it redraw?
    },

    render() {
        if (this.data.shoppingItems.length > 0){
            return (
                <div className="saved-search">
                    <span>{this.props.search.keywords}</span>
                    <ul> { this.renderSavedItems() } </ul>
                </div>
            );
        } else {
            return (
                <span>
                    <span onClick={this.reSearch}>{this.props.search.keywords}</span>
                    <button className="btn btn-warning" onClick={this.removeSearch}>remove</button>
                </span>
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
            return (
                <li key={savedSearch._id}>
                    <SavedSearch search={savedSearch} userId={this.props.userId} />
                </li>
            );
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
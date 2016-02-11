Result = React.createClass({

    saveListing() {
        var searchId;

        if( SavedSearches.findOne({keywords: this.props.keywords }) ){
            searchId = SavedSearches.findOne({keywords: this.props.keywords })._id;
        } else {
            // Collection.insert returns the _id of the new record.
            searchId = SavedSearches.insert({ keywords: this.props.keywords });
        }

        SavedAds.insert({
            searchId: searchId,
            title: this.props.title,
            url: this.props.url,
            image: this.props.image
        });
    },

    render() {
        return <li> <button className="btn btn-primary" onClick={this.saveListing}>save</button> <a href={this.props.url} target="_blank"> {this.props.title} </a></li>;
    }
});

SearchResults = React.createClass({

    renderResults() {
        // debugger;
        // Needs a more elegant CSS solution to let the user know that the software is working, like a spinner

        if (this.props.results.length > 0) {
            return this.props.results.map((result) => {
                return <Result keywords={this.props.keywords} key={result.guid} title={result.title} url={result.link}
                               image={result.innerAd.image} loading={this.props.loading}
                               searchCount={this.props.searchCount}/>;
            });
        } else if (this.props.loading) {
            return <span className="glyphicon glyphicon-refresh spinning"></span>
        } else if (!this.props.loading && this.props.searchCount > 0){
            return <span>no results found</span>
        } else {
            return <span />
        }
    },

    render() {
        return (
            <div className="row">
                <ul className="search-results">
                    { this.renderResults() }
                </ul>
            </div>
        )
    }
});

SearchBar = React.createClass({

    getInitialState() {
        return {
            //saved: false,
            text: ""
        }
    },

    handleSubmit(event) {
        event.preventDefault();
        var keywords = this.state.text.trim();
        this.props.onKeywordSubmit(keywords);
    },

    handleTextChange(event) {
        var text = event.target.value;
        this.setState({text: text});
    },

    handleSavedChange(event){
        var value = event.target.checked;
        this.props.handleSavedChange(value);
    },

    render() {
        return(
            <div className="row">
              <form className="search-form" onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  placeholder="keywords"
                  onChange={this.handleTextChange}
                />
                <input type="submit"/>
                <input type="checkbox" value="save query" onChange={this.handleSavedChange}></input>
              </form>
            </div>
        );
    }
});

SearchFeature = React.createClass({
    getInitialState() {
        return {
            "keywords": "",
            "saved": false,
            "searchResults": [],
            searchCount: 0,
            loading: ''
        }
    },

    propTypes: {
        handleSendRequest: React.PropTypes.func.isRequired
    },

    saveSearch(){
        if (SavedSearches.findOne({ keywords: this.state.keywords })){
            SavedSearches.insert({ keywords: this.state.keywords })
        }
    },

    handleSubmit(keywords) {
        var self = this;

        this.setState({"keywords" : keywords, searchCount: this.state.searchCount += 1, loading: true}, function(){
            self.props.handleSendRequest(self.state.keywords, ((error, results) => { this.setState({'searchResults': results});}) ) ;
            if(self.state.saved) { self.saveSearch() }
        });
    },

    handleSavedChange(val){
        this.setState({
            saved: val
        });
    },

    render() {
        return (
            <div className="search-feature row">
                <SearchBar onKeywordSubmit={this.handleSubmit} saved={this.state.saved} handleSavedChange={this.handleSavedChange} />
                <SearchResults results={this.state.searchResults} keywords={this.state.keywords} loading={this.state.loading} searchCount={this.state.searchCount} />
            </div>
        );
    }
});

KijijiSearchFeature = React.createClass({

    sendRequest(keywords, success) {
        Meteor.call('KijijiSearch', keywords, success);
    },

    render() {
        return (
            <div className="kijiji-search-feature">
                <h3> Kijiji Search </h3>
                <SearchFeature handleSendRequest={this.sendRequest}/>
            </div>
        );
    }
});
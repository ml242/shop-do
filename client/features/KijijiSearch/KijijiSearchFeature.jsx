Result = React.createClass({

    handleSaveListing(event) {
        event.preventDefault();
        this.props.handleSaveListing(this.props.keywords, this.props.url, this.props.title, this.props.image);
    },

    render() {
        return (
            <div className="result">
                <button className="btn btn-primary" onClick={this.handleSaveListing}>save</button>
                <a href={this.props.url} target="_blank"> {this.props.title} </a>
            </div>
        );
    }
});

SearchResults = React.createClass({

    renderResults() {
        return this.props.results.map((result) => {
            return (
                <li key={result.guid} >
                        <Result
                            keywords={this.props.keywords}
                            title={result.title}
                            url={result.link}
                            image={result.innerAd.image}
                            handleSaveListing={this.props.handleSaveListing}
                        />
                </li>
            );
        });
    },

    render() {
        return (
            <ul className="search-results row">
                { this.props.results.length === 0 ?
                    <span> no results found </span> :
                    this.renderResults()
                }
            </ul>
        );
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

    handleResults(error, results) {
        this.setState({'searchResults': results, loading: false }); 
    },

    handleSubmit(keywords) {
        var self = this;

        this.setState({"keywords" : keywords, searchCount: this.state.searchCount += 1, loading: true}, function(){
            self.props.handleSendRequest(self.state.keywords, self.handleResults);
            if(self.state.saved) { self.saveSearch(); }
        });
    },

    handleSavedChange(val){
        this.setState({
            saved: val
        });
    },

    saveListing(keywords, url, title, image){
        var searchId;

        if( SavedSearches.findOne({keywords: keywords }) ){
            searchId = SavedSearches.findOne({keywords: keywords })._id;
        } else {
            // Collection.insert returns the _id of the new record.
            searchId = SavedSearches.insert({ keywords: keywords });
        }

        SavedAds.insert({
            searchId: searchId,
            title: title,
            url: url,
            image: image
        });
    },

    render() {
        return (
            <div className="search-feature row">
                <SearchBar
                    onKeywordSubmit={this.handleSubmit}
                    saved={this.state.saved}
                    handleSavedChange={this.handleSavedChange}
                />

                { this.state.loading ?
                    <Spinner /> :
                    <SearchResults
                        results={this.state.searchResults}
                        keywords={this.state.keywords}
                        searchCount={this.state.searchCount}
                        handleSaveListing={this.saveListing}
                    />
                }
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

Spinner = React.createClass({
    render() {
        return <span className="glyphicon glyphicon-refresh spinning"></span>
    }
});
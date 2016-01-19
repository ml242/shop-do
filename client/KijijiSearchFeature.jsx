Result = React.createClass({

    saveListing() {

        debugger;

        if (BigList.findOne({search: this.props.keywords }) === undefined){
            BigList.insert({ search: this.props.keywords })
        }

        FoundItem.insert({
            keywords: this.props.keywords,
            title: this.props.title,
            url: this.props.url,
            image: this.props.image
        })

    },

    render() {
        return <li> <button className="btn btn-primary" onClick={this.saveListing}>save</button> <a href={this.props.url} target="_blank"> {this.props.title} </a></li>;
    }
});

SearchResults = React.createClass({

    renderResults() {
        // Needs a more elegant CSS solution to let the user know that the software is working, like a spinner
        if (this.props.results.length > 0) {
            return this.props.results.map((result) => {
                return <Result keywords={this.props.keywords} key={result.guid} title={result.title} url={result.link} image={result.innerAd.image}/>;
            });
        } else if (this.props.results.length === 0 && this.props.searchCount > 0){
            return <span>No Results Found</span>
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

KijijiSearchFeature = React.createClass({
    getInitialState() {
        return {
            "keywords" : "",
            "saved" : false,
            "searchResults" : [],
            searchCount: 0
        }
    },

    sendRequest() {
        Meteor.call( 
            'KijijiSearch',
            this.state.keywords,
            ( error, results ) => { this.setState({'searchResults': results}); }
        );

        if (this.state.searchResults > 0){
            this.setState({searchCount: 0})
        }

    },

    saveSearch(){
        if (BigList.findOne({ search: this.state.keywords })){
            BigList.insert({ search: this.state.keywords })
        }
    },

    handleSubmit(keywords) {
        var self = this;

        this.setState({"keywords" : keywords, searchCount: this.state.searchCount += 1}, function(){
            self.sendRequest();
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
            <div className="kijiji-search-feature">
                <h3> Kijiji Search </h3>
                <SearchBar onKeywordSubmit={this.handleSubmit} saved={this.state.saved} handleSavedChange={this.handleSavedChange} />
                <SearchResults results={this.state.searchResults} keywords={this.state.keywords} searchCount={this.state.searchCount} />
            </div>
        );
    }
});
Result = React.createClass({

    saveListing() {

        if (BigList.findOne({search: this.props.keywords }) === undefined){
            BigList.insert({ search: this.props.keywords })
        }

        FoundItem.insert({
            keywords: this.props.keywords,
            title: this.props.title,
            url: this.props.url
        })

    },

    render() {
        return <li> <button className="btn btn-primary" onClick={this.saveListing}>save</button> <a href={this.props.url} target="_blank"> {this.props.title} </a></li>;
    }
});

SearchResults = React.createClass({
    renderResults() {
        if (this.props.results) {
            return this.props.results.map((result) => {
                return <Result keywords={this.props.keywords} key={result.guid} title={result.title} url={result.link}/>;
            });
        } else {
            return <span />
        }
    },

    render() {
        return (
            <ul className="search-results">
                { this.renderResults() }
            </ul>
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
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="keywords"
              onChange={this.handleTextChange}
            />
            <input type="submit"/>
            <input type="checkbox" value="save query" onChange={this.handleSavedChange}></input>
          </form>
        );
    }
});

KijijiSearchFeature = React.createClass({
    getInitialState() {
        return {
            "keywords" : "",
            "saved" : false,
            "searchResults" : []
        }
    },

    sendRequest() {
        Meteor.call( 
            'KijijiSearch',
            this.state.keywords,
            ( error, results ) => { this.setState({'searchResults': results}); }
        );
    },

    saveSearch(){
        BigList.insert({ search: this.state.keywords })
    },

    handleSubmit(keywords) {
        var self = this;

        this.setState({"keywords" : keywords}, function(){
            self.sendRequest();
            if(self.state.saved) { self.saveSearch() }
        });

    },

    handleSavedChange(val){
        this.setState({saved: val});
    },

    render() {
        return (
            <div className="kijiji-search-feature">
                <h3> Kijiji Search </h3>
                <SearchBar onKeywordSubmit={this.handleSubmit} saved={this.state.saved} handleSavedChange={this.handleSavedChange} />
                <SearchResults results={this.state.searchResults} keywords={this.state.keywords}/>
            </div>
        );
    }
});
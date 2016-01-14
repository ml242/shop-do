Result = React.createClass({
    render() {
        return <li> <a href={this.props.url} target="_blank"> {this.props.title} </a></li>;
    }
});

SearchResults = React.createClass({
    renderResults() {
        return this.props.results.map( (result) => {
            return <Result key={result.guid} title={result.title} url={result.link} />;
        });
    },

    render() {
        return (
            <ul className="search-results">
                { this.renderResults() }
            </ul>
        );
    }
});

SearchBar = React.createClass({
    handleSubmit(event) {
        event.preventDefault();
        var keywords = this.state.text.trim();
        this.props.onKeywordSubmit(keywords);
    },

    handleTextChange(event) {
        var text = event.target.value;
        this.setState({text: text});
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
          </form>
        );
    }
});

KijijiSearchFeature = React.createClass({
    getInitialState() {
        return {
            "searching": false,
            "keywords" : "",
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

    handleSubmit(keywords) {
        this.setState({"keywords" : keywords}, this.sendRequest);
    },

    render() {
        return (
            <div className="kijiji-search-feature">
                <h3> Kijiji Search </h3>
                <SearchBar onKeywordSubmit={this.handleSubmit} />
                <SearchResults results={this.state.searchResults} />
            </div>
        );
    }
});
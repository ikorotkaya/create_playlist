import React from "react";
import './SearchResult.css';
import Tracklist from "../Tracklist/Tracklist";

class SearchResult extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
    )
  }
}

export default SearchResult
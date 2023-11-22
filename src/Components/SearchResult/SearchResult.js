import React from "react";
import './SearchResult.css';
import Tracklist from "../Tracklist/Tracklist";

class SearchResult extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <div className="SearchResults__title">Results</div>
        <Tracklist tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
    )
  }
}

export default SearchResult
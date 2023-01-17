import React from "react";
import './SearchResult.css';
import TrackList from "../TrackList/TrackList";

class SearchResult extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResult}/>
      </div>
    )
  }
}

export default SearchResult
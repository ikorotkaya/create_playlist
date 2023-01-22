import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import './Playlist.css';
import spinner from "./Heart-1s-200px.gif"

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this)
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }

  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} value={this.props.playlistName}/>
        <Tracklist tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true} />
        
        {this.props.playlistBeingUploaded && <img src={spinner} alt="spinner" />}
        {!this.props.playlistBeingUploaded && <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>}
      </div>
    )
  }
}

export default Playlist
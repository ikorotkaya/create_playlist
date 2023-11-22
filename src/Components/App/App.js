import React from "react";
import SearchResult from "../SearchResult/SearchResult";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: [],
      playlistBeingUploaded: false,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);

    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    this.setState({ playlistBeingUploaded: true });

    const trackUris = this.state.playlistTracks.map((track) => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: [],
        playlistBeingUploaded: false,
      });
    });
  }

  componentWillMount() {
    Spotify.getAccessToken();
  }

  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div className="app_container">
        <header>
          <p>Create A Personal Playlist</p>
        </header>

        <SearchBar onSearch={this.search} />

        <div className="app_container__content">
          <SearchResult
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
          />
          
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            playlistBeingUploaded={this.state.playlistBeingUploaded}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App;

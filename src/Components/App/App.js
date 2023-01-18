import React from 'react';
import SearchResult from '../SearchResult/SearchResult';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{ name: 'name1', artist: 'artist1', album: 'album1', id: 1 },
      { name: 'name2', artist: 'artist2', album: 'album2', id: 2 },
      { name: 'name3', artist: 'artist3', album: 'album3', id: 3 }
      ],
      playlistName: "My Playlist",
      playlistTracks: [{ name: 'playlistName1', artist: 'PlaylistArtist1', album: 'playlistAlbum1', id: 4 },
      { name: 'playlistName2', artist: 'PlaylistArtist2', album: 'playlistAlbum2', id: 5 },
      { name: 'playlistName3', artist: 'PlaylistArtist3', album: 'playlistAlbum3', id: 6 }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
  }


  addTrack(track) {
    let playlistTracks = this.state.playlistTracks;
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    playlistTracks.push(track);
    this.setState({ playlistTracks: playlistTracks });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResult searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
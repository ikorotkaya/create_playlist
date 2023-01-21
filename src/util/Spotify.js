const clientID = "d59ca8254a394337b6d1151d1c747a07";

let redirectUri;
if (process.env.NODE_ENV === 'development') {
  redirectUri = "http://localhost:3000/";
} else {
  redirectUri = "https://exotic-jelly.surge.sh/";
}

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }

    // check for the access token
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();

    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    } else {
      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    }
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
  
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    const response = await fetch(`https://api.spotify.com/v1/me`, { headers: headers });
    const jsondata = await response.json();
    userId = jsondata.id;

    const playlistsResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({ name: name })
    });
    const playlistResponse = await playlistsResponse.json();
    const playlistId = playlistResponse.id;

    const tracksResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({ uris: trackUris })
    });

    return tracksResponse;
  }

}

export default Spotify

// savePlaylist(name, trackUris) {
//   if (!name || !trackUris.length) {
//     return;
//   }

//   const accessToken = Spotify.getAccessToken();
//   const headers = { Authorization: `Bearer ${accessToken}` };
//   let userId;

//   return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
//     .then(response => {
//       return response.json();
//     })
//     .then(jsonResponse => {
//       userId = jsonResponse.id;
//       return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//         headers: headers,
//         method: 'POST',
//         body: JSON.stringify({ name: name })
//       })
//         .then(response => response.json())
//         .then(jsonResponse => {
//           const playlistId = jsonResponse.id;
//           return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
//             headers: headers,
//             method: 'POST',
//             body: JSON.stringify({ uris: trackUris })
//           })

//         })

//     })

// }
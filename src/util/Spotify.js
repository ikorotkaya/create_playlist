const clientID = "d59ca8254a394337b6d1151d1c747a07";
const redirectUri = "http://localhost:3000/";
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }

    // check for the access token
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    console.log("--> LOCATION: ", window.location);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      console.log("--> ACCESS TOKEN:", accessToken);
      console.log("--> EXPIRES IN:", expiresIn);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

      console.log("--> ACCESS.TOKEN", accessToken);

      return accessToken;
    } else {
      console.log("--> WINDOW.LOCATION");

      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  search(term) {
    console.log("--> SEARCH TERM: ", term);

    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
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
      })
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name })
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ uris: trackUris })
            })

          })

      })

  }
}

export default Spotify
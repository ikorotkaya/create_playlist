import React from 'react'

let clientID = "d59ca8254a394337b6d1151d1c747a07";
let redirectURI = "http://localhost:3000/";
let accessToken = '';

class Spotify extends React.Component {
  getAccessToken() {
    if (accessToken) {
      return accessToken
    }

    // check for the access token
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.hfer.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // this clears the parameters, allowing us to grab a new access token when it expires
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  }
}

export default Spotify
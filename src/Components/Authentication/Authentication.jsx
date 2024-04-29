import React from 'react'

const Authentication = () => {
const CLIENT_ID ="e98c1deccd504a9e96a18451ba50c94b";
const REDIRECT_URI="http://localhost:5173/"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";



  return (
    <div>

    <h1>Spotify React</h1>
    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=user-read-private user-read-email user-read-playback-state user-top-read playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
    
    </div>
  )
}

export default Authentication
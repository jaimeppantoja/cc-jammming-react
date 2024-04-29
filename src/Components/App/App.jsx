import { useEffect, useState } from 'react';
import styles from './App.module.css';
import Button from '../Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import NamePlaylist from '../NamePlaylist/NamePlaylist'
import CreatePlaylist from '../CreatePlatlist/CreatePlaylist';
import Authentication from '../Authentication/Authentication';

const CLIENT_ID = "e98c1deccd504a9e96a18451ba50c94b";
const CLIENT_SECRET = "7b6ba2595625421182dab075fa222749";

function App() {
  const [searchInput, setSearchInput]= useState('');
  const [accessToken, setAccessToken]= useState("");
  const [artistName, setArtistName] = useState("");
  const [resultArray, setResultArray] = useState([]);
  const [playList, setPlayList]= useState([]);
  const [playListName, setPlayListName] = useState("");
  const [uriList, setUriList]=useState([])
  const [userId, setUserId] = useState("")
 

  //*Set the Token using and effect hook*/
  useEffect(() => {

    const hash = window.location.hash
    console.log(hash)
    let token = window.localStorage.getItem("token")
    // getToken()
    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        //window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    console.log(hash)
    setAccessToken(token)
    console.log(token)
  }, [])

//* Logout button function */

  const logout = () =>{
    setAccessToken("");
    window.localStorage.removeItem("token")
  }

  // handleSearch. Set the artist to look for
  const handleSearch = (value) =>{
    setSearchInput(value) }

  //*Get the userID */
  
  useEffect(() => {
    if (!accessToken) return; // Skip if accessToken is not available
  
    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      return response.json();
    })
    .then(data => {
      console.log(data.display_name)
      setUserId(data.display_name)
      console.log(userId);
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
  }, [accessToken]);


  // Here when the app starts, it fetch data gettin the access token.

  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     const url = 'https://accounts.spotify.com/api/token';
  //     const requestBody = new URLSearchParams({
  //       'grant_type': 'client_credentials',
  //       'client_id': CLIENT_ID,
  //       'client_secret': CLIENT_SECRET
  //     });

  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //       body: requestBody
  //     };

  //     try {
  //       const response = await fetch(url, requestOptions);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch access token');
  //       }
  //       const data = await response.json();
  //       // Handle the response data
  //       console.log('Access token:', data.access_token);
  //       console.log('Token type:', data.token_type);
  //       console.log('Expires in:', data.expires_in);
  //       setAccessToken(data.access_token);
  //     } catch (error) {
  //       // Handle any errors
  //       console.error('Error fetching access token:', error);
  //     }
  //   };

  //   fetchAccessToken(accessToken);
  // }, []); 

  /// Change 
  // useEffect(()=>{
  //   var authParameters = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded',
  //       'Authorization': `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
  //     },
  //     body: 'grant_type=client_credentials'
  //   };
    
  //   fetch('https://accounts.spotify.com/api/token', authParameters)
  //     .then(result => result.json())
  //     .then(data => {
  //       setAccessToken(data.access_token);
  //       console.log(accessToken);
  //       console.log(data.expires_in);
  //       })
  // },[]);

  // useEffect(()=>{
  //   var profile = getProfile();
  //   console.log(profile);
  // },[accessToken])

  // Function to get the UserId needed for uploading the playlist

  // async function getProfile(accessToken) {
     
  //   const response = await fetch('https://api.spotify.com/v1/me', {
  //     headers: {
  //       Authorization: 'Bearer ' + accessToken
  //     }
  //   });
  
  //   const data = await response.json();
  //   return data;
  // }

  // useEffect(()=>{
  //   fetch('https://api.spotify.com/v1/me', {
      
  //     headers: {
  //       'Authorization': `Bearer ${accessToken}`
  //     }
  //   }) 
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch user profile');
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     setUserId(data.id);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching user profile:', error);
  //   });

  // },[accessToken])
  
  

  // ** Search function ** 

  //Get request of the artist ID
  
  async function searchArtist(){
    //Define a variable with the artist request
    var artistParameters = {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },  
    }
    //Get the artist ID
    var artistId = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, artistParameters). then( response => response.json()).then(data =>{return data.artists.items[0].id}) 
    //Get Songs of the artist
    var tracks = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`,artistParameters).then( response => response.json()).then(data => {return data.tracks});
    // console.log(tracks);
    setArtistName(tracks[0].artists[0].name)
    setResultArray(tracks);
  }
  
  // ** Function add to playlist

  const addPlaylist = (uri, trackName, artistName,  albumName)=>{
    setPlayList( prevArray => [...prevArray, 
      {
        trackName: trackName,
        artistName: artistName,
        albumName: albumName,
        uriReference:uri
      }] )
    setUriList (prevArray => [...prevArray, uri])
  }

  // ** Function to remove from the Playlist

  const removePlaylist =(index)=>{
    console.log(`Remove the Item with jey number ${index}`)
    setPlayList(
      prevArray => {return prevArray.filter((_, i) => i !== index);}
    )
  }

  // ** Function Playlist name

  const enterPlaylistName = (namePlayList) =>{
    setPlayListName(namePlayList);
  }

  //** Function create playlist (Button)

  async function createPlaylistButton() {
    try {
      // Create playlist
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playList,
          }),
        }
      );
  
      if (!playlistResponse.ok) {
        throw new Error("Failed to create playlist");
      }
  
      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;
  
      // Add tracks to playlist
      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uris: uriList,
          }),
        }
      );
  
      if (!addTracksResponse.ok) {
        throw new Error("Failed to add songs to playlist");
      }
  
      console.log("Songs added to playlist");
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  


  

   return (
    <div>
      {!accessToken? (
        <Authentication />
      ) : (
      <div>
      <div><button onClick={logout}>Logout</button></div>
      <div className={styles.Container}>
        <h1>Jamming</h1>
      </div>
      <div className={styles.Center}>
        <SearchBar onChange={handleSearch} onEnter={searchArtist}/>
        
      </div>
      <div className={styles.Center}>
        <Button name='Search ' onClick={searchArtist} />
      </div>
      <div className={styles.TwoColumns}>
        <div className={styles.Box}>
          <h2>Results</h2>
          {resultArray.length === 0?<h3>The results will be displayed here</h3> :<SearchResults addPlaylist={addPlaylist} object={resultArray} />}
        </div>
        <div className={styles.Box}>
          <div style={{ width: '100%', height: '40px' }}>
            <NamePlaylist enterPlaylistName ={enterPlaylistName} currentPlaylist={playListName} />
          </div>
          <div>  
            {playList.length === 0? <h2>Nothing to display here</h2>:<Playlist removePlaylist={removePlaylist} dataPlayList={playList} />}
          </div>
          <div>
            <CreatePlaylist createPlaylistButton = {createPlaylistButton}/>
          </div>
        </div>
      </div>
      </div>
    )}
    </div>
  );

  }
export default App

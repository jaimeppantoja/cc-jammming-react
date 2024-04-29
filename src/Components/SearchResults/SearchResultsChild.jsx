import React from 'react'


const SearchResultsChild = ({addPlaylist, trackName, artistName, albumName, uri}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', border: '1px solid black' }}>
        <div style={{  width: '100%' }}>

                <h2>{trackName}</h2>
                <h3>{`${artistName} | ${albumName}`}</h3>  
                <h3>{uri}</h3>             
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {/*Always when using an onClick event handler pass a callback function to avoid the automatic execution of that event*/}
        <button onClick={()=>addPlaylist(uri, trackName, artistName,  albumName)}> Add</button>
        </div>
    </div>
  )
}

export default SearchResultsChild
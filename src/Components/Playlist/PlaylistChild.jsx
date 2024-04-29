import React from 'react'

const PlaylistChild = ({index, removePlaylist,trackName, artistName, albumName}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', border: '1px solid black' }}>
        <div style={{  width: '100%' }}>

                <h2>{trackName}</h2>
                <h3>{`${artistName} | ${albumName}`}</h3>            
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {/*Always when using an onClick event handler pass a callback function to avoid the automatic execution of that event*/}
        <button onClick={()=>removePlaylist(index)}>Remove</button>
        </div>
    </div>
  )
}

export default PlaylistChild
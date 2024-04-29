import React from 'react';
import PlaylistChild from './PlaylistChild';

const Playlist = ({removePlaylist, dataPlayList}) => {
    

  return (
    <div>
        {dataPlayList.map((item, index) => (
            <PlaylistChild
            key={index}
            index={index}
            removePlaylist={removePlaylist}
            trackName={item.trackName}
            artistName={item.artistName}
            albumName={item.albumName}
            />
        ))}
    </div>
  )
}

export default Playlist
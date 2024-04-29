import React from 'react';

const NamePlaylist = ({enterPlaylistName, currentPlaylist}) => {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        enterPlaylistName(event.target.value);
     }
    };

    const handleChange =(event)=>{
        event.preventDefault();
        enterPlaylistName (event.target.value);
    };

  return (
    <input
      type="text"
      value={currentPlaylist}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  )
}

export default NamePlaylist;
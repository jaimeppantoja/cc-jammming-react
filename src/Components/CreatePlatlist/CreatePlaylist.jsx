import React from 'react'

const CreatePlaylist = ({createPlaylistButton}) => {
  // Define the event handler function
  const handleClick = () => {
    createPlaylistButton();
  };

  return (
    <div>
      {/* Button with event handler */}
      <button onClick={handleClick}>Create Playlist</button>
    </div>
  );
}

export default CreatePlaylist
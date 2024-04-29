import React from 'react'
import SearchResultsChild from './SearchResultsChild'

const SearchResults = ({addPlaylist, object}) => {

    const renderChildComponents = ()=>{

        var childComponentsArray = [];

        for (var i = 0; i < object.length; i++){
            childComponentsArray.push(
            <SearchResultsChild
            addPlaylist={addPlaylist}
            key={i} 
            trackName={object[i].name} 
            artistName={object[i].artists[0].name} 
            albumName={object[i].album.name}
            uri={object[i].uri}/>
            )
        } 
        
        return childComponentsArray;
    };

    // <div style={{ border: '1px solid blue', width: '100%' }}>

    //         <h2>{object[0].name}</h2>
    //         <h3>{`${object[0].artists[0].name} | ${object[0].album.name}`}</h3>
                    
    // </div>

  return (
    <div>
        
        
        {renderChildComponents ()}
        
    </div>
  )
}

export default SearchResults
import React from 'react'

const SearchBar = ({onChange, onEnter}) => {
  
  const handleInputChange =(event)=>{
    onChange(event.target.value);
  };

  const handleKeyPress = (event)=>{
    if(event.key ==='Enter'){
      onEnter(event.target.value)
    }
  };

  return (
    <div>  
      <input 
        type="text"  
        onChange={handleInputChange} 
        onKeyPress={handleKeyPress}
      />
     
    </div>
    
  );
  
}

export default SearchBar
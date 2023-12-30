import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { links } from "./data/links.js"

const List = ({ list, onSelectItem }) => {
  return list.map(item => (
    <div key={item.objectID} onClick={() => onSelectItem(item)}>
      <span>{item.EstablishmentName}</span>
      <span>{item.Street}</span>
      <span>{item.Town}</span>
      <span>{item.Countyname}</span>
    </div>
  ));
};


const Search = ({ searchTerm, onSearch, onFocus, onBlur }) => {
  // The internal state is no longer necessary since the value is controlled by the App component
  // const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = event => {
    // setSearchTerm(event.target.value); // This line is no longer necessary
    onSearch(event);
  };

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input 
        id="search" 
        type='text' 
        value={searchTerm} // Controlled by the App component
        onChange={handleChange} 
        onFocus={onFocus} 
        onBlur={onBlur} 
      />
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  );
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleSelectItem = (item) => {
    setSearchTerm(item.EstablishmentName);
    setIsInputFocused(false); // Optionally hide the list after selection
  };

  const searchedStories = links.filter(story => {
    // Split the search term into individual words and convert to lowercase
    const searchWords = searchTerm.toLowerCase().split(' ');

    // Create a single string from all the keys and convert to lowercase
    const storyString = [
      story.EstablishmentName, 
      story.Street, 
      story.Town, 
      story.Countyname, 
      story.Postcode
    ].join(' ').toLowerCase();

    // Check if each word in the search term is present in the story string
    return searchWords.every(word => storyString.includes(word));
  }).slice(0, 10); // Only take the first 10 results

  return (
    <div>
      <h1>Stories</h1>
      <Search 
  searchTerm={searchTerm}
  onSearch={handleSearch} 
  onFocus={handleFocus} 
/>      <hr />
      {isInputFocused && searchTerm.length > 1 && (
        <List list={searchedStories} onSelectItem={handleSelectItem} />
      )}
    </div>  
  );
}

export default App;



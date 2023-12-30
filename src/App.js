import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { links } from "./data/links.js"

const List = props => {
  return props.list.map(item => (
      <div key={item.objectID}>
      <span>
        {item.EstablishmentName}
      </span>

      <span>{item.Street}</span>
      <span>{item.Town}</span>
      <span>{item.Countyname}</span>
      </div>
  ));
}

const Search = ({ onSearch, onFocus, onBlur }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
    onSearch(event);
  };
  
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input 
        id="search" 
        type='text' 
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

  const searchedStories = links
  .filter(story => {
    return story.EstablishmentName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  })
  .slice(0, 10); // Only take the first 10 results

  return (
    <div>
      <h1>Stories</h1>
      <Search onSearch={handleSearch} onFocus={handleFocus} onBlur={handleBlur} />
      <hr />
      {isInputFocused && searchTerm.length > 1 && <List list={searchedStories} />}
    </div>  
  );
}

export default App;



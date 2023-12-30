import logo from './logo.svg';
import './App.css';
import React from 'react';
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

const Search = props => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value)

    props.onSearch(event);
  }
  
  return(
    <div>
      <label htmlFor='search'>Search: </label>
      <input id="search" type='text' onChange={props.onSearch} />

    <p>
      Searching for <strong>{searchTerm}</strong>
    </p>

    </div>
  )

}

const App = () => {

  // const stories = [
  //   {
  //     title: 'React',
  //     url: 'https://reactjs.org',
  //     author: 'Jordan Walke',
  //     num_comments: 3,
  //     points: 4,
  //     objectID: 0,
  //   },
  //   {
  //     title: 'Redux',
  //     url: 'https://redux.js.org',
  //     author: 'Dan Abramov, Andrew Clark',
  //     num_comments: 2,
  //     points: 5,
  //     objectID: 1,
  //   },
  // ]
  const [searchTerm, setSearchTerm] = React.useState('');


  const handleChange = event => {
    console.log(event)
  }

  const handleSearch = event => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const searchedStories = links.filter(story => {

    return story.EstablishmentName
      .toLowerCase()
      .includes(searchTerm.toLocaleLowerCase());
  });

  return (
    <div>
    <h1>Stories</h1>

    <Search onSearch={handleSearch} />

    <hr />

    <List list={searchedStories} />
    </div>  
  );
}

export default App;

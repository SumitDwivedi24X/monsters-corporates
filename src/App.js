import { useState, useEffect } from "react";
import CardList from "./components/card-list/card-list.component.jsx";
import SearchBox from "./components/search-box/search-box.component.jsx";
import "./App.css";

const App = () => {
  const [searchField, setSearchField] = useState(""); //[value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []); // to save it from infinite re-rendering of fetch request,
  //and we don't have to pass anything to re-render it again.

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField); //'includes' is case sensitive(l!=L), using toLocaleLowercase
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [
    monsters,// whenever monsters list changes then only it will re-render
    searchField,// and also whenever searchField changes
  ]); /* to save it from re-rendering whenever other function occurs, beacuse whole app 
  re-renders which also renders this function results in extra consumption of cpu */

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <div className="App">
      <h1 className="app-title">MONSTERS CORPORATES</h1>
      <SearchBox
        className="monsters-search-box"
        onChangeHandler={onSearchChange}
        placeholder="search monsters..."
      />
      <CardList monsters={filteredMonsters} />
    </div>
    // In components, we can name props to any name, eg. monsters
  );
};

export default App;

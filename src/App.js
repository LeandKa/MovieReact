import React from 'react';
import './App.css';
import Movie from './Components/Movie/Movie';
import MoviePlaying from './Components/Movie/MoviePlaying';
import MovieRatings from './Components/Movie/MovieRatings';
import MovieUncoming from './Components/Movie/MovieUncoming';
import NavBar from './Components/novo/NavBar';
import 'semantic-ui-css/semantic.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MovieUnit from './Components/Movie/MovieUnit';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch >
          <Route path="/" exact component={Movie}></Route>
          <Route path="/movie/:movieId" exact component={MovieUnit}></Route>
          <Route path="/movies/:moviePath" exact component={Movie}></Route>
          <Route path="/movies/:moviePath" exact component={Movie}></Route>
          <Route path="/movies/:moviePath" exact component={Movie}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

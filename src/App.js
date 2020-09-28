import React,{useEffect} from 'react';
import './App.css';
import Movie from './Page/Movie/Movie';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MovieUnit from './Page/Movie/MovieUnit';
import Login from './Page/Login/Login';

function App() {


  useEffect(()=>{
    
  var es = document.querySelector('body');
   es.style.height="100%";
   es.style.width="100%"
   es.style.backgroundColor = "black";

  },[])


  return (
    <div className="app" style={{backgroundColor:'black'}}> 
      <Router>
        <Switch>
          <Route path="/" exact component={Movie}></Route>
          <Route path="/movie/:movieId" exact component={MovieUnit}></Route>
          <Route path="/login" exact component={Login}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

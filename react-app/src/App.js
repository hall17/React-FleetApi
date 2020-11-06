import React from 'react';
import AppBar from './components/AppBar'
import Aircrafts from './components/Aircrafts';
import Edit from './components/Edit';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
    <div className="container">
    <AppBar />
     <Switch>
     <Route exact path="/Aircraft" component={Aircrafts}/>
     <Route exact path='' component={Aircrafts} />
     <Route exact path="/Aircraft/:id" component={Edit} ></Route>
     </Switch>
    </div>
    </Router>
  );
}

export default App;

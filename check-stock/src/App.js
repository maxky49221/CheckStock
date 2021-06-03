import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useState,useEffect} from 'react';
import Addre from './pages/Addre';
import Check from './pages/Check';
import Ledger from './pages/Ledger';
import Regis from './pages/Regis';
import {createData} from './utilites/createData';
import axios from './axios';

function App() {

  return (
    <Router>  
      <div className="App">

        <Switch>

        <Route exact path="/">
            <Regis/>
          </Route>

          <Route exact path="/home" component={Home}/>
          

          <Route path="/add" component={()=>
            <Addre/>
          }/>

          <Route path="/check">
            <Check />
          </Route>

          <Route path="/ledger">
            <Ledger />
          </Route>

          

        </Switch>
      </div>
    </Router>

    
  );
}

export default App;

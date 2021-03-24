import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Login from "./Login"
import BoardSelection from "./BoardSelection"
import Board from "./Board"

class App extends Component {
  render() {
    return (
        <div className="App">
          
          <Switch>
            <Route exact path = "/" component={Login} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/boardselection" component={BoardSelection} exact/>
            <Route path="/board" component={Board}/>
          </Switch>
        </div>
    );
  }
}
export default App;
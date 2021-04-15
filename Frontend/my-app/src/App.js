import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import Login from "./Login"
import BoardSelection from "./BoardSelection"
import Board from "./Board"
import About from "./About"

class App extends Component {
  render() {
    return (
        <div className="App">

          <Switch>
            <Route exact path = "/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/boardselection" component={BoardSelection} />
            <Route path="/board/:boardName" component={Board} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
    );
  }
}
export default App;

//render={(props) => <DetailsPage globalStore={globalStore} {...props} />
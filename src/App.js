import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from "history";

import './App.css';
import CarDetail from './Components/CarDetail';
import CarList from './Components/CarList';

class App extends React.Component {

  render() {

    const history = createBrowserHistory();
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path='/CarDetail/:id' children={<CarDetail />} />
            <Route path='/' component={CarList} />
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CarDetail from './components/CarDetail';
import CarList from './components/CarList';


class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
              <Route path='/'  exact component={CarList} />
              <Route path='/CarDetail/:id' component={CarDetail} />
          </Switch>
        </Router>
      </div>
    );
  };
};
export default App;
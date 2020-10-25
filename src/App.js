import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CarDetail from './Components/CarDetail';
import CarList from './Components/CarList';

class App extends React.Component {
  render() {

    return (
      <div>
        <Router>
          <Switch>
            <Route path='/'  exact component={CarList} />
            <Route path='/CarDetail/:id' children={<CarDetail />} />
          </Switch>
        </Router>
      </div>
    );
  };
};
export default App;
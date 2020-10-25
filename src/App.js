import React from 'react';
import { createHashHistory } from 'history';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {browserHistory} from 'react-router';
import './App.css';
import CarDetail from './CarDetail';
import CarList from './CarList';
class App extends React.Component {

  a = ()=>{
    browserHistory.push('/CarDetail');
  }
  render(){
    
    return (
    <div>
        <Router>
            <Route path='/CarDetail' component={CarDetail}/>  
            <Route path='/CarList' component={CarList}/>       
        </Router>

        </div>
    )
  }
}
export default App;
import React ,{Component} from 'react';
import './App.css';
import {Header} from './components/Header';
import Navigation from './components/Navigation';
import God_odmori from './components/God_odmori';
import {Zaposleni} from './components/Zaposleni';
import Obrazac from './components/Obrazac';
import Edit from './components/Edit';
import Delete from './components/Delete';
import Login from "./components/Login";
import {logOut} from './actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends Component{
  render(){
    return (
      <Router>
          <Navigation />
          <div className="container">
            <Switch>
              <Route exact path='/' component ={God_odmori} />
              <Route path='/zaposleni' component = {Zaposleni} />
              <Route path='/obrazac' component = {Obrazac} />
              <Route path='/edit/:id' component={Edit} />
              <Route path='/delete/:id' component={Delete} />
              <Route path='/login' component={Login}/>
              <Route render = {function(){
                return <p>Not Found </p>
              }}/>
            </Switch>
        </div>
      </Router>
    );
  }
  
}
App.propTypes = {
  logOut:PropTypes.func.isRequired
}
export default connect(null,{logOut})(App);

import React, { Component } from 'react';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Screens/Home';

class RootContainer extends Component {
  render() {
    return (
      <Router>
        <div id="app" className="app">
          <Header/>
          <div className="routes">
            <Route path="/" exact component={Home}></Route>
          </div>
          <div className="content">

          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
    return {
      lat: state.lat,
      lng: state.lng,
      marks: state.marks,
    }
};

const mapDispatchToProps = dispatch => {
  return {
    setPosition: (lat, lng) => dispatch({type: "SET_POS", lat, lng})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
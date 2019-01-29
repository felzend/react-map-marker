import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Header';
import MapContainer from './Components/MapContainer';

class RootContainer extends Component {
  render() {
    return (
      <Router>
        <div id="app" className="app">
          <Header/>
          <div className="routes">
            <Route path="/" component={MapContainer}></Route>
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
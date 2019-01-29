import React, { Component } from 'react'
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';

class Map extends Component {
    render() {
        console.log(this.props);
        return (
            <div style={{ height: '100vh', width: '100%' }} className="map-component">
                <GoogleMapReact defaultCenter={this.props.map.center} defaultZoom={this.props.map.zoom} bootstrapURLKeys={{key: this.props.map.api_key}}></GoogleMapReact>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      map: state.MappingReducer
    }
};

const mapDispatchToProps = dispatch => {
  return {
    setPosition: (lat, lng) => dispatch({type: 'SET_POS', lat, lng})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
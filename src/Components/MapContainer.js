import React, { Component } from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import { connect } from 'react-redux';
import { addLocal, fetchLocals, setPosition, setActiveLocalMarker, toggleInfoWindow } from '../Actions';
import AddLocalModal from './AddLocalModal';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusMarker: { lat: 0, lng: 0 }
    }
  }
  addLocal = (props, marker, e) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();    
    this.props.addLocal(lat, lng);
    this.setState({
      focusMarker: { lat, lng }
    });
  }
  onMapClick = (props) => {
    if( this.props.map.showInfoWindow ) {
      this.props.toggleInfoWindow(false);
      this.props.setActiveLocalMarker(null);
    }
  }
  onMarkerClick = (marker) => {
    console.log(this.getLocal(marker.id));
    this.props.toggleInfoWindow( ! this.props.map.showInfoWindow );
    this.props.setActiveLocalMarker(marker);
  }
  getLocal(id) {
    var locals = this.props.map.locals.filter(marker => marker.id === id);
    if( locals.length ) return locals[0];
  }
  render() {
    return (
      <div className="map-container">        
        <Map onRightclick={this.addLocal} google={this.props.google} initialCenter={this.props.map.initialPosition} zoom={this.props.map.zoom}>
          {this.props.map.locals.map(marker => (
            <Marker key={marker.id} position={marker.position} onClick={this.onMarkerClick.bind(this, marker)}/>
          ))}
          <InfoWindow
            marker={this.props.map.activeLocalMarker}
            visible={this.props.map.showInfoWindow}
            >
            <div className="infowindow-content">
              <p></p>
            </div>
          </InfoWindow>
        </Map>
        <AddLocalModal lat={this.state.focusMarker.lat} lng={this.state.focusMarker.lng}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      map: state.MappingReducer
  };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
      addLocal: (lat, lng) => dispatch(addLocal(lat, lng)),
      fetchLocals: () => dispatch(fetchLocals()),
      setActiveLocalMarker: (marker) => dispatch(setActiveLocalMarker(marker)),
      setPosition: (lat, lng) => dispatch(setPosition(lat, lng)),
      toggleInfoWindow: (show) => dispatch(toggleInfoWindow(show)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: ("AIzaSyBaUKcLhuTzmpsXtt9qtBPACPFiYauS0M4")
  })(MapContainer)
);
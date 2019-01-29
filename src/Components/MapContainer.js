import React, { Component } from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import { connect } from 'react-redux';
import { addLocal, fetchLocals, setPosition, setActiveLocalMarker, toggleInfoWindow } from '../Actions';

class MapContainer extends Component {
  addLocal = (props, marker, e) => {
    this.props.addLocal(e.latLng.lat(), e.latLng.lng());
  }
  onMapClick = (props) => {
    if( this.props.map.showInfoWindow ) {
      this.props.toggleInfoWindow(false);
      this.props.setActiveLocalMarker(null);
    }
  }
  onMarkerClick = (props, marker, e) => {
    this.props.toggleInfoWindow( ! this.props.map.showInfoWindow );
    this.props.setActiveLocalMarker(marker);
  }
  render() {
    return (
      <Map onRightclick={this.addLocal} google={this.props.google} initialCenter={this.props.map.initialPosition} zoom={this.props.map.zoom}>
        {this.props.map.locals.map(marker => (
          <Marker key={marker.id} position={marker.position} onClick={this.onMarkerClick}/>
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
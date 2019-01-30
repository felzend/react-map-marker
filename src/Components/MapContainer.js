import React, { Component } from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';
import { connect } from 'react-redux';
import { fetchPlaces, setPosition, setActiveMarker, setPlaceModalCoordinates } from '../Actions';
import PlaceModal from './PlaceModal';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { activeMarker: null, showInfoWindow: false };
  }
  addPlace = (props, marker, e) => {
    let lat = e.latLng.lat();
    let lng = e.latLng.lng();
    this.props.setPlaceModalCoordinates(lat, lng);
  }
  onMapClick = (props, marker, e) => {
    if( this.state.showInfoWindow ) {
      this.setState({
        activeMarker: null,
        showInfoWindow: false,
      });
    }
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      showInfoWindow: true,
    });
  }
  onInfoWindowClose = () => {
    this.setState({
      showInfoWindow: false,
    });
  }
  getPlace(id) {
    var places = this.props.map.places.filter(marker => marker.id === id);
    if( places.length ) return places[0];
  }
  render() {
    return (
      <div className="map-container">
        <Map  onClick={this.onMapClick} onRightclick={this.addPlace} google={this.props.google} initialCenter={this.props.map.initialPosition}>
          {this.props.map.places.map(marker => (
            <Marker key={marker.id} id={marker.id} description={marker.description} position={marker.position} onClick={this.onMarkerClick}/>
          ))}
          <InfoWindow
            visible={this.state.showInfoWindow}
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            >
            <div className="info-window">
            { this.state.activeMarker != null &&
              <div className="content">
                <p>ID: <b>{this.state.activeMarker.id}</b></p>
                <p>Coordenadas: <b>{this.state.activeMarker.position.lat()}, {this.state.activeMarker.position.lng()}</b></p>
                <p>Descrição: <b>{this.state.activeMarker.description}</b></p>
              </div>
            }
            </div>
          </InfoWindow>
        </Map>
        <PlaceModal/>
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
      fetchPlaces: () => dispatch(fetchPlaces()),
      setPosition: (lat, lng) => dispatch(setPosition(lat, lng)),
      setPlaceModalCoordinates: (lat, lng) => dispatch(setPlaceModalCoordinates(lat, lng)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: ("AIzaSyBaUKcLhuTzmpsXtt9qtBPACPFiYauS0M4")
  })(MapContainer)
);
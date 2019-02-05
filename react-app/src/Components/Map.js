import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMap as GMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";
import { fetchPlaces, togglePlaceInfoWindow } from '../Actions';
import { API_URL } from '../api';
import PlaceModal from './PlaceModal';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {addPlace: {lat: 0, lng: 0}};
    }
    componentWillMount() {
        this.fetchPlaces();        
    }
    onAddPlace = (e) => {
        let position = e.latLng;
        this.setState({addPlace: {lat: position.lat(), lng: position.lng()}});
    }
    onDeletePlace = (marker) => {

    }
    onMarkerClick = (marker, event) => {
        this.props.togglePlaceInfoWindow(marker.id, true);
    }
    onInfoWindowClose = (marker) => {
        this.props.togglePlaceInfoWindow(marker.id, false);
    }    
    fetchPlaces() {
        this.props.fetchPlaces();
    }
    render() {
        return (
            <div className="map-component">
                <GoogleMap
                position={this.props.map.position}
                zoom={this.props.map.zoom}
                places={this.props.map.places}
                onAddPlace={this.onAddPlace}
                onMarkerClick={this.onMarkerClick}
                onInfoWindowClose={this.onInfoWindowClose}
                onDeletePlace={this.onDeletePlace}

                googleMapURL={this.props.map.googleMapURL}
                containerElement={<div className="map-component" />}
                loadingElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}            
                isMarkerShown/>
                <PlaceModal lat={this.state.addPlace.lat} lng={this.state.addPlace.lng}/>
            </div>
        )
    }
}

const GoogleMap = withScriptjs(withGoogleMap((props) =>
    <GMap
    onRightClick={props.onAddPlace}
    defaultZoom={props.zoom}
    center={props.position}
    >
    {props.isMarkerShown && props.places.map(marker =>
        <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} onClick={props.onMarkerClick.bind(this, marker)}>
            {marker.showInfoWindow &&
            <InfoWindow onCloseClick={props.onInfoWindowClose.bind(this, marker)}>
                <div className="infowindow">
                    <p>Show {marker.id}</p>
                    <p><button className="btn btn-danger" onClick={props.onDeletePlace.bind(this, marker)}>Apagar</button></p>
                </div>               
            </InfoWindow>}
        </Marker>
    )}
    </GMap>
));

const mapStateToProps = (state) => {
    return {
        map: state.MappingReducer
    };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchPlaces: () => {
            fetch(API_URL.concat('places'))
            .then(response => response.json())
            .then(places => dispatch(fetchPlaces(places)));
        },
        togglePlaceInfoWindow: (id, status) => dispatch(togglePlaceInfoWindow(id, status)),
        // deletePlace: (id) => dispatch(deletePlace(id)),
        // setPlaces: (places) => dispatch(setPlaces(places)),
        // setPosition: (lat, lng) => dispatch(setPosition(lat, lng)),
        // setPlaceModalCoordinates: (lat, lng) => dispatch(setPlaceModalCoordinates(lat, lng)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);

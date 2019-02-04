import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMap as GMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";
import { setPlaces, togglePlaceInfoWindow } from '../Actions';
import { API_URL } from '../api';

class NewMap extends Component {
    constructor(props) {
        super(props);
    }
    onMarkerClick = (marker, event) => {
        this.props.togglePlaceInfoWindow(marker.id, true);
    }
    onInfoWindowClose = (marker) => {
        this.props.togglePlaceInfoWindow(marker.id, false);
    }
    componentWillMount() {
        this.fetchPlaces();
    }
    fetchPlaces() {
        this.props.fetchPlaces();
    }
    render() {
        return (
            <GoogleMap
            position={this.props.map.position}
            zoom={this.props.map.zoom}
            googleMapURL={this.props.map.googleMapURL}
            containerElement={<div className="map-component" />}
            loadingElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            places={this.props.map.places}
            onMarkerClick={this.onMarkerClick}
            onInfoWindowClose={this.onInfoWindowClose}
            isMarkerShown/>
        )
    }
}

const GoogleMap = withScriptjs(withGoogleMap((props) =>
    <GMap
    defaultZoom={props.zoom}
    center={props.position}
    >
    {props.isMarkerShown && props.places.map(marker =>
        <Marker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }} onClick={props.onMarkerClick.bind(this, marker)}>
            {marker.showInfoWindow &&
            <InfoWindow onCloseClick={props.onInfoWindowClose.bind(this, marker)}>
                <div>Show {marker.id}</div>
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
            .then(places => dispatch(setPlaces(places)));
        },
        togglePlaceInfoWindow: (id, status) => dispatch(togglePlaceInfoWindow(id, status)),
        // deletePlace: (id) => dispatch(deletePlace(id)),
        // setPlaces: (places) => dispatch(setPlaces(places)),
        // setPosition: (lat, lng) => dispatch(setPosition(lat, lng)),
        // setPlaceModalCoordinates: (lat, lng) => dispatch(setPlaceModalCoordinates(lat, lng)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewMap);

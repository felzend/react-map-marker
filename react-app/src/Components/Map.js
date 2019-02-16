import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMap as GMap, Marker, withScriptjs, withGoogleMap, InfoWindow } from "react-google-maps";
import { editPlace, deletePlace, fetchPlaces, togglePlaceInfoWindow } from '../Actions';
import { API_URL } from '../api';
import PlaceModal from './PlaceModal';
import { handleApiErrors } from '../util';

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
    onEditPlace = (marker) => {
        let description = window.prompt(`Editar a descrição do local id ${marker.id}`, marker.description);
        let newMarker = marker;
        if(description) {
            newMarker.description = description;
            this.props.editPlace(newMarker.id, newMarker);
        }
    }
    onDeletePlace = (marker) => {
        let confirm = window.confirm(`Deseja mesmo apagar este local? (ID ${marker.id})`);
        if(confirm) {
            this.props.deletePlace(marker.id);
        }
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
                onEditPlace={this.onEditPlace}
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
                    <p>ID: <b>{marker.id}</b></p>
                    <p>Posição: <b>{marker.lat}, {marker.lng}</b></p>
                    <p>Descrição: <b>{marker.description}</b></p>
                    <p><a href="#" onClick={props.onEditPlace.bind(this, marker)}>Editar Local</a></p>
                    <p><a href="#" onClick={props.onDeletePlace.bind(this, marker)}>Apagar Local</a></p>
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
            .then(places => dispatch(fetchPlaces(places)))
            .catch(error => alert(error));
        },
        editPlace: (id, place) => {
            fetch(API_URL.concat('places'), {body: JSON.stringify(place), method: "PUT", headers: {'content-type': 'application/json'} })
            .then(response => handleApiErrors(response, "Descrição atualizada com sucesso!", "Falha ao atualizar descrição."))
            .then(response => dispatch(editPlace(id, place)))
            .catch(error => alert(error))
        },
        deletePlace: (id) => {
            fetch(API_URL.concat(`places?id=${id}`), {method: 'DELETE'})
            .then(response => handleApiErrors(response, "Local apagado com sucesso!", "Falha ao apagar local."))
            .then(data => dispatch(deletePlace(id)));
        },
        togglePlaceInfoWindow: (id, status) => dispatch(togglePlaceInfoWindow(id, status)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Map);

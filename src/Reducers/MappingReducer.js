import { ADD_PLACE, SET_PLACE_MODAL_DESCRIPTION, SET_PLACE_MODAL_COORDINATES, SET_PLACES, DELETE_PLACE } from "../Actions";
import uniqid from 'uniqid';

const initialState = {
    api_key: 'AIzaSyBaUKcLhuTzmpsXtt9qtBPACPFiYauS0M4',
    activeMarker: {},
    placeModal: {
        lat: 0.0,
        lng: 0.0,
        description: '',
    },
    initialPosition: {
        lat: -3.7340904,
        lng: -38.5023363,
    },
    places: [],
    showInfoWindow: false,
    zoom: 14,
};

const MappingReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PLACE: {
            let places = state.places;
            places.push({
                id: uniqid(),
                lat: action.lat,
                lng: action.lng,
                description: action.description,
            });
            return {
                ...state,
                places,
            }
        }
        case DELETE_PLACE: {
            return {
                ...state,
            }
        }
        case SET_PLACES: {
            console.log(action);
            return {
                ...state,
                places: action.places,
            }
        }
        case SET_PLACE_MODAL_COORDINATES: {
            return {
                ...state,
                placeModal: {
                    ...state.placeModal,
                    lat: action.lat,
                    lng: action.lng,
                }
            }
        }
        case SET_PLACE_MODAL_DESCRIPTION: {
            return {
                ...state,
                placeModal: {
                    ...state.placeModal,
                    description: action.description,
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default MappingReducer;
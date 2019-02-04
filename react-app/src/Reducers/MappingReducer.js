import uniqid from 'uniqid';
import { ADD_PLACE, SET_PLACE_MODAL_DESCRIPTION, SET_PLACE_MODAL_COORDINATES, SET_PLACES, DELETE_PLACE, TOGGLE_PLACE_INFOWINDOW } from "../Actions";
import { GMAPS_API_KEY } from "../api";

const initialState = {
    api_key: GMAPS_API_KEY,
    activeMarker: {},
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp"+/*`&key=${GMAPS_API_KEY}`*/+"&libraries=geometry,drawing,places",
    placeModal: { lat: 0, lng: 0, description: '' },
    position: { lat: -3.7340904, lng: -38.5023363 },
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
        case TOGGLE_PLACE_INFOWINDOW: {
            state.places.map(place => {
                if(place.id === action.id) {
                    place.showInfoWindow = action.status;
                }
            })
            return {
                ...state,
                places: state.places
            }
        }
        case DELETE_PLACE: {
            return {
                ...state,
            }
        }
        case SET_PLACES: {
            action.places.map(place => place['showInfoWindow'] = false);
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
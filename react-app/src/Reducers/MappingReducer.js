import { ADD_PLACE, SET_PLACE_MODAL_DESCRIPTION, SET_PLACE_MODAL_COORDINATES, FETCH_PLACES, DELETE_PLACE, TOGGLE_PLACE_INFO_WINDOW } from "../Actions";
import { GMAPS_API_KEY } from "../api";

const initialState = {
    activeMarker: {},
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp"+`&key=${GMAPS_API_KEY}`+"&libraries=geometry,drawing,places",
    position: { lat: -3.7340904, lng: -38.5023363 },
    places: [],
    showInfoWindow: false,
    zoom: 14,
};

const MappingReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_PLACE: {
            state.places.push({
                id: action.id,
                lat: action.lat,
                lng: action.lng,
                description: action.description,
            });
            return {
                ...state,
            }
        }
        case TOGGLE_PLACE_INFO_WINDOW: {
            state.places.map(place => {
                if(place.id === action.id) {
                    place.showInfoWindow = action.status;
                }
                return place;
            })
            return {
                ...state,
            }
        }
        case DELETE_PLACE: {
            state.places = state.places.filter(place => place.id !== action.id);
            return {
                ...state,
            }
        }
        case FETCH_PLACES: {
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
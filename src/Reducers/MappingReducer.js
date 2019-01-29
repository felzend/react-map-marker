import { ADD_LOCAL, TOGGLE_INFO_WINDOW, SET_ACTIVE_LOCAL_MARKER } from "../Actions";
import uniqid from 'uniqid';

const initialState = {
    api_key: 'AIzaSyBaUKcLhuTzmpsXtt9qtBPACPFiYauS0M4',
    activeLocalMarker: null,
    initialPosition: {
        lat: -3.7340904,
        lng: -38.5023363,
    },
    locals: [],
    showInfoWindow: false,
    zoom: 14,
};

const MappingReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_LOCAL: {
            let locals = state.locals;
            locals.push({id: uniqid(), position: {lat: action.lat, lng: action.lng}});

            return {
                ...state,
                locals
            }
        }
        case TOGGLE_INFO_WINDOW: {
            return {
                ...state,
                showInfoWindow: action.show,
            }
        }
        case SET_ACTIVE_LOCAL_MARKER: {
            return {
                ...state,
                activeLocalMarker: action.marker,
            }
        }
        default: {
            return state;
        }
    }
}

export default MappingReducer;
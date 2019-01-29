const initialState = {
    'api_key': 'AIzaSyDJp-FXdbYoWpw1a4Ta4J0f0oLusfMPV9w',
    center: {
        lat: -3.7340904,
        lng: -38.5023363,
    },
    marks: [],
    zoom: 14,
};

const MappingReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'MARK_MAP': {
            let marks = state.marks;
            marks.push({lat: action.lat, lng: action.lng});
            return {
                ...state,
                marks
            }
        }
        case 'SET_POS': {
            return {
                ...state,
                lat: action.lat,
                lng: action.lng
            }
        }
        default: {
            return state;
        }
    }
}

export default MappingReducer;
export const ADD_PLACE = 'ADD_PLACE';
export const FETCH_PLACES = 'FETCH_PLACES';
export const DELETE_PLACE = 'DELETE_PLACE';

export const TOGGLE_PLACE_INFO_WINDOW = 'TOGGLE_PLACE_INFO_WINDOW';

export const SET_PLACE_MODAL_COORDINATES = 'SET_PLACE_MODAL_COORDINATES';
export const SET_PLACE_MODAL_DESCRIPTION = 'SET_PLACE_MODAL_DESCRIPTION';

export function addPlace(id, lat, lng, description) {
    return { type: ADD_PLACE, id, lat, lng, description };
}
export function deletePlace(id) {
    return { type: DELETE_PLACE, id };
}
export function fetchPlaces(places) {
    return { type: FETCH_PLACES, places };
}
export function togglePlaceInfoWindow(id, status) {
    return { type: TOGGLE_PLACE_INFO_WINDOW, id, status };
}
export function setPlaceModalCoordinates(lat, lng) {
    return { type: SET_PLACE_MODAL_COORDINATES, lat, lng };
}
export function setPlaceModalDescription(description) {
    return { type: SET_PLACE_MODAL_DESCRIPTION, description };
}
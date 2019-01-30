export const ADD_PLACE = 'ADD_PLACE';
export const FETCH_PLACES = 'FETCH_PLACES';
export const SET_POSITION = 'SET_POSITION';

export const SET_PLACE_MODAL_COORDINATES = 'SET_PLACE_MODAL_COORDINATES';
export const SET_PLACE_MODAL_DESCRIPTION = 'SET_PLACE_MODAL_DESCRIPTION';

export function addPlace(lat, lng, description) {
    return { type: ADD_PLACE, lat, lng, description };
}
export function fetchPlaces() {
    return { type: FETCH_PLACES };
}
export function setPosition(lat, lng) {
    return { type: SET_POSITION, lat, lng };
}
export function setPlaceModalCoordinates(lat, lng) {
    return { type: SET_PLACE_MODAL_COORDINATES, lat, lng };
}
export function setPlaceModalDescription(description) {
    return { type: SET_PLACE_MODAL_DESCRIPTION, description };
}
export const ADD_PLACE = 'ADD_PLACE';
export const DELETE_PLACE = 'DELETE_PLACE';
export const SET_PLACES = 'SET_PLACES';
export const SET_POSITION = 'SET_POSITION';

export const SET_PLACE_MODAL_COORDINATES = 'SET_PLACE_MODAL_COORDINATES';
export const SET_PLACE_MODAL_DESCRIPTION = 'SET_PLACE_MODAL_DESCRIPTION';

export function addPlace(lat, lng, description) {
    return { type: ADD_PLACE, lat, lng, description };
}
export function deletePlace(id) {
    return { type: DELETE_PLACE, id };
}
export function setPlaces(places) {
    return { type: SET_PLACES, places };
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
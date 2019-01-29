export const ADD_LOCAL = 'ADD_LOCAL';
export const FETCH_ALL_LOCALS = 'FETCH_ALL_LOCALS';
export const SET_POSITION = 'SET_POSITION';
export const SET_ACTIVE_LOCAL_MARKER = 'SET_ACTIVE_LOCAL_MARKER';
export const TOGGLE_INFO_WINDOW = 'TOGGLE_INFO_WINDOW';

export function addLocal(lat, lng) {
    return { type: ADD_LOCAL, lat, lng };
}
export function fetchLocals() {
    return { type: FETCH_ALL_LOCALS };
}
export function setPosition(lat, lng) {
    return { type: SET_POSITION, lat, lng };
}
export function setActiveLocalMarker(marker) {
    return { type: SET_ACTIVE_LOCAL_MARKER, marker };
}
export function toggleInfoWindow(show) {
    return { type: TOGGLE_INFO_WINDOW, show };
}
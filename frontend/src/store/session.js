// frontend/src/store/session.js
import { csrfFetch } from './csrf';
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export const logout = () => async (dispatch) => {
	const response = await csrfFetch('/api/session', {
		method: 'DELETE',
	});
	dispatch(removeUser());
    window.location.href = '/'
	return response;
};

export const signup = (user) => async (dispatch) => {
	const { firstName, lastName, username, email, password } = user;
	const response = await csrfFetch('/api/users', {
		method: 'POST',
		body: JSON.stringify({
			firstName,
			lastName,
			username,
			email,
			password,
		}),
	});

	const data = await response.json();
	dispatch(setUser(data));
	return response;
};

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch('/api/session');
	const data = await response.json();

	dispatch(setUser(data));
	return response;
};

const setUser = (user) => {
	// console.log(user);
	return {
		type: SET_USER,
		user: user,
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch('/api/session', {
		method: 'POST',
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	const data = await response.json();
	// console.log(data);
	dispatch(setUser(data));
    window.location.href = '/songs/current'
	return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = Object.assign({}, state);
			newState.user = action.user;
			// console.log(action);
			return newState;
		case REMOVE_USER:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		default:
			return state;
	}
};

export default sessionReducer;

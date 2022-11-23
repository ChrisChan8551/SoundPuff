import { csrfFetch } from './csrf';

const LOAD_SONGS = 'songs/LOAD_SONGS';
const LOAD_ONE_SONG = 'songs/LOAD_ONE_SONG';
const CREATE_SONG = 'songs/CREATE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';

export const loadSongs = (songs) => ({
	type: LOAD_SONGS,
	songs,
});

const loadASong = (song) => ({
	type: LOAD_ONE_SONG,
	song,
});

const createSong = (song) => ({
	type: CREATE_SONG,
	song,
});

const editSong = (song) => ({
	type: EDIT_SONG,
	song,
});

const deleteSong = (songId) => ({
	type: DELETE_SONG,
	songId,
});

export const getSongs = () => async (dispatch) => {
	const response = await csrfFetch('/api/songs');

	if (response.ok) {
		const songsObj = await response.json();

		const songs = songsObj.Songs;
		dispatch(loadSongs(songs));
	}
};

const initialState = {};

const songReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case LOAD_SONGS:
			action.songs.forEach((song) => {
				newState[song.id] = song;
			});
			return newState;
		case LOAD_ONE_SONG:
			newState[action.song.id] = action.song;
			return newState;
		case CREATE_SONG:
			newState[action.song.id] = action.song;
			return newState;
		case EDIT_SONG:
			newState[action.song.id] = action.song;
			return newState;
		case DELETE_SONG:
			delete newState[action.songId];
			return newState;
		default:
			return newState;
	}
};

export default songReducer;

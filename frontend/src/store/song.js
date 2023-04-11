import { csrfFetch } from './csrf';

const LOAD_SONGS = 'songs/LOAD_SONGS';
const USER_SONGS = 'songs/USER_SONGS';
const LOAD_ONE_SONG = 'songs/LOAD_ONE_SONG';
const CREATE_SONG = 'songs/CREATE_SONG';
const EDIT_SONG = 'songs/EDIT_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';

export const loadSongs = (songs) => ({
	type: LOAD_SONGS,
	songs,
});

export const getsongscurrentuser = (songs) => ({
	type: USER_SONGS,
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

export const editCurrentSong = (songId, song) => async (dispatch) => {
	const response = await csrfFetch(`/api/songs/${songId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(song),
	});

	if (response.ok) {
		const song = await response.json();
		// console.log(song);
		dispatch(editSong(song));
		return song;
	}
};

export const createNewSong = (song) => async (dispatch) => {
	const response = await csrfFetch(`/api/songs`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(song),
	});

	if (response.ok) {
		const song = await response.json();
		// console.log('try to add song', song);
		dispatch(createSong(song));
		return song;
	}
};

export const getOneSong = (songId) => async (dispatch) => {
	const response = await csrfFetch(`/api/songs/${songId}`);

	if (response.ok) {
		const song = await response.json();
		dispatch(loadASong(song));
	}
};

export const getSongs = () => async (dispatch) => {
	const response = await csrfFetch('/api/songs');

	if (response.ok) {
		const songsObj = await response.json();
		// console.log('******SONGS_OBJ_GETSONGS******')
		// console.log(songsObj)
		const songs = songsObj.Songs;
		dispatch(loadSongs(songs));
	}
};

export const getSongsbyCurrentUser = () => async (dispatch) => {
	const response = await csrfFetch('/api/songs/current');

	if (response.ok) {
		const songsObj = await response.json();
		// console.log('******SONGS_OBJ_GETSONGS******');
		// console.log(songsObj);
		const currentUsersongs = songsObj.Songs;
		dispatch(getsongscurrentuser(currentUsersongs));
	}
};

export const removeSong = (songId) => async (dispatch) => {
	const response = await csrfFetch(`/api/songs/${songId}`, {
		method: 'DELETE',
	});
	dispatch(deleteSong(songId));
	return response;
};

const initialState = {};

const songReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_SONGS: {
			const newState = {};
			action.songs.forEach((usersong) => {
				newState[usersong.id] = usersong;
			});
			return newState;
		}
		case LOAD_SONGS: {
			const newState = {};
			action.songs.forEach((song) => {
				newState[song.id] = song;
			});
			return newState;
		}

		case LOAD_ONE_SONG: {
			const newState = {};
			newState[action.song.id] = action.song;
			return newState;
		}
		case CREATE_SONG: {
			const newState = { ...state };
			newState[action.song.id] = action.song;
			return newState;
		}
		case EDIT_SONG: {
			const newState = { ...state };
			newState[action.song.id] = action.song;
			return newState;
		}
		case DELETE_SONG: {
			const newState = { ...state };
			delete newState[action.songId];
			return newState;
		}
		default: {
			return state;
		}
	}
};

export default songReducer;

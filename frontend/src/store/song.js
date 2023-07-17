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
	const { title, description, url, previewImage, albumId } = song;
	// console.log('**********EDIT SONG STORE**********', song);
	let audioFile = url;
	const formData = new FormData();
	if (title) {
		formData.append('title', title);
	}
	if (description) {
		formData.append('description', description);
	}
	if (albumId) {
		formData.append('albumId', albumId);
	}
	if (previewImage) formData.append('previewImage', previewImage);

	// for single file
	if (audioFile) formData.append('audioFile', audioFile);
	// console.log('******FORM DATA*****')
	// for (let pair of formData.entries()) {
	// 	console.log(pair[0], pair[1]);
	// }

	const res = await csrfFetch(`/api/songs/${songId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'multipart/form-data' },
		body: formData,
	});

	if (res.ok) {
		const song = await res.json();
		// console.log(song);
		dispatch(editSong(song));
		return song;
	}
	return res;
};

export const createNewSong = (payload) => async (dispatch) => {
	const { title, description, url, previewImage, albumId } = payload;
	// console.log('**********CREATE NEW SONG STORE**********', payload);
	let audioFile = url;
	const formData = new FormData();
	if (title) {
		formData.append('title', title);
	}
	if (description) {
		formData.append('description', description);
	}
	if (albumId) {
		formData.append('albumId', albumId);
	}
	if (previewImage) {
		formData.append('previewImage', previewImage);
	}

	// for single file
	if (audioFile) formData.append('audioFile', audioFile);

	// console.log('*****formData*****');
	// Log the FormData object
	// console.log('FormData:', formData);

	// Log the key-value pairs in the FormData
	// for (let pair of formData.entries()) {
	// 	console.log(pair[0], pair[1]);
	// }
	const res = await csrfFetch(`/api/songs`, {
		method: 'POST',
		headers: { 'Content-Type': 'multipart/form-data' },
		body: formData,
	});

	if (res.ok) {
		const song = await res.json();
		dispatch(createSong(song));
		return song;
	}
	return res;
};

export const getOneSong = (songId) => async (dispatch) => {
	const res = await csrfFetch(`/api/songs/${songId}`);

	if (res.ok) {
		const song = await res.json();
		dispatch(loadASong(song));
	}
};

export const getSongs = () => async (dispatch) => {
	const res = await csrfFetch('/api/songs');

	if (res.ok) {
		const songsObj = await res.json();

		const songs = songsObj.Songs;
		dispatch(loadSongs(songs));
	}
};

export const getSongsbyCurrentUser = () => async (dispatch) => {
	const res = await csrfFetch('/api/songs/current');

	if (res.ok) {
		const songsObj = await res.json();
		const currentUsersongs = songsObj.Songs;
		dispatch(getsongscurrentuser(currentUsersongs));
	}
};

export const removeSong = (songId) => async (dispatch) => {
	const res = await csrfFetch(`/api/songs/${songId}`, {
		method: 'DELETE',
	});
	dispatch(deleteSong(songId));
	return res;
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

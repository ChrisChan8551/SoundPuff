import csrfFetch from "./csrf";

const LOAD_ALBUMS = 'albums/LOAD_ALBUMS';
const LOAD_ONE_ALBUM = 'albums/LOAD_ONE_ALBUM';
const CREATE_ALBUM = 'albums/CREATE_ALBUM';
const EDIT_ALBUM = 'albums/EDIT_ALBUM';
const DELETE_ALBUM = 'albums/DELETE_ALBUM';

const loadAlbums = (albums) => ({
  type: LOAD_ALBUMS,
  albums
});

const loadAnAlbum = (album) => ({
  type: LOAD_ONE_ALBUM,
  album
});

const createAlbum = (album) => ({
  type: CREATE_ALBUM,
  album
});

const editAlbum = (album) => ({
  type: EDIT_ALBUM,
  album
});

const deleteAlbum = (albumId) => ({
  type: DELETE_ALBUM,
  albumId
});

const initialState = {};

const albumReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type){
        case LOAD_ALBUMS:
            action.albums.forEach(album => {
                newState[album.id] = album
            });
            return newState;
        case LOAD_ONE_ALBUM:
            newState[action.album.id] = action.album;
            return newState;
        case CREATE_ALBUM:
            newState[action.album.id] = action.album;
            return newState;
        case EDIT_ALBUM:
            newState[action.album.id] = action.album;
            return newState;
        case DELETE_ALBUM:
            delete newState[action.albumId];
            return newState;
        default:
            return newState;
    }
};

export default albumReducer;

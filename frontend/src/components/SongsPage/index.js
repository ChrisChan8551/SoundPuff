import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect, NavLink } from 'react-router-dom';
import { getSongs, getSongsbyCurrentUser } from '../../store/song';
import CreateSongModal from '../CreateSongModal';
import { selectSearchbarValue } from '../../store/searchbar';
import './SongsPage.css';

const MAX_SONG_COUNT = 30;

function getLimitedSongsList(songs, searchbarValue = '') {
    const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchbarValue.toLowerCase())
    );
    const songCount = Math.min(filteredSongs.length, MAX_SONG_COUNT);
    const selectedSongs = [];

    while (selectedSongs.length < songCount) {
        const randomIndex = Math.floor(Math.random() * filteredSongs.length);
        selectedSongs.push(filteredSongs[randomIndex]);
        filteredSongs.splice(randomIndex, 1);
    }
    // console.log(selectedSongs)
    return selectedSongs;
}

const SongsPage = () => {
    const allSongs = Object.values(useSelector((state) => state.song));
    const loggedInUser = useSelector((state) => state.session.user);
    // const searchbarValue = useSelector(selectSearchbarValue);
    const [songs, setSongs] = useState([]);
    const [showCreateSongForm, setShowCreateSongForm] = useState(false);
    const [hasRenderedSongs, setHasRenderedSongs] = useState(false);
    // const lastSearchRef = useRef(searchbarValue);
    let createSongForm;
    // console.log('*****SONGS*****', songs);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
            if (history.location.pathname === '/') {
                setHasRenderedSongs(false);
                dispatch(getSongs());
            }
        });
        return unlisten;
    }, [dispatch, history]);

    useEffect(() => {
        dispatch(getSongs());
    }, [dispatch]);

    useEffect(() => {
        setShowCreateSongForm(false);
    }, [dispatch]);

    useEffect(() => {
        if (!hasRenderedSongs && allSongs.length) {
            setHasRenderedSongs(true);
            setSongs(getLimitedSongsList(allSongs));
        }
    }, [hasRenderedSongs, allSongs]);

    // useEffect(() => {
    // 	const handleKeyPress = (event) => {
    // 		if (event.key === 'Enter') {
    // 			lastSearchRef.current = searchbarValue;
    // 			setSongs(getLimitedSongsList(allSongs, searchbarValue));
    // 		}
    // 	};

    // 	document.addEventListener('keydown', handleKeyPress);

    // 	return () => {
    // 		document.removeEventListener('keydown', handleKeyPress);
    // 	};
    // }, [allSongs, searchbarValue]);

    if (!songs) {
        return null;
    }

    if (showCreateSongForm && loggedInUser?.id) {
        createSongForm = (
            <CreateSongModal
                album={null}
                hideForm={() => setShowCreateSongForm(false)}
            />
        );
    }

    const goToDetails = (songId) => {
        history.push(`/songs/${songId}`);
    };

    return (
        // <div className='song-container'>
        // {!showCreateSongForm && loggedInUser?.id && (
        // 	<button
        // 		className='add-song-button'
        // 		onClick={() => setShowCreateSongForm(true)}
        // 	>
        // 		Add Song
        // 	</button>
        // )}
        // 	<div className='song-detail'>
        // 		<ul className='ul-songs'>
        // 			{allSongs &&
        // 				allSongs.map((song) => {
        // 					return (
        // 						<li key={song.id}>
        // 							<div
        // 								className='song-list-item'
        // 								onClick={() => goToDetails(song.id)}
        // 							>
        // 								<div className='song-list-image'>
        // 									<img
        // 										className='song-detail-image'
        // 										src={song.previewImage}
        // 										alt='Song icon'
        // 									/>
        // 								</div>
        // 								<div>
        // 									<p className='song-list-title'>
        // 										{song.title}
        // 									</p>
        // 								</div>
        // 							</div>
        // 						</li>
        // 					);
        // 				})}
        // 			{createSongForm}
        // 		</ul>
        // 	</div>
        // </div>
        <div className='song-main-container'>
            {!showCreateSongForm && loggedInUser?.id && (
                <button
                    className='blue-button'
                    onClick={() => setShowCreateSongForm(true)}
                >
                    Add Song
                </button>
            )}
            <div className='song-container'>
                {allSongs &&
                    allSongs.map((song) => {
                        return (
                            <div className='song-box'>
                                <div className='song-detail'>
                                    <div className='song-image'><img
                                        className='song-detail-image'
                                        src={song.previewImage}
                                        alt='Song icon' key={song.id} onClick={() => goToDetails(song.id)}
                                    /></div>
                                    <div className='song-title'>{song.title}</div>
                                    <div className='song-description'></div>
                                </div>
                            </div>
                        );
                    })}

                {/* <div className='song-box'></div>
				<div className='song-box'></div>
				<div className='song-box'></div>
				<div className='song-box'></div>
				<div className='song-box'></div>
				<div className='song-box'></div>
				<div className='song-box'></div>
				<div className='song-box'></div> */}
                {createSongForm}
            </div>
        </div>
    );
};

export default SongsPage;

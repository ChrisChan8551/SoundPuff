import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneAlbum, removeAlbum } from '../../store/album';
import { removeSong } from '../../store/song';
import EditAlbumModal from '../EditAlbumModal';
import CreateSongModal from '../CreateSongModal';
import './AlbumDetailPage.css';

const AlbumDetailPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { albumId } = useParams();
	const [showEditAlbumForm, setShowEditAlbumForm] = useState(false);
	const [showCreateSongForm, setShowCreateSongForm] = useState(false);
	const album = useSelector((state) => state.album[albumId]);
	const loggedInUser = useSelector((state) => state.session.user);
	let albumEditForm;
	let createSongForm;

	useEffect(() => {
		setShowEditAlbumForm(false);
		dispatch(getOneAlbum(albumId));
	}, [albumId, dispatch]);

	useEffect(() => {
		setShowCreateSongForm(false);
		dispatch(getOneAlbum(albumId));
	}, [albumId, dispatch]);

	if (!album) {
		return null;
	}

	if (showEditAlbumForm && album.userId === loggedInUser?.id) {
		albumEditForm = (
			<EditAlbumModal
				album={album}
				hideForm={() => setShowEditAlbumForm(false)}
			/>
		);
	}

	if (showCreateSongForm && album.userId === loggedInUser?.id) {
		createSongForm = (
			<CreateSongModal
				album={album}
				hideForm={() => setShowCreateSongForm(false)}
			/>
		);
	}

	const deleteAlbum = (albumId) => {
		album?.Songs?.map((song) => {
			return dispatch(removeSong(song.id));
		});
		return dispatch(removeAlbum(albumId)).then(() => {
			history.push('/albums');
		});
	};

	return (
		<div className='album-container'>
			<div className='album-detail'>
				<div className='album-detail-info'>
					<div className='album-detail-image'>
						<img
							className='album-detail-image'
							src={album.previewImage}
							alt='albumimg'
						></img>
					</div>
					<ul>
						<li id='album-title' key={`${album.id}${album.title}`}>
							{album.title}
						</li>
						<li
							id='album-artist'
							key={`${album.id}${album?.Artist?.username}`}
						>
							{album?.Artist?.username}
						</li>
						<li
							id='album-songs'
							key={`${album.id}${album.description}`}
						>{`Description: ${album.description}`}</li>
						{album?.Songs?.map((song, idx) => {
							return (
								<li key={`${album.id}${song.id}`}>{`Song #${
									idx + 1
								}: ${song.title}`}</li>
							);
						})}
					</ul>
				</div>
				<div className='album-detail-buttons'>
					{!showCreateSongForm &&
						album.userId === loggedInUser?.id && (
							<button
								className='add-song-button'
								onClick={() => setShowCreateSongForm(true)}
							>
								Add Song
							</button>
						)}
					{!showEditAlbumForm &&
						album.userId === loggedInUser?.id && (
							<button
								className='album-edit-button'
								onClick={() => setShowEditAlbumForm(true)}
							>
								Edit
							</button>
						)}
					{album.userId === loggedInUser?.id && (
						<button
							className='album-delete-button'
							onClick={() => deleteAlbum(albumId)}
						>
							Delete
						</button>
					)}
				</div>
				<div>{createSongForm}</div>
				{albumEditForm}
			</div>
		</div>
	);
};

export default AlbumDetailPage;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as songActions from '../../store/song';
import { Redirect, useParams, useHistory } from 'react-router-dom';

function CreateSongForm({ album, hideForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { albumId } = useParams();

	const loggedInUser = useSelector((state) => state.session.user);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [url, setUrl] = useState('');
	const [previewImage, setPreviewImage] = useState('');
	const [errors, setErrors] = useState([]);

	if (loggedInUser?.id !== album?.userId)
		return <Redirect to={`/albums/${albumId}`} />;

	const handleClickAway = (e) => {
		e.preventDefault();
		hideForm();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		let song = {
			title,
			description,
			url,
			imageUrl: previewImage,
			albumId: albumId,
		};

		history.push('/songs');

		return dispatch(songActions.createNewSong(song)).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	return (
		<section className='create-album-form'>
			<form onSubmit={handleSubmit}>
				<label className='create-album-label-form'>
					Title:
					<input
						className='create-album-input'
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</label>
				<label className='create-album-label-form'>
					Description:
					<input
						className='create-album-input'
						type='text'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</label>
				<label className='create-album-label-form'>
					Url:
					<input
						className='create-album-input'
						type='text'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						required
					/>
				</label>
				<label className='create-album-label-form'>
					Image Url:
					<input
						className='create-album-input'
						type='text'
						value={previewImage}
						onChange={(e) => setPreviewImage(e.target.value)}
						required
					/>
				</label>
				<div>
					<button
						className='create-album-button'
						type='submit'
						disabled={errors.length > 0}
					>
						Create Song
					</button>
					<button
						className='cancel-create-album-button'
						type='button'
						onClick={handleClickAway}
					>
						Cancel
					</button>
				</div>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
			</form>
		</section>
	);
}

export default CreateSongForm;

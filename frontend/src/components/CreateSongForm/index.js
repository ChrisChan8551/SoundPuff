import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewSong } from '../../store/song';
import { Redirect, useParams, useHistory } from 'react-router-dom';

function CreateSongForm({ album, hideForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { albumId } = useParams();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [url, setUrl] = useState('');
	const [previewImage, setPreviewImage] = useState('');
	const [errors, setErrors] = useState([]);
	const [audioFile, setAudioFile] = useState(null);

	// if (loggedInUser?.id !== album?.userId)
	// 	return <Redirect to={`/albums/${albumId}`} />;

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
			url: audioFile,
			previewImage,
			albumId,
		};
		hideForm();
		history.push('/songs');

		return dispatch(createNewSong(song)).catch(async (res) => {
			if (res.json) {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			} else {
				console.error('Response does not have json() method:', res);
			}
		});
	};

	const updateFile = (e) => {
		const file = e.target.files[0];
		if (file) setAudioFile(file);
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
					Upload Song File:
					<input
						type='file'
						accept='audio/*'
						className='create-album-input'
						onChange={updateFile}
					/>
					{/* <input
						className='create-album-input'
						type='file'
						accept='audio/*'
						onChange={updateFile}
						// required
					/> */}
				</label>
				<label className='create-album-label-form'>
					Image Url:
					<input
						className='create-album-input'
						type='text'
						value={previewImage}
						onChange={(e) => setPreviewImage(e.target.value)}
					/>
				</label>
				<div className='button-container'>
					<button
						className='orange-button'
						type='submit'
						disabled={errors.length > 0}
					>
						Create Song
					</button>
					<button
						className='grey-button'
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

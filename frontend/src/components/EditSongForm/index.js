import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCurrentSong, getOneSong } from '../../store/song';
import './EditSongForm.css';

const EditSongForm = ({ song, hideForm }) => {
	const dispatch = useDispatch();
	const { songId } = useParams();
	const [title, setTitle] = useState(song.title || '');
	const [description, setDescription] = useState(song.description || '');
	const [url, setUrl] = useState(song.url || '');
	const [previewImage, setPreviewImage] = useState(song.previewImage) || '';
	const [errors, setErrors] = useState([]);
	const [disabled, setDisabled] = useState(false);
	const [audioFile, setAudioFile] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		let songEdited = {
			title,
			description,
			url: audioFile,
			previewImage: previewImage,
		};
		// console.log('*****EDIT SONG FORM***** SONG EDITED',songEdited);
		let updatedSong = await dispatch(
			editCurrentSong(songId, songEdited)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				let newErrors = Object.values(data.errors);
				if (newErrors.length > 0) {
					setDisabled(true);
				} else {
					setDisabled(false);
				}
				setErrors(newErrors);
			}
		});

		if (updatedSong) {
			dispatch(getOneSong(songId));
			hideForm();
		}
	};

	const handleClickAway = (e) => {
		e.preventDefault();
		hideForm();
	};

	const updateFile = (e) => {
		const file = e.target.files[0];
		if (file) setAudioFile(file);
	};

	return (
		<form onSubmit={handleSubmit}>
			<section className='edit-song-form'>
				<label className='edit-label-form'>
					Title
					<input
						className='edit-input-form'
						type='text'
						value={title}
						onChange={(e) => {
							setDisabled(false);
							setTitle(e.target.value);
						}}
					/>
				</label>
				<label className='edit-label-form'>
					Description
					<input
						className='edit-input-form'
						type='text'
						value={description}
						onChange={(e) => {
							setDisabled(false);
							setDescription(e.target.value);
						}}
					/>
				</label>
				<label className='edit-label-form'>
					Upload Song File:
					<input
						type='file'
						accept='audio/*'
						className='create-album-input'
						onChange={updateFile}
					/>
				</label>
				<label className='edit-label-form'>
					Image Url
					<input
						className='edit-input-form'
						type='text'
						value={previewImage}
						onChange={(e) => {
							setDisabled(false);
							setPreviewImage(e.target.value);
						}}
					/>
				</label>
				<div className='button-container'>
					<button
						className='orange-button'
						type='submit'
						disabled={disabled}
					>
						Update
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
			</section>
		</form>
	);
};

export default EditSongForm;

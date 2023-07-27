import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewAlbum } from '../../store/album';
import { Redirect, useHistory } from 'react-router-dom';

function CreateAlbumForm({ hideForm }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const loggedInUser = useSelector((state) => state.session.user);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [previewImage, setPreviewImage] = useState('');
	const [errors, setErrors] = useState([]);

	if (!loggedInUser?.id) return <Redirect to='/' />;

	const handleClickAway = (e) => {
		e.preventDefault();
		hideForm();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		let album = {
			title,
			description,
			previewImage,
		};

		history.push(`/albums`);

		hideForm();

		return dispatch(createNewAlbum(album)).catch(async (res) => {
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
						Create Album
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

export default CreateAlbumForm;

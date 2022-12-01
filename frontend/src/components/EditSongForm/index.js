import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editCurrentSong, getOneSong } from '../../store/song';
import './EditSongForm.css';

const EditSongForm = ({ song }) => {
	const dispatch = useDispatch();
	const { songId } = useParams();
	const [title, setTitle] = useState(song.title);
	const [description, setDescription] = useState(song.description);
	const [url, setUrl] = useState(song.url);
	const [previewImage, setPreviewImage] = useState(song.previewImage);
	const [errors, setErrors] = useState([]);
	

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);

		let songEdited = {
			title,
			description,
			url,
			imageUrl: previewImage,
		};


	};

	return (
		<div className='edit-song-form'>
			<form onSubmit={handleSubmit}></form>
		</div>
	);
};

export default EditSongForm;

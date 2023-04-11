import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../store/comment';
import { useParams } from 'react-router-dom';

function CreateCommentForm({ hideForm }) {
	const dispatch = useDispatch();
	const { songId } = useParams();

	const loggedInUser = useSelector((state) => state.session.user);
	const [body, setBody] = useState('');
	const [errors, setErrors] = useState([]);

	const handleClickAway = (e) => {
		e.preventDefault();
		hideForm();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		let comment = {
			body,
			userId: loggedInUser?.id,
			songId: songId,
		};
		hideForm();

		return dispatch(commentActions.createNewComment(comment)).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};
	// console.log('*********CREATE SONGFORM SONGID***************', songId);
	return (
		<form className='create-album-form' onSubmit={handleSubmit}>
			<label className='create-album-label-input'>
				<textarea
					type='text'
					placeholder='Comment'
					value={body}
					onChange={(e) => setBody(e.target.value)}
					required
				/>
			</label>
			<div>
				<button
					className='create-album-button'
					type='submit'
					disabled={errors.length > 0}
				>
					Create
				</button>
				<button
					className='cancel-create-album-button'
					type='button'
					onClick={handleClickAway}
				>
					Cancel
				</button>
			</div>
		</form>
	);
}

export default CreateCommentForm;

import React, { useDeferredValue, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCurrentComment, getOneComment } from '../../store/comment';

const EditCommentForm = ({ comment, hideForm }) => {
	const dispatch = useDispatch();
	const [body, setBody] = useState(comment.body);
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors([]);
		const payload = { body };
		let data = await dispatch(editCurrentComment(comment.id, payload));

		if (data.errors) {
			setErrors([...Object.values(data.errors)]);
		} else {
			hideForm();
		}
	};

	const handleClickAway = (e) => {
		e.preventDefault();
		hideForm();
	};

	return (
		<form>
			<textarea
				className='comment-input'
				value={body}
				onChange={(e) => setBody(e.target.value)}
			/>
			<button
				className='update-button'
				type='submit'
				onClick={handleSubmit}
			>
				Update
			</button>
			<button
				className='cancel-button'
				type='button'
				onClick={handleClickAway}
			>
				Cancel
			</button>
		</form>
	);
};

export default EditCommentForm;

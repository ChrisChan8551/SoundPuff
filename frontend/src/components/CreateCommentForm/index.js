import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../store/comment';
import { Redirect, useParams, useHistory } from 'react-router-dom';

function CreateCommentForm({ song,comment, hideForm }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { commentId } = useParams();

	const loggedInUser = useSelector((state) => state.session.user);
	const [body, setBody] = useState('');

	const [errors, setErrors] = useState([]);

	if (loggedInUser?.id !== song?.userId)
		return <Redirect to={`/comments/${commentId}/comments`} />;

	const handleClickAway = (e) => {
		e.preventDefault();
		hideForm();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		let comment = {
			body,
      commentId:commentId,
		};

		history.push('/comments');

		return dispatch(commentActions.createNewComment(comment)).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			}
		);
	};

	return (
		<form onSubmit={handleSubmit}>
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<label>
				Title:
				<input
					type='text'
					value={body}
					onChange={(e) => setBody(e.target.value)}
					required
				/>
			</label>

			<button type='submit' disabled={errors.length > 0}>
				Create Comment
			</button>
			<button type='button' onClick={handleClickAway}>
				Cancel
			</button>
		</form>
	);
}

export default CreateCommentForm;

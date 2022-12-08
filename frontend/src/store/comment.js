import { csrfFetch } from './csrf';

const LOAD_COMMENTS = 'comments/LOAD_COMMENTS';
const LOAD_ONE_COMMENT = 'comments/LOAD_ONE_COMMENT';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';


export const loadComments = (comments) => ({
	type: LOAD_COMMENTS,
	comments
})

const loadAComment = (comment) => ({
	type: LOAD_ONE_COMMENT,
	comment,
});

const createComment = (comment) => ({
	type: CREATE_COMMENT,
	comment,
});

const editComment = (comment) => ({
	type: EDIT_COMMENT,
	comment,
});

const deleteComment = (commentId) => ({
	type: DELETE_COMMENT,
	commentId,
});

export const getCommentsBySongId = (songId) => async (dispatch) => {
	const response = await csrfFetch(`/api/songs/${songId}/comments`);
console.log('*****SONGID*****')
  console.log(songId)
	if (response.ok) {
		const songsObj = await response.json();
    console.log('******SONGS_OBJ_COMMENTS******')
		console.log(songsObj)
		const comments = songsObj.Comments;
    console.log(comments)
		dispatch(loadComments(comments));
	}
};

// export const editCurrentComment = (commentId,comment) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/${commentId}`, {
// 			method: 'PUT',
// 			headers: {
// 					"Content-Type": "application/json"
// 			},
// 			body: JSON.stringify(comment)
// 	});

// 	if(response.ok){
// 			const comment = await response.json();
// 			console.log(comment);
// 			dispatch(editComment(comment));
// 			return comment;
// 	}
// };

// export const createNewComment = (songId,comment) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/:songId/comments`, {
// 			method: 'POST',
// 			headers: {
// 					"Content-Type": "application/json"
// 			},
// 			body: JSON.stringify(comment)
// 	});

// 	if(response.ok){
// 			const comment = await response.json();
// 			console.log('try to add comment', comment);
// 			dispatch(createComment(comment));
// 			return comment;
// 	}
// };



// export const getComments = () => async (dispatch) => {
// 	const response = await csrfFetch('/api/comments');

// 	if (response.ok) {
// 		const commentsObj = await response.json();

// 		const comments = commentsObj.Comments;
// 		dispatch(loadComments(comments));
// 	}
// };

// export const removeComment = (commentId) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/comments/${commentId}`, {
//         method: 'DELETE'
//     });
// 		dispatch(deleteComment(commentId));
//         return response;
// 	};

const initialState = {};

const commentReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case LOAD_COMMENTS:
			action.comments.forEach((comment) => {
				newState[comment.id] = comment;
			});
			return newState;
		// case LOAD_ONE_COMMENT:
		// 	newState[action.comment.id] = action.comment;
		// 	return newState;
		// case CREATE_COMMENT:
		// 	newState[action.comment.id] = action.comment;
		// 	return newState;
		// case EDIT_COMMENT:
		// 	newState[action.comment.id] = action.comment;
		// 	return newState;
		// case DELETE_COMMENT:
		// 	delete newState[action.commentId];
		// 	return newState;
		default:
			return newState;
	}
};

export default commentReducer;

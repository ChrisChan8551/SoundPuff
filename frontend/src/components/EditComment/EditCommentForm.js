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

    // const handleClickAway = (e) => {
    // 	e.preventDefault();
    // 	hideForm();
    // };

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('.comment-input')) {
                hideForm();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [hideForm]);

    return (
        <label>
            <textarea
                className='comment-input'
                type='text'
                placeholder='Comment'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            <p>
                <button
                    className='blue-button'
                    type='submit'
                    onClick={handleSubmit}
                >
                    Update
                </button>
            </p>
        </label>
    );
};

export default EditCommentForm;

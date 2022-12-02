import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCurrentSong, getOneSong } from '../../store/song';
import './EditSongForm.css'

const EditSongForm = ({ song, hideForm }) => {
  const dispatch = useDispatch();
  const { songId } = useParams();

    const [title, setTitle] = useState(song.title);
    const [description, setDescription] = useState(song.description);
    const [url, setUrl] = useState(song.url);
    const [previewImage, setPreviewImage] = useState(song.previewImage);
    const [errors, setErrors] = useState([]);
    const [disabled, setDisabled] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    let songEdited = {
        title,
        description,
        url,
        imageUrl: previewImage
    };

    let updatedSong = await dispatch(editCurrentSong(songId, songEdited))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors){
              let newErrors = Object.values(data.errors);
              if(newErrors.length > 0){
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

  return (
		<form onSubmit={handleSubmit}>
    <section className="edit-song-form">

            <label className='edit-label-form'>
                Title
                <input className='edit-input-form'
                    type="text"
                    value={title}
                    onChange={(e) => {setDisabled(false); setTitle(e.target.value)}}
                />
            </label>
            <label className='edit-label-form'>
                Description
                <input className='edit-input-form'
                    type="text"
                    value={description}
                    onChange={(e) => {setDisabled(false); setDescription(e.target.value)}}
                />
            </label>
            <label className='edit-label-form'>
                Url
                <input className='edit-input-form'
                    type="text"
                    value={url}
                    onChange={(e) => {setDisabled(false); setUrl(e.target.value)}}
                />
            </label>
            <label className='edit-label-form'>
                Image Url
                <input className='edit-input-form'
                    type="text"
                    value={previewImage}
                    onChange={(e) => {setDisabled(false); setPreviewImage(e.target.value)}}
                />
            </label>

        <button className='update-song-button' type="submit" disabled={disabled}>Update</button>
        <button className='cancel-update-song-button'type="button" onClick={handleClickAway}>Cancel</button>
				<ul>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>

    </section>
		</form>
  );
};

export default EditSongForm;

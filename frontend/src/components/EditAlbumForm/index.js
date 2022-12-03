import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { editCurrentAlbum, getOneAlbum } from '../../store/album';
import { getSongs } from '../../store/song';
import './EditAlbumForm.css'

const EditAlbumForm = ({ album, hideForm }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { albumId } = useParams();

  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description);
  const [previewImage, setPreviewImage] = useState(album.previewImage);
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    let albumEdited = {
        title,
        description,
        imageUrl: previewImage
    };

    let updatedAlbum = await dispatch(editCurrentAlbum(albumId, albumEdited))
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

    if (updatedAlbum) {
      dispatch(getOneAlbum(albumId))
      .then(() => {
        dispatch(getSongs())
      })
      .then(() => {
        history.push(`/albums/${albumId}`)
      });
      hideForm();
    }
  };

  const handleClickAway = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="edit-album-form">
      <form onSubmit={handleSubmit}>

            <label className='edit-label-form'>
                Title:
                <input className='edit-input-form'
                    type="text"
                    value={title}
                    onChange={(e) => {setDisabled(false); setTitle(e.target.value)}}
                />
            </label>
            <label className='edit-label-form'>
                Description:
                <input className='edit-input-form'
                    type="text"
                    value={description}
                    onChange={(e) => {setDisabled(false); setDescription(e.target.value)}}
                />
            </label>
            <label className='edit-label-form'>
                Image Url:
                <input className='edit-input-form'
                    type="text"
                    value={previewImage}
                    onChange={(e) => {setDisabled(false); setPreviewImage(e.target.value)}}
                />
            </label>

        <button className='update-album-button' type="submit" disabled={disabled}>Update</button>
        <button className='cancel-update-album-button' type="button" onClick={handleClickAway}>Cancel</button>
        <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
      </form>
    </section>
  );
};

export default EditAlbumForm;

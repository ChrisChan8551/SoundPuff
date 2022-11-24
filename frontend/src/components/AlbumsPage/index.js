import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory} from 'react-router-dom';


const AlbumsPage = () => {
  const dispatch = useDispatch();
	const history = useHistory();
  const  albums = Object.values(useSelector(state => state.album));

  let content;
  
  if (!albums) {
    return null;
  }

  const goToDetails = (albumId) => {
    console.log('albumId', albumId);
    history.push(`/albums/${albumId}`);
  }

  return (
    <div className="album-detail">
    <ul>
      <li>{content}</li>
        {albums && albums.map(album => {
          return (
          <li key={album.id}>
            <div
              className='album-list-item'
              onClick={() => goToDetails(album.id)}>
                <div
                    className='album-list-image'
                    style={{ backgroundImage: `url('${album.previewImage}')` }}>
                </div>
                <div>
                    <p className='album-list-title'>{album.title}</p>
                </div>
            </div>
          </li>
            );
          })}
    </ul>
</div>
  )
}

export default AlbumsPage;
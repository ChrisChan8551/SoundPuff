import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAlbums } from '../../store/album';
import CreateAlbumModal from '../CreateAlbumModal';
import './AlbumsPage.css';

const AlbumsPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const loggedInUser = useSelector(state => state.session.user);
	const [showCreateAlbumForm, setShowCreateAlbumForm] = useState(false);
	const albums = Object.values(useSelector((state) => state.album));

	let content;
	let CreateAlbum = (
    <CreateAlbumModal
      hideForm={() => setShowCreateAlbumForm(false)}
    />
  );

	useEffect(() => {
		dispatch(getAlbums());
	}, [dispatch]);

	if (!albums) {
		return null;
	}

	if(!loggedInUser || loggedInUser?.id === undefined){
  content = (
    <p className='all-albums-header'>Log In Or Sign Up To Create An Album!</p>
  );
} else if(loggedInUser?.id && loggedInUser?.id !== undefined){
    content = (
    <div>
      {<button className='create-album-button' onClick={() => setShowCreateAlbumForm(true)}>Create An Album</button>}
      {showCreateAlbumForm && CreateAlbum}
    </div>
    );
}

	const goToDetails = (albumId) => {
		console.log('albumId', albumId);
		history.push(`/albums/${albumId}`);
	};

	return (
		<div className='album-container'>
			<div className='album-detail'>
				<ul className='ul-albums'>
					<li>{content}</li>
					{albums &&
						albums.map((album) => {
							return (
								<li key={album.id}>
									<div className='album-list-item' onClick={() => goToDetails(album.id)}>
										<div className='album-list-image'>
											<img className='album-detail-image'src={album.previewImage} alt='album icon' />
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
		</div>
	);
};

export default AlbumsPage;

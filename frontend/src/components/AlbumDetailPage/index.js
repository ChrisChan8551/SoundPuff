import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneAlbum, removeAlbum } from '../../store/album';
import { removeSong } from '../../store/song';
import EditAlbumModal from '../EditAlbumModal';
import './AlbumDetailPage.css';

const AlbumDetailPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { albumId } = useParams();
  const [showEditAlbumForm, setShowEditAlbumForm] = useState(false);
	const album = useSelector((state) => state.album[albumId]);
	const loggedInUser = useSelector((state) => state.session.user);
  let albumEditForm;

  useEffect(() => {
    setShowEditAlbumForm(false);
	  dispatch (getOneAlbum(albumId));
  }, [albumId, dispatch]);

  if (!album) {
    return null;
  }

  if (showEditAlbumForm && album.userId === loggedInUser?.id){
    albumEditForm = (
      <EditAlbumModal
      album={album}
      hideForm={() => setShowEditAlbumForm(false)}
      />
      );
    };

	return (
		<div className='album-detail'>
			<div className='album-detail-info'>
				<div className='album-detail-image'>
					<img className='album-detail-image'src={album.previewImage} alt='albumimg'></img>
				</div>
				<ul>
					<li id='album-title' key={`${album.id}${album.title}`}>
						{album.title}
					</li>
					<li id='album-artist' key={`${album.id}${album?.Artist?.username}`}>
						{album?.Artist?.username}
					</li>
					<li
						id='album-songs'
						key={`${album.id}${album.description}`}
					>{`Description: ${album.description}`}</li>
					{album?.Songs?.map((song, idx) => {
						return (
							<li key={`${album.id}${song.id}`}>{`Song #${idx + 1}: ${
								song.title
							}`}</li>
						);
					})}
				</ul>
			</div>


		</div>
	);
};

export default AlbumDetailPage;

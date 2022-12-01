import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getOneAlbum, removeAlbum } from '../../store/album';
import { removeSong } from '../../store/song';
import './AlbumDetailPage.css';

const AlbumDetailPage = () => {
  const dispatch= useDispatch();
  const history = useHistory();
  const { albumId } = useParams();
  const album = useSelector(state => state.album[albumId]);
  const loggedInUser = useSelector(state => state.session.user);

}


  export default AlbumDetailPage;

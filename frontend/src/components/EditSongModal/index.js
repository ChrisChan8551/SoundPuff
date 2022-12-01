import React, { useState } from 'react';
import EditSongForm from '../EditSongForm';
import { Modal } from '../../context/Modal';

function EditSongFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='edit-song-button-font'onClick={() => setShowModal(true)}>Edit Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSongForm />
        </Modal>
      )}
    </>
  );
}

export default EditSongFormModal;

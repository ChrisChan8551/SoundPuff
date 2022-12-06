import { Modal } from '../../context/Modal';
import CreateSongForm from '../CreateSongForm';

function CreateSongModal({album, hideForm }) {

  return (
    <>
      {hideForm && (
        <Modal>
          <CreateSongForm album={album} hideForm={hideForm}/>
        </Modal>
      )}
    </>
  );
}

export default CreateSongModal;

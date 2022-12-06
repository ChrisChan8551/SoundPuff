import { Modal } from '../../context/Modal';
import CreateAlbumForm from '../CreateAlbumForm';

function CreateAlbumModal({ hideForm }) {

  return (
    <>
      {hideForm && (
        <Modal>
          <CreateAlbumForm hideForm={hideForm}/>
        </Modal>
      )}
    </>
  );
}

export default CreateAlbumModal;

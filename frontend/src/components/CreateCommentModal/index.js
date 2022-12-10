import { Modal } from '../../context/Modal';
import CreateCommentForm from '../CreateCommentForm';

function CreateCommentModal({comment, hideForm }) {

  return (
    <>
      {hideForm && (
        <Modal>
          <CreateCommentForm comment={comment} hideForm={hideForm}/>
        </Modal>
      )}
    </>
  );
}

export default CreateCommentModal;

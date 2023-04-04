import { Modal } from '../../context/Modal';
import EditCommentForm from './EditCommentForm';

function EditCommentFormModal({ comment, hideForm }) {
	return (
		<>
			{hideForm && (
				<Modal>
					<EditCommentForm comment={comment} hideForm={hideForm} />
				</Modal>
			)}
		</>
	);
}

export default EditCommentFormModal;

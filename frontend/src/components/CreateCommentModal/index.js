import { Modal } from '../../context/Modal';
import CreateCommentForm from './CreateCommentForm';

function CreateCommentModal({ song, hideForm }) {
	return (
		<>
			{hideForm && (
				<Modal>
					<CreateCommentForm song={song} hideForm={hideForm} />
				</Modal>
			)}
		</>
	);
}

export default CreateCommentModal;

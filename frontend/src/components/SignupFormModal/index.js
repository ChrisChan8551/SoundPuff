import React, { useState } from 'react';
import SignupFormPage from '../SignupFormPage';
import { Modal } from '../../context/Modal';

function SignupFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button
				className='create-button-font'
				onClick={() => setShowModal(true)}
			>
				Create Account
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignupFormPage />
				</Modal>
			)}
		</>
	);
}

export default SignupFormModal;

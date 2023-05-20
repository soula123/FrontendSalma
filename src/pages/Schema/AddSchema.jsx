import React from 'react';
import Modal from 'react-modal';
//import "./AddEmp.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import MyForm from './AddScheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen , faPlus } from '@fortawesome/free-solid-svg-icons'
import CloseButton from 'react-bootstrap/CloseButton';


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

function AddSchema() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const customStyles = {
	content: {
	  top: '50%',
	  left: '50%',
	  right: 'auto',
	  bottom: 'auto',
	  marginRight: '-50%',
	  transform: 'translate(-50%, -50%)',
	},
  };
  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
	window.location.reload(false);
    setIsOpen(false);
  }
 
  return (
    <div>
      <a onClick={openModal} className="btn btn-success" data-toggle="modal"><span>Add <FontAwesomeIcon icon={faPlus} size='lg'/></span></a>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
		style={customStyles}
      >
    
    <CloseButton onClick={closeModal}></CloseButton>
    <div className='Modal-style'>       
		<div className="modal-dialog">
			<div className="modal-content">
					<MyForm/>
					
			</div>
		</div>
        </div>
        
      </Modal>
    </div>
  );
}

export default AddSchema;
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

function Backdrop(props) {
  return <div className="backdrop" onClick={props.closeModal}></div>;
}

function ModalOverlay(props) {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
}

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById('overlays')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById('overlays')
      )}
    </>
  );
}

export default Modal;

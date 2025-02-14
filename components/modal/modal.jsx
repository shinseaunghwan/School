"use client"
import React, { useState } from "react";
import Modal from "react-modal";
import NoticePopup from "../footer/NoticePopup";
import modalPop from "../../styles/modalPop.module.css";

Modal.setAppElement('body');

const ModalPop = ({ tit, text, styles }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = (event) => {
    event.preventDefault(); 
    setModalIsOpen(true);
    setShowModal(true); 
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setShowModal(false); 

    
  };

  return (
    <>
      <NoticePopup styles={styles} onClick={openModal} />
      {showModal && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Notice Popup"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: '99999',
            },
            content: {
              maxWidth: '1000px',
              width: '90%',
              color: 'lightsteelblue',
              top: '30%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            },
          }}
        >
          <div className={modalPop.modal}>
            <h2 className={modalPop.tit}>{tit}</h2>
            <p className={modalPop.txt}>{text}</p>
            <div className={modalPop.button_wrap}>
              <button className={modalPop.button} onClick={closeModal}>
                닫기
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ModalPop;

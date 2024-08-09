import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WarningImage from '../../../../assets/images/warning-image.svg';

interface ModalProps {
  propFunction: () => void;
  buttonText: string;
  bodyText: string;
}

function PopupModal({
  propFunction,
  buttonText,
  bodyText,
}: ModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handlePropFunction = () => {
    propFunction();
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <img
            src={WarningImage}
            alt="warning image that you are closing the popup"
          />
          {bodyText}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handlePropFunction}>
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupModal;

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import WarningImage from '../../../../assets/images/warning-image.svg';
import './PopupModal.css';
interface ModalProps {
  propFunction: () => void;
  buttonText: string;
  bodyText: string;
  show: boolean;
  title?: string;
  handleClose: () => void;
}

function PopupModal({
  propFunction,
  buttonText,
  bodyText,
  show,
  handleClose,
  title,
}: ModalProps) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex flex-column text-center">
          <img
            src={WarningImage}
            alt="warning image that you are closing the popup"
          />
          {title && <h4 className="pt-4">{title}</h4>}
          <span className="pt-4 pb-2 text-muted">{bodyText}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={propFunction}>
            {buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopupModal;

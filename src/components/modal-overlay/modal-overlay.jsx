import PropTypes from "prop-types"
import { useRef } from "react"
import styles from "./modal-overlay.module.css"

const ModalOverlay = (props) => {
  const overlayRef = useRef(null);

  const handleClick = (evt) => {
    if (evt.target === overlayRef.current) {
      props.onClose();
    }
  };

  return <div className={styles.modal_overlay} onClick={handleClick} ref={overlayRef} />;
};

ModalOverlay.propTypes = {
	onClose: PropTypes.func.isRequired
};

export default ModalOverlay;
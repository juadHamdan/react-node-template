import "./modal.css";
import {useRef} from 'react'
import { CSSTransition } from "react-transition-group";
import * as PropTypes from "prop-types";

const Modal = ({
  children,
  show,
  onClose,
  header,
  text,
  backgroundColor = "none",
  textColor = "black",
  transition = "scale",
  transitionTime = 300
}) => {
  const nodeRef = useRef(null)

  const modalStyle = {
    textColor: textColor,
    background: backgroundColor
  };

  function handleOutsideClick(e) {
    if (typeof(e.target.className) === 'string' && e.target.className.includes("modal-bg")) onClose();
  }

  return (
    <>
      <CSSTransition
        in={show}
        timeout={transitionTime}
        classNames={`modal-${transition}`}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className="modal-bg" onClick={(e) => handleOutsideClick(e)}>
          <div className="modal" style={modalStyle}>
            {header ? <p className="header"> {header} </p> : null }
            {text ? <p className="text">{text}</p> : null}
            
            {children ? 
                <div className="element">
                {children}
                </div>
            : null}
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  show: PropTypes.bool.isRequired,
  transition: PropTypes.oneOf(["scale", "fade", "slide"]),
  transitionTime: PropTypes.number,
  text: PropTypes.string,
  header: PropTypes.string,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
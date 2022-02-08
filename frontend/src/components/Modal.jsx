import { useRef } from "react";
import "./css/Modal.css";

const Modal = ({ children, className, onClick, ...props }) => {
  const ref = useRef();

  return (
    <div
      ref={ref}
      className={`Modal ${className}`}
      onClick={(e) => {
        if (e.target !== ref.current) return;
        if (typeof onClick === "function") onClick(e);
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Modal;

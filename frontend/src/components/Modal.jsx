import { useRef } from "react";
import * as cls from "classnames";
import css from "./css/Modal.module.css";

const Modal = ({ children, className, onClick, ...props }) => {
  const ref = useRef();

  return (
    <div
      ref={ref}
      className={cls(css.Modal, className)}
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

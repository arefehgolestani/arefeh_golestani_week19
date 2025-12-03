

import { IoCloseCircle } from "react-icons/io5";
import styles from "./Modal.module.css";

function Modal({
  title,
  children,
  message,
  confirmText = "تأیید",
  cancelText = "انصراف",
  mode,
  onConfirm,
  onCancel,
}) {
  return (
    <div className={styles.container}>
      <span className={styles.close} onClick={onCancel}>
        <IoCloseCircle color="#d17f7f" fontSize="2.2rem" />
      </span>
      <div className={styles.modal_content}>
        <h3>{title}</h3>
        {mode === "delete" && <h4>{message}</h4> }
        {mode === "edit" && children }
        {mode === "add" && children}
        
        <div className={styles.buttons}>
          <button className="success" type="submit" onClick={onConfirm}>
            {confirmText}
          </button>
          <button className="warning" onClick={onCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

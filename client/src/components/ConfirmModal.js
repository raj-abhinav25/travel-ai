import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AlertTriangle, X } from "lucide-react";
import "./ConfirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div className="modal-icon-wrapper">
          <AlertTriangle size={28} strokeWidth={1.5} />
        </div>

        <h3 className="modal-title">{title || "Confirm Action"}</h3>
        <p className="modal-message">{message || "Are you sure?"}</p>

        <div className="modal-actions">
          <button className="modal-btn modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn modal-btn-confirm" onClick={onConfirm}>
            Delete Trip
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;

import React from "react";
import Loader from "react-loader-spinner";

const Modal = ({ show }) => {
  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-content">
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
        <p>Processing...</p>
      </div>
    </div>
  );
};

export default Modal;
// Modal.js
import React from 'react';

const Modal2 = ({ isOpen, closeModal, title, children, width = 'max-w-xl' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <span
          className="absolute top-0 right-0 p-4 cursor-pointer"
          onClick={closeModal}
        >
          &times;
        </span>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal2;

import React from 'react';

const Modal = ({ isModelOpen, setIsModelOpen, children }) => {
  if (!isModelOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative'>
        <button
          className='absolute top-4 right-4 text-gray-300 text-3xl'
          onClick={() => setIsModelOpen(false)}
        >
          &times;
        </button>
         {children}
      </div>
    </div>
  );
};

export default Modal;

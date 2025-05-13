import React, { useState } from 'react';

const ChangeAddress = ({ setAddress, setIsModelOpen }) => {
  const [newAddress, setNewAddress] = useState("");

  const onClose = () => {
    setAddress(newAddress);
    setIsModelOpen(false);
  };

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter new Address"
          className="form-control"
          onChange={(e) => setNewAddress(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-secondary me-2"
          onClick={() => setIsModelOpen(false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={onClose}
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default ChangeAddress;

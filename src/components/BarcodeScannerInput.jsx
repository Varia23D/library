import React, { useRef, useEffect, useState } from 'react';
// import { handleQRCodeScan } from '../helpers/QRCodeHandler';

const BarcodeScannerInput = ({ onScan }) => {
  const inputRef = useRef(null);
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (barcode) {
        // handleQRCodeScan(barcode)
        onScan(barcode);
        setBarcode('');
      }
    } else {

      setBarcode((prev) => prev + e.key);
    }
  };

  const handleFocus = () => {

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      style={{ position: 'absolute', opacity: 0 }}
      onKeyDown={handleKeyDown}
      onBlur={handleFocus} 
      aria-hidden="true"
    />
  );
};

export default BarcodeScannerInput;

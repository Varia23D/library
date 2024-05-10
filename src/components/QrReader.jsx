import React, { useState, useEffect, useRef } from 'react';
import { handleQRCodeScan } from '../helpers/QRCodeHandler';
import { Html5Qrcode } from 'html5-qrcode';
import Modal from './Modal';
import { Oval } from 'react-loader-spinner';
import '../css/QrReader.css'; 

const QrReader = ({ updateBooks, isReturnButton, buttonText }) => {
  const html5QrCodeRef = useRef(null);
  const [isScannerRunning, setIsScannerRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // QR scanner init
    const html5QrCode = new Html5Qrcode('reader');
    html5QrCodeRef.current = html5QrCode;

    return () => {
      // QR scanner stop 
      if (isScannerRunning) {
        html5QrCode.stop();
      }
    };
  }, []);

  const startScanner = (e) => {
    e.preventDefault();
    const html5QrCode = html5QrCodeRef.current;

    const qrCodeSuccessCallback = (decodedText) => {
      html5QrCode.stop();
      setIsScannerRunning(false);
      setTimeout(() => {
        handleQRCodeScan(decodedText, updateBooks);
      }, 500);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 500);
    };

    const config = { fps: 10, aspectRatio: 1 };

    html5QrCode.start({ facingMode: 'environment' }, config, qrCodeSuccessCallback)
      .then(() => {
        setIsScannerRunning(true);
      })
      .catch(error => {
        console.error('Error starting QR code scan:', error);
      });
  };

  const stopScanner = () => {
    if (isScannerRunning) {
      html5QrCodeRef.current.stop();
      setIsScannerRunning(false);
    }
  };

  return (
    <div>
      <div id="reader" className={isScannerRunning ? 'scanner-open' : ''}></div>
      <div className={`qr-container`}>
        {!isScannerRunning && (
          <button className="square-button" onClick={startScanner} > {buttonText ? buttonText : 'Scan QR code'}
          </button>
        )}
        {isScannerRunning && (
          <button className="square-button" type="button" onClick={stopScanner} >
            Cancel
          </button>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div  >
          <div>
            <Oval height={200} width={200} color="#84CCF8" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QrReader;

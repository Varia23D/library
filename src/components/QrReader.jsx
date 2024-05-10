import React, { useState, useEffect, useRef } from 'react';
import { handleQRCodeScan } from '../helpers/QRCodeHandler';
import { Html5Qrcode } from 'html5-qrcode';
import '../css/QrReader.css'; 

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
};

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
      }, 750);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 760);
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

      {/* Modal component */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <div>
          <img src="data:image/svg+xml;charset=utf-8,%3Csvg version='1.1' id='Capa_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 50 50' xml:space='preserve' fill='%23000000'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Ccircle style='fill:%2325AE88;' cx='25' cy='25' r='25'%3E%3C/circle%3E%3Cpolyline style='fill:none;stroke:%23FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;' points=' 38,15 22,33 12,25 '%3E%3C/polyline%3E%3C/g%3E%3C/svg%3E"
        alt="SVG Image" height={200} width={200} color="#84CCF8" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QrReader;

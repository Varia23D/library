import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect, useRef } from "react";
import { handleQRCodeScan } from "../helpers/QRCodeHandler";
import '../css/QrReader.css'; // Import CSS file for styling
import { Oval } from 'react-loader-spinner'

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
      // Delay execution of handleQRCodeScan by 2 seconds
      setTimeout(() => {
        handleQRCodeScan(decodedText, updateBooks);
      }, 2000);
      // Display modal window here
      setShowModal(true);
      // Hide modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    };

    const config = { fps: 10, aspectRatio: 1 };

    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
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

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
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

      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div>
            <div>
              <div>
                <Oval
                  height={80}
                  width={80}
                  color="#84CCF8"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QrReader;

import { Html5Qrcode } from "html5-qrcode";
import { useState, useEffect, useRef } from "react";
import { handleQRCodeScan } from "./helpers/QRCodeHandler";
import './QrReader.css'; // Import CSS file for styling

const QrReader = ({updateBooks}) => {
  const html5QrCodeRef = useRef(null);
  const [isScannerRunning, setIsScannerRunning] = useState(false);

  useEffect(() => {
    //QR scaner init
    const html5QrCode = new Html5Qrcode('reader');
    html5QrCodeRef.current = html5QrCode;

    return () => {
      //QR scanner stop 
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
      handleQRCodeScan(decodedText, updateBooks);
    };

    const config = { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1 };

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

  return (
    <div>
      <div id="reader"></div>
      <div className={`qr-container`}>
      {!isScannerRunning && (
          <button className="square-button" onClick={startScanner} >
            Add More {/* Button text */}
            <span className="plus-icon">&#43;</span> {/* Plus icon */}
          </button>
      )}
      {isScannerRunning && (
        <button className="square-button" type="button" onClick={stopScanner} >
            Cancel
          </button>
      )}
      </div>
    </div>
  );
};

export default QrReader;

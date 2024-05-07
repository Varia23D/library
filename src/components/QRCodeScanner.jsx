import { useState, useEffect, useRef } from "react";
import { handleQRCodeScan } from "../helpers/QRCodeHandler";
import Modal from "./Modal"; // Import your modal component

const QRCodeScanner = ({ updateBooks }) => {
  const html5QrCodeRef = useRef(null);
  const [isScannerRunning, setIsScannerRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("reader");
    html5QrCodeRef.current = html5QrCode;

    return () => {
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
      setShowModal(true); // Show modal after scanning
      setTimeout(() => {
        setShowModal(false); // Hide modal after 3 seconds
      }, 3000);
    };

    const config = {
      fps: 10,
      qrbox: { width: 300, height: 300 },
      aspectRatio: 1.777778,
    };

    html5QrCode
      .start({ facingMode: "environment" }, config, qrCodeSuccessCallback)
      .then(() => {
        setIsScannerRunning(true);
      })
      .catch((error) => {
        console.error("Error starting QR code scan:", error);
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
      <form className="form" onSubmit={startScanner}>
        <button type="submit" className="todo_button">
          Scan QR code
        </button>
      </form>
      <button type="button" onClick={stopScanner} className="todo_button">
        Cancel
      </button>
      {/* Modal to display after scanning */}
      {showModal && (
        <Modal>
          <div>Book scanned successfully!</div>
        </Modal>
      )}
    </div>
  );
};

export default QRCodeScanner;
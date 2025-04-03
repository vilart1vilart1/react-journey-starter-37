
import { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, CameraOff, X, AlertCircle } from 'lucide-react';
import useEvent from '../hooks/useEvent';

interface QrScannerProps {
  onScan: (data: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

const QrScanner = ({ onScan, onClose, isOpen }: QrScannerProps) => {
  const [qrScanner, setQrScanner] = useState<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<{ id: string; label: string }[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize QR scanner when component mounts
    const scanner = new Html5Qrcode('qr-reader');
    setQrScanner(scanner);

    // Clean up on unmount
    return () => {
      if (scanner && isScanning) {
        scanner.stop()
          .catch((stopErr: Error) => {
            console.error('Error stopping scanner:', stopErr);
          });
      }
    };
  }, []);

  useEffect(() => {
    // Load available cameras when scanner is initialized
    if (qrScanner && isOpen) {
      loadCameras();
    }
  }, [qrScanner, isOpen]);

  const loadCameras = async () => {
    if (!qrScanner) return;

    try {
      const devices = await Html5Qrcode.getCameras();
      if (devices && devices.length > 0) {
        setAvailableCameras(devices);
        // Select the environment facing camera by default if available
        const backCamera = devices.find(camera => camera.label.toLowerCase().includes('back'));
        setSelectedCamera(backCamera?.id || devices[0].id);
      } else {
        setError('No cameras found on this device');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error accessing camera';
      setError(`Failed to access camera: ${errorMessage}`);
      console.error('Error getting cameras:', err);
    }
  };

  const startScanner = async () => {
    if (!qrScanner || !selectedCamera) return;

    try {
      setIsScanning(true);
      setError(null);

      await qrScanner.start(
        selectedCamera,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // QR code not found, continue scanning
          console.log('QR code scanning in progress...');
        }
      );
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error starting scanner';
      setError(`Failed to start scanner: ${errorMessage}`);
      setIsScanning(false);
      console.error('Error starting scanner:', err);
    }
  };

  const stopScanner = async () => {
    if (!qrScanner || !isScanning) return;

    try {
      await qrScanner.stop();
      setIsScanning(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error stopping scanner';
      console.error('Error stopping scanner:', errorMessage);
    }
  };

  const handleCameraChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isScanning) {
      stopScanner().then(() => {
        setSelectedCamera(e.target.value);
      });
    } else {
      setSelectedCamera(e.target.value);
    }
  };

  useEffect(() => {
    // When the modal is closed, stop the scanner
    if (!isOpen && isScanning) {
      stopScanner();
    }
  }, [isOpen]);

  // Use the useEvent hook to handle escape key press
  useEvent('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      if (isScanning) {
        stopScanner().then(() => onClose());
      } else {
        onClose();
      }
    }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full">
        <button
          onClick={() => {
            if (isScanning) {
              stopScanner().then(() => onClose());
            } else {
              onClose();
            }
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-xl font-bold mb-4">Scanner QR Code</h2>

        <div
          id="qr-reader"
          ref={scannerRef}
          className="w-full h-64 bg-gray-900 rounded-lg overflow-hidden mb-4"
        ></div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Sélectionner une caméra
          </label>
          <select
            className="input w-full"
            value={selectedCamera || ''}
            onChange={handleCameraChange}
            disabled={isScanning}
          >
            <option value="">Choisir une caméra</option>
            {availableCameras.map((camera) => (
              <option key={camera.id} value={camera.id}>
                {camera.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={isScanning ? stopScanner : startScanner}
            className={`btn flex items-center gap-2 ${
              isScanning
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={!selectedCamera}
          >
            {isScanning ? (
              <>
                <CameraOff className="h-5 w-5" />
                Arrêter
              </>
            ) : (
              <>
                <Camera className="h-5 w-5" />
                Démarrer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrScanner;

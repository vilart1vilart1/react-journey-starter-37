import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { fetchApi } from '../services/api';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sessionId = searchParams.get('session_id');

    if (sessionId) {
      verifyPaymentStatus(sessionId);
    } else {
      setErrorMessage('Session ID not found.');
    }
  }, [location.search]);

  const verifyPaymentStatus = async (sessionId: string) => {
    try {
      const response = await fetchApi<{ paymentStatus: string }>(`/stripe/payment-status?session_id=${sessionId}`);

      if (response.data && response.data.paymentStatus === 'complete') {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('failure');
        setErrorMessage('Payment was not successful.');
      }
    } catch (error: any) {
      setPaymentStatus('failure');
      setErrorMessage(error.message || 'Failed to verify payment status.');
    }
  };

  const handleGoBack = () => {
    navigate('/reservations');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      {paymentStatus === 'success' && (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Payment Successful!</h2>
          <p className="text-lg mb-6">Thank you for your payment. Your transaction has been completed successfully.</p>
          <button onClick={handleGoBack} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Back to Reservations
          </button>
        </div>
      )}

      {paymentStatus === 'failure' && (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-red-500">Payment Failed</h2>
          <p className="text-lg mb-6">
            We're sorry, but your payment was not successful. Please try again or contact support.
          </p>
          {errorMessage && <p className="text-red-400 mb-4">Error: {errorMessage}</p>}
          <button onClick={handleGoBack} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Back to Reservations
          </button>
        </div>
      )}

      {!paymentStatus && !errorMessage && (
        <div className="text-center">
          <p className="text-lg">Verifying payment status...</p>
        </div>
      )}

      {errorMessage && paymentStatus !== 'failure' && (
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-4 text-yellow-500">Payment Status Unknown</h2>
          <p className="text-lg mb-6">
            We encountered an issue while verifying your payment. Please contact support if you have any questions.
          </p>
          <p className="text-red-400 mb-4">Error: {errorMessage}</p>
          <button onClick={handleGoBack} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Back to Reservations
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;

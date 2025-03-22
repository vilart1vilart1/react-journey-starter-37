import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Check, ArrowLeft } from 'lucide-react';
import { generateOrderPDF } from '../lib/pdfGenerator';
import { Card, CardContent } from '../components/ui/card';

interface ReservationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  places: number;
  eventName: string;
  totalPrice: number;
  orderId: string;
  paymentRef: string;
  date: string;
}

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [reservation, setReservation] = useState<ReservationData | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updatePaymentStatus = async (orderId: string, paymentRef: string) => {
    try {
      const response = await fetch('https://respizenmedical.com/vilartprod/api/reservations/update_payment.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_ref: paymentRef,
          payment_status: 'completed'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Payment status update error:', errorData);
      }
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  const autoDownloadPdf = (dataUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    try {
      const storedReservation = localStorage.getItem('reservation');
      if (storedReservation) {
        const parsedReservation = JSON.parse(storedReservation);
        setReservation(parsedReservation);

        updatePaymentStatus(parsedReservation.orderId, parsedReservation.paymentRef);

        generateOrderPDF(parsedReservation)
          .then(dataUrl => {
            setPdfUrl(dataUrl);
            autoDownloadPdf(dataUrl, `reservation-${parsedReservation.orderId}.pdf`);
          })
          .catch(err => {
            console.error('PDF generation error:', err);
            setError('Erreur lors de la génération du PDF');
          })
          .finally(() => setLoading(false));
      } else {
        setError('Aucune information de réservation trouvée');
        setLoading(false);
      }
    } catch (err) {
      console.error('Error loading reservation data:', err);
      setError('Erreur lors du chargement des données de réservation');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="text-gold-400 text-xl">Chargement...</div>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-4">Erreur</h1>
          <p className="text-white/80 mb-6">{error || 'Une erreur inattendue s\'est produite'}</p>
          <button
            onClick={() => navigate('/events')}
            className="bg-gold-500 text-black px-6 py-3 rounded-md hover:bg-gold-600 transition-colors w-full"
          >
            Retour aux événements
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-black text-white py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto max-w-4xl">
        <button onClick={() => navigate('/events')} className="flex items-center mb-8 hover:text-gold-400 transition-colors">
          <ArrowLeft className="mr-2" /> Retour aux événements
        </button>

        <div className="bg-black/30 border border-gold-500/20 rounded-lg p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-gold-500 w-20 h-20 transform rotate-45 translate-x-10 -translate-y-10"></div>
          
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gold-500/20 p-4 rounded-full border border-gold-500">
              <Check className="h-12 w-12 text-gold-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gold-400 mb-2">Paiement Réussi</h1>
          <p className="text-center text-white/70 mb-8">
            Votre réservation pour {reservation.eventName} a été confirmée
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/50 border-gold-500/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gold-400 mb-4">Détails de la réservation</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Événement:</span>
                    <span className="font-medium text-white">{reservation.eventName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Référence:</span>
                    <span className="font-medium text-white">{reservation.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Date de réservation:</span>
                    <span className="font-medium text-white">
                      {new Date(reservation.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/50 border-gold-500/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gold-400 mb-4">Récapitulatif</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Nom:</span>
                    <span className="font-medium text-white">{reservation.firstName} {reservation.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Nombre de places:</span>
                    <span className="font-medium text-white">{reservation.places}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Prix unitaire:</span>
                    <span className="font-medium text-white">{reservation.totalPrice / reservation.places} dt</span>
                  </div>
                  <div className="pt-2 mt-2 border-t border-gold-500/10 flex justify-between">
                    <span className="font-semibold text-white">Total payé:</span>
                    <span className="font-bold text-gold-400">{reservation.totalPrice} dt</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {pdfUrl && (
            <div className="mt-8 flex justify-center">
              <a
                href={pdfUrl}
                download={`reservation-${reservation.orderId}.pdf`}
                className="flex items-center justify-center gap-2 bg-gold-500 text-black px-6 py-3 rounded-md hover:bg-gold-600 transition-colors"
              >
                <Download className="h-5 w-5" />
                Télécharger la confirmation
              </a>
            </div>
          )}
        </div>
        
        <div className="bg-black/30 border border-gold-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gold-400 mb-3">Informations importantes</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-gold-500 mr-2 mt-1">•</span>
              <span className="text-white/80">
                Veuillez présenter votre confirmation de réservation à l'entrée de l'événement.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gold-500 mr-2 mt-1">•</span>
              <span className="text-white/80">
                Un email de confirmation a été envoyé à {reservation.email}.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-gold-500 mr-2 mt-1">•</span>
              <span className="text-white/80">
                Pour toute question, veuillez contacter notre service client au 51 056 606.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;

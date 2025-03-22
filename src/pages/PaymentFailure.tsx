import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-black text-white py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto max-w-2xl">
        <button onClick={() => navigate('/events')} className="flex items-center mb-8 hover:text-gold-400 transition-colors">
          <ArrowLeft className="mr-2" /> Retour aux événements
        </button>

        <div className="bg-black/30 border border-red-500/30 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-red-500/20 p-4 rounded-full border border-red-500/50">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-red-400 mb-2">Paiement Échoué</h1>
          <p className="text-center text-white/70 mb-8">
            Nous n'avons pas pu traiter votre paiement
          </p>
          
          <div className="bg-black/50 border border-red-500/20 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Problèmes possibles</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span className="text-white/80">Informations de carte incorrectes ou expirées</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span className="text-white/80">Fonds insuffisants sur votre compte</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span className="text-white/80">Problème de connexion avec la banque</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span className="text-white/80">Transaction refusée par la banque</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate('/events')}
              className="flex-1 px-6 py-3 bg-black/50 border border-gold-500/20 text-white rounded-md hover:bg-black/70 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Retour aux événements
            </button>
            
            <button
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 bg-gold-500 text-black rounded-md hover:bg-gold-600 transition-colors flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Réessayer
            </button>
          </div>
        </div>
        
        <div className="bg-black/30 border border-gold-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gold-400 mb-3">Besoin d'aide?</h3>
          <p className="text-white/80 mb-4">
            Si vous continuez à rencontrer des problèmes avec votre paiement, n'hésitez pas à nous contacter:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:51056606"
              className="flex-1 px-6 py-3 bg-black/50 border border-gold-500/20 text-white rounded-md hover:bg-black/70 transition-colors text-center"
            >
              Appeler: 51 056 606
            </a>
            <a
              href="mailto:contact@vilart.tn"
              className="flex-1 px-6 py-3 bg-black/50 border border-gold-500/20 text-white rounded-md hover:bg-black/70 transition-colors text-center"
            >
              Email: contact@vilart.tn
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentFailure;


import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import AboutModal from './AboutModal';
import EngagementsModal from './EngagementsModal';
import ContactModal from './ContactModal';
import FAQModal from './FAQModal';
import CGVModal from './CGVModal';
import MentionsLegalesModal from './MentionsLegalesModal';
import RefundPolicyModal from './RefundPolicyModal';
import PrivacyPolicyModal from './PrivacyPolicyModal';

const Footer = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showEngagementsModal, setShowEngagementsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [showCGVModal, setShowCGVModal] = useState(false);
  const [showMentionsModal, setShowMentionsModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <>
      <footer className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-baloo">
        {/* Payment Icons Section */}
        <div className="py-6">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="flex items-center space-x-3">
              {/* American Express */}
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center w-12 h-8">
                <span className="text-blue-600 font-bold text-xs">AMEX</span>
              </div>
              {/* Apple Pay */}
              <div className="bg-black rounded px-2 py-1 flex items-center justify-center w-12 h-8">
                <span className="text-white font-bold text-xs">Pay</span>
              </div>
              {/* CB/Carte Bleue */}
              <div className="bg-blue-600 rounded px-2 py-1 flex items-center justify-center w-12 h-8">
                <span className="text-white font-bold text-xs">CB</span>
              </div>
              {/* Mastercard */}
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center w-12 h-8">
                <div className="flex">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1"></div>
                </div>
              </div>
              {/* Visa */}
              <div className="bg-white rounded px-2 py-1 flex items-center justify-center w-12 h-8">
                <span className="text-blue-600 font-bold text-xs">VISA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="py-4 border-t border-blue-300/30">
          <div className="container mx-auto px-4">
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <span>© 2025, Mylittlehero</span>
              </div>
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setShowPrivacyModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Politique de confidentialité
                </button>
                <button 
                  onClick={() => setShowRefundModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Politique de remboursement
                </button>
                <button 
                  onClick={() => setShowCGVModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Conditions d'utilisation
                </button>
                <button 
                  onClick={() => setShowEngagementsModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Politique d'expédition
                </button>
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Coordonnées
                </button>
                <button 
                  onClick={() => setShowMentionsModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Conditions générales de vente
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden text-center text-sm space-y-3">
              <div>© 2025, Mylittlehero</div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <button 
                  onClick={() => setShowPrivacyModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Politique de confidentialité
                </button>
                <button 
                  onClick={() => setShowRefundModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Politique de remboursement
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <button 
                  onClick={() => setShowCGVModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Conditions d'utilisation
                </button>
                <button 
                  onClick={() => setShowEngagementsModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Politique d'expédition
                </button>
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <button 
                  onClick={() => setShowContactModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Coordonnées
                </button>
                <button 
                  onClick={() => setShowMentionsModal(true)}
                  className="hover:text-blue-200 transition-colors"
                >
                  Conditions générales de vente
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <EngagementsModal isOpen={showEngagementsModal} onClose={() => setShowEngagementsModal(false)} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
      <FAQModal isOpen={showFAQModal} onClose={() => setShowFAQModal(false)} />
      <CGVModal isOpen={showCGVModal} onClose={() => setShowCGVModal(false)} />
      <MentionsLegalesModal isOpen={showMentionsModal} onClose={() => setShowMentionsModal(false)} />
      <RefundPolicyModal isOpen={showRefundModal} onClose={() => setShowRefundModal(false)} />
      <PrivacyPolicyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </>
  );
};

export default Footer;

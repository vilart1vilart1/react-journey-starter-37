import { Shield, Mail, Phone, MapPin, Clock, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/ui/Logo';
import AboutModal from './AboutModal';
import EngagementsModal from './EngagementsModal';
import ContactModal from './ContactModal';
import FAQModal from './FAQModal';

const Footer = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showEngagementsModal, setShowEngagementsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);

  return (
    <>
      <footer className="bg-gradient-to-b from-slate-800 to-slate-900 text-white">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-8">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Restez informé de nos nouveautés ! ✨
            </h3>
            <p className="text-orange-100 mb-4">
              Recevez nos dernières histoires et offres spéciales
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4">
                <Logo size="2xl" clickable={true} />
                <p className="text-slate-300 text-sm leading-relaxed">
                  Créons ensemble des histoires magiques où votre enfant devient le héros de ses propres aventures.
                </p>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-slate-300 ml-2">4.9/5 sur 2,847 avis</span>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-3 text-orange-400" />
                    <span className="text-sm text-slate-300">contact@mylittlehero.fr</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-3 text-orange-400" />
                    <span className="text-sm text-slate-300">01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-3 text-orange-400" />
                    <span className="text-sm text-slate-300">Paris, France</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-3 text-orange-400" />
                    <span className="text-sm text-slate-300">Lun-Ven 9h-18h</span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-orange-400">Informations</h3>
                <div className="space-y-2 text-sm">
                  <button 
                    onClick={() => setShowAboutModal(true)}
                    className="block text-slate-300 hover:text-orange-300 transition-colors text-left"
                  >
                    À propos
                  </button>
                  <button 
                    onClick={() => setShowEngagementsModal(true)}
                    className="block text-slate-300 hover:text-orange-300 transition-colors text-left"
                  >
                    Nos engagements
                  </button>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="block text-slate-300 hover:text-orange-300 transition-colors text-left"
                  >
                    Contact
                  </button>
                  <button 
                    onClick={() => setShowFAQModal(true)}
                    className="block text-slate-300 hover:text-orange-300 transition-colors text-left"
                  >
                    FAQ
                  </button>
                  <Link to="/cgv" className="block text-slate-300 hover:text-orange-300 transition-colors">
                    Conditions générales de vente
                  </Link>
                </div>
              </div>

              {/* Legal & Trust */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-orange-400">Sécurité</h3>
                <div className="space-y-2 text-sm mb-4">
                  <a href="#" className="block text-slate-300 hover:text-orange-300 transition-colors">Mentions légales</a>
                  <a href="#" className="block text-slate-300 hover:text-orange-300 transition-colors">Politique de confidentialité</a>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-xs text-slate-300">Paiement 100% sécurisé</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-xs text-slate-300">Données protégées RGPD</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-xs text-slate-300">Livraison suivie</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 py-6">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-sm text-slate-400">
                © 2024 My Little Hero. Tous droits réservés. Créé avec ❤️ pour des moments magiques en famille.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
      <EngagementsModal isOpen={showEngagementsModal} onClose={() => setShowEngagementsModal(false)} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
      <FAQModal isOpen={showFAQModal} onClose={() => setShowFAQModal(false)} />
    </>
  );
};

export default Footer;

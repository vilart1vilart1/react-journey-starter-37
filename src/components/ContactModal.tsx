
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl w-[95vw] max-w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30 border-none shadow-2xl">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Logo size="lg" />
            <DialogTitle className="text-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              Contactez-nous
            </DialogTitle>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
          </div>
        </DialogHeader>
        
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed">
              Notre équipe est là pour vous aider ! N'hésitez pas à nous contacter pour toute question 
              ou demande d'assistance. Nous sommes ravis d'échanger avec vous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Email</h3>
              </div>
              <p className="text-lg font-semibold text-slate-700 mb-2">contact@mylittlehero.fr</p>
              <p className="text-slate-600">Réponse garantie sous 24h</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Téléphone</h3>
              </div>
              <p className="text-lg font-semibold text-slate-700 mb-2">01 23 45 67 89</p>
              <p className="text-slate-600">Lundi-Vendredi 9h-18h</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Adresse</h3>
              </div>
              <p className="text-lg font-semibold text-slate-700 mb-2">Paris, France</p>
              <p className="text-slate-600">Siège social</p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Chat en ligne</h3>
              </div>
              <p className="text-lg font-semibold text-slate-700 mb-2">Disponible 7j/7</p>
              <p className="text-slate-600">Support instantané</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 rounded-2xl text-white">
              <div className="flex items-center mb-4">
                <Clock className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Temps de réponse</h3>
              </div>
              <p className="leading-relaxed">
                Nous nous engageons à répondre à tous vos messages dans les plus brefs délais, 
                généralement sous 24 heures pour vous offrir le meilleur service.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-2xl text-white">
              <div className="flex items-center mb-4">
                <Send className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Une question ?</h3>
              </div>
              <p className="leading-relaxed">
                N'hésitez pas à nous écrire ! Que ce soit pour une commande, une personnalisation 
                ou simplement dire bonjour, nous adorons échanger avec nos familles.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;

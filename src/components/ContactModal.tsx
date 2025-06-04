
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Logo size="lg" />
            <DialogTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Contactez-nous
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-slate-700 leading-relaxed">
              Notre équipe est là pour vous aider ! N'hésitez pas à nous contacter pour toute question ou demande d'assistance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Mail className="w-6 h-6 text-orange-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Email</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">contact@mylittlehero.fr</p>
              <p className="text-xs text-slate-500">Réponse sous 24h</p>
            </div>

            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Phone className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Téléphone</h3>
              </div>
              <p className="text-sm text-slate-600 mb-2">01 23 45 67 89</p>
              <p className="text-xs text-slate-500">Lun-Ven 9h-18h</p>
            </div>

            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <MapPin className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Adresse</h3>
              </div>
              <p className="text-sm text-slate-600">Paris, France</p>
            </div>

            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <MessageCircle className="w-6 h-6 text-purple-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Chat en ligne</h3>
              </div>
              <p className="text-sm text-slate-600">Disponible 7j/7</p>
            </div>
          </div>

          <div className="text-center bg-white/60 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-slate-800 mb-2">Temps de réponse</h3>
            <p className="text-sm text-slate-600">
              Nous nous engageons à répondre à tous vos messages dans les plus brefs délais, généralement sous 24 heures.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;

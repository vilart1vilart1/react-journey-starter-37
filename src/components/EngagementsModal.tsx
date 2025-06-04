
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Shield, Truck, Users } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface EngagementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EngagementsModal = ({ isOpen, onClose }: EngagementsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Logo size="lg" />
            <DialogTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Nos Engagements
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Qualité Premium</h3>
              </div>
              <p className="text-sm text-slate-600">
                Nous utilisons uniquement des matériaux de haute qualité pour créer des livres durables qui résisteront au temps.
              </p>
            </div>

            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Shield className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Sécurité des Données</h3>
              </div>
              <p className="text-sm text-slate-600">
                Vos données personnelles sont protégées selon les normes RGPD les plus strictes.
              </p>
            </div>

            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Truck className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Livraison Rapide</h3>
              </div>
              <p className="text-sm text-slate-600">
                Expédition sous 48h et livraison suivie pour que votre livre arrive rapidement et en sécurité.
              </p>
            </div>

            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Users className="w-6 h-6 text-purple-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Support Client</h3>
              </div>
              <p className="text-sm text-slate-600">
                Notre équipe est disponible pour vous accompagner à chaque étape de votre commande.
              </p>
            </div>
          </div>

          <div className="text-center bg-white/60 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-slate-800 mb-2">Satisfaction Garantie</h3>
            <p className="text-sm text-slate-600">
              Si vous n'êtes pas entièrement satisfait de votre livre, nous nous engageons à trouver une solution qui vous convient.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EngagementsModal;


import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Shield, Truck, Users, CheckCircle, Award } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface EngagementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EngagementsModal = ({ isOpen, onClose }: EngagementsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl w-[95vw] max-w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30 border-none shadow-2xl">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Logo size="lg" />
            <DialogTitle className="text-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              Nos Engagements
            </DialogTitle>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
          </div>
        </DialogHeader>
        
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed">
              Nous nous engageons à offrir une expérience exceptionnelle à chaque famille, 
              avec des standards de qualité et de service qui dépassent vos attentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Qualité Premium</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Nous utilisons uniquement des matériaux de haute qualité pour créer des livres durables 
                qui résisteront au temps et accompagneront votre enfant dans ses aventures.
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Sécurité des Données</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Vos données personnelles sont protégées selon les normes RGPD les plus strictes. 
                La confidentialité de votre famille est notre priorité absolue.
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Livraison Rapide</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Expédition sous 48h et livraison suivie pour que votre livre arrive rapidement et en sécurité. 
                Nous savons que l'attente peut être difficile pour les petits !
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-400 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Support Client</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Notre équipe est disponible pour vous accompagner à chaque étape de votre commande. 
                Nous sommes là pour rendre votre expérience parfaite.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 rounded-2xl text-white">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Satisfaction Garantie</h3>
              </div>
              <p className="leading-relaxed">
                Si vous n'êtes pas entièrement satisfait de votre livre, nous nous engageons 
                à trouver une solution qui vous convient. Votre bonheur est notre réussite.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-6 rounded-2xl text-white">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Excellence Reconnue</h3>
              </div>
              <p className="leading-relaxed">
                Notre engagement envers la qualité est reconnu par des milliers de familles satisfaites 
                qui nous font confiance pour créer des moments magiques.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EngagementsModal;

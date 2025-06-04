
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Star, Users, BookOpen } from 'lucide-react';
import Logo from '@/components/ui/Logo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Logo size="lg" showText={false} />
            <DialogTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              À propos de My Little Hero
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-slate-700 leading-relaxed">
              Nous créons des histoires magiques où votre enfant devient le héros de ses propres aventures. 
              Chaque livre est personnalisé avec le nom, l'apparence et les préférences de votre enfant 
              pour une expérience de lecture unique et inoubliable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Notre Mission</h3>
              </div>
              <p className="text-sm text-slate-600">
                Encourager l'amour de la lecture en rendant chaque enfant le héros de sa propre histoire.
              </p>
            </div>

            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Nos Livres</h3>
              </div>
              <p className="text-sm text-slate-600">
                Des histoires captivantes, illustrations magnifiques et personnalisation complète.
              </p>
            </div>

            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Users className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Notre Équipe</h3>
              </div>
              <p className="text-sm text-slate-600">
                Auteurs, illustrateurs et développeurs passionnés par l'enfance.
              </p>
            </div>

            <div className="bg-white/60 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-3">
                <Star className="w-6 h-6 text-yellow-500 mr-2" />
                <h3 className="font-semibold text-slate-800">Satisfaction</h3>
              </div>
              <p className="text-sm text-slate-600">
                Plus de 10,000 familles heureuses et des milliers d'histoires créées.
              </p>
            </div>
          </div>

          <div className="text-center bg-white/60 p-4 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-slate-800 mb-2">Rejoignez l'aventure !</h3>
            <p className="text-sm text-slate-600">
              Créez dès aujourd'hui une histoire unique pour votre enfant et regardez ses yeux s'illuminer 
              en découvrant qu'il est le héros de sa propre aventure.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;

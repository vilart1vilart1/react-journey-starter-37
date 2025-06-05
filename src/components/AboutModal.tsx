
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
      <DialogContent className="sm:max-w-4xl w-[95vw] max-w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-white via-orange-50/30 to-pink-50/30 border-none shadow-2xl">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Logo size="lg" />
            <DialogTitle className="text-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
              À propos de My Little Hero
            </DialogTitle>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
          </div>
        </DialogHeader>
        
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-slate-700 leading-relaxed">
              Nous créons des histoires magiques où votre enfant devient le héros de ses propres aventures. 
              Chaque livre est personnalisé avec le nom, l'apparence et les préférences de votre enfant 
              pour une expérience de lecture unique et inoubliable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Notre Mission</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Encourager l'amour de la lecture en rendant chaque enfant le héros de sa propre histoire, 
                créant des souvenirs magiques qui dureront toute une vie.
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Nos Livres</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Des histoires captivantes avec des illustrations magnifiques et une personnalisation complète 
                pour que chaque enfant vive une aventure unique.
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Notre Équipe</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Auteurs, illustrateurs et développeurs passionnés par l'enfance, unis pour créer 
                des expériences de lecture extraordinaires.
              </p>
            </div>

            <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-orange-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Satisfaction</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Plus de 10,000 familles heureuses et des milliers d'histoires créées avec amour 
                pour émerveiller petits et grands.
              </p>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-orange-500 to-pink-500 p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">Rejoignez l'aventure !</h3>
            <p className="text-lg leading-relaxed">
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

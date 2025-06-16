
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/Logo';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal = ({ isOpen, onClose }: FAQModalProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handlePersonalizeClick = () => {
    onClose();
    window.scrollTo(0, 0);
    navigate('/child-count');
  };

  const faqItems = [
    {
      question: "Comment personnaliser mon livre ?",
      answer: "Il vous suffit de suivre notre processus simple en 3 étapes : choisissez votre histoire, personnalisez les détails de votre enfant (nom, apparence, préférences), et validez votre commande. Notre équipe se charge du reste !"
    },
    {
      question: "Combien de temps pour recevoir mon livre ?",
      answer: "La production prend 7 à 10 jours ouvrés pour créer votre livre unique, puis 2-3 jours pour la livraison. Vous recevrez un suivi de commande par email à chaque étape."
    },
    {
      question: "Puis-je modifier ma commande après validation ?",
      answer: "Les modifications sont possibles dans les 24h suivant votre commande. Passé ce délai, votre livre entre en production. Contactez-nous rapidement via notre service client si vous souhaitez des changements."
    },
    {
      question: "Quels sont les frais de livraison ?",
      answer: "La livraison standard en France est à 4,90€. La livraison est gratuite pour toute commande supérieure à 35€. Nous proposons également une livraison express sous 24h."
    },
    {
      question: "Le livre convient-il à tous les âges ?",
      answer: "Nos livres sont adaptés aux enfants de 3 à 8 ans. Chaque histoire est conçue pour être accessible et captivante pour cette tranche d'âge, avec un niveau de lecture approprié."
    },
    {
      question: "Puis-je voir un aperçu avant l'impression ?",
      answer: "Oui ! Avant la production finale, nous vous envoyons un aperçu digital de votre livre personnalisé. Vous pouvez ainsi vérifier tous les détails et demander des ajustements si nécessaire."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-full sm:max-w-4xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-gradient-to-br from-cream-beige via-pastel-blue/20 to-powder-pink/20 border-none shadow-2xl font-baloo p-3 sm:p-4 md:p-6">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-2 sm:space-y-4 mb-4 sm:mb-6 pt-8 sm:pt-0">
            <Logo size="lg" />
            <DialogTitle className="text-center text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue via-powder-pink to-pastel-lavender font-baloo px-2">
              Questions Fréquentes
            </DialogTitle>
            <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-sweet-mint to-light-coral rounded-full"></div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-8">
          <div className="text-center max-w-3xl mx-auto px-1 sm:px-2">
            <p className="text-sm sm:text-base md:text-lg text-slate-700 leading-relaxed font-baloo">
              Retrouvez ici les réponses aux questions les plus fréquentes. 
              Si vous ne trouvez pas ce que vous cherchez, n'hésitez pas à nous contacter !
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-powder-pink/30 overflow-hidden hover:shadow-lg transition-all duration-300">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-3 sm:p-4 md:p-6 text-left flex items-center justify-between hover:bg-white/50 transition-colors"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-800 pr-3 sm:pr-4 font-baloo">{item.question}</h3>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-light-coral" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-light-coral" />
                    )}
                  </div>
                </button>
                {openItems.includes(index) && (
                  <div className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                    <div className="bg-gradient-to-r from-pastel-blue/20 to-powder-pink/20 p-2 sm:p-3 md:p-4 rounded-xl border-l-4 border-light-coral">
                      <p className="text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed font-baloo">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <div className="bg-gradient-to-r from-pastel-blue to-powder-pink p-3 sm:p-4 md:p-6 rounded-2xl text-white">
              <div className="flex items-center mb-3 sm:mb-4">
                <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mr-2 sm:mr-3 flex-shrink-0" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold font-baloo">Une autre question ?</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base leading-relaxed font-baloo">
                N'hésitez pas à nous contacter directement. Notre équipe sera ravie de vous aider 
                et de répondre à toutes vos interrogations.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pastel-lavender to-sweet-mint p-3 sm:p-4 md:p-6 rounded-2xl text-white">
              <div className="flex items-center mb-3 sm:mb-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 mr-2 sm:mr-3 flex-shrink-0" />
                <h3 className="text-base sm:text-lg md:text-xl font-bold font-baloo">Support rapide</h3>
              </div>
              <p className="text-xs sm:text-sm md:text-base leading-relaxed font-baloo">
                Notre équipe support est disponible pour vous accompagner dans votre commande 
                et répondre à vos questions en moins de 24h.
              </p>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-pastel-blue to-powder-pink p-3 sm:p-4 md:p-6 rounded-2xl mx-0 sm:mx-1">
            <Button
              onClick={handlePersonalizeClick}
              className="bg-gradient-to-r from-sweet-mint to-pastel-lavender hover:from-sweet-mint/80 hover:to-pastel-lavender/80 text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-baloo"
            >
              ✨ Personnaliser un livre pour mon enfant ✨
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FAQModal;

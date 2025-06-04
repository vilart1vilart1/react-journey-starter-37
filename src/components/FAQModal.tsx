
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Logo from '@/components/ui/Logo';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal = ({ isOpen, onClose }: FAQModalProps) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "Comment personnaliser mon livre ?",
      answer: "Il vous suffit de suivre notre processus simple en 3 étapes : choisissez votre histoire, personnalisez les détails de votre enfant, et validez votre commande."
    },
    {
      question: "Combien de temps pour recevoir mon livre ?",
      answer: "La production prend 7 à 10 jours ouvrés, puis 2-3 jours pour la livraison. Vous recevrez un suivi de commande par email."
    },
    {
      question: "Puis-je modifier ma commande après validation ?",
      answer: "Les modifications sont possibles dans les 24h suivant votre commande. Contactez-nous rapidement via notre service client."
    },
    {
      question: "Quels sont les frais de livraison ?",
      answer: "La livraison standard en France est à 4,90€. La livraison est gratuite pour toute commande supérieure à 35€."
    },
    {
      question: "Le livre convient-il à tous les âges ?",
      answer: "Nos livres sont adaptés aux enfants de 3 à 8 ans. Chaque histoire est conçue pour être accessible et captivante pour cette tranche d'âge."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <Logo size="lg" />
            <DialogTitle className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
              Questions Fréquentes
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="bg-white/60 rounded-lg border border-orange-200">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-white/80 transition-colors"
              >
                <h3 className="font-semibold text-slate-800">{item.question}</h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-orange-500" />
                )}
              </button>
              {openItems.includes(index) && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-slate-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center bg-white/60 p-4 rounded-lg border border-orange-200 mt-6">
          <h3 className="font-semibold text-slate-800 mb-2">Une autre question ?</h3>
          <p className="text-sm text-slate-600">
            N'hésitez pas à nous contacter directement. Notre équipe sera ravie de vous aider !
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FAQModal;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ChildCount = () => {
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const navigate = useNavigate();

  const childOptions = [
    { count: 1, emoji: '👧', title: '1 enfant', subtitle: 'Une histoire unique' },
    { count: 2, emoji: '👧👦', title: '2 enfants', subtitle: 'Une aventure partagée' },
    { count: 3, emoji: '👧👦👶', title: '3 enfants', subtitle: 'Une famille d\'explorateurs' }
  ];

  const handleCardClick = (count: number) => {
    setSelectedCount(count);
    
    // Scroll to navigation on mobile after selection
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        const navigationElement = document.getElementById('navigation-section');
        if (navigationElement) {
          navigationElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 200);
    }
  };

  const handleNext = () => {
    if (selectedCount) {
      navigate('/personalize', { state: { childCount: selectedCount } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-40 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-35 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-4">
            Combien d'enfants dans cette
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"> aventure magique</span> ?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Choisissez le nombre d'enfants qui vivront cette histoire extraordinaire
          </p>
        </div>

        {/* Child Count Options */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
          {childOptions.map((option) => (
            <div
              key={option.count}
              onClick={() => handleCardClick(option.count)}
              className={`
                relative bg-white rounded-3xl p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 h-64 flex flex-col justify-center
                ${selectedCount === option.count 
                  ? 'ring-4 ring-orange-300 shadow-2xl scale-105 -translate-y-2' 
                  : 'shadow-lg hover:shadow-xl'
                }
              `}
            >
              {/* Selection indicator */}
              {selectedCount === option.count && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">✓</span>
                </div>
              )}
              
              <div className="text-center">
                <div className="text-6xl mb-4">{option.emoji}</div>
                <h3 className="text-2xl font-bold text-slate-700 mb-2">{option.title}</h3>
                <p className="text-slate-500">{option.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div id="navigation-section" className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 rounded-full border-2 border-slate-300 hover:border-orange-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>

          <Button
            onClick={handleNext}
            disabled={!selectedCount}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300
              ${selectedCount 
                ? 'bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 shadow-lg hover:shadow-xl transform hover:scale-105' 
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            Suivant
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChildCount;

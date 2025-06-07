
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ChildCount = () => {
  const [selectedCount, setSelectedCount] = useState<number | null>(null);
  const navigate = useNavigate();

  const childOptions = [
    { count: 1, title: '1 héros', subtitle: '1 livre unique pour lui' },
    { count: 2, title: '2 héros', subtitle: '1 livre unique pour chacun' },
    { count: 3, title: '3 héros', subtitle: '1 livre unique pour chacun' },
    { count: 4, title: '4 héros', subtitle: '1 livre unique pour chacun' }
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 relative overflow-hidden pt-20 md:pt-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full opacity-35 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
          {/* Progress indicator with check circles */}
          <div className="flex justify-center mb-8 md:mb-12">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="w-6 md:w-8 h-1 bg-green-500"></div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div className="w-6 md:w-8 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-bold">3</span>
              </div>
              <div className="w-6 md:w-8 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-bold">4</span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-700 mb-4 leading-tight">
              Combien d'enfants dans cette
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"> aventure magique</span> ?
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Choisissez le nombre d'enfants qui vivront cette histoire extraordinaire
            </p>
          </div>

          {/* Child Count Options */}
          <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 mb-8 md:mb-12 px-4">
            {childOptions.map((option) => (
              <div
                key={option.count}
                onClick={() => handleCardClick(option.count)}
                className={`
                  relative bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl md:rounded-3xl p-4 md:p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] flex items-center shadow-lg
                  ${selectedCount === option.count 
                    ? 'ring-4 ring-purple-300 shadow-2xl scale-[1.02] bg-gradient-to-r from-purple-600 to-purple-700' 
                    : 'hover:shadow-2xl hover:from-purple-600 hover:to-purple-700'
                  }
                `}
              >
                {/* Selection indicator */}
                {selectedCount === option.count && (
                  <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-purple-300">
                    <Check className="text-purple-600 w-4 h-4 md:w-5 md:h-5 font-bold" />
                  </div>
                )}
                
                <div className="flex items-center w-full gap-4 md:gap-6">
                  {/* Customer image - 25% bigger */}
                  <div className="flex-shrink-0">
                    <img
                      src="/lovable-uploads/d664a5ce-ee5f-475d-9ed6-1bf90a5de7b0.png"
                      alt="Héros de l'histoire"
                      className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-cover rounded-xl md:rounded-2xl shadow-lg border-2 border-white/20"
                    />
                  </div>
                  
                  {/* Text content */}
                  <div className="text-white flex-1">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 leading-tight">{option.title}</h3>
                    <p className="text-purple-100 text-base md:text-lg lg:text-xl font-medium">{option.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div id="navigation-section" className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto gap-4 px-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-full border-2 border-slate-300 hover:border-orange-300 transition-colors text-base font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>

            <Button
              onClick={handleNext}
              disabled={!selectedCount}
              className={`
                w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 md:py-4 rounded-full text-white font-semibold transition-all duration-300 text-base
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
      
      <Footer />
    </div>
  );
};

export default ChildCount;


import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChildForm from '@/components/ChildForm';

interface Child {
  name: string;
  age: string;
  message: string;
  photo?: File;
  photoUrl?: string;
  objective?: string;
}

const Personalize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const childCount = location.state?.childCount || 1;
  
  const [children, setChildren] = useState<Child[]>(
    Array.from({ length: childCount }, () => ({
      name: '',
      age: '',
      message: '',
      objective: ''
    }))
  );

  const [currentChildIndex, setCurrentChildIndex] = useState(0);

  const updateChild = (field: keyof Child, value: string | File) => {
    setChildren(prev => prev.map((child, i) => 
      i === currentChildIndex ? { ...child, [field]: value } : child
    ));
  };

  const handlePhotoUpload = (file: File | null) => {
    if (file) {
      updateChild('photo', file);
    }
  };

  // Enhanced validation - all fields required
  const isCurrentChildValid = () => {
    const child = children[currentChildIndex];
    return child?.name && 
           child?.age && 
           child?.message && 
           child?.objective && 
           child?.photo;
  };

  const isFormValid = children.every(child => 
    child.name && child.age && child.message && child.objective && child.photo
  );

  const handleNext = () => {
    if (childCount === 1) {
      // Single child - go directly to checkout
      if (isFormValid) {
        navigate('/checkout', { state: { children } });
      }
    } else {
      // Multiple children - go to next child or checkout
      if (currentChildIndex < childCount - 1) {
        if (isCurrentChildValid()) {
          setCurrentChildIndex(prev => prev + 1);
        }
      } else {
        if (isFormValid) {
          navigate('/checkout', { state: { children } });
        }
      }
    }
  };

  const handlePrevious = () => {
    if (currentChildIndex > 0) {
      setCurrentChildIndex(prev => prev - 1);
    } else {
      navigate('/children');
    }
  };

  const getNextButtonText = () => {
    if (childCount === 1) return "Créer mon histoire";
    if (currentChildIndex < childCount - 1) return "Enfant suivant";
    return "Créer mon histoire";
  };

  const getPreviousButtonText = () => {
    if (currentChildIndex === 0) return "Retour";
    return "Enfant précédent";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden pt-20 md:pt-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-1/3 left-10 w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-12 h-12 bg-gradient-to-br from-blue-300 to-teal-300 rounded-full opacity-25 animate-bounce"></div>
          <div className="absolute top-2/3 left-1/4 w-8 h-8 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full opacity-20 animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              Créons ensemble une
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500"> histoire magique ✨</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
              {childCount === 1 
                ? "Partagez-nous tout sur votre petit héros pour créer une aventure sur mesure"
                : `Partagez-nous tout sur ${childCount > 1 ? 'vos petits héros' : 'votre petit héros'} pour créer une aventure sur mesure`
              }
            </p>
          </div>

          {/* Progress with Check Circles */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="w-6 md:w-8 h-1 bg-green-500"></div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 text-white" />
              </div>
              <div className="w-6 md:w-8 h-1 bg-orange-500"></div>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div className="w-6 md:w-8 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-bold">4</span>
              </div>
            </div>
          </div>

          {/* Child Form */}
          <div className="mb-6 md:mb-8">
            <ChildForm
              child={children[currentChildIndex]}
              childNumber={currentChildIndex + 1}
              totalChildren={childCount}
              onUpdate={updateChild}
              onPhotoUpload={handlePhotoUpload}
            />
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row justify-between items-center max-w-2xl mx-auto gap-4 px-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-full border-2 border-slate-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 text-base font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {getPreviousButtonText()}
            </Button>

            <Button
              onClick={handleNext}
              disabled={!isCurrentChildValid()}
              className={`
                w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 md:py-4 rounded-full text-white font-semibold transition-all duration-300 text-base
                ${isCurrentChildValid() 
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95' 
                  : 'bg-gray-300 cursor-not-allowed'
                }
              `}
            >
              {getNextButtonText()}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Multiple children indicator */}
          {childCount > 1 && (
            <div className="text-center mt-6 max-w-2xl mx-auto px-4">
              <div className="flex justify-center space-x-2">
                {Array.from({ length: childCount }, (_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentChildIndex 
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 scale-125' 
                        : index < currentChildIndex
                          ? 'bg-green-400'
                          : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500 mt-2">
                {currentChildIndex < childCount - 1 
                  ? `${childCount - currentChildIndex - 1} enfant${childCount - currentChildIndex - 1 > 1 ? 's' : ''} restant${childCount - currentChildIndex - 1 > 1 ? 's' : ''}`
                  : "Derniers détails !"
                }
              </p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Personalize;

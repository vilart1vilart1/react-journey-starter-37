
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, ArrowRight, Upload, Camera, Heart } from 'lucide-react';

interface Child {
  name: string;
  age: string;
  message: string;
  photo?: File;
}

const Personalize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const childCount = location.state?.childCount || 1;
  
  const [children, setChildren] = useState<Child[]>(
    Array.from({ length: childCount }, () => ({
      name: '',
      age: '',
      message: ''
    }))
  );

  const updateChild = (index: number, field: keyof Child, value: string | File) => {
    setChildren(prev => prev.map((child, i) => 
      i === index ? { ...child, [field]: value } : child
    ));
  };

  const handlePhotoUpload = (index: number, file: File | null) => {
    if (file) {
      updateChild(index, 'photo', file);
    }
  };

  const isFormValid = children.every(child => child.name && child.age);

  const handleNext = () => {
    if (isFormValid) {
      navigate('/checkout', { state: { children } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-12 h-12 bg-gradient-to-br from-blue-300 to-teal-300 rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute top-2/3 left-1/4 w-8 h-8 bg-gradient-to-br from-green-300 to-emerald-300 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
            Créons ensemble une
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500"> histoire magique ✨</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Partagez-nous tout sur vos petits héros pour créer une aventure sur mesure
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/20">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 h-3 rounded-full transition-all duration-700 shadow-sm" style={{ width: '75%' }}></div>
          </div>
          <p className="text-center text-slate-600 mt-3 font-medium">75% terminé</p>
        </div>

        {/* Children Forms */}
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 mb-8 md:mb-12">
          {children.map((child, index) => (
            <div 
              key={index} 
              className="group bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50 active:scale-[0.98] md:active:scale-100"
            >
              {/* Card Header */}
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800">
                    Enfant {index + 1}
                  </h3>
                  <p className="text-sm text-slate-500">Informations de base</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Name and Age Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="block text-slate-700 font-semibold text-sm md:text-base">
                      Prénom <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      value={child.name}
                      onChange={(e) => updateChild(index, 'name', e.target.value)}
                      placeholder="Ex: Emma, Lucas..."
                      className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-slate-200 focus:border-orange-400 focus:ring-orange-200 transition-all duration-200 text-base bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-slate-700 font-semibold text-sm md:text-base">
                      Âge <span className="text-orange-500">*</span>
                    </label>
                    <Input
                      type="number"
                      value={child.age}
                      onChange={(e) => updateChild(index, 'age', e.target.value)}
                      placeholder="6"
                      min="1"
                      max="18"
                      className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-slate-200 focus:border-orange-400 focus:ring-orange-200 transition-all duration-200 text-base bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <label className="block text-slate-700 font-semibold text-sm md:text-base">
                    Photo (optionnel)
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 md:p-8 text-center hover:border-orange-400 hover:bg-orange-50/50 transition-all duration-300 cursor-pointer group/upload active:scale-95">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(index, e.target.files?.[0] || null)}
                      className="hidden"
                      id={`photo-${index}`}
                    />
                    <label htmlFor={`photo-${index}`} className="cursor-pointer block">
                      {child.photo ? (
                        <div className="space-y-3">
                          <Camera className="w-8 h-8 md:w-10 md:h-10 mx-auto text-green-500" />
                          <p className="text-green-600 font-semibold text-sm md:text-base">Photo téléchargée ✓</p>
                          <p className="text-xs text-slate-500">Cliquez pour changer</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Upload className="w-8 h-8 md:w-10 md:h-10 mx-auto text-slate-400 group-hover/upload:text-orange-500 transition-colors" />
                          <div>
                            <p className="text-slate-700 font-medium text-sm md:text-base">Ajoutez une photo</p>
                            <p className="text-xs md:text-sm text-slate-500 mt-1">Pour personnaliser encore plus l'histoire</p>
                          </div>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="flex items-center text-slate-700 font-semibold text-sm md:text-base">
                    Message personnalisé 
                    <Heart className="w-4 h-4 ml-2 text-pink-500" />
                  </label>
                  <Textarea
                    value={child.message}
                    onChange={(e) => updateChild(index, 'message', e.target.value)}
                    placeholder="Un petit message d'amour pour rendre l'histoire encore plus spéciale... ❤️"
                    className="w-full px-4 py-3 md:py-4 rounded-xl border-2 border-slate-200 focus:border-orange-400 focus:ring-orange-200 transition-all duration-200 resize-none text-base bg-white/80 backdrop-blur-sm min-h-[100px]"
                    rows={3}
                  />
                  <p className="text-xs text-slate-500 ml-1">Ce message apparaîtra dans l'histoire personnalisée</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto gap-4">
          <Button
            onClick={() => navigate('/children')}
            variant="outline"
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 md:py-4 rounded-full border-2 border-slate-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 text-base font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isFormValid}
            className={`
              w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 md:py-4 rounded-full text-white font-semibold transition-all duration-300 text-base
              ${isFormValid 
                ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95' 
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            Créer mon histoire
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Personalize;

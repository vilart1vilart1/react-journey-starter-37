import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomScrollbar } from '@/components/ui/custom-scrollbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import LoadingScreen from '@/components/LoadingScreen';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { Button } from '@/components/ui/button';
const Index = () => {
  const navigate = useNavigate();

  // Track visitor for homepage
  useVisitorTracking('Homepage');
  const [showLoading, setShowLoading] = useState(false);
  const handlePersonalizeClick = useCallback(() => {
    setShowLoading(true);
  }, []);
  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false);
    window.scrollTo(0, 0);
    navigate('/child-count');
  }, [navigate]);
  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }
  return <>      
      <CustomScrollbar className="min-h-screen">
        <div className="min-h-screen relative font-baloo">
          
          <Header />
          
          {/* Hero Section */}
          <div className="relative z-20 pt-28 md:pt-40">
            <div className="container mx-auto px-8 py-0">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Left side - Text and Button */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                    Créez votre livre personnalisé pour enfants
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                    Concevez un livre unique pour enfants avec l'IA, adapté spécifiquement à chaque enfant. Donnez vie à une histoire personnalisée et à des illustrations époustouflantes.
                  </p>
                  <Button onClick={handlePersonalizeClick} className="bg-orange-500 hover:bg-orange-600 text-white px-8 text-lg rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 py-[4px] my-[-15px]">JE PERSONALISE MON HISTOIRE </Button>
                </div>

                {/* Right side - Book Grid (Desktop) */}
                <div className="hidden lg:block flex-1 relative">
                  <div className="max-w-lg ml-auto relative z-10">
                    {/* Books arranged in structured grid with staggered heights */}
                    <div className="grid grid-cols-3 gap-4 h-96 relative my-0 py-0 pt-8">
                      {/* Left column - starts lower */}
                      <div className="flex flex-col gap-4 pt-12 py-0 my-[104px]">
                        {/* Book 1 - Top left (lower start) */}
                        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                          <img alt="Thomas and the Magical Judo Adventure" className="w-full h-36 object-cover rounded-lg shadow-lg" src="/lovable-uploads/e4c91fce-bc18-4e42-a454-1f9b8fece80e.png" />
                        </div>
                        {/* Book 3 - Bottom left */}
                        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                          <img alt="The Magical Unicorn of Friendship" className="w-full h-36 object-cover rounded-lg shadow-lg" src="/lovable-uploads/0fc670a6-d247-4ff6-a08f-892d9c684d76.png" />
                        </div>
                      </div>
                      
                      {/* Center column - starts highest */}
                      <div className="flex flex-col gap-4 pt-0 my-[86px]">
                        {/* Book 2 - Top center (highest start) */}
                        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                          <img alt="Alice Among the Enchanted Dreams" className="w-full h-40 object-cover rounded-lg shadow-lg" src="/lovable-uploads/cc3ab2c5-c5af-410e-9519-7abddb26f463.png" />
                        </div>
                        {/* Book 4 - Bottom center */}
                        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                          <img alt="James Space Flight" className="w-full h-36 object-cover rounded-lg shadow-lg" src="/lovable-uploads/29c0557a-22be-4375-af08-8f745adf0e60.png" />
                        </div>
                      </div>
                      
                      {/* Right column - starts middle height */}
                      <div className="flex flex-col gap-1 pt-1 my-[3px] py-[28px]">
                        {/* Book 5 - Top right (middle start) */}
                        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                          <img alt="Cardboard the Brave Dinos Adventure" className="w-full h-36 object-cover rounded-lg shadow-lg" src="/lovable-uploads/6bb1affc-16ed-4c1c-8385-7588a54d5023.png" />
                        </div>
                        {/* Book 6 - Bottom right */}
                        <div className="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
                          <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=180&h=240&fit=crop" alt="The Adventures of Lisa and the Unicorn" className="w-full h-36 object-cover rounded-lg shadow-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Books that appear behind/cropped by the Steps Section */}
                  <div className="absolute -bottom-6 left-0 right-0 z-0">
                    <div className="max-w-lg ml-auto">
                      <div className="grid grid-cols-3 gap-4">
                        {/* Cropped book 4 */}
                        <div className="transform hover:scale-105 transition-all duration-300">
                          <img src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=180&h=240&fit=crop" alt="Book cropped behind" className="w-full h-20 object-cover object-top rounded-lg shadow-lg opacity-90" />
                        </div>
                        {/* Cropped book 5 */}
                        <div className="transform hover:scale-105 transition-all duration-300">
                          <img src="https://images.unsplash.com/photo-1500673922987-e212871fec22?w=180&h=240&fit=crop" alt="Book cropped behind" className="w-full h-24 object-cover object-top rounded-lg shadow-lg opacity-90" />
                        </div>
                        {/* Cropped book 6 */}
                        <div className="transform hover:scale-105 transition-all duration-300">
                          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=180&h=240&fit=crop" alt="Book cropped behind" className="w-full h-16 object-cover object-top rounded-lg shadow-lg opacity-90" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile book grid - below button */}
                <div className="lg:hidden w-full">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="transform rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&h=280&fit=crop" alt="Book cover" className="w-full h-32 object-cover rounded-lg shadow-lg" />
                    </div>
                    <div className="transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=200&h=280&fit=crop" alt="Book cover" className="w-full h-32 object-cover rounded-lg shadow-lg" />
                    </div>
                    <div className="transform rotate-2 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=200&h=280&fit=crop" alt="Book cover" className="w-full h-32 object-cover rounded-lg shadow-lg" />
                    </div>
                    <div className="transform -rotate-2 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=200&h=280&fit=crop" alt="Book cover" className="w-full h-32 object-cover rounded-lg shadow-lg" />
                    </div>
                    <div className="transform rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=200&h=280&fit=crop" alt="Book cover" className="w-full h-32 object-cover rounded-lg shadow-lg" />
                    </div>
                    <div className="transform -rotate-1 hover:rotate-0 transition-all duration-300 hover:shadow-2xl">
                      <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=200&h=280&fit=crop" alt="Book cover" className="w-full h-32 object-cover rounded-lg shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div className="bg-white py-12 relative z-[999] rounded-2xl shadow-lg mx-4 md:mx-8 -mt-[-6%]">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto">
                {/* Step 1 - Image on right */}
                <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-3">
                      <div className="bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-base mr-3">
                        1
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 md:text-2xl">VOUS REMPLISSEZ UN PETIT FORMULAIRE</h3>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Remplissez les noms et détails des personnages et téléchargez leurs photos 
                      afin que les <strong>illustrations basées sur vos photos</strong> soient générées.
                    </p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      <img alt="Personnage principal" src="/lovable-uploads/13d2bd7c-0fd7-48b9-89ec-5a1de54016a9.png" className="w-60 h-60 object-cover" />
                    </div>
                  </div>
                </div>

                {/* Step 2 - Image on left */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-8 mb-12">
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-3">
                      <div className="bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-base mr-3">
                        2
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">VOUS CHOISSEZ LE THEME DE HISTOIRE</h3>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Avec notre <strong>IA générative</strong>, vous créez une <strong>histoire personnalisée</strong>. 
                      Choisissez la trame narrative et les options de style qui correspondent le mieux aux 
                      <strong>intérêts de l'enfant</strong>.
                    </p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      <img alt="Histoire personnalisée" src="/lovable-uploads/3ec02707-40fc-4a2a-a282-cd23fd929c56.png" className="w-60 h-60 object-cover" />
                    </div>
                  </div>
                </div>

                {/* Step 3 - Image on right */}
                <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start mb-3">
                      <div className="bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-base mr-3">
                        3
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">ON VOUS CREE UNE HISTOIRE SUR MESURRE</h3>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Recevez le <strong>livre électronique pour 7,99€</strong> immédiatement. 
                      Voulez-vous aussi une copie physique ? Alors choisissez un 
                      <strong>livre relié pour 34,99€</strong> par la suite.
                    </p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="relative">
                      <img alt="Livre en différents formats" src="/lovable-uploads/e0e26efc-2cdf-4f67-ac48-d968d3485b52.png" className="w-60 h-60 object-cover" />
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button onClick={handlePersonalizeClick} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-base rounded-full shadow-lg transform transition-all duration-200 hover:scale-105">
                    Je personnalise mon histoire
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - outside the background container */}
          <Footer />

          {/* WhatsApp Button */}
          <WhatsAppButton />
        </div>
      </CustomScrollbar>
    </>;
};
export default Index;

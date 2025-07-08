import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomScrollbar } from '@/components/ui/custom-scrollbar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import LoadingScreen from '@/components/LoadingScreen';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { useEnhancedScrollAnimation } from '@/hooks/useEnhancedScrollAnimation';
import { Button } from '@/components/ui/button';
const Index = () => {
  const navigate = useNavigate();

  // Track visitor for homepage
  useVisitorTracking('Homepage');
  const [showLoading, setShowLoading] = useState(false);

  // Animation hooks for desktop books
  const desktopBook1Animation = useEnhancedScrollAnimation({
    delay: 100,
    staggerDelay: 0
  });
  const desktopBook2Animation = useEnhancedScrollAnimation({
    delay: 200,
    staggerDelay: 0
  });
  const desktopBook3Animation = useEnhancedScrollAnimation({
    delay: 300,
    staggerDelay: 0
  });
  const desktopBook4Animation = useEnhancedScrollAnimation({
    delay: 400,
    staggerDelay: 0
  });
  const desktopBook5Animation = useEnhancedScrollAnimation({
    delay: 500,
    staggerDelay: 0
  });
  const desktopBook6Animation = useEnhancedScrollAnimation({
    delay: 600,
    staggerDelay: 0
  });

  // Animation hooks for mobile books
  const book1Animation = useEnhancedScrollAnimation({
    delay: 0,
    staggerDelay: 0
  });
  const book2Animation = useEnhancedScrollAnimation({
    delay: 50,
    staggerDelay: 0
  });
  const book3Animation = useEnhancedScrollAnimation({
    delay: 100,
    staggerDelay: 0
  });
  const book4Animation = useEnhancedScrollAnimation({
    delay: 150,
    staggerDelay: 0
  });
  const book5Animation = useEnhancedScrollAnimation({
    delay: 200,
    staggerDelay: 0
  });
  const book6Animation = useEnhancedScrollAnimation({
    delay: 250,
    staggerDelay: 0
  });

  // Animation hooks for steps
  const step1Animation = useEnhancedScrollAnimation({
    delay: 0,
    staggerDelay: 0
  });
  const step2Animation = useEnhancedScrollAnimation({
    delay: 200,
    staggerDelay: 0
  });
  const step3Animation = useEnhancedScrollAnimation({
    delay: 400,
    staggerDelay: 0
  });
  const handlePersonalizeClick = useCallback(() => {
    setShowLoading(true);
  }, []);
  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false);
    window.scrollTo(0, 0);
    navigate('/child-count');
  }, [navigate]);

  // Auto-scroll for Notre Impact cards with position tracking
  const [desktopCurrentSlide, setDesktopCurrentSlide] = useState(0);
  const [mobileCurrentSlide, setMobileCurrentSlide] = useState(0);
  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  // Desktop auto-scroll with position tracking
  useEffect(() => {
    const container = desktopScrollRef.current;
    if (!container) return;
    const interval = setInterval(() => {
      const cardWidth = 650 + 32; // card width + gap
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        setDesktopCurrentSlide(0);
      } else {
        container.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        });
        const newSlide = Math.round((container.scrollLeft + cardWidth) / cardWidth);
        setDesktopCurrentSlide(Math.min(newSlide, 2));
      }
    }, 4000);
    const handleScroll = () => {
      const cardWidth = 650 + 32;
      const currentSlide = Math.round(container.scrollLeft / cardWidth);
      setDesktopCurrentSlide(Math.min(currentSlide, 2));
    };
    container.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mobile auto-scroll with position tracking
  useEffect(() => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const interval = setInterval(() => {
      const cardWidth = container.clientWidth * 0.75 + 16; // 75vw + gap
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        setMobileCurrentSlide(0);
      } else {
        container.scrollBy({
          left: cardWidth,
          behavior: 'smooth'
        });
        const newSlide = Math.round((container.scrollLeft + cardWidth) / cardWidth);
        setMobileCurrentSlide(Math.min(newSlide, 2));
      }
    }, 3500);
    const handleScroll = () => {
      const cardWidth = container.clientWidth * 0.75 + 16;
      const currentSlide = Math.round(container.scrollLeft / cardWidth);
      setMobileCurrentSlide(Math.min(currentSlide, 2));
    };
    container.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);
  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }
  return <>      
      <CustomScrollbar className="min-h-screen" style={{
      background: 'linear-gradient(135deg, #E8D5FF 0%, #F3E8FF 25%, #E0E7FF 50%, #F0F4FF 75%, #F8FAFF 100%)'
    }}>
        <div className="min-h-screen relative font-baloo">
          
          <Header />
          
          {/* Hero Section */}
          <div className="relative z-20 pt-28 md:pt-40">
            <div className="container mx-auto px-8 py-0 my-0">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Left side - Text and Button */}
                <div className="flex-1 text-center lg:text-left relative">
                  {/* Character image behind text content - controllable position - DESKTOP ONLY */}
                  <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
                  top: '-19%',
                  left: '-60%',
                  width: '800px',
                  height: '550px',
                  zIndex: 1
                }}>
                    <img src="/lovable-uploads/5e4ea06c-f640-41a9-9cce-ca518ea460c0.png" alt="Superman character behind text" className="w-full h-full object-contain opacity-15" />
                  </div>
                  
                  {/* Character image behind text content - controllable position - MOBILE ONLY */}
                  <div className="lg:hidden absolute inset-0 pointer-events-none" style={{
                  top: '-10%',
                  left: '-33%',
                  width: '400px',
                  height: '500px',
                  zIndex: 1
                }}>
                    <img src="/lovable-uploads/5e4ea06c-f640-41a9-9cce-ca518ea460c0.png" alt="Superman character behind text" className="w-full h-full object-contain opacity-[10%]" />
                  </div>
                  {/* Text content with higher z-index */}
                  <div className="relative z-10 mt-[-7%]">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                      Créez votre livre personnalisé pour enfants
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">Concevez un livre unique pour vos enfants , adapté spécifiquement à chaque enfant. Donnez vie à une histoire personnalisée et à des illustrations époustouflantes.</p>
                    <Button onClick={handlePersonalizeClick} className="w-full h-12 bg-gradient-to-r from-[#a6428d] to-purple-400 hover:from-[#924077] hover:to-purple-300 text-white font-medium text-base rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 sm:w-auto sm:px-8">
                      JE PERSONALISE MON HISTOIRE
                    </Button>
                  </div>
                </div>

                {/* Right side - Book Grid (Desktop) */}
                <div className="hidden lg:block flex-1 relative">
                  <div className="max-w-lg ml-8 relative z-10">
                    {/* Character image behind books - controllable position - DESKTOP ONLY */}
                    <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
                    top: '-35%',
                    left: '33%',
                    width: '800px',
                    height: '650px',
                    zIndex: 1
                  }}>
                      <img src="/lovable-uploads/8029170b-89d6-404a-9375-bac7a7c4b672.png" alt="Character behind books" className="w-full h-full object-contain opacity-25" />
                    </div>
                    {/* Books arranged in structured grid with staggered heights - bigger and perfect shadows */}
                    <div className="grid grid-cols-3 gap-[1] h-96 relative my-0 pt-8 z-10 mr-[-19%] py-[8px]">
                      {/* Left column - starts lower */}
                      <div className="flex flex-col gap-4 pt-12 py-0 my-[150px] ml-[4%]">
                        {/* Book 1 - Top left (lower start) */}
                        <div ref={desktopBook1Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${desktopBook1Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(251, 146, 60, 0.4))'
                        }}>
                            <img alt="Thomas and the Magical Judo Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/e4c91fce-bc18-4e42-a454-1f9b8fece80e.png" />
                          </div>
                        </div>
                        {/* Book 3 - Bottom left */}
                        <div ref={desktopBook3Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${desktopBook3Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(168, 85, 247, 0.4))'
                        }}>
                            <img alt="The Magical Unicorn of Friendship" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/0fc670a6-d247-4ff6-a08f-892d9c684d76.png" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Center column - starts highest */}
                      <div className="flex flex-col gap-4 pt-0 my-[115px] ml-[2%]">
                        {/* Book 2 - Top center (highest start) */}
                        <div ref={desktopBook2Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${desktopBook2Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(59, 130, 246, 0.4))'
                        }}>
                            <img alt="Alice Among the Enchanted Dreams" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/cc3ab2c5-c5af-410e-9519-7abddb26f463.png" />
                          </div>
                        </div>
                        {/* Book 4 - Bottom center */}
                        <div ref={desktopBook4Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${desktopBook4Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(99, 102, 241, 0.4))'
                        }}>
                            <img alt="James Space Flight" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/a5abdc1b-e768-45b3-80c7-25773e9d3dbf.jpg" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Right column - starts middle height */}
                      <div className="flex flex-col gap-4 pt-6 my-0">
                        {/* New Book - Top right (new addition) */}
                        <div ref={desktopBook5Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${desktopBook5Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(34, 197, 94, 0.4))'
                        }}>
                            <img alt="The Magic Forest Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/4ff44ae5-bff4-4441-95e2-d361bb1356d0.jpg" />
                          </div>
                        </div>
                        {/* Book 5 - Top right (middle start) */}
                        <div ref={desktopBook6Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${desktopBook6Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(234, 179, 8, 0.4))'
                        }}>
                            <img alt="Cardboard the Brave Dinos Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/6bb1affc-16ed-4c1c-8385-7588a54d5023.png" />
                          </div>
                        </div>
                        {/* Book 6 - Bottom right */}
                        <div className="transform hover:scale-105 transition-all duration-500 hover:shadow-2xl">
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(236, 72, 153, 0.4))'
                        }}>
                            <img alt="The Adventures of Lisa and the Unicorn" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/5c259e3d-068e-46c6-a74a-a41cbadc4e3d.jpg" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile book grid - bigger books with staggered animations */}
                <div className="lg:hidden w-full relative">
                   {/* Character image behind books - controllable position - MOBILE ONLY */}
                   <div className="lg:hidden absolute inset-0 pointer-events-none" style={{
                  top: '-220%',
                  left: '-6%',
                  width: '800px',
                  height: '400px',
                  zIndex: 1
                }}>
                     <img src="/lovable-uploads/8029170b-89d6-404a-9375-bac7a7c4b672.png" alt="Character behind books mobile" className="w-full h-full object-contain opacity-10" />
                   </div>
                  
                  <div className="max-w-md mx-auto relative z-10">
                    {/* Books arranged in structured grid with staggered heights - bigger and positioned lower */}
                    <div className="grid grid-cols-3 gap-0 h-72 relative my-0 pt-12 mt-[-22%] py-[28px]">
                      {/* Left column - starts lower */}
                      <div className="flex flex-col gap-0.5 pt-8 py-0 my-[60px] mr-[-3%]">
                        {/* Book 1 - Top left (lower start) */}
                        <div ref={book1Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${book1Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} hover:shadow-primary/30`}>
                          <div className="relative w-full h-32 rounded-lg" style={{
                          filter: 'drop-shadow(0 15px 15px rgba(251, 146, 60, 0.5))'
                        }}>
                            <img alt="Thomas and the Magical Judo Adventure" src="/lovable-uploads/e4c91fce-bc18-4e42-a454-1f9b8fece80e.png" className="w-full h-full object-contain rounded-lg" />
                          </div>
                        </div>
                        {/* Book 3 - Bottom left */}
                        <div ref={book3Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${book3Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} hover:shadow-primary/30`}>
                          <div className="relative w-full h-32 rounded-lg" style={{
                          filter: 'drop-shadow(0 15px 15px rgba(168, 85, 247, 0.5))'
                        }}>
                            <img alt="The Magical Unicorn of Friendship" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/0fc670a6-d247-4ff6-a08f-892d9c684d76.png" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Center column - starts highest */}
                      <div className="flex flex-col gap-0.5 pt-0 my-[50px]">
                        {/* Book 2 - Top center (highest start) */}
                        <div ref={book2Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${book2Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} hover:shadow-primary/30`}>
                          <div className="relative w-full h-32 rounded-lg" style={{
                          filter: 'drop-shadow(0 15px 15px rgba(59, 130, 246, 0.5))'
                        }}>
                            <img alt="Alice Among the Enchanted Dreams" src="/lovable-uploads/cc3ab2c5-c5af-410e-9519-7abddb26f463.png" className="w-full h-full object-contain rounded-lg" />
                          </div>
                        </div>
                        {/* Book 4 - Bottom center */}
                        <div ref={book4Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${book4Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} hover:shadow-primary/30`}>
                          <div className="relative w-full h-32 rounded-lg" style={{
                          filter: 'drop-shadow(0 15px 15px rgba(99, 102, 241, 0.5))'
                        }}>
                            <img alt="James Space Flight" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/7241d973-1c02-432d-a3fa-788a2e091e5b.jpg" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Right column - starts middle height, adjusted positioning */}
                      <div className="flex flex-col gap-0.5 pt-2 my-0 ml-[-3%]">
                        {/* New Book - Top right (adjusted positioning) */}
                        <div ref={book5Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${book5Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} hover:shadow-primary/30`}>
                          <div className="relative w-full h-32 rounded-lg" style={{
                          filter: 'drop-shadow(0 15px 15px rgba(34, 197, 94, 0.5))'
                        }}>
                            <img alt="The Magic Forest Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/a5abdc1b-e768-45b3-80c7-25773e9d3dbf.jpg" />
                          </div>
                        </div>
                        {/* Book 5 - Top right (middle start) */}
                        <div ref={book6Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl ${book6Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} hover:shadow-primary/30`}>
                          <div className="relative w-full h-32 rounded-lg" style={{
                          filter: 'drop-shadow(0 15px 15px rgba(234, 179, 8, 0.5))'
                        }}>
                            <img alt="Cardboard the Brave Dinos Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/012abcc4-18fd-47b1-a511-bbe756542e9c.jpg" />
                          </div>
                        </div>
                        {/* Book 6 - Bottom right */}
                        <div className="transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30">
                          <div className="relative w-full h-32 rounded-lg" style={{
                          filter: 'drop-shadow(0 15px 15px rgba(236, 72, 153, 0.5))'
                        }}>
                            <img alt="The Adventures of Lisa and the Unicorn" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/d5574267-4370-41e1-ae3d-52f3db0cac80.png" />
                          </div>
                        </div>
                      </div>
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
                {/* Step 1 - Image first on mobile, text first on desktop */}
                <div ref={step1Animation.ref} className={`flex flex-col lg:flex-row items-center gap-8 mb-6 transition-all duration-700 ${step1Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                  {/* Image - shows first on mobile, first on desktop */}
                  <div className="flex-1 flex justify-center order-1 lg:order-1">
                    <div className="relative">
                      <img alt="Personnage principal" src="/lovable-uploads/13d2bd7c-0fd7-48b9-89ec-5a1de54016a9.png" className="w-72 h-72 object-cover mt-[-10%]" />
                    </div>
                  </div>
                  {/* Text - shows second on mobile, second on desktop */}
                  <div className="flex-1 text-left order-2 lg:order-2">
                    <div className="flex items-center justify-start mb-3">
                      <div className="bg-[#a6428d] text-white rounded-full w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center font-bold text-base mr-3 flex-shrink-0">
                        1
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 md:text-2xl">VOUS REMPLISSEZ UN PETIT FORMULAIRE</h3>
                    </div>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Remplissez les noms et détails des personnages et téléchargez leurs photos 
                      afin que les <strong>illustrations basées sur vos photos</strong> soient générées.
                    </p>
                  </div>
                </div>

                {/* Step 2 - Image first on mobile, image on right on desktop */}
                <div ref={step2Animation.ref} className={`flex flex-col lg:flex-row items-center gap-8 mb-6 transition-all duration-700 ${step2Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                  {/* Text - shows second on mobile, first on desktop */}
                  <div className="flex-1 text-left order-2 lg:order-1">
                    <div className="flex items-center justify-start mb-3">
                      <div className="bg-[#a6428d] text-white rounded-full w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center font-bold text-base mr-3 flex-shrink-0">
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
                  {/* Image - shows first on mobile, second on desktop */}
                  <div className="flex-1 flex justify-center order-1 lg:order-2">
                    <div className="relative">
                      <img alt="Histoire personnalisée" src="/lovable-uploads/3ec02707-40fc-4a2a-a282-cd23fd929c56.png" className="w-72 h-72 object-cover" />
                    </div>
                  </div>
                </div>

                {/* Step 3 - Image first on mobile, image on left on desktop */}
                <div ref={step3Animation.ref} className={`flex flex-col lg:flex-row items-center gap-8 mb-6 transition-all duration-700 ${step3Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                  {/* Image - shows first on mobile, first on desktop */}
                  <div className="flex-1 flex justify-center order-1 lg:order-1">
                    <div className="relative">
                      <img alt="Livre en différents formats" src="/lovable-uploads/e0e26efc-2cdf-4f67-ac48-d968d3485b52.png" className="w-72 h-72 object-cover" />
                    </div>
                  </div>
                  {/* Text - shows second on mobile, second on desktop */}
                  <div className="flex-1 text-left order-2 lg:order-2">
                    <div className="flex items-center justify-start mb-3">
                      <div className="bg-[#a6428d] text-white rounded-full w-8 h-8 min-w-[32px] min-h-[32px] flex items-center justify-center font-bold text-base mr-3 flex-shrink-0">
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
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <Button onClick={handlePersonalizeClick} className="w-full h-12 bg-gradient-to-r from-[#a6428d] to-purple-400 hover:from-[#924077] hover:to-purple-300 text-white font-medium text-base rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 sm:w-auto sm:px-6 sm:py-3">
                    Je personnalise mon histoire
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Notre Impact Section */}
          <div className="py-16 relative z-[998]">
            <div className="container mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
                Notre impact
              </h2>
              
              {/* Navigation Images - Mobile */}
              <div className="md:hidden flex justify-center gap-2 mb-12 ">
                <div className="w-16 h-20 cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden" style={{
                filter: 'drop-shadow(0 10px 20px rgba(166, 66, 141, 0.3))'
              }} onClick={() => {
                const container = mobileScrollRef.current;
                if (container) {
                  container.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                  });
                  setMobileCurrentSlide(0);
                }
              }}>
                  <img alt="Confiance" src="/lovable-uploads/f7bd3af1-e32c-49dc-b1af-ce24319713bc.jpg" className="w-full h-full object-contain rounded-2xl" />
                </div>
                <div className="w-16 h-20 cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden" style={{
                filter: 'drop-shadow(0 10px 20px rgba(166, 66, 141, 0.3))'
              }} onClick={() => {
                const container = mobileScrollRef.current;
                if (container) {
                  const cardWidth = container.clientWidth * 0.75 + 16;
                  container.scrollTo({
                    left: cardWidth,
                    behavior: 'smooth'
                  });
                  setMobileCurrentSlide(1);
                }
              }}>
                  <img alt="Valeurs" className="w-full h-full object-contain rounded-2xl" src="/lovable-uploads/ea752622-262c-41b2-92f6-b14e833725f7.jpg" />
                </div>
                <div className="w-16 h-20 cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-2xl overflow-hidden" style={{
                filter: 'drop-shadow(0 10px 20px rgba(166, 66, 141, 0.3))'
              }} onClick={() => {
                const container = mobileScrollRef.current;
                if (container) {
                  const cardWidth = container.clientWidth * 0.75 + 16;
                  container.scrollTo({
                    left: cardWidth * 2,
                    behavior: 'smooth'
                  });
                  setMobileCurrentSlide(2);
                }
              }}>
                  <img alt="Moments" className="w-full h-full object-contain rounded-2xl" src="/lovable-uploads/58ae63aa-7181-46b9-be9d-4c1a22832f24.jpg" />
                </div>
              </div>

              {/* Navigation Images - Desktop */}
              <div className="hidden md:flex justify-center gap-6 mb-12 py-0">
                <div className="w-24 h-28 cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-xl overflow-hidden" style={{
                filter: 'drop-shadow(0 10px 20px rgba(166, 66, 141, 0.3))'
              }} onClick={() => {
                const element = document.querySelector('.impact-card-1');
                element?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
              }}>
                  <img alt="Confiance" src="/lovable-uploads/f7bd3af1-e32c-49dc-b1af-ce24319713bc.jpg" className="w-full h-full object-contain rounded-xl" />
                </div>
                <div className="w-24 h-28 cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-xl overflow-hidden" style={{
                filter: 'drop-shadow(0 10px 20px rgba(166, 66, 141, 0.3))'
              }} onClick={() => {
                const element = document.querySelector('.impact-card-2');
                element?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
              }}>
                  <img alt="Valeurs" className="w-full h-full object-contain rounded-xl" src="/lovable-uploads/ea752622-262c-41b2-92f6-b14e833725f7.jpg" />
                </div>
                <div className="w-24 h-28 cursor-pointer transform hover:scale-105 transition-all duration-300 rounded-xl overflow-hidden" style={{
                filter: 'drop-shadow(0 10px 20px rgba(166, 66, 141, 0.3))'
              }} onClick={() => {
                const element = document.querySelector('.impact-card-3');
                element?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
                });
              }}>
                  <img alt="Moments" className="w-full h-full object-contain rounded-xl" src="/lovable-uploads/58ae63aa-7181-46b9-be9d-4c1a22832f24.jpg" />
                </div>
              </div>
              
              {/* Desktop Cards */}
              <div className="hidden md:block">
                <div ref={desktopScrollRef} className="flex gap-8 overflow-x-auto scrollbar-hide pr-0">
                   {/* Card 1 */}
                   <div className="min-w-[650px] bg-white rounded-2xl shadow-lg overflow-hidden flex h-[380px] impact-card-1">
                    <div className="flex-1 p-8 flex flex-col">
                      <h3 className="text-xl font-bold text-black mb-6">RENFORCE LA CONFIANCE</h3>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <span className="text-black text-sm mt-1">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">VALORISE L'ENFANT : IL VOIT SON PRÉNOM ET SON VISAGE DANS L'HISTOIRE, CE QUI LE REND UNIQUE.</p>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-black text-sm mt-1">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              EN DEVENANT LE HÉROS, L'ENFANT SE SENT CAPABLE, COURAGEUX ET IMPORTANT DANS SA VIE
                            </p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-12 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-base rounded-lg transition-all duration-200">
                            Je personnalise mon histoire
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 h-full">
                      <img alt="Enfant avec livre personnalisé" className="w-full h-full object-cover rounded-r-2xl" src="/lovable-uploads/1f33b4f4-9a48-47bc-8573-4a973ccf40c3.jpg" />
                    </div>
                  </div>

                   {/* Card 2 */}
                   <div className="min-w-[650px] bg-white rounded-2xl shadow-lg overflow-hidden flex h-[380px] impact-card-2">
                    <div className="flex-1 p-8 flex flex-col">
                      <h3 className="text-xl font-bold text-black mb-6">DES VALEURS ESSENTIELLES</h3>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <span className="text-black text-sm mt-1">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              NOS HISTOIRES SONT VALIDÉES PAR UN PÉDOPSYCHIATRE ET ADAPTÉES À SON ÂGE SPÉCIFIQUE
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-black text-sm mt-1">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              CHAQUE LIVRE CONTIENT UNE MORALE CLAIRE POUR L'AIDER À GRANDIR AVEC CONFIANCE ET SAGESSE
                            </p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-12 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-base rounded-lg transition-all duration-200">
                            Je personnalise mon histoire
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 h-full">
                      <img alt="Enfant avec livre personnalisé" className="w-full h-full object-cover rounded-r-2xl" src="/lovable-uploads/4ddb4322-1d5e-459a-baaf-b62ef46ed5c3.png" />
                    </div>
                  </div>

                   {/* Card 3 */}
                   <div className="min-w-[650px] bg-white rounded-2xl shadow-lg overflow-hidden flex h-[380px] impact-card-3">
                    <div className="flex-1 p-8 flex flex-col">
                      <h3 className="text-xl font-bold text-black mb-6">DES MOMENTS MAGIQUES</h3>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <span className="text-black text-sm mt-1">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">IL APPREND DES VALEURS ET DES LEÇONS FONDAMENTALES POUR SON DÉVELOPPEMENT PERSONNEL </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-black text-sm mt-1">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              CHAQUE HISTOIRE AIDE À DÉCOUVRIR SA VRAIE FORCE INTÉRIEURE ET À CROIRE EN LUI PROFONDÉMENT
                            </p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-12 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-base rounded-lg transition-all duration-200">
                            Je personnalise mon histoire
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 h-full">
                      <img alt="Enfant avec livre personnalisé" className="w-full h-full object-cover rounded-r-2xl" src="/lovable-uploads/10e3ae37-2627-4727-8d69-c743d482e2a3.jpg" />
                    </div>
                  </div>
                </div>
                
                {/* Desktop Carousel Dots */}
                <div className="flex justify-center mt-6 gap-2">
                  {[0, 1, 2].map(index => <div key={index} className={`w-2 h-2 rounded-full transition-colors duration-300 ${desktopCurrentSlide === index ? 'bg-[#cd17c0]' : 'bg-gray-300'}`} />)}
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden">
                <div ref={mobileScrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide px-0 mt-[-8%]">
                   {/* Card 1 Mobile */}
                   <div className="min-w-[75vw] max-w-[75vw] bg-white rounded-2xl shadow-lg overflow-hidden h-[520px] impact-card-1">
                    <div className="w-full h-72">
                      <img alt="Enfant avec livre personnalisé" className="w-full h-full object-cover rounded-t-2xl" src="/lovable-uploads/012e6f8a-7a54-42e5-aa3a-7d9dc2cdfd1d.jpg" />
                    </div>
                    <div className="h-[248px] p-6 flex flex-col">
                      <h3 className="font-bold text-black mb-4 text-center text-base">RENFORCE LA CONFIANCE</h3>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="text-black text-xs mt-0.5">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              VALORISE L'ENFANT : IL VOIT SON PRÉNOM ET SON VISAGE DANS L'HISTOIRE
                            </p>
                          </div> 
                          <div className="flex items-start gap-3">
                            <span className="text-black text-xs mt-0.5">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              EN DEVENANT LE HÉROS, L'ENFANT SE SENT CAPABLE ET IMPORTANT
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-10 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-xs rounded-lg transition-all duration-200">
                            Je personnalise mon histoire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                   {/* Card 2 Mobile */}
                   <div className="min-w-[75vw] max-w-[75vw] bg-white rounded-2xl shadow-lg overflow-hidden h-[520px] impact-card-2">
                    <div className="w-full h-72">
                      <img src="/lovable-uploads/4ddb4322-1d5e-459a-baaf-b62ef46ed5c3.png" alt="Enfant avec livre personnalisé" className="w-full h-full object-cover rounded-t-2xl" />
                    </div>
                    <div className="h-[248px] p-6 flex flex-col">
                      <h3 className="text-black mb-4 text-center font-bold text-base">DES VALEURS ESSENTIELLES</h3>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="text-black text-xs mt-0.5">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              NOS HISTOIRES SONT VALIDÉES PAR UN PÉDOPSYCHIATRE SPÉCIALISÉ
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-black text-xs mt-0.5">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              CHAQUE LIVRE CONTIENT UNE MORALE CLAIRE POUR GRANDIR AVEC SAGESSE
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-10 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-xs rounded-lg transition-all duration-200">
                            Je personnalise mon histoire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                   {/* Card 3 Mobile */}
                   <div className="min-w-[75vw] max-w-[75vw] bg-white rounded-2xl shadow-lg overflow-hidden h-[520px] impact-card-3">
                    <div className="w-full h-72">
                      <img alt="Enfant avec livre personnalisé" className="w-full h-full object-cover rounded-t-2xl" src="/lovable-uploads/74848b37-bf8a-455b-a6a4-101218c8755d.jpg" />
                    </div>
                    <div className="h-[248px] p-6 flex flex-col">
                      <h3 className="font-bold text-black mb-4 text-center text-base">DES MOMENTS MAGIQUES</h3>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="text-black text-xs mt-0.5">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              IL APPREND DES VALEURS FONDAMENTALES POUR SON DÉVELOPPEMENT COMPLET
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-black text-xs mt-0.5">✓</span>
                            <p className="text-gray-800 font-medium text-xs leading-relaxed">
                              AIDE À DÉCOUVRIR SA VRAIE FORCE INTÉRIEURE ET À CROIRE PROFONDÉMENT
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-10 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-xs rounded-lg transition-all duration-200">
                            Je personnalise mon histoire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Mobile Carousel Dots */}
                <div className="flex justify-center mt-6 gap-2">
                  {[0, 1, 2].map(index => <div key={index} className={`w-2 h-2 rounded-full transition-colors duration-300 ${mobileCurrentSlide === index ? 'bg-[#a6428d]' : 'bg-gray-300'}`} />)}
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
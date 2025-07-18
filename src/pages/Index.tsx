
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
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, X, Hand } from 'lucide-react';
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

  // Carousel state
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  
  // Book images for carousel
  const bookImages = [
    { src: "/lovable-uploads/e4c91fce-bc18-4e42-a454-1f9b8fece80e.png", alt: "Thomas and the Magical Judo Adventure" },
    { src: "/lovable-uploads/cc3ab2c5-c5af-410e-9519-7abddb26f463.png", alt: "Alice Among the Enchanted Dreams" },
    { src: "/lovable-uploads/a31deb8f-2367-4b2f-9f45-dc71395ca637.png", alt: "The Magical Unicorn of Friendship" },
    { src: "/lovable-uploads/ac211a5b-23aa-4b92-b8f2-12693406447c.png", alt: "James Space Flight" },
    { src: "/lovable-uploads/2aa94214-a9cb-4f40-b86d-34f78fbdc3d5.png", alt: "The Magic Forest Adventure" },
    { src: "/lovable-uploads/dc8b5a6e-b2fb-4dd7-96e5-cf214ec005b4.png", alt: "Cardboard the Brave Dinos Adventure" }
  ];

  // Carousel handlers
  const openCarousel = (index: number) => {
    setCurrentCarouselIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  const nextImage = () => {
    setCurrentCarouselIndex((prev) => (prev + 1) % bookImages.length);
  };

  const prevImage = () => {
    setCurrentCarouselIndex((prev) => (prev - 1 + bookImages.length) % bookImages.length);
  };
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
          <div className="relative z-20 pt-8 md:pt-12">
            <div className="container mx-auto px-8 py-0 my-0 mt-4 md:mt-0">
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
                  <div className="lg:hidden fixed pointer-events-none" style={{
                  top: '-34%',
                  left: '-28%',
                  width: '1000px',
                  height: '1500px',
                  zIndex: -10
                }}>
                    <img src="/lovable-uploads/5e4ea06c-f640-41a9-9cce-ca518ea460c0.png" alt="Superman character behind text" className="w-full h-full object-contain opacity-[07%]" />
                  </div>
                  {/* Text content with higher z-index */}
                  <div className="relative z-10 mt-[-7%] lg:mt-[-7%] md:mt-8">
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
                        <div ref={desktopBook1Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer ${desktopBook1Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`} onClick={() => openCarousel(0)}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(251, 146, 60, 0.4))'
                        }}>
                            <img alt="Thomas and the Magical Judo Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/e4c91fce-bc18-4e42-a454-1f9b8fece80e.png" />
                          </div>
                        </div>
                        {/* Book 3 - Bottom left */}
                        <div ref={desktopBook3Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer ${desktopBook3Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`} onClick={() => openCarousel(2)}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(168, 85, 247, 0.4))'
                        }}>
                            <img alt="The Magical Unicorn of Friendship" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/a31deb8f-2367-4b2f-9f45-dc71395ca637.png" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Center column - starts highest */}
                      <div className="flex flex-col gap-4 pt-0 my-[115px] ml-[2%]">
                        {/* Book 2 - Top center (highest start) */}
                        <div ref={desktopBook2Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer ${desktopBook2Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`} onClick={() => openCarousel(1)}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(59, 130, 246, 0.4))'
                        }}>
                            <img alt="Alice Among the Enchanted Dreams" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/cc3ab2c5-c5af-410e-9519-7abddb26f463.png" />
                          </div>
                        </div>
                        {/* Book 4 - Bottom center */}
                        <div ref={desktopBook4Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer ${desktopBook4Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`} onClick={() => openCarousel(3)}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(99, 102, 241, 0.4))'
                        }}>
                            <img alt="James Space Flight" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/ac211a5b-23aa-4b92-b8f2-12693406447c.png" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Right column - starts middle height */}
                      <div className="flex flex-col gap-4 pt-6 my-0">
                        {/* New Book - Top right (new addition) */}
                        <div ref={desktopBook5Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer ${desktopBook5Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`} onClick={() => openCarousel(4)}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(34, 197, 94, 0.4))'
                        }}>
                            <img alt="The Magic Forest Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/2aa94214-a9cb-4f40-b86d-34f78fbdc3d5.png" />
                          </div>
                        </div>
                        {/* Book 5 - Top right (middle start) */}
                        <div ref={desktopBook6Animation.ref} className={`transform hover:scale-105 transition-all duration-500 hover:shadow-2xl cursor-pointer ${desktopBook6Animation.isVisible ? 'animate-fade-in' : 'opacity-0'}`} onClick={() => openCarousel(5)}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(234, 179, 8, 0.4))'
                        }}>
                            <img alt="Cardboard the Brave Dinos Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/dc8b5a6e-b2fb-4dd7-96e5-cf214ec005b4.png" />
                          </div>
                        </div>
                        {/* Book 6 - Bottom right */}
                        <div className="transform hover:scale-105 transition-all duration-500 cursor-pointer" onClick={() => openCarousel(5)}>
                          <div className="relative w-full h-[175px] rounded-lg" style={{
                          filter: 'drop-shadow(0 25px 25px rgba(236, 72, 153, 0.4))'
                        }}>
                            <img alt="The Adventures of Lisa and the Unicorn" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/d5574267-4370-41e1-ae3d-52f3db0cac80.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile book grid - bigger books with staggered animations */}
                <div className="lg:hidden w-full relative">
                   {/* Character image behind books - controllable position - MOBILE ONLY */}
                   <div className="lg:hidden fixed pointer-events-none" style={{
                  top: '-45%',
                  left: '32%',
                  width: '1000px',
                  height: '1500px',
                  zIndex: -10
                }}>
                     <img src="/lovable-uploads/8029170b-89d6-404a-9375-bac7a7c4b672.png" alt="Character behind books mobile" className="w-full h-full object-contain opacity-[07%]" />
                   </div>
                   
                   {/* Background image inside white circle - MOBILE ONLY */}
<div
  className="lg:hidden absolute pointer-events-none"
  style={{
    top: '22%',
    left: '14%',
    width: '240px',
    height: '200px', // Make it square for circle
    zIndex: 20,
    borderRadius: '10px', // Fully rounded = circle
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden' // Ensure image doesn't overflow
  }}
>
  <img
    src="/lovable-uploads/kid.png"
    alt="Background behind left and middle books"
    className="w-full h-[250px] object-contain"
  />
</div>

                   
                   {/* Animated Hand Icon - MOBILE ONLY */}
                   <div className="lg:hidden absolute pointer-events-none" style={{
                     top: '2%',
                     right: '23.5%',
                     transform: 'translateX(50%)',
                     zIndex: 20
                   }}>
                     <div className="bg-[#a6428d]/30 text-white/100 p-2 rounded-full shadow-lg ">
                       <Hand size={25} className="animate-pulse" />
                     </div>
                   </div>
                  
                  <div className="max-w-md mx-auto relative z-10">
                    {/* Books arranged with absolute positioning for free movement */}
                    <div className="relative h-72 w-full pt-12 mt-[-20%] py-[28px]">
                      
                       {/* Book 1 - Top left (freely positionable) */}
                       <div 
                         ref={book1Animation.ref} 
                         className={`absolute transform hover:scale-105 transition-all duration-500 ${book1Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} cursor-pointer`} 
                         onClick={() => openCarousel(0)}
                         style={{
                           width: '83px',  // Fixed width - won't change
                           height: '128px', // Fixed height - won't change
                           top: '39%',     // Vertical position - adjust as needed
                           left: '1%',    // Horizontal position - shifted another 1% left
                           zIndex: 10
                         }}
                       >
                        <div className="relative w-full h-full rounded-lg" style={{
                          filter: 'drop-shadow(0 8px 12px rgba(251, 146, 60, 0.3))'
                        }}>
                          <img alt="Thomas and the Magical Judo Adventure" src="/lovable-uploads/e4c91fce-bc18-4e42-a454-1f9b8fece80e.png" className="w-full h-full object-contain rounded-lg" />
                        </div>
                      </div>

                       {/* Book 2 - Top center (freely positionable) */}
                       <div 
                         ref={book2Animation.ref} 
                         className={`absolute transform hover:scale-105 transition-all duration-500 ${book2Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} cursor-pointer`} 
                         onClick={() => openCarousel(1)}
                         style={{
                           width: '83px',   // Fixed width - won't change
                           height: '128px', // Fixed height - won't change
                           top: '8.3%',     // Vertical position - adjust as needed
                           left: '37%',   // Horizontal position - shifted another 1% left
                           zIndex: 10
                         }}
                       >
                        <div className="relative w-full h-full rounded-lg" style={{
                          filter: 'drop-shadow(0 8px 12px rgba(59, 130, 246, 0.3))'
                        }}>
                          <img alt="Alice Among the Enchanted Dreams" src="/lovable-uploads/cc3ab2c5-c5af-410e-9519-7abddb26f463.png" className="w-full h-full object-contain rounded-lg" />
                        </div>
                      </div>

                       {/* Book 3 - Bottom left (freely positionable) */}
                       <div 
                         ref={book3Animation.ref} 
                         className={`absolute transform hover:scale-105 transition-all duration-500 ${book3Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} cursor-pointer`} 
                         onClick={() => openCarousel(2)}
                         style={{
                           width: '81px',   // Fixed width - won't change
                           height: '128px', // Fixed height - won't change
                           top: '70%',    // Vertical position - adjust as needed
                           left: '1%',    // Horizontal position - shifted another 1% left
                           zIndex: 21,
                         }}
                       >
                        <div className="relative w-full h-full rounded-lg" style={{
                          filter: 'drop-shadow(0 8px 12px rgba(168, 85, 247, 0.3))'
                        }}>
                          <img alt="The Magical Unicorn of Friendship" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/a31deb8f-2367-4b2f-9f45-dc71395ca637.png" />
                        </div>
                      </div>

                       {/* Book 4 - Bottom center (freely positionable) */}
                       <div 
                         ref={book4Animation.ref} 
                         className={`absolute transform hover:scale-105 transition-all duration-500 ${book4Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} cursor-pointer`} 
                         onClick={() => openCarousel(3)}
                         style={{
                           width: '83px',   // Fixed width - won't change
                           height: '100px', // Fixed height - won't change
                           top: '13.5%',    // Vertical position - adjust as needed
                           left: '9.9%',   // Horizontal position - shifted another 1% left
                           zIndex: 10
                         }}
                       >
                        <div className="relative w-full h-full rounded-lg" style={{
                          filter: 'drop-shadow(0 8px 12px rgba(99, 102, 241, 0.3))'
                        }}>
                          <img alt="James Space Flight" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/ac211a5b-23aa-4b92-b8f2-12693406447c.png" />
                        </div>
                      </div>

                       {/* Book 5 - Top right (freely positionable) */}
                       <div 
                         ref={book5Animation.ref} 
                         className={`absolute transform hover:scale-105 transition-all duration-500 ${book5Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} cursor-pointer`} 
                         onClick={() => openCarousel(4)}
                         style={{
                           width: '83px',   // Fixed width - won't change
                           height: '124px', // Fixed height - won't change
                           top: '9.1%',     // Vertical position - adjust as needed
                           left: '64%',   // Horizontal position - shifted another 1% left
                           zIndex: 10
                         }}
                       >
                        <div className="relative w-full h-full rounded-lg" style={{
                          filter: 'drop-shadow(0 8px 12px rgba(34, 197, 94, 0.3))'
                        }}>
                          <img alt="The Magic Forest Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/2aa94214-a9cb-4f40-b86d-34f78fbdc3d5.png" />
                        </div>
                      </div>

                       {/* Book 6 - Middle right (freely positionable) */}
                       <div 
                         ref={book6Animation.ref} 
                         className={`absolute transform hover:scale-105 transition-all duration-500 ${book6Animation.isVisible ? 'animate-fade-in' : 'opacity-0'} cursor-pointer`} 
                         onClick={() => openCarousel(5)}
                         style={{
                           width: '83px',   // Fixed width - won't change
                           height: '128px', // Fixed height - won't change
                           top: '39.5%',    // Vertical position - adjust as needed
                           left: '73%',   // Horizontal position - shifted another 1% left
                           zIndex: 10
                         }}
                      >
                        <div className="relative w-full h-full rounded-lg" style={{
                          filter: 'drop-shadow(0 8px 12px rgba(234, 179, 8, 0.3))'
                        }}>
                          <img alt="Cardboard the Brave Dinos Adventure" className="w-full h-full object-contain rounded-lg" src="/lovable-uploads/dc8b5a6e-b2fb-4dd7-96e5-cf214ec005b4.png" />
                        </div>
                      </div>

                      {/* Book 7 - Bottom right (freely positionable) */}
                      <div 
                        className="absolute transform hover:scale-105 transition-all duration-500 cursor-pointer" 
                        onClick={() => openCarousel(5)}
                        style={{
                          width: '83px',   // Fixed width - won't change
                          height: '128px', // Fixed height - won't change
                          top: '70%',    // Vertical position - adjust as needed
                          left: '73%',   // Horizontal position - adjust as needed
                          zIndex: 10
                        }}
                      >
                        <div className="relative w-full h-full rounded-lg" style={{
                          filter: 'drop-shadow(0 8px 12px rgba(236, 72, 153, 0.3))'
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

          {/* Steps Section */}
          <div className="bg-white py-12 relative z-[999] rounded-2xl shadow-lg mx-4 md:mx-8 mt-8">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto">
                {/* Title */}
                <div className="text-center mb-8 md:mb-12">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                    Comment ça marche
                  </h2>
                </div>
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
  Recevez directement un <strong>livre magnifiquement conçu pour votre enfant</strong> .
                  </p>

                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center flex justify-center">
                  <Button onClick={handlePersonalizeClick} className="h-12 bg-gradient-to-r from-[#a6428d] to-purple-400 hover:from-[#924077] hover:to-purple-300 text-white font-medium text-base rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 px-6 py-3 flex items-center justify-center gap-2">
                    Je personnalise mon histoire
                    <ChevronRight className="w-5 h-5 animate-arrow-bounce" />
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
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-12 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-base rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                            Je personnalise mon histoire
                            <ChevronRight className="w-5 h-5 animate-arrow-bounce" />
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
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-12 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-base rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                            Je personnalise mon histoire
                            <ChevronRight className="w-5 h-5 animate-arrow-bounce" />
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
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-12 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-base rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                            Je personnalise mon histoire
                            <ChevronRight className="w-5 h-5 animate-arrow-bounce" />
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
                <div ref={mobileScrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide px-0 mt-[-8%] my-[2px]">
                   {/* Card 1 Mobile */}
                   <div className="min-w-[75vw] max-w-[75vw] bg-white rounded-2xl shadow-lg overflow-hidden h-[550px] impact-card-1">
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
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-10 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                            Je personnalise mon histoire
                            <ChevronRight className="w-4 h-4 animate-arrow-bounce" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                   {/* Card 2 Mobile */}
                   <div className="min-w-[75vw] max-w-[75vw] bg-white rounded-2xl shadow-lg overflow-hidden h-[550px] impact-card-2">
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
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-10 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                            Je personnalise mon histoire
                            <ChevronRight className="w-4 h-4 animate-arrow-bounce" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                   {/* Card 3 Mobile */}
                   <div className="min-w-[75vw] max-w-[75vw] bg-white rounded-2xl shadow-lg overflow-hidden h-[550px] impact-card-3">
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
                              AIDE À DÉCOUVRIR SA VRAIE FORCE INTÉRIEURE
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button onClick={handlePersonalizeClick} variant="outline" className="w-full h-10 border-2 border-[#a6428d] text-[#a6428d] bg-transparent hover:bg-[#a6428d] hover:text-white font-medium text-xs rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                            Je personnalise mon histoire
                            <ChevronRight className="w-4 h-4 animate-arrow-bounce" />
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

      {/* Enhanced Book Carousel Modal */}
      <Dialog open={isCarouselOpen} onOpenChange={setIsCarouselOpen}>
        <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full p-0 bg-gradient-to-br from-purple-900/95 via-black/95 to-blue-900/95 border-none z-[9999] backdrop-blur-md">
          <DialogTitle className="sr-only">Book Gallery</DialogTitle>
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Enhanced Close Button */}

            {/* Book Title */}
            <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-50">
              <div className="bg-white/10 backdrop-blur-md text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-white/20">
                <h3 className="text-sm sm:text-lg font-bold truncate max-w-[200px] sm:max-w-[300px]">
                  {bookImages[currentCarouselIndex]?.alt}
                </h3>
              </div>
            </div>

            {/* Enhanced Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-6 z-50 p-3 sm:p-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20 shadow-xl group"
            >
              <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:-translate-x-1 duration-300" />
            </button>

            {/* Enhanced Current Image with Animation */}
            <div className="w-full h-full flex items-center justify-center p-4 sm:p-12">
              <div className="relative max-w-full max-h-full">
                <img
                  key={currentCarouselIndex}
                  src={bookImages[currentCarouselIndex]?.src}
                  alt={bookImages[currentCarouselIndex]?.alt}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-fade-in border-4 border-white/20"
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
                    animation: 'scale-in 0.4s ease-out'
                  }}
                />
                {/* Glowing Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                    zIndex: -1
                  }}
                />
              </div>
            </div>

            {/* Enhanced Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-6 z-50 p-3 sm:p-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300 border border-white/20 shadow-xl group"
            >
              <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 transition-transform group-hover:translate-x-1 duration-300" />
            </button>

            {/* Enhanced Image Counter */}
            <div className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base border border-white/20 shadow-xl">
              <span className="font-bold text-purple-200">{currentCarouselIndex + 1}</span>
              <span className="mx-2 text-white/60">/</span>
              <span className="text-white/80">{bookImages.length}</span>
            </div>

            {/* Enhanced Dots Navigation */}
            <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex gap-3">
              {bookImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCarouselIndex(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentCarouselIndex 
                      ? 'bg-gradient-to-r from-purple-400 to-blue-400 shadow-lg scale-125 border-2 border-white/50' 
                      : 'bg-white/30 hover:bg-white/50 border border-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Swipe Indicator for Mobile */}
            <div className="sm:hidden absolute bottom-2 left-1/2 transform -translate-x-1/2 z-50">
              <div className="flex items-center gap-2 text-white/60 text-xs bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                <span>👆</span>
                <span>Balayez pour naviguer</span>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-3/4 left-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default Index;
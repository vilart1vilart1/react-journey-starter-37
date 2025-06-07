
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ValuesSection from '@/components/ValuesSection';
import VideoGallery from '@/components/VideoGallery';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  const handlePersonalizeClick = () => {
    window.scrollTo(0, 0);
    navigate('/children');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-powder-pink to-pastel-lavender relative font-baloo">
      <Header />
      
      {/* Enhanced Hero Section with Background Images */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16 md:py-24">
        {/* Background Image for Desktop */}
        <div className="absolute inset-0 hidden md:block">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/20 via-powder-pink/20 to-pastel-lavender/20"></div>
        </div>

        {/* Background Image for Mobile */}
        <div className="absolute inset-0 md:hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-pastel-blue/20 via-powder-pink/20 to-pastel-lavender/20"></div>
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* Main Title with enhanced mobile styling */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-700 mb-4 md:mb-6 leading-tight relative mt-16 md:mt-20 font-baloo px-2">
            Créez l'histoire
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pastel-lavender via-powder-pink to-sweet-mint">
              personnalisée
            </span>
          </h1>
          
          {/* Enhanced Subtitle with better mobile spacing */}
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed relative font-baloo px-4">
            Un livre unique qui restera gravé dans sa mémoire{' '}
            <span className="text-light-coral font-semibold">pour toujours ✨</span>
            <br className="hidden sm:block" />
            <span className="text-sm sm:text-base text-pastel-lavender font-medium block sm:inline mt-2 sm:mt-0">
              Interface simple • Création rapide • Résultat magique 🪄
            </span>
          </p>

          {/* Enhanced Main CTA Button - Better mobile sizing */}
          <div className="mb-8 md:mb-12 relative mt-8 md:mt-16 px-4">
            <Button
              onClick={handlePersonalizeClick}
              className="bg-white hover:bg-gray-100 text-black px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl font-semibold rounded-lg shadow-lg border border-gray-200 transition-all duration-300 hover:scale-105 font-baloo w-full sm:w-auto"
            >
              <span className="text-xl sm:text-2xl mr-2 sm:mr-3">☀️</span>
              <span className="text-base sm:text-xl">Je commence mon aventure</span>
              <span className="text-xl sm:text-2xl ml-2 sm:ml-3">✨</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <ValuesSection />

      {/* Video Gallery Section */}
      <VideoGallery />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

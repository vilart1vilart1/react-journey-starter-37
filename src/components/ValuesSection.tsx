
import React from 'react';
import { Shield, BookOpen, Star, Heart, Pin, Globe, Gift, Palette } from 'lucide-react';

const ValueCard = React.memo(({ value, index }: { value: any; index: number }) => {
  const IconComponent = value.icon;
  
  return (
    <div
      className="bg-white rounded-2xl p-4 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group relative overflow-hidden will-change-transform"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      <div className="relative z-10 text-center">
        {/* Icon circle with gradient background matching the reference */}
        <div 
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg will-change-transform"
          style={{ backgroundColor: value.bgColor }}
        >
          <IconComponent className="w-6 h-6 text-white drop-shadow-sm" />
        </div>
        
        {/* Title with better typography */}
        <h3 className="text-gray-800 font-bold text-center font-baloo text-sm leading-tight group-hover:text-gray-900 transition-colors duration-300 px-1">
          {value.title}
        </h3>
      </div>
    </div>
  );
});

ValueCard.displayName = 'ValueCard';

const ValuesSection = React.memo(() => {
  const values = [
    {
      icon: Shield,
      title: "VALIDÉ PAR EXPERT",
      bgColor: "#A8E6CF" // Light mint green like in the reference
    },
    {
      icon: Globe,
      title: "COLLECTIONNEZ LES HISTOIRES QUI FAÇONNENT SON MONDE",
      bgColor: "#88C0D0" // Light blue like in the reference
    },
    {
      icon: Heart,
      title: "UN CADEAU UNIQUE",
      bgColor: "#FFB3BA" // Light pink like in the reference
    },
    {
      icon: Palette,
      title: "STIMULATION DE LA CRÉATIVITÉ",
      bgColor: "#FFCB77" // Light orange like in the reference
    }
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background decorative elements with reduced complexity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/5 w-24 h-24 bg-sweet-mint rounded-full opacity-20 animate-pulse will-change-transform"></div>
        <div className="absolute top-32 right-1/4 w-16 h-16 bg-pastel-lavender rounded-full opacity-30 animate-bounce will-change-transform" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-32 bg-powder-pink rounded-full opacity-15 animate-pulse will-change-transform" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 right-1/6 w-20 h-20 bg-pastel-blue rounded-full opacity-25 animate-bounce will-change-transform" style={{animationDelay: '1.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {values.map((value, index) => (
            <ValueCard key={value.title} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

ValuesSection.displayName = 'ValuesSection';

export default ValuesSection;

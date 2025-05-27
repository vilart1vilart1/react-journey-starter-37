
import React, { useRef, useEffect } from "react";
import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (!heroElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const rect = heroElement.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 25;
      
      const elements = heroElement.querySelectorAll('[data-parallax]');
      elements.forEach(el => {
        const intensity = Number((el as HTMLElement).dataset.parallax) || 1;
        if (el instanceof HTMLElement) {
          el.style.transform = `translate(${moveX * intensity}px, ${moveY * intensity}px)`;
        }
      });
    };

    heroElement.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      heroElement.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 filter blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/50 to-transparent"></div>
      </div>

      <Container className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div data-parallax="0.5" className="inline-block mb-4 px-3 py-1 bg-primary/5 rounded-full text-sm font-medium text-primary animate-fadeIn">
            Introducing Brand 1.0
          </div>
          
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance"
            style={{ 
              opacity: 0, 
              animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards',
              animationDelay: '0.2s'
            }}
          >
            Beautiful design that just&nbsp;
            <span className="relative inline-block">
              works
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full"></span>
            </span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance"
            style={{ 
              opacity: 0, 
              animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards',
              animationDelay: '0.4s'
            }}
          >
            Crafted with precision and focus on user experience. Our minimalist approach lets your content shine and your users engage.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ 
              opacity: 0, 
              animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards',
              animationDelay: '0.6s'
            }}
          >
            <CustomButton size="lg" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
              Get Started
            </CustomButton>
            <CustomButton variant="outline" size="lg">
              Learn More
            </CustomButton>
          </div>
        </div>

        {/* Product showcase */}
        <div 
          className="mt-16 md:mt-24 max-w-5xl mx-auto"
          style={{ 
            opacity: 0, 
            animation: 'fadeIn 1s ease forwards, slideUp 1s ease forwards',
            animationDelay: '0.8s'
          }}
        >
          <div data-parallax="1" className="relative rounded-xl overflow-hidden shadow-2xl bg-background border border-border/40">
            <div className="aspect-[16/9] bg-secondary/30 w-full">
              <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-3xl p-8 text-center">
                  <div className="p-1 bg-secondary rounded-lg mb-4 inline-block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M7 7h10v1H7z" />
                      <path d="M7 11h10v1H7z" />
                      <path d="M7 15h10v1H7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Beautifully Crafted Interface</h2>
                  <p className="text-muted-foreground">Product showcase will be displayed here</p>
                </div>
              </div>
            </div>
            <div className="absolute top-3 left-3 flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;


import React, { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import { Motion, Layers, PenLine, Sparkles, CheckCircle, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Motion className="h-6 w-6" />,
    title: "Smooth Animations",
    description: "Fluid motion design that enhances the user experience without being distracting."
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Clean Architecture",
    description: "Organized and maintainable code structure that scales with your project."
  },
  {
    icon: <PenLine className="h-6 w-6" />,
    title: "Thoughtful Typography",
    description: "Carefully selected fonts and text styling for optimal readability."
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Refined Details",
    description: "Small touches that make a big difference in the overall experience."
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "Accessibility First",
    description: "Built with accessibility in mind to ensure everyone can use your product."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Performance Optimized",
    description: "Fast loading times and smooth interactions for a seamless experience."
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          }
        });
      },
      { threshold: 0.1 }
    );

    const featuresElements = document.querySelectorAll(".feature-card");
    featuresElements.forEach((el) => observer.observe(el));

    return () => {
      featuresElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-secondary/30"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <div 
            className="inline-block mb-4 px-3 py-1 bg-primary/5 rounded-full text-sm font-medium text-primary"
            style={{ 
              opacity: 0, 
              animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards' 
            }}
          >
            Features
          </div>
          <h2 
            className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance"
            style={{ 
              opacity: 0, 
              animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards',
              animationDelay: '0.2s'
            }}
          >
            Designed with purpose, built for performance
          </h2>
          <p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance"
            style={{ 
              opacity: 0, 
              animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards',
              animationDelay: '0.4s'
            }}
          >
            Every feature carefully considered and implemented to enhance the user experience without unnecessary complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card opacity-0 bg-background border border-border/40 rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] hover:border-primary/20"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="w-12 h-12 bg-primary/5 rounded-lg flex items-center justify-center text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;

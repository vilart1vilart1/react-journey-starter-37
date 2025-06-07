
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sophie M.",
    text: "Mon fils de 6 ans est absolument ravi de son livre ! Il se reconnaît dans l'histoire et la redemande chaque soir. La qualité est exceptionnelle, les illustrations magnifiques. Un cadeau qui restera gravé dans sa mémoire.",
    rating: 5,
    location: "Paris"
  },
  {
    id: 2,
    name: "Thomas L.",
    text: "Service client fantastique et livraison rapide ! Ma fille adore son livre personnalisé. Elle se sent vraiment comme une princesse dans son histoire. Je recommande vivement My Little Hero !",
    rating: 5,
    location: "Lyon"
  },
  {
    id: 3,
    name: "Marie D.",
    text: "Quelle belle surprise pour l'anniversaire de mon neveu ! Le livre est de très haute qualité, l'histoire captivante et les détails personnalisés parfaits. Il n'arrête pas de le relire !",
    rating: 5,
    location: "Marseille"
  },
  {
    id: 4,
    name: "Julie R.",
    text: "J'ai commandé pour mes deux enfants et ils sont enchantés ! Les histoires sont différentes et adaptées à chaque personnalité. Bravo pour cette belle initiative qui fait rêver nos petits.",
    rating: 5,
    location: "Toulouse"
  },
  {
    id: 5,
    name: "Pierre B.",
    text: "Un concept génial ! Mon fils se voit comme un vrai héros dans son livre. La personnalisation est bluffante et la qualité d'impression excellente. Parfait pour développer l'amour de la lecture !",
    rating: 5,
    location: "Nantes"
  },
  {
    id: 6,
    name: "Camille T.",
    text: "Service irréprochable du début à la fin. Le livre est arrivé rapidement et dans un emballage soigné. Ma fille de 4 ans est émerveillée par son histoire personnalisée. Merci !",
    rating: 5,
    location: "Strasbourg"
  }
];

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
            Ils nous font confiance ⭐
          </h3>
          <p className="text-white/90 text-sm md:text-base">
            Découvrez les avis de nos familles heureuses
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
            {/* Stars */}
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current"
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-slate-700 text-base md:text-lg lg:text-xl text-center leading-relaxed mb-6 md:mb-8 italic">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Author */}
            <div className="text-center">
              <p className="font-semibold text-slate-800 text-lg md:text-xl">
                {currentTestimonial.name}
              </p>
              <p className="text-slate-500 text-sm md:text-base">
                {currentTestimonial.location}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-slate-50 border-2 border-white shadow-lg rounded-full"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
          </Button>

          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-slate-50 border-2 border-white shadow-lg rounded-full"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-6 md:mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;

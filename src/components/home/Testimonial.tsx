
import React, { useEffect, useRef } from "react";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

const testimonials = [
  {
    content: "The attention to detail in this design is extraordinary. It's not just beautiful, it's thoughtfully crafted for the user.",
    author: "Alex Johnson",
    title: "Product Designer, Design Co."
  },
  {
    content: "We've seen a significant improvement in user engagement since implementing this design system. It's both elegant and functional.",
    author: "Samantha Lee",
    title: "VP of Product, Tech Inc."
  },
  {
    content: "Refreshingly simple yet sophisticated. This is what modern digital design should aspire to be.",
    author: "Michael Rivera",
    title: "UX Director, Creative Studio"
  }
];

const Testimonial = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      className="py-20 md:py-32 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full filter blur-3xl"></div>
      
      <Container>
        <div 
          className="max-w-3xl mx-auto text-center mb-16"
          style={{ 
            opacity: 0, 
            animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards' 
          }}
        >
          <div className="inline-block mb-4 px-3 py-1 bg-primary/5 rounded-full text-sm font-medium text-primary">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
            What people are saying
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Don't just take our word for it — hear from the people who use our design system every day.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-background border border-border rounded-lg p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              style={{ 
                opacity: 0, 
                animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards',
                animationDelay: `${0.2 * (index + 1)}s`
              }}
            >
              <Quote className="h-10 w-10 text-primary/20 mb-4" />
              <p className="text-foreground mb-6 italic">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center text-xs font-semibold mr-3">
                  {testimonial.author.split(' ').map(name => name[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;

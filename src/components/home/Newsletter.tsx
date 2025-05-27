
import React from "react";
import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter signup logic here
  };

  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground">
      <Container>
        <div 
          className="max-w-4xl mx-auto text-center"
          style={{ 
            opacity: 0, 
            animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards' 
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
            Stay updated with our newsletter
          </h2>
          <p className="text-lg opacity-80 max-w-2xl mx-auto mb-8 text-balance">
            Join our community and receive the latest updates, tips, and insights about our product.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                required
              />
              <CustomButton 
                type="submit"
                className="bg-white text-primary hover:bg-white/90"
                icon={<ArrowRight className="h-4 w-4" />}
                iconPosition="right"
              >
                Subscribe
              </CustomButton>
            </div>
            <p className="text-xs opacity-60 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default Newsletter;

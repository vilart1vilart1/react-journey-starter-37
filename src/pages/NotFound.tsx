
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Container from "@/components/ui/Container";
import CustomButton from "@/components/ui/CustomButton";
import { Home } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <h1 
              className="text-9xl font-bold text-primary/10"
              style={{ 
                opacity: 0, 
                animation: 'fadeIn 0.8s ease forwards' 
              }}
            >
              404
            </h1>
            <h2 
              className="text-2xl md:text-3xl font-bold mt-6 mb-4"
              style={{ 
                opacity: 0, 
                animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards',
                animationDelay: '0.2s'
              }}
            >
              Page Not Found
            </h2>
            <p 
              className="text-muted-foreground mb-8"
              style={{ 
                opacity: 0, 
                animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards',
                animationDelay: '0.4s'
              }}
            >
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div
              style={{ 
                opacity: 0, 
                animation: 'fadeIn 0.8s ease forwards, slideUp 0.8s ease forwards',
                animationDelay: '0.6s'
              }}
            >
              <Link to="/">
                <CustomButton icon={<Home className="h-4 w-4" />} iconPosition="left">
                  Back to Home
                </CustomButton>
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;

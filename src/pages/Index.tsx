
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomScrollbar } from '@/components/ui/custom-scrollbar';
import Header from '@/components/Header';
import VideoGallery from '@/components/VideoGallery';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import LoadingScreen from '@/components/LoadingScreen';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

const Index = () => {
  const navigate = useNavigate();

  // Track visitor for homepage
  useVisitorTracking('Homepage');
  const [showLoading, setShowLoading] = useState(false);

  const handlePersonalizeClick = useCallback(() => {
    setShowLoading(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false);
    window.scrollTo(0, 0);
    navigate('/child-count');
  }, [navigate]);

  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return <>      
      <CustomScrollbar className="min-h-screen">
        <div className="min-h-screen relative font-baloo">
          
          <Header />
          
          {/* Video Gallery Section - now the main content */}
          <div className="relative z-20 pt-28 md:pt-40">
            <VideoGallery />
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

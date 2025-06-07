
import { useState, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const VideoGallery = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const videos = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 3,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 5,
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Fixed scroll amount
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Fixed scroll amount
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-4 font-baloo">
            Faites vivre l'aventure à votre Héros
          </h2>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 hidden sm:block"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-7 md:h-7 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 bg-white/95 hover:bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 hidden sm:block"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-7 md:h-7 text-gray-700" />
          </button>

          {/* Video Gallery */}
          <div className="overflow-hidden px-4 sm:px-16">
            <div 
              ref={scrollContainerRef}
              className="flex space-x-4 md:space-x-8 overflow-x-auto pb-4 sm:pb-0 scrollbar-hide"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-64 md:w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => setSelectedVideo(video.videoUrl)}
                >
                  <div className="relative group">
                    <img
                      src={video.thumbnail}
                      alt="Video thumbnail"
                      className="w-full h-80 md:h-[480px] object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-300">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/95 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
                        <Play className="w-5 h-5 md:w-6 md:h-6 text-pastel-lavender ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile scroll indicators */}
          <div className="flex justify-center mt-4 space-x-2 sm:hidden">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black border-0">
          <div className="relative">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            {selectedVideo && (
              <iframe
                src={selectedVideo}
                className="w-full h-[60vh] md:h-[70vh]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default VideoGallery;


import React, { useState, useEffect } from 'react';

interface FloatingElement {
  id: string;
  image: string;
  left: number;
  top: number;
  size: number;
  delay: number;
}

const FloatingBackgroundElements = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const images = [
    '/lovable-uploads/444fdbdc-9d2c-4330-b192-2eb3c21a4e08.png', // butterfly
    '/lovable-uploads/fcf582cf-2cf6-4136-8b9a-65ed2ae51d43.png', // rainbow
    '/lovable-uploads/2a68b8cd-5b83-4a18-996b-5d8104720ee3.png', // cloud
    '/lovable-uploads/67396c97-2bae-42f7-9810-8cd0874acbfe.png'  // star
  ];

  // Check if two positions are too close to each other
  const isPositionValid = (newElement: FloatingElement, existingElements: FloatingElement[], minDistance: number = 15): boolean => {
    return existingElements.every(existing => {
      const distance = Math.sqrt(
        Math.pow(newElement.left - existing.left, 2) + 
        Math.pow(newElement.top - existing.top, 2)
      );
      return distance >= minDistance;
    });
  };

  // Check if new image is different from nearby images
  const isDifferentFromNearby = (newElement: FloatingElement, existingElements: FloatingElement[], proximityThreshold: number = 20): boolean => {
    const nearbyElements = existingElements.filter(existing => {
      const distance = Math.sqrt(
        Math.pow(newElement.left - existing.left, 2) + 
        Math.pow(newElement.top - existing.top, 2)
      );
      return distance < proximityThreshold;
    });

    return nearbyElements.every(nearby => nearby.image !== newElement.image);
  };

  const generateRandomElement = (index: number, existingElements: FloatingElement[]): FloatingElement => {
    let attempts = 0;
    const maxAttempts = 50;
    
    // Create zones for better distribution
    const zones = [
      { topMin: 5, topMax: 25 },   // Top zone
      { topMin: 20, topMax: 45 },  // Upper middle zone
      { topMin: 40, topMax: 65 },  // Lower middle zone
      { topMin: 60, topMax: 80 }   // Bottom zone
    ];
    
    const currentZone = zones[index % zones.length];
    
    while (attempts < maxAttempts) {
      const availableImages = images.filter(img => {
        // If no existing elements, any image is fine
        if (existingElements.length === 0) return true;
        
        // Create a temporary element to test
        const tempElement: FloatingElement = {
          id: '',
          image: img,
          left: Math.random() * 75 + 5, // 5-80% from left
          top: Math.random() * (currentZone.topMax - currentZone.topMin) + currentZone.topMin,
          size: 0,
          delay: 0
        };
        
        return isDifferentFromNearby(tempElement, existingElements);
      });

      const selectedImage = availableImages.length > 0 
        ? availableImages[Math.floor(Math.random() * availableImages.length)]
        : images[Math.floor(Math.random() * images.length)];

      const candidate: FloatingElement = {
        id: Math.random().toString(36).substr(2, 9),
        image: selectedImage,
        left: Math.random() * 75 + 5, // 5-80% from left to avoid edge overflow
        top: Math.random() * (currentZone.topMax - currentZone.topMin) + currentZone.topMin,
        size: (20 + Math.random() * 25) * 1.2, // 20-45px increased by 20% = 24-54px
        delay: index * 200 + Math.random() * 300 // Increased staggered delay
      };

      // Check if position is valid (not too close to existing elements)
      if (isPositionValid(candidate, existingElements) && isDifferentFromNearby(candidate, existingElements)) {
        return candidate;
      }

      attempts++;
    }

    // Fallback with zone-based positioning
    return {
      id: Math.random().toString(36).substr(2, 9),
      image: images[index % images.length], // Cycle through images as fallback
      left: (index % 4) * 20 + 10, // Grid-like fallback positioning
      top: currentZone.topMin + ((index % 2) * (currentZone.topMax - currentZone.topMin) / 2),
      size: (20 + Math.random() * 25) * 1.2,
      delay: index * 200 + Math.random() * 300
    };
  };

  useEffect(() => {
    // Generate elements with collision detection and better distribution
    const initialElements: FloatingElement[] = [];
    
    for (let i = 0; i < 8; i++) {
      const newElement = generateRandomElement(i, initialElements);
      initialElements.push(newElement);
    }
    
    setElements(initialElements);
    
    // Trigger the entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" style={{ height: '100%', maxHeight: '100vh' }}>
      {elements.map((element, index) => (
        <div
          key={element.id}
          className={`absolute transition-all duration-1000 ease-out ${
            isVisible 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-0 translate-y-8'
          }`}
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            transform: 'translateZ(0)', // Hardware acceleration
            transitionDelay: `${element.delay}ms`,
          }}
        >
          <img
            src={element.image}
            alt=""
            className="drop-shadow-md"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              filter: 'brightness(1.1) saturate(1.1)',
            }}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingBackgroundElements;

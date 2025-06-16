import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomScrollbar } from '@/components/ui/custom-scrollbar';
import Header from '@/components/Header';
import ValuesSection from '@/components/ValuesSection';
import VideoGallery from '@/components/VideoGallery';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import AboutUsSection from '@/components/AboutUsSection';
import LoadingScreen from '@/components/LoadingScreen';
import FloatingBackgroundElements from '@/components/ui/FloatingBackgroundElements';
import { useEnhancedScrollAnimation } from '@/hooks/useEnhancedScrollAnimation';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { useToast } from '@/hooks/use-toast';
import NewsletterService from '@/services/newsletterService';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Track visitor for homepage
  useVisitorTracking('Homepage');
  
  const [showLoading, setShowLoading] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showEngagementsModal, setShowEngagementsModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [cloudVisible, setCloudVisible] = useState(false);
  const [showPositionControls, setShowPositionControls] = useState(false);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterLoading, setIsNewsletterLoading] = useState(false);
  
  // Position controls for the new image - increased by 5%
  const [imagePosition, setImagePosition] = useState({
    desktop: { top: '7%', left: '50%', transform: 'translateX(-50%)', width: '550px' },
    mobile: { top: '27%', left: '50%', transform: 'translateX(-50%)', width: '350px' }
  });

  // Position controls for the cloud background element
  const [cloudPosition, setCloudPosition] = useState({
    desktop: { 
      top: '-15%', 
      left: '0', 
      minWidth: '450px',
      height: '180px'
    },
    mobile: { 
      top: '-48px', 
      left: '-53px', 
      minWidth: '380px',
      height: '120px'
    }
  });

  // Update CSS custom properties when cloudPosition changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Mobile styles
    root.style.setProperty('--cloud-mobile-top', cloudPosition.mobile.top);
    root.style.setProperty('--cloud-mobile-left', cloudPosition.mobile.left);
    root.style.setProperty('--cloud-mobile-min-width', cloudPosition.mobile.minWidth);
    root.style.setProperty('--cloud-mobile-height', cloudPosition.mobile.height);
    
    // Desktop styles
    root.style.setProperty('--cloud-desktop-top', cloudPosition.desktop.top);
    root.style.setProperty('--cloud-desktop-left', cloudPosition.desktop.left);
    root.style.setProperty('--cloud-desktop-min-width', cloudPosition.desktop.minWidth);
    root.style.setProperty('--cloud-desktop-height', cloudPosition.desktop.height);
  }, [cloudPosition]);
  
  // Enhanced animations with staggered timing - optimized delays
  const valuesAnimation = useEnhancedScrollAnimation({ 
    threshold: 0.2, 
    delay: 100,
    staggerDelay: 0
  });
  const aboutAnimation = useEnhancedScrollAnimation({ 
    threshold: 0.2, 
    delay: 50,
    staggerDelay: 200
  });
  const videoAnimation = useEnhancedScrollAnimation({ 
    threshold: 0.2, 
    delay: 100,
    staggerDelay: 400
  });

  const handlePersonalizeClick = useCallback(() => {
    setShowLoading(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false);
    window.scrollTo(0, 0);
    navigate('/child-count');
  }, [navigate]);

  // Trigger cloud animation after component mounts
  useState(() => {
    const timer = setTimeout(() => {
      setCloudVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  });

  const handlePositionChange = (device: 'desktop' | 'mobile', property: string, value: string) => {
    setImagePosition(prev => ({
      ...prev,
      [device]: {
        ...prev[device],
        [property]: value
      }
    }));
  };

  const handleCloudPositionChange = (device: 'desktop' | 'mobile', property: string, value: string) => {
    setCloudPosition(prev => ({
      ...prev,
      [device]: {
        ...prev[device],
        [property]: value
      }
    }));
  };

  const faqData = [
    {
      question: "📦 Après avoir passé commande, quand vais-je recevoir mon livre ?",
      answer: "Nos délais de création et de validation sont de 2 à 4 jours, suivis de 2 à 3 jours pour l'impression.\nEnsuite, la livraison prend environ 2 à 4 jours selon votre localisation.\nDélai total estimé : entre 6 et 11 jours.\nNous mettons tout en œuvre pour respecter ces délais et garantir une qualité optimale, car chaque livre est personnalisé, validé avec soin, puis imprimé sur un papier de haute qualité pour en faire un cadeau exceptionnel."
    },
    {
      question: "🔒 Je ne suis pas à l'aise pour partager la photo de mon enfant, que faire ?",
      answer: "Nous respectons pleinement votre confidentialité. Conformément aux lois françaises sur la protection des données, toutes les photos et informations que vous fournissez sont automatiquement supprimées après la création du livre.\nVous n'avez donc aucune inquiétude à avoir, votre vie privée est notre priorité."
    },
    {
      question: "💻 Comment fonctionne le format digital ?",
      answer: "Si vous choisissez la version numérique, votre livre vous sera livré sous la forme d'un document PDF interactif.\nIl vous suffira de cliquer dessus pour accéder à votre livre digital, que vous pourrez feuilleter à tout moment sur ordinateur, tablette ou smartphone."
    },
    {
      question: "✏️ J'ai passé ma commande mais j'ai fait une erreur, comment la rectifier ?",
      answer: "Si vous avez fait une erreur (prénom, apparence du personnage, etc.), contactez-nous au plus vite après votre commande via notre support client.\nComme chaque livre est personnalisé et validé avant impression, nous ne pourrons plus modifier votre commande une fois l'impression lancée."
    },
    {
      question: "📚 Comment être sûr que le contenu des histoires est adapté ?",
      answer: "Nos histoires sont soigneusement écrites avec l'aide d'experts en éducation afin d'apporter des valeurs positives et des leçons adaptées à chaque âge.\nNous travaillons sur des thématiques comme la confiance en soi, l'amitié, la gestion des émotions, et bien plus encore, en veillant à ce que chaque histoire soit à la fois ludique et enrichissante pour votre enfant."
    },
    {
      question: "🎯 Nos livres sont-ils adaptés à chaque âge ?",
      answer: "Oui, chaque livre est conçu pour s'adapter parfaitement à l'âge de l'enfant.\nQue ce soit au niveau du vocabulaire, de la longueur du texte, du contenu ou des messages véhiculés, tout est pensé pour correspondre aux capacités de compréhension et aux centres d'intérêt de chaque tranche d'âge."
    }
  ];

  // Newsletter subscription handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail) {
      toast({
        title: "Email requis",
        description: "Veuillez saisir votre adresse email",
        variant: "destructive",
      });
      return;
    }

    setIsNewsletterLoading(true);

    try {
      const result = await NewsletterService.subscribe(newsletterEmail);
      
      if (result.success) {
        toast({
          title: "Inscription réussie !",
          description: "Vous êtes maintenant inscrit à notre newsletter",
        });
        setNewsletterEmail('');
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsNewsletterLoading(false);
    }
  };

  if (showLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <>
      {/* Add CSS for responsive cloud positioning */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .cloud-button {
            position: relative;
            top: var(--cloud-mobile-top, -48px);
            left: var(--cloud-mobile-left, -22%);
            min-width: var(--cloud-mobile-min-width, 380px);
            height: var(--cloud-mobile-height, 120px);
          }
          
          @media (min-width: 768px) {
            .cloud-button {
              top: var(--cloud-desktop-top, -15%);
              left: var(--cloud-desktop-left, 0);
              min-width: var(--cloud-desktop-min-width, 450px);
              height: var(--cloud-desktop-height, 180px);
            }
          }
        `
      }} />
      
      <CustomScrollbar className="min-h-screen">
        <div className="min-h-screen relative font-baloo">
          
          <Header />
          
          
          {/* Background gradient container - ends before footer */}
          <div 
            className="relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #87CEEB 0%, #FFB6C1 25%, #DDA0DD 50%, #98FB98 75%, #F0E68C 100%)',
              minHeight: '100vh'
            }}
          >
            {/* Floating Background Elements - only within this container */}
            <FloatingBackgroundElements />
            
            {/* Scattered dots background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
              {/* Generate scattered dots */}
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/40 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
              {/* Some larger dots */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={`large-${i}`}
                  className="absolute w-2 h-2 bg-white/30 rounded-full animate-pulse"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 4}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-end justify-center px-4 py-8 md:py-16 lg:py-24 overflow-hidden z-20">

              {/* New uploaded image - positioned behind the CTA button */}
              <img
                src="/lovable-uploads/06e0def0-98e1-4dac-8187-dd532fac743e.png"
                alt="Children reading books"
                className="absolute z-10 pointer-events-none hidden md:block"
                style={{
                  top: imagePosition.desktop.top,
                  left: imagePosition.desktop.left,
                  transform: imagePosition.desktop.transform,
                  width: imagePosition.desktop.width,
                  height: 'auto'
                }}
              />
              
              {/* Mobile version of the new image */}
              <img
                src="/lovable-uploads/06e0def0-98e1-4dac-8187-dd532fac743e.png"
                alt="Children reading books"
                className="absolute z-10 pointer-events-none md:hidden"
                style={{
                  top: imagePosition.mobile.top,
                  left: imagePosition.mobile.left,
                  transform: imagePosition.mobile.transform,
                  width: imagePosition.mobile.width,
                  height: 'auto'
                }}
              />

              <div className="container mx-auto max-w-4xl text-center relative z-10 mt-20">
                {/* Clickable div with cloud background */}
                <div className="mb-8 md:mb-10 lg:mb-6 relative px-2 sm:px-4">
                  <div
                    onClick={handlePersonalizeClick}
                    className={`cloud-button relative inline-block transition-all duration-1000 ease-out hover:scale-105 transform group will-change-transform cursor-pointer ${
                      cloudVisible 
                        ? 'opacity-100 scale-100 translate-y-0' 
                        : 'opacity-0 scale-75 translate-y-12'
                    }`}
                    style={{
                      backgroundImage: `url('/lovable-uploads/b2c1544f-5802-410e-813a-4cc6b5445823.png')`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      width: 'auto',
                      transitionDelay: '800ms'
                    }}
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-sm sm:text-base md:text-lg lg:text-xl font-bold text-slate-700 font-baloo px-4 pt-4">
                      Je commence mon aventure 
                      <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                        ➔
                      </span>
                    </span>
                  </div>
                </div>

                {/* Bottom margin for hero section */}
                <div className="mb-[35%] md:mb-6 lg:mb-4"></div>
              </div>
            </section>

            {/* Values Section with enhanced fade-in animation - optimized timing */}
            <div 
              ref={valuesAnimation.ref as React.RefObject<HTMLDivElement>}
              className={`transition-all duration-700 ease-out z-20 relative ${
                valuesAnimation.isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-98'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              <ValuesSection />
            </div>

            {/* About Us Section with enhanced fade-in animation - optimized timing */}
            <div 
              ref={aboutAnimation.ref as React.RefObject<HTMLDivElement>}
              className={`transition-all duration-800 ease-out z-20 relative ${
                aboutAnimation.isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-98'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              <AboutUsSection />
            </div>

            {/* Video Gallery Section with enhanced fade-in animation - optimized timing */}
            <div 
              ref={videoAnimation.ref as React.RefObject<HTMLDivElement>}
              className={`transition-all duration-900 ease-out z-20 relative ${
                videoAnimation.isVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-16 scale-98'
              }`}
              style={{ willChange: 'transform, opacity' }}
            >
              <VideoGallery />
            </div>

            {/* Newsletter Section with NewsletterSubscription component */}
            <div className="relative py-8 md:py-12 z-20">
              <div className="container mx-auto px-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-slate-700 mb-4 font-baloo">
                  Restez informé de nos nouveautés !
                </h3>
                <p className="text-slate-600 mb-6 text-base font-baloo">
                  Recevez nos dernières histoires et offres spéciales
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    disabled={isNewsletterLoading}
                    className="flex-1 px-4 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400/50 text-base font-baloo border border-slate-300 bg-white/80"
                  />
                  <button 
                    type="submit" 
                    disabled={isNewsletterLoading}
                    className="bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors text-base font-baloo disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isNewsletterLoading ? 'Inscription...' : "S'abonner"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer - outside the background container so floating elements don't appear here */}
          <Footer />

          {/* WhatsApp Button */}
          <WhatsAppButton />

          {/* Position Controls Modal */}
          <Dialog open={showPositionControls} onOpenChange={setShowPositionControls}>
            <DialogContent className="sm:max-w-2xl w-[95vw] max-w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-cream-beige via-pastel-blue/20 to-powder-pink/20 border-none shadow-2xl font-baloo">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold text-slate-700 font-baloo mb-6">
                  ⚙️ Position Controls
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-8">
                {/* Cloud Position Controls */}
                <div className="bg-white/50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-slate-700">☁️ Cloud Background Element</h3>
                  
                  {/* Desktop Controls */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-slate-600">Desktop</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Top Position</Label>
                        <Input
                          value={cloudPosition.desktop.top}
                          onChange={(e) => handleCloudPositionChange('desktop', 'top', e.target.value)}
                          placeholder="-15%"
                        />
                      </div>
                      <div>
                        <Label>Left Position</Label>
                        <Input
                          value={cloudPosition.desktop.left}
                          onChange={(e) => handleCloudPositionChange('desktop', 'left', e.target.value)}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label>Min Width</Label>
                        <Input
                          value={cloudPosition.desktop.minWidth}
                          onChange={(e) => handleCloudPositionChange('desktop', 'minWidth', e.target.value)}
                          placeholder="450px"
                        />
                      </div>
                      <div>
                        <Label>Height</Label>
                        <Input
                          value={cloudPosition.desktop.height}
                          onChange={(e) => handleCloudPositionChange('desktop', 'height', e.target.value)}
                          placeholder="180px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Controls */}
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-600">Mobile</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Top Position</Label>
                        <Input
                          value={cloudPosition.mobile.top}
                          onChange={(e) => handleCloudPositionChange('mobile', 'top', e.target.value)}
                          placeholder="-48px"
                        />
                      </div>
                      <div>
                        <Label>Left Position</Label>
                        <Input
                          value={cloudPosition.mobile.left}
                          onChange={(e) => handleCloudPositionChange('mobile', 'left', e.target.value)}
                          placeholder="-22%"
                        />
                      </div>
                      <div>
                        <Label>Min Width</Label>
                        <Input
                          value={cloudPosition.mobile.minWidth}
                          onChange={(e) => handleCloudPositionChange('mobile', 'minWidth', e.target.value)}
                          placeholder="380px"
                        />
                      </div>
                      <div>
                        <Label>Height</Label>
                        <Input
                          value={cloudPosition.mobile.height}
                          onChange={(e) => handleCloudPositionChange('mobile', 'height', e.target.value)}
                          placeholder="120px"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Position Controls */}
                <div className="bg-white/50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-slate-700">🖼️ Children Reading Image</h3>
                  
                  {/* Desktop Controls */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-slate-600">Desktop</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Top Position</Label>
                        <Input
                          value={imagePosition.desktop.top}
                          onChange={(e) => handlePositionChange('desktop', 'top', e.target.value)}
                          placeholder="7%"
                        />
                      </div>
                      <div>
                        <Label>Left Position</Label>
                        <Input
                          value={imagePosition.desktop.left}
                          onChange={(e) => handlePositionChange('desktop', 'left', e.target.value)}
                          placeholder="50%"
                        />
                      </div>
                      <div>
                        <Label>Width</Label>
                        <Input
                          value={imagePosition.desktop.width}
                          onChange={(e) => handlePositionChange('desktop', 'width', e.target.value)}
                          placeholder="600px"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Controls */}
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-600">Mobile</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Top Position</Label>
                        <Input
                          value={imagePosition.mobile.top}
                          onChange={(e) => handlePositionChange('mobile', 'top', e.target.value)}
                          placeholder="27%"
                        />
                      </div>
                      <div>
                        <Label>Left Position</Label>
                        <Input
                          value={imagePosition.mobile.left}
                          onChange={(e) => handlePositionChange('mobile', 'left', e.target.value)}
                          placeholder="50%"
                        />
                      </div>
                      <div>
                        <Label>Width</Label>
                        <Input
                          value={imagePosition.mobile.width}
                          onChange={(e) => handlePositionChange('mobile', 'width', e.target.value)}
                          placeholder="350px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* About Modal */}
          <Dialog open={showAboutModal} onOpenChange={setShowAboutModal}>
            <DialogContent className="sm:max-w-4xl w-[95vw] max-w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-cream-beige via-pastel-blue/20 to-powder-pink/20 border-none shadow-2xl font-baloo">
              <DialogHeader>
                <DialogTitle className="text-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue via-powder-pink to-pastel-lavender font-baloo mb-6">
                  📚 À propos de My Little Hero ✨
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 text-slate-700 font-baloo">
                <div className="bg-gradient-to-r from-pastel-blue/20 to-powder-pink/20 p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    🌟 Notre Mission
                  </h3>
                  <p className="leading-relaxed text-lg">
                    My Little Hero transforme chaque enfant en héros de sa propre aventure grâce à des livres personnalisés uniques. Nous croyons que chaque enfant mérite de se voir comme le protagoniste de son histoire, développant ainsi sa confiance en soi et son imagination.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-sweet-mint/20 to-pastel-lavender/20 p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    💝 Une Expérience Magique
                  </h3>
                  <p className="leading-relaxed text-lg">
                    Nos livres ne sont pas de simples histoires, mais des outils puissants de développement personnel qui accompagnent votre enfant dans sa croissance, lui enseignant des valeurs essentielles tout en créant des souvenirs inoubliables.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-light-coral/20 to-pale-yellow/20 p-6 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    🎯 Notre Engagement
                  </h3>
                  <p className="leading-relaxed text-lg">
                    Chaque livre est créé avec l'expertise de spécialistes en développement infantile pour garantir un contenu éducatif de qualité, adapté à l'âge de votre enfant et imprimé avec des matériaux premium pour une durabilité exceptionnelle.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Nos Engagements Modal */}
          <Dialog open={showEngagementsModal} onOpenChange={setShowEngagementsModal}>
            <DialogContent className="sm:max-w-5xl w-[95vw] max-w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-cream-beige via-pastel-blue/20 to-powder-pink/20 border-none shadow-2xl font-baloo">
              <DialogHeader>
                <DialogTitle className="text-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue via-powder-pink to-pastel-lavender font-baloo mb-6">
                  💎 Nos Engagements ✨
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-8 text-slate-700 font-baloo">
                {/* Problématique */}
                <div className="bg-gradient-to-r from-red-100/50 to-orange-100/50 p-6 rounded-2xl border-l-4 border-red-300">
                  <h3 className="text-2xl font-bold mb-4 text-red-700 flex items-center">
                    ⚠️ UNE PROBLÉMATIQUE MAJEURE
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p>
                      Aujourd'hui, de plus en plus d'enfants souffrent d'un manque de confiance en eux, d'une difficulté à gérer leurs émotions et d'une dépendance aux écrans qui limite leur imagination et leur capacité à affronter les défis du quotidien.
                    </p>
                    <p>
                      Le constat est alarmant : un enfant qui doute de lui aujourd'hui devient un adulte hésitant, stressé, qui peine à exprimer son plein potentiel.
                    </p>
                    <p>
                      Si rien n'est fait, ce manque de confiance peut impacter toute sa vie : difficulté à s'exprimer, peur de l'échec, manque de résilience face aux obstacles...
                    </p>
                    <p className="font-semibold text-red-800">
                      Comment aider nos enfants à se construire une estime de soi solide, à s'épanouir et à croire en leurs capacités ?
                    </p>
                  </div>
                </div>

                {/* Notre Solution */}
                <div className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 p-6 rounded-2xl border-l-4 border-blue-300">
                  <h3 className="text-2xl font-bold mb-4 text-blue-700 flex items-center">
                    💡 NOTRE SOLUTION
                  </h3>
                  <div className="space-y-4 text-lg leading-relaxed">
                    <p>
                      My Little Hero a été conçu pour donner aux enfants les clés de leur propre épanouissement à travers un outil puissant et engageant : des livres personnalisés où ils deviennent le héros de leur propre aventure. Nos livres ne sont pas de simples histoires.
                    </p>
                    <p>
                      Ce sont des outils éducatifs, validés par des experts en psychologie infantile et en éducation, qui permettent aux enfants de :
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start">
                        <span className="mr-2">🌟</span>
                        Développer leur confiance en eux en vivant des aventures où ils surmontent des défis et découvrent leur propre force intérieure.
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">❤️</span>
                        Apprendre à gérer leurs émotions grâce à des histoires adaptées qui les aident à mieux comprendre leurs sentiments et à les exprimer
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">🎭</span>
                        S'identifier au héros et mieux se comprendre grâce à une personnalisation totale (prénom, apparence, caractère...)
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">👨‍👩‍👧</span>
                        Créer un moment unique de partage avec leurs parents, renforçant ainsi les liens familiaux.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Expérience Unique */}
                <div className="bg-gradient-to-r from-green-100/50 to-yellow-100/50 p-6 rounded-2xl border-l-4 border-green-300">
                  <h3 className="text-2xl font-bold mb-4 text-green-700 flex items-center">
                    ✨ UNE EXPÉRIENCE UNIQUE
                  </h3>
                  <div className="space-y-6">
                    <div className="bg-white/50 p-4 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2 flex items-center">
                        👨‍⚕️ CONÇU AVEC DES PÉDOPSYCHIATRES & ÉDUCATEURS
                      </h4>
                      <p>Chaque histoire est développée avec des spécialistes de l'enfance pour garantir un impact réel sur le développement émotionnel et mental de l'enfant.</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2 flex items-center">
                        🚀 UN PUISSANT OUTIL DE DÉVELOPPEMENT PERSONNEL
                      </h4>
                      <p>Nos livres ne se contentent pas de divertir, ils enseignent des valeurs fondamentales comme la persévérance, l'empathie et la résilience.</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2 flex items-center">
                        💖 UN RITUEL ÉMOTIONNEL FORT ENTRE PARENTS ET ENFANTS
                      </h4>
                      <p>Lire un livre où son enfant est le héros, c'est bien plus qu'un moment de lecture : c'est un instant magique de connexion et de valorisation.</p>
                    </div>
                    <div className="bg-white/50 p-4 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2 flex items-center">
                        👑 UNE QUALITÉ PREMIUM POUR UN SOUVENIR QUI DURE TOUTE UNE VIE
                      </h4>
                      <p>Nos livres sont imprimés avec des matériaux haut de gamme, garantissant une longévité exceptionnelle pour accompagner l'enfant tout au long de son évolution.</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Contact Modal */}
          <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
            <DialogContent className="sm:max-w-2xl w-[95vw] max-w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-cream-beige via-pastel-blue/20 to-powder-pink/20 border-none shadow-2xl font-baloo">
              <DialogHeader>
                <DialogTitle className="text-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue via-powder-pink to-pastel-lavender font-baloo mb-6">
                  📧 Contactez-nous ✨
                </DialogTitle>
              </DialogHeader>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-slate-700 font-semibold">Nom *</Label>
                    <Input 
                      id="name" 
                      type="text" 
                      placeholder="Votre nom"
                      className="mt-2 bg-white/70 border-slate-300 focus:border-pastel-blue font-baloo"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-semibold">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="votre@email.com"
                      className="mt-2 bg-white/70 border-slate-300 focus:border-pastel-blue font-baloo"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-slate-700 font-semibold">Numéro de téléphone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="06 12 34 56 78"
                    className="mt-2 bg-white/70 border-slate-300 focus:border-pastel-blue font-baloo"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-slate-700 font-semibold">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Votre message..."
                    rows={5}
                    className="mt-2 bg-white/70 border-slate-300 focus:border-pastel-blue font-baloo"
                    required
                  />
                </div>
                
                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-sweet-mint to-pastel-lavender hover:from-sweet-mint/80 hover:to-pastel-lavender/80 text-black px-8 py-3 text-lg font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-baloo"
                  >
                    📨 Envoyer le message
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* FAQ Modal */}
          <Dialog open={showFAQModal} onOpenChange={setShowFAQModal}>
            <DialogContent className="sm:max-w-4xl w-[95vw] max-w-[95vw] sm:w-full max-h-[85vh] overflow-y-auto bg-gradient-to-br from-cream-beige via-pastel-blue/20 to-powder-pink/20 border-none shadow-2xl font-baloo">
              <DialogHeader>
                <DialogTitle className="text-center text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue via-powder-pink to-pastel-lavender font-baloo mb-6">
                  ❓ Questions Fréquentes ✨
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-gradient-to-r from-white/50 to-white/30 rounded-2xl overflow-hidden shadow-lg">
                    <button
                      onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                      className="w-full p-6 text-left hover:bg-white/20 transition-all duration-300 flex justify-between items-center group"
                    >
                      <span className="text-lg font-semibold text-slate-700 pr-4 group-hover:text-slate-900">
                        {faq.question}
                      </span>
                      <span className="text-2xl text-pastel-blue transform transition-transform duration-300 group-hover:scale-110">
                        {selectedQuestion === index ? '−' : '+'}
                      </span>
                    </button>
                    
                    {selectedQuestion === index && (
                      <div className="px-6 pb-6 pt-0">
                        <div className="bg-gradient-to-r from-pastel-blue/20 to-powder-pink/20 p-4 rounded-xl">
                          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CustomScrollbar>
    </>
  );
};

export default Index;

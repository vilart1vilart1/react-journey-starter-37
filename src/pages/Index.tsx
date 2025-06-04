
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { BookOpen, Star, Heart, Sparkles, Users, Camera, Zap, X, ChevronDown, ChevronUp, Mail, Phone, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showEngagementModal, setShowEngagementModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqData = [
    {
      question: "Après avoir passé commande, quand vais-je recevoir mon livre ?",
      answer: "Nos délais de création et de validation sont de 2 à 4 jours, suivis de 2 à 3 jours pour l'impression. Ensuite, la livraison prend environ 2 à 4 jours selon votre localisation. Délai total estimé : entre 6 et 11 jours. Nous mettons tout en œuvre pour respecter ces délais et garantir une qualité optimale, car chaque livre est personnalisé, validé avec soin, puis imprimé sur un papier de haute qualité pour en faire un cadeau exceptionnel.",
      emoji: "📦"
    },
    {
      question: "Je ne suis pas à l'aise pour partager la photo de mon enfant, que faire ?",
      answer: "Nous respectons pleinement votre confidentialité. Conformément aux lois françaises sur la protection des données, toutes les photos et informations que vous fournissez sont automatiquement supprimées après la création du livre. Vous n'avez donc aucune inquiétude à avoir, votre vie privée est notre priorité.",
      emoji: "🔒"
    },
    {
      question: "Comment fonctionne le format digital ?",
      answer: "Si vous choisissez la version numérique, votre livre vous sera livré sous la forme d'un document PDF interactif. Il vous suffira de cliquer dessus pour accéder à votre livre digital, que vous pourrez feuilleter à tout moment sur ordinateur, tablette ou smartphone.",
      emoji: "💻"
    },
    {
      question: "J'ai passé ma commande mais j'ai fait une erreur, comment la rectifier ?",
      answer: "Si vous avez fait une erreur (prénom, apparence du personnage, etc.), contactez-nous au plus vite après votre commande via notre support client. Comme chaque livre est personnalisé et validé avant impression, nous ne pourrons plus modifier votre commande une fois l'impression lancée.",
      emoji: "✏️"
    },
    {
      question: "Comment être sûr que le contenu des histoires est adapté ?",
      answer: "Nos histoires sont soigneusement écrites avec l'aide d'experts en éducation afin d'apporter des valeurs positives et des leçons adaptées à chaque âge. Nous travaillons sur des thématiques comme la confiance en soi, l'amitié, la gestion des émotions, et bien plus encore, en veillant à ce que chaque histoire soit à la fois ludique et enrichissante pour votre enfant.",
      emoji: "📚"
    },
    {
      question: "Nos livres sont-ils adaptés à chaque âge ?",
      answer: "Oui, chaque livre est conçu pour s'adapter parfaitement à l'âge de l'enfant. Que ce soit au niveau du vocabulaire, de la longueur du texte, du contenu ou des messages véhiculés, tout est pensé pour correspondre aux capacités de compréhension et aux centres d'intérêt de chaque tranche d'âge.",
      emoji: "🎯"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-700 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-2 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 bg-yellow-300/30 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-24 sm:top-40 right-4 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 bg-orange-300/40 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute bottom-20 sm:bottom-32 left-6 sm:left-12 w-4 h-4 sm:w-6 sm:h-6 bg-amber-300/35 rounded-full animate-bounce delay-1000 opacity-55"></div>
        <div className="absolute top-40 sm:top-60 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-pink-300/30 rounded-full animate-pulse delay-500 opacity-45"></div>
        <div className="absolute bottom-32 sm:bottom-48 right-8 sm:right-16 w-6 h-6 sm:w-10 sm:h-10 bg-blue-300/25 rounded-full animate-bounce delay-700 opacity-40"></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative px-3 sm:px-4 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 sm:space-y-8 md:space-y-12">
            {/* Enhanced 3D Text Effect - Mobile Optimized */}
            <div className="relative mb-8 sm:mb-12 md:mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-orange-300 drop-shadow-2xl transform hover:scale-105 transition-transform duration-300" 
                      style={{
                        textShadow: `
                          0 1px 0 #f59e0b,
                          0 2px 0 #d97706,
                          0 3px 0 #b45309,
                          0 4px 0 #92400e,
                          0 5px 0 #78350f,
                          0 6px 15px rgba(0,0,0,0.4),
                          0 8px 25px rgba(0,0,0,0.2)
                        `
                      }}>
                  Personnalisez
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-orange-300 drop-shadow-2xl mt-1 sm:mt-2 transform hover:scale-105 transition-transform duration-300 delay-75"
                      style={{
                        textShadow: `
                          0 1px 0 #f59e0b,
                          0 2px 0 #d97706,
                          0 3px 0 #b45309,
                          0 4px 0 #92400e,
                          0 5px 0 #78350f,
                          0 6px 15px rgba(0,0,0,0.4),
                          0 8px 25px rgba(0,0,0,0.2)
                        `
                      }}>
                  Les Histoires
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-orange-300 drop-shadow-2xl mt-1 sm:mt-2 transform hover:scale-105 transition-transform duration-300 delay-150"
                      style={{
                        textShadow: `
                          0 1px 0 #f59e0b,
                          0 2px 0 #d97706,
                          0 3px 0 #b45309,
                          0 4px 0 #92400e,
                          0 5px 0 #78350f,
                          0 6px 15px rgba(0,0,0,0.4),
                          0 8px 25px rgba(0,0,0,0.2)
                        `
                      }}>
                  de Mes Enfants
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-base sm:text-xl md:text-2xl text-amber-100 mt-3 sm:mt-6 font-medium opacity-90 animate-fade-in px-2">
                Créez une aventure magique où votre enfant est le héros ! ✨
              </p>
            </div>

            {/* Enhanced 3D Character and Book Scene - Mobile Optimized */}
            <div className="relative max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16 animate-scale-in px-2">
              <div className="relative bg-gradient-to-b from-orange-200 via-orange-300 to-amber-400 rounded-3xl sm:rounded-[4rem] p-6 sm:p-12 md:p-20 shadow-2xl transform perspective-1000 hover:scale-105 transition-all duration-500">
                {/* Enhanced wooden shelf effect */}
                <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-12 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 rounded-b-3xl sm:rounded-b-[4rem] shadow-inner"></div>
                <div className="absolute bottom-0 left-2 sm:left-4 right-2 sm:right-4 h-2 sm:h-3 bg-amber-900/30 rounded-b-3xl sm:rounded-b-[3rem]"></div>
                
                {/* Magical sparkles - Mobile Responsive */}
                <div className="absolute top-4 sm:top-8 left-4 sm:left-8 text-yellow-300 animate-pulse">
                  <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </div>
                <div className="absolute top-6 sm:top-12 right-6 sm:right-12 text-pink-300 animate-bounce delay-300">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6" />
                </div>
                <div className="absolute bottom-8 sm:bottom-16 left-6 sm:left-12 text-blue-300 animate-pulse delay-700">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
                </div>
                
                {/* Enhanced Character scene - Mobile Optimized */}
                <div className="flex items-end justify-center space-x-3 sm:space-x-6 md:space-x-12 relative">
                  {/* Enhanced Character with Better 3D Effects */}
                  <div className="relative transform hover:scale-110 transition-transform duration-300">
                    {/* Character body with enhanced shadows and gradients */}
                    <div className="w-16 h-28 sm:w-24 sm:h-40 md:w-32 md:h-52 bg-gradient-to-b from-teal-200 via-teal-400 to-teal-700 rounded-t-full relative shadow-2xl"
                         style={{
                           boxShadow: `
                             0 8px 16px rgba(0,0,0,0.3),
                             inset 0 2px 0 rgba(255,255,255,0.3),
                             inset 0 -2px 0 rgba(0,0,0,0.2)
                           `
                         }}>
                      {/* Enhanced Head with Better 3D */}
                      <div className="absolute -top-6 sm:-top-10 left-1/2 transform -translate-x-1/2 w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-b from-orange-50 via-orange-200 to-orange-400 rounded-full shadow-2xl"
                           style={{
                             boxShadow: `
                               0 6px 12px rgba(0,0,0,0.4),
                               inset 0 2px 0 rgba(255,255,255,0.4),
                               inset 0 -1px 0 rgba(0,0,0,0.1)
                             `
                           }}>
                        {/* Enhanced Hair with texture */}
                        <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 w-12 h-6 sm:w-16 sm:h-10 md:w-20 md:h-12 bg-gradient-to-b from-amber-500 via-amber-700 to-amber-900 rounded-t-full shadow-lg"
                             style={{
                               boxShadow: `
                                 0 4px 8px rgba(0,0,0,0.3),
                                 inset 0 1px 0 rgba(255,255,255,0.2)
                               `
                             }}></div>
                        {/* Enhanced Glasses with reflection */}
                        <div className="absolute top-3 sm:top-5 left-1/2 transform -translate-x-1/2 w-10 h-6 sm:w-14 sm:h-8 md:w-16 md:h-9 border-2 sm:border-4 border-blue-700 rounded-full bg-gradient-to-b from-white/40 to-blue-100/30 shadow-md backdrop-blur-sm"></div>
                        {/* Enhanced Eyes with shine */}
                        <div className="absolute top-4 sm:top-6 left-3 sm:left-4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-black rounded-full shadow-sm">
                          <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full opacity-60"></div>
                        </div>
                        <div className="absolute top-4 sm:top-6 right-3 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-black rounded-full shadow-sm">
                          <div className="absolute top-0 right-0 w-1 h-1 bg-white rounded-full opacity-60"></div>
                        </div>
                        {/* Enhanced Smile */}
                        <div className="absolute top-7 sm:top-10 left-1/2 transform -translate-x-1/2 w-4 h-2 sm:w-5 sm:h-3 border-b-2 sm:border-b-3 border-black rounded-full"></div>
                      </div>
                      {/* Enhanced Arms with better shadows */}
                      <div className="absolute top-4 sm:top-6 -left-3 sm:-left-5 w-6 h-12 sm:w-10 sm:h-20 md:w-12 md:h-24 bg-gradient-to-b from-orange-50 via-orange-200 to-orange-400 rounded-full transform -rotate-12 shadow-xl"></div>
                      <div className="absolute top-4 sm:top-6 -right-3 sm:-right-5 w-6 h-12 sm:w-10 sm:h-20 md:w-12 md:h-24 bg-gradient-to-b from-orange-50 via-orange-200 to-orange-400 rounded-full transform rotate-12 shadow-xl"></div>
                      {/* Enhanced Legs with texture */}
                      <div className="absolute -bottom-4 sm:-bottom-6 left-2 sm:left-3 w-5 h-10 sm:w-8 sm:h-16 md:w-10 md:h-20 bg-gradient-to-b from-amber-500 via-amber-700 to-amber-900 rounded-full shadow-xl"></div>
                      <div className="absolute -bottom-4 sm:-bottom-6 right-2 sm:right-3 w-5 h-10 sm:w-8 sm:h-16 md:w-10 md:h-20 bg-gradient-to-b from-amber-500 via-amber-700 to-amber-900 rounded-full shadow-xl"></div>
                    </div>
                  </div>

                  {/* Enhanced Large Orange Book */}
                  <div className="relative transform hover:scale-110 transition-transform duration-300 hover:rotate-2">
                    <div className="w-20 h-32 sm:w-28 sm:h-44 md:w-36 md:h-56 bg-gradient-to-br from-orange-300 via-orange-500 to-red-600 rounded-lg shadow-2xl transform rotate-2 relative"
                         style={{
                           boxShadow: `
                             0 10px 20px rgba(0,0,0,0.4),
                             inset 0 2px 0 rgba(255,255,255,0.3),
                             inset 0 -2px 0 rgba(0,0,0,0.2)
                           `
                         }}>
                      {/* Enhanced book spine highlight */}
                      <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-4 bg-gradient-to-b from-orange-200 via-orange-400 to-orange-500 rounded-l-lg shadow-inner"></div>
                      {/* Enhanced book pages */}
                      <div className="absolute right-1 top-2 sm:top-3 bottom-2 sm:bottom-3 w-1 sm:w-2 bg-cream-50 rounded-r-sm shadow-sm"></div>
                      {/* Book title area */}
                      <div className="absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 h-4 sm:h-8 bg-white/20 rounded backdrop-blur-sm"></div>
                      <div className="absolute top-8 sm:top-16 left-3 sm:left-6 right-3 sm:right-6 h-3 sm:h-6 bg-white/15 rounded backdrop-blur-sm"></div>
                    </div>
                  </div>

                  {/* Enhanced Stack of smaller books */}
                  <div className="relative space-y-1 sm:space-y-2 transform hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-6 sm:w-16 sm:h-8 md:w-20 md:h-10 bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 rounded shadow-lg transform hover:rotate-1 transition-transform"></div>
                    <div className="w-12 h-6 sm:w-16 sm:h-8 md:w-20 md:h-10 bg-gradient-to-br from-green-300 via-green-500 to-green-600 rounded shadow-lg transform hover:-rotate-1 transition-transform"></div>
                    <div className="w-12 h-6 sm:w-16 sm:h-8 md:w-20 md:h-10 bg-gradient-to-br from-blue-300 via-blue-500 to-blue-600 rounded shadow-lg transform hover:rotate-1 transition-transform"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced CTA Button with Perfect Mobile Alignment */}
            <div className="relative animate-fade-in delay-300 flex justify-center px-3">
              <Button
                onClick={() => navigate('/children')}
                className="group bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 text-white px-6 py-6 sm:px-10 sm:py-8 md:px-16 md:py-10 text-lg sm:text-2xl md:text-3xl font-black rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-0 relative overflow-hidden w-auto max-w-full"
                style={{
                  boxShadow: `
                    0 6px 0 #c2410c,
                    0 10px 0 #9a3412,
                    0 15px 25px rgba(0,0,0,0.4),
                    inset 0 2px 0 rgba(255,255,255,0.3)
                  `
                }}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 animate-pulse flex-shrink-0" />
                  <span className="text-center leading-tight">PERSONNALISER MAINTENANT</span>
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 animate-bounce flex-shrink-0" />
                </div>
              </Button>
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-orange-400/30 rounded-full blur-xl scale-150 animate-pulse pointer-events-none"></div>
            </div>

            {/* Navigation Links Below Button */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 md:gap-12 mt-8 sm:mt-12 md:mt-16 text-amber-100/90 px-2">
              <button 
                onClick={() => setShowAboutModal(true)}
                className="hover:text-orange-300 hover:scale-110 transition-all duration-300 font-semibold text-base sm:text-lg md:text-xl relative group cursor-pointer"
              >
                À propos
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-300 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => setShowEngagementModal(true)}
                className="hover:text-orange-300 hover:scale-110 transition-all duration-300 font-semibold text-base sm:text-lg md:text-xl relative group cursor-pointer"
              >
                Nos engagements
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-300 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => setShowContactModal(true)}
                className="hover:text-orange-300 hover:scale-110 transition-all duration-300 font-semibold text-base sm:text-lg md:text-xl relative group cursor-pointer"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-300 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button 
                onClick={() => setShowFaqModal(true)}
                className="hover:text-orange-300 hover:scale-110 transition-all duration-300 font-semibold text-base sm:text-lg md:text-xl relative group cursor-pointer"
              >
                FAQ
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-300 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>

            {/* Enhanced Features preview with Emojis - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20 max-w-4xl mx-auto px-2">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 text-center transform hover:scale-105 hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/10">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl mr-2">📚</span>
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-200" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-amber-100 mb-2">Histoires Uniques</h3>
                <p className="text-amber-200/80 text-sm md:text-base">Chaque livre est créé spécialement pour votre enfant</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 text-center transform hover:scale-105 hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/10">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl mr-2">📸</span>
                  <Camera className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-200" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-amber-100 mb-2">Avec Photo</h3>
                <p className="text-amber-200/80 text-sm md:text-base">Votre enfant devient le vrai héros de l'aventure</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 text-center transform hover:scale-105 hover:bg-white/20 transition-all duration-300 shadow-lg border border-white/10 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl mr-2">⚡</span>
                  <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-amber-200" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-amber-100 mb-2">Livraison Rapide</h3>
                <p className="text-amber-200/80 text-sm md:text-base">Recevez votre livre personnalisé en 5-7 jours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* About Modal - Enhanced with Emojis */}
      <Dialog open={showAboutModal} onOpenChange={setShowAboutModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-6 flex items-center justify-center">
              <span className="text-4xl mr-3">🏠</span>
              À propos de My Little Hero
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8 text-slate-700">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">❤️</span>
              </div>
              <p className="text-lg leading-relaxed">
                <span className="text-2xl mr-2">✨</span>
                My Little Hero transforme la lecture en une aventure personnalisée où votre enfant devient le héros de sa propre histoire, 
                développant ainsi sa confiance en soi et son imagination à travers des récits sur mesure.
                <span className="text-2xl ml-2">🦸‍♂️</span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Engagement Modal - Enhanced with Emojis */}
      <Dialog open={showEngagementModal} onOpenChange={setShowEngagementModal}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-6 flex items-center justify-center">
              <span className="text-4xl mr-3">🤝</span>
              Nos Engagements
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8 text-slate-700">
            {/* Major Issue Section */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-2xl border-l-4 border-red-400">
              <h3 className="text-2xl font-bold text-red-600 mb-4 flex items-center">
                <span className="text-3xl mr-3">⚠️</span>
                UNE PROBLÉMATIQUE MAJEURE
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  <span className="text-xl mr-2">😰</span>
                  Aujourd'hui, de plus en plus d'enfants souffrent d'un manque de confiance en eux, d'une difficulté à gérer leurs émotions et d'une dépendance aux écrans qui limite leur imagination et leur capacité à affronter les défis du quotidien.
                </p>
                <p>
                  <span className="text-xl mr-2">📱</span>
                  Le constat est alarmant : un enfant qui doute de lui aujourd'hui devient un adulte hésitant, stressé, qui peine à exprimer son plein potentiel.
                </p>
                <p>
                  <span className="text-xl mr-2">💔</span>
                  Si rien n'est fait, ce manque de confiance peut impacter toute sa vie : difficulté à s'exprimer, peur de l'échec, manque de résilience face aux obstacles...
                </p>
                <p className="font-semibold text-red-700">
                  <span className="text-xl mr-2">❓</span>
                  Comment aider nos enfants à se construire une estime de soi solide, à s'épanouir et à croire en leurs capacités ?
                </p>
              </div>
            </div>

            {/* Our Solution Section */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-l-4 border-green-400">
              <h3 className="text-2xl font-bold text-green-600 mb-4 flex items-center">
                <span className="text-3xl mr-3">💡</span>
                NOTRE SOLUTION
              </h3>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  <span className="text-xl mr-2">🦸‍♀️</span>
                  My Little Hero a été conçu pour donner aux enfants les clés de leur propre épanouissement à travers un outil puissant et engageant : des livres personnalisés où ils deviennent le héros de leur propre aventure. Nos livres ne sont pas de simples histoires.
                </p>
                <p>
                  <span className="text-xl mr-2">🎯</span>
                  Ce sont des outils éducatifs, validés par des experts en psychologie infantile et en éducation, qui permettent aux enfants de :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-xl mr-3">💪</span>
                    Développer leur confiance en eux en vivant des aventures où ils surmontent des défis et découvrent leur propre force intérieure.
                  </li>
                  <li className="flex items-start">
                    <span className="text-xl mr-3">🧠</span>
                    Apprendre à gérer leurs émotions grâce à des histoires adaptées qui les aident à mieux comprendre leurs sentiments et à les exprimer
                  </li>
                  <li className="flex items-start">
                    <span className="text-xl mr-3">🎭</span>
                    S'identifier au héros et mieux se comprendre grâce à une personnalisation totale (prénom, apparence, caractère...)
                  </li>
                  <li className="flex items-start">
                    <span className="text-xl mr-3">👨‍👩‍👧‍👦</span>
                    Créer un moment unique de partage avec leurs parents, renforçant ainsi les liens familiaux.
                  </li>
                </ul>
              </div>
            </div>

            {/* Unique Experience Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-l-4 border-blue-400">
              <h3 className="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                <Sparkles className="w-8 h-8 text-blue-500 mr-3" />
                UNE EXPÉRIENCE UNIQUE
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white/70 p-4 rounded-xl">
                    <h4 className="font-bold text-blue-700 mb-2">CONCEU AVEC DES PÉDOPSYCHIATRES & ÉDUCATEURS</h4>
                    <p className="text-sm">Chaque histoire est développée avec des spécialistes de l'enfance pour garantir un impact réel sur le développement émotionnel et mental de l'enfant.</p>
                  </div>
                  <div className="bg-white/70 p-4 rounded-xl">
                    <h4 className="font-bold text-blue-700 mb-2">UN PUISSANT OUTIL DE DÉVELOPPEMENT PERSONNEL</h4>
                    <p className="text-sm">Nos livres ne se contentent pas de divertir, ils enseignent des valeurs fondamentales comme la persévérance, l'empathie et la résilience.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/70 p-4 rounded-xl">
                    <h4 className="font-bold text-blue-700 mb-2">UN RITUEL ÉMOTIONNEL FORT ENTRE PARENTS ET ENFANTS</h4>
                    <p className="text-sm">Lire un livre où son enfant est le héros, c'est bien plus qu'un moment de lecture : c'est un instant magique de connexion et de valorisation.</p>
                  </div>
                  <div className="bg-white/70 p-4 rounded-xl">
                    <h4 className="font-bold text-blue-700 mb-2">UNE QUALITÉ PREMIUM POUR UN SOUVENIR QUI DURE TOUTE UNE VIE</h4>
                    <p className="text-sm">Nos livres sont imprimés avec des matériaux haut de gamme, garantissant une longévité exceptionnelle pour accompagner l'enfant tout au long de son évolution.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-6 flex items-center justify-center">
              <span className="text-4xl mr-3">📞</span>
              Contactez-nous
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-lg text-slate-700 leading-relaxed flex items-center justify-center">
                <span className="text-2xl mr-2">💬</span>
                Nous sommes là pour vous aider ! N'hésitez pas à nous contacter.
                <span className="text-2xl ml-2">✨</span>
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-semibold flex items-center">
                    <User className="w-4 h-4 mr-2 text-orange-500" />
                    Nom complet
                  </Label>
                  <Input 
                    id="name" 
                    placeholder="Votre nom complet"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 font-semibold flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-orange-500" />
                    Téléphone
                  </Label>
                  <Input 
                    id="phone" 
                    placeholder="Votre numéro de téléphone"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-semibold flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-orange-500" />
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="votre@email.com"
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-slate-700 font-semibold flex items-center">
                  <span className="text-lg mr-2">💭</span>
                  Message
                </Label>
                <Textarea 
                  id="message" 
                  placeholder="Votre message..."
                  rows={5}
                  className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-400 to-pink-400 hover:from-orange-500 hover:to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span className="text-xl mr-2">📤</span>
                Envoyer le message
                <span className="text-xl ml-2">✨</span>
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* FAQ Modal */}
      <Dialog open={showFaqModal} onOpenChange={setShowFaqModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-6 flex items-center justify-center">
              <span className="text-4xl mr-3">❓</span>
              Questions Fréquentes
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white/60 rounded-2xl border border-orange-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/80 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{faq.emoji}</span>
                    <span className="font-semibold text-slate-700 text-lg">{faq.question}</span>
                  </div>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-orange-500 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border-l-4 border-orange-400">
                      <p className="text-slate-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;

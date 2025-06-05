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

  const handlePersonalizeClick = () => {
    window.scrollTo(0, 0);
    navigate('/children');
  };

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
      answer: "Oui, chaque livre est conçu pour s'adapter parfaitement à l'âge de l'enfant. Que ce soit au niveau du vocabulaire, de la longueur du texte, du contenu ou des messages véhiculés, tout est pensé pour correspondre aux les capacités de compréhension et aux centres d'intérêt de chaque tranche d'âge.",
      emoji: "🎯"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 relative">
      {/* Static decorative elements - no animations and positioned to not overlap footer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ bottom: '400px' }}>
        {/* Books floating around */}
        <div className="absolute top-20 left-10 text-6xl">
          📚
        </div>
        <div className="absolute top-32 right-16 text-5xl">
          📖
        </div>
        <div className="absolute bottom-32 left-20 text-4xl">
          📕
        </div>
        <div className="absolute top-64 left-1/4 text-5xl">
          📘
        </div>
        
        {/* Family and children elements */}
        <div className="absolute bottom-48 right-24 text-6xl">
          👨‍👩‍👧‍👦
        </div>
        <div className="absolute top-40 right-1/3 text-5xl">
          👶
        </div>
        <div className="absolute bottom-64 left-1/3 text-6xl">
          👧
        </div>
        <div className="absolute top-80 right-8 text-5xl">
          👦
        </div>
        
        {/* Magical and interface elements */}
        <div className="absolute top-16 right-32 text-4xl">
          🎨
        </div>
        <div className="absolute bottom-20 left-8 text-3xl">
          💡
        </div>
        <div className="absolute top-48 left-16 text-4xl">
          🖱️
        </div>
        <div className="absolute bottom-40 right-16 text-3xl">
          📱
        </div>
        
        {/* Stars and sparkles for magic */}
        <div className="absolute top-28 left-1/2 text-yellow-400">
          <div className="text-3xl">⭐</div>
        </div>
        <div className="absolute bottom-56 left-40 text-yellow-400">
          <div className="text-2xl">✨</div>
        </div>
        <div className="absolute top-72 right-20 text-yellow-400">
          <div className="text-4xl">🌟</div>
        </div>
        <div className="absolute bottom-72 right-40 text-yellow-400">
          <div className="text-2xl">💫</div>
        </div>
      </div>

      {/* Static bubbles for extra magic */}
      <div className="absolute inset-0 pointer-events-none" style={{ bottom: '400px' }}>
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-pink-300/30 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-300/30 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-300/30 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-yellow-300/30 rounded-full"></div>
        <div className="absolute top-2/3 left-1/5 w-4 h-4 bg-green-300/30 rounded-full"></div>
        <div className="absolute top-1/2 right-1/5 w-3 h-3 bg-orange-300/30 rounded-full"></div>
      </div>

      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
          {/* Main Title with enhanced styling */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-700 mb-6 leading-tight relative">
            Créez l'histoire
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-pulse">
              personnalisée
            </span>
            {/* Decorative elements around title */}
            <div className="absolute -top-4 -left-4 text-2xl">✨</div>
            <div className="absolute -top-2 -right-6 text-3xl">🎨</div>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed relative">
            Un livre unique qui restera gravé dans sa mémoire{' '}
            <span className="text-orange-500 font-semibold">pour toujours ✨</span>
            <br />
            <span className="text-sm md:text-base text-purple-600 font-medium">
              Interface simple • Création rapide • Résultat magique 🪄
            </span>
          </p>

          {/* Enhanced Main CTA Button */}
          <div className="mb-8 relative">
            <Button
              onClick={handlePersonalizeClick}
              className="relative bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 hover:from-green-500 hover:via-blue-600 hover:to-purple-700 text-white px-8 py-6 md:px-12 md:py-8 text-lg md:text-xl font-bold rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 border-0 overflow-hidden group"
            >
              {/* Animated background shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Magical sparkles effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-2 left-4 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                <div className="absolute top-6 right-8 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-4 left-8 w-1 h-1 bg-blue-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-2 right-4 w-1 h-1 bg-green-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
              </div>
              
              {/* Button content */}
              <div className="relative z-10 flex items-center">
                <span className="text-2xl mr-3 group-hover:scale-125 transition-transform duration-300">☀️</span>
                <span className="group-hover:tracking-wide transition-all duration-300">Créer mon livre magique</span>
                <span className="text-2xl ml-3 group-hover:scale-125 transition-transform duration-300">✨</span>
              </div>
              
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"></div>
            </Button>
            
            {/* Static icons around button */}
            <div className="absolute -top-6 -left-6 text-2xl">📚</div>
            <div className="absolute -top-4 -right-8 text-2xl">👨‍👩‍👧‍👦</div>
            <div className="absolute -bottom-6 -left-4 text-xl">🎯</div>
            <div className="absolute -bottom-4 -right-6 text-xl">🚀</div>
          </div>

          {/* Navigation Links moved directly below main button */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button 
              onClick={() => setShowAboutModal(true)}
              className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 font-semibold text-gray-700 hover:scale-105 text-sm md:text-base"
            >
              À propos
            </button>
            <button 
              onClick={() => setShowEngagementModal(true)}
              className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 font-semibold text-gray-700 hover:scale-105 text-sm md:text-base"
            >
              Nos engagements
            </button>
            <button 
              onClick={() => setShowContactModal(true)}
              className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 font-semibold text-gray-700 hover:scale-105 text-sm md:text-base"
            >
              Contact
            </button>
            <button 
              onClick={() => setShowFaqModal(true)}
              className="bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-white/90 transition-all duration-300 font-semibold text-gray-700 hover:scale-105 text-sm md:text-base"
            >
              FAQ
            </button>
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

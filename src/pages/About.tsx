
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const About = () => {
  // Array of office locations
  const locations = [
    { city: "Carthage", country: "Tunisie", flag: "🇹🇳" },
    { city: "Paris", country: "France", flag: "🇫🇷" },
    { city: "Montréal", country: "Canada", flag: "🇨🇦" },
    { city: "Constantine", country: "Algérie", flag: "🇩🇿" }
  ];

  return (
    <div className="min-h-screen bg-rich-black pt-20">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/images/banners/digital-banner.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-rich-black/95 via-rich-black to-rich-black" />
        
        <div className="relative container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-1/2"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-black/50 p-8 rounded-lg border border-gold-500/10">
                  <img 
                    src="/lovable-uploads/e6064e7c-c1ba-4967-80ff-91a23b78ec62.png"
                    alt="Vilart Production"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full md:w-1/2 space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gold-400">
                Notre Histoire
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
              <p className="text-white/80 text-lg leading-relaxed">
                Depuis notre création, Vilart avec ses différentes départements s'est engagé à repousser les limites de la créativité et de l'innovation. Notre passion pour l'excellence nous pousse à offrir des solutions uniques qui dépassent les attentes de nos clients.
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                Nous sommes fiers de notre équipe talentueuse et diversifiée, qui combine expertise technique et vision artistique pour donner vie à vos projets les plus ambitieux.
              </p>
              
              {/* Global Presence Feature */}
              <div className="pt-6">
                <h3 className="text-2xl font-bold text-gold-400 mb-4">Notre Présence Internationale</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {locations.map((location, index) => (
                    <motion.div 
                      key={location.city}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                      className="relative group bg-black/40 p-4 rounded-lg border border-gold-400/20 overflow-hidden"
                    >
                      <div className="absolute -right-4 -top-4 text-6xl opacity-20 transform rotate-12">
                        {location.flag}
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <MapPin className="h-5 w-5 text-gold-400" />
                        <h4 className="text-xl font-semibold text-white">{location.city}</h4>
                      </div>
                      <p className="text-white/70 ml-7">{location.country}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-8 h-full"
        >
          <div className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-lg blur opacity-10 group-hover:opacity-25 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-8 bg-black/40 rounded-lg border border-gold-400/10 h-full flex flex-col">
              <h3 className="text-xl font-bold text-gold-400 mb-4">Innovation</h3>
              <p className="text-white/70">Nous repoussons constamment les limites de la créativité pour offrir des solutions uniques et innovantes.</p>
            </div>
          </div>
          <div className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-lg blur opacity-10 group-hover:opacity-25 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-8 bg-black/40 rounded-lg border border-gold-400/10 h-full flex flex-col">
              <h3 className="text-xl font-bold text-gold-400 mb-4">Excellence</h3>
              <p className="text-white/70">La qualité est au cœur de tout ce que nous faisons, de la conception à la réalisation finale.</p>
            </div>
          </div>
          <div className="relative group h-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-600 to-gold-400 rounded-lg blur opacity-10 group-hover:opacity-25 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-8 bg-black/40 rounded-lg border border-gold-400/10 h-full flex flex-col">
              <h3 className="text-xl font-bold text-gold-400 mb-4">Engagement</h3>
              <p className="text-white/70">Nous nous engageons pleinement dans chaque projet pour garantir votre satisfaction totale.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

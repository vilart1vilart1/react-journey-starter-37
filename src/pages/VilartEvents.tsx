
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  location?: string;
  date?: string;
}

const VilartEvents = () => {
  // Define a single event - the Ramadan event
  const events: Event[] = [
    {
      id: "soiree-ramadanesque-mixte",
      name: "Soirée Ramadanesque Mixte",
      image: "/lovable-uploads/117a8190-aa6c-4f4a-82a9-6c398fc09fe8.png",
      description: "Une soirée exceptionnelle mettant en vedette deux artistes talentueux : Dorsaf Hamdani, maître du Malouf tunisien, et Abdallah Mrich, dans un cadre élégant à l'Hôtel l'occidental.",
      price: 95,
      location: "Hôtel l'occidental, Lac 1",
      date: "13 Mars 2025 à 21H30"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-rich-black">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: "url('/lovable-uploads/4729d1f8-4b29-4042-8cfc-094123067c1f.png')",
              filter: 'brightness(0.4)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50" />
        </div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Événements <span className="text-gold-400">Vilart</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Découvrez des expériences uniques avec nos événements exclusifs
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="#events"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
              >
                Voir les événements
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-white/10 text-white border border-gold-400/50 font-semibold rounded-lg transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ce Que Nous <span className="text-gold-400">Proposons</span>
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-6"></div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Chez Vilart, nous créons des événements inoubliables avec une attention particulière aux détails et à l'excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-10 h-10 text-gold-400" />,
                title: "Événements Exclusifs",
                description: "Nous concevons des expériences uniques pour vous offrir des moments mémorables"
              },
              {
                icon: <Users className="w-10 h-10 text-gold-400" />,
                title: "Artistes Reconnus",
                description: "Nous collaborons avec des artistes de renom pour garantir un spectacle d'exception"
              },
              {
                icon: <MapPin className="w-10 h-10 text-gold-400" />,
                title: "Lieux Prestigieux",
                description: "Nos événements se déroulent dans des cadres élégants et soigneusement sélectionnés"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/40 p-8 rounded-lg border border-gold-500/20 hover:border-gold-400/40 transition-all"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gold-400">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Listing Section */}
      <section id="events" className="py-20 bg-gradient-to-b from-black to-rich-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Nos Événements <span className="text-gold-400">À Venir</span>
            </h2>
            <div className="w-24 h-1 bg-gold-400 mx-auto mb-6"></div>
            <p className="text-xl text-white/80">
              Réservez votre place pour nos événements exclusifs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="luxury-card rounded-lg overflow-hidden shadow-xl border border-gold-500/20"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-gold-400">{event.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-white/80 mb-4">{event.description}</p>
                  
                  <div className="flex flex-col space-y-3 mb-4">
                    {event.date && (
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-gold-400" />
                        <p className="text-sm text-white/90">
                          {event.date}
                        </p>
                      </div>
                    )}
                    
                    {event.location && (
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-gold-400" />
                        <p className="text-sm text-white/90">
                          {event.location}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-gold-400" />
                      <p className="text-sm text-white/90">
                        Dorsaf Hamdani & Abdallah Mrich
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="bg-gold-400/20 rounded-full px-3 py-1">
                      <span className="text-lg font-bold text-gold-400">{event.price}dt</span>
                    </div>
                    <Link 
                      to={`/events/${event.id}`}
                      className="group inline-flex items-center gap-2 px-4 py-2 bg-gold-400 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors"
                    >
                      Détails
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#171717] to-[#262626] p-8 md:p-12 rounded-xl border border-gold-500/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Vous souhaitez organiser un événement?</h3>
                <p className="text-white/70 max-w-2xl">
                  Contactez notre équipe pour créer un événement personnalisé qui répondra à toutes vos attentes
                </p>
              </div>
              <Link 
                to="/contact"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gold-400 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Nous contacter
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VilartEvents;


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
      {/* Hero Section - Similar to Digital page */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('/lovable-uploads/4729d1f8-4b29-4042-8cfc-094123067c1f.png')",
            filter: 'brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
        
        {/* Digital pattern overlay with gold theme */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full"
               style={{
                 backgroundImage: `
                   linear-gradient(0deg, transparent 24%, rgba(245, 158, 11, 0.3) 25%, rgba(245, 158, 11, 0.3) 26%, transparent 27%, transparent 74%, rgba(245, 158, 11, 0.3) 75%, rgba(245, 158, 11, 0.3) 76%, transparent 77%, transparent),
                   linear-gradient(90deg, transparent 24%, rgba(245, 158, 11, 0.3) 25%, rgba(245, 158, 11, 0.3) 26%, transparent 27%, transparent 74%, rgba(245, 158, 11, 0.3) 75%, rgba(245, 158, 11, 0.3) 76%, transparent 77%, transparent)
                 `,
                 backgroundSize: '50px 50px'
               }}
          />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative text-center px-4 z-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full mb-6" />
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white gold-text-shadow">
                Événements <span className="text-gold-400">Vilart</span>
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-gold-600 to-gold-400 mx-auto rounded-full mt-6" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            >
              Découvrez des expériences uniques avec nos événements exclusifs
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-gold-600 text-black hover:bg-gold-500 transition-all duration-300 rounded-lg text-lg font-medium group gold-glow"
              >
                <span className="relative">
                  Contactez-nous
                  <ArrowRight className="ml-2 w-5 h-5 inline-block transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

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


import { Shield, BookOpen, Star, Heart } from 'lucide-react';

const ValuesSection = () => {
  const values = [
    {
      icon: Shield,
      title: "VALIDÉ PAR EXPERT"
    },
    {
      icon: BookOpen,
      title: "COLLECTIONNEZ LES HISTOIRES QUI FAÇONNENT SON MONDE"
    },
    {
      icon: Star,
      title: "QUALITÉ PREMIUM"
    },
    {
      icon: Heart,
      title: "MOMENTS MAGIQUES"
    }
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-pastel-blue to-pastel-lavender rounded-full flex items-center justify-center mb-3 mx-auto">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-700 font-bold text-center font-baloo text-sm leading-tight">
                  {value.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;

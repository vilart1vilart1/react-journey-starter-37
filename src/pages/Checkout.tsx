import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CreditCard, Shield, Lock, User, UserPlus, Truck, Info, Star } from 'lucide-react';
import SignupModal from '@/components/SignupModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const children = location.state?.children || [];
  
  const [selectedPlan, setSelectedPlan] = useState<'onetime' | 'subscription'>('onetime');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAccountSuggestion, setShowAccountSuggestion] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const plans = {
    onetime: { price: 29.99, title: 'Achat unique', subtitle: 'Un livre personnalisé' },
    subscription: { price: 22.49, title: 'Abonnement mensuel', subtitle: 'Un nouveau livre chaque mois (-25%)' }
  };

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  const handlePlanChange = (plan: 'onetime' | 'subscription') => {
    setSelectedPlan(plan);
    if (plan === 'subscription') {
      setShowSignupModal(true);
    }
  };

  const handlePayment = () => {
    if (!isFormValid) return;

    if (selectedPlan === 'onetime' && !showAccountSuggestion) {
      setShowAccountSuggestion(true);
      return;
    }

    navigate('/confirmation', { 
      state: { 
        children, 
        plan: selectedPlan, 
        amount: plans[selectedPlan].price 
      } 
    });
  };

  const proceedWithoutAccount = () => {
    navigate('/confirmation', { 
      state: { 
        children, 
        plan: selectedPlan, 
        amount: plans[selectedPlan].price 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 relative overflow-hidden">
      <Header />
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 animate-bounce"></div>
      </div>

      <div className="container mx-auto px-3 md:px-4 py-4 md:py-8 relative z-10 pt-20 md:pt-24">
        {/* Header */}
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-700 mb-2 md:mb-4">
            Finalisez votre
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"> commande magique</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-600">
            Dernière étape avant de recevoir votre livre personnalisé
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Order Details & Info Sections */}
          <div className="lg:col-span-2 space-y-3 md:space-y-6">
            {/* Order Summary - MOVED TO TOP */}
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg">
              <h3 className="text-base md:text-xl font-bold text-slate-700 mb-3 md:mb-4">Résumé de votre commande</h3>
              <div className="space-y-2 md:space-y-3">
                {children.map((child: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-1 md:py-2 border-b border-slate-100 last:border-b-0">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      {child.photoUrl && (
                        <img 
                          src={child.photoUrl} 
                          alt={child.name}
                          className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover border-2 border-orange-200"
                        />
                      )}
                      <span className="text-slate-600 text-xs md:text-base">Livre pour {child.name} ({child.age} ans)</span>
                    </div>
                    <span className="font-semibold">✨</span>
                  </div>
                ))}
                <div className="pt-2 md:pt-3 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-lg font-semibold text-slate-700">Total</span>
                    <span className="text-lg md:text-2xl font-bold text-orange-500">{plans[selectedPlan].price}€</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plan Selection - MOVED TO SECOND */}
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg">
              <h3 className="text-base md:text-xl font-bold text-slate-700 mb-3 md:mb-4">Choisissez votre formule</h3>
              <div className="space-y-2 md:space-y-3">
                {Object.entries(plans).map(([key, plan]) => (
                  <div
                    key={key}
                    onClick={() => handlePlanChange(key as 'onetime' | 'subscription')}
                    className={`
                      p-2 md:p-4 rounded-lg md:rounded-xl cursor-pointer transition-all duration-300 border-2
                      ${selectedPlan === key 
                        ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-pink-50 shadow-md' 
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-slate-700 text-xs md:text-base">{plan.title}</h4>
                        <p className="text-slate-500 text-xs md:text-sm">{plan.subtitle}</p>
                        {key === 'subscription' && (
                          <p className="text-orange-600 text-xs font-semibold mt-1">Compte requis</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg md:text-2xl font-bold text-slate-700">{plan.price}€</p>
                        {key === 'subscription' && <p className="text-green-600 text-xs md:text-sm font-semibold">Économisez 25%</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INFO LIVRAISON - MOVED TO THIRD */}
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-2" />
                <h3 className="text-base md:text-xl font-bold text-slate-700">INFO LIVRAISON</h3>
              </div>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-600">
                <div className="flex justify-between items-center">
                  <span>📦 Livraison standard (France)</span>
                  <span className="font-semibold text-green-600">GRATUITE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>⚡ Délai de livraison</span>
                  <span className="font-semibold">5-7 jours ouvrés</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>🚚 Transporteur</span>
                  <span className="font-semibold">Colissimo / Chronopost</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>📍 Suivi de colis</span>
                  <span className="font-semibold text-blue-600">Inclus</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    🎁 Emballage soigné inclus pour vos cadeaux
                  </p>
                </div>
              </div>
            </div>

            {/* Info bancaire */}
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                <Info className="w-4 h-4 md:w-5 md:h-5 text-green-500 mr-2" />
                <h3 className="text-base md:text-xl font-bold text-slate-700">Info bancaire</h3>
              </div>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-slate-600">
                <div className="flex items-center">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2" />
                  <span>Paiement 100% sécurisé SSL 256 bits</span>
                </div>
                <div className="flex items-center">
                  <Lock className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2" />
                  <span>Données bancaires cryptées et protégées</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2" />
                  <span>Cartes acceptées: Visa, Mastercard, CB</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-2" />
                  <span>Conformité PCI DSS niveau 1</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    💳 Aucune donnée bancaire n'est stockée sur nos serveurs
                  </p>
                </div>
              </div>
            </div>

            {/* AVIS TRUST PILOT */}
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg">
              <div className="flex items-center mb-3 md:mb-4">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 mr-2" />
                <h3 className="text-base md:text-xl font-bold text-slate-700">AVIS TRUST PILOT</h3>
              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm md:text-base font-bold text-slate-700">4.8/5</span>
                  </div>
                  <span className="text-xs md:text-sm text-slate-500">2,847 avis</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xs md:text-sm">
                    <p className="text-slate-700 italic">"Service exceptionnel, mon fils adore son livre !"</p>
                    <span className="text-slate-500">- Marie P., maman de Lucas</span>
                  </div>
                  <div className="text-xs md:text-sm">
                    <p className="text-slate-700 italic">"Qualité parfaite, livraison rapide. Je recommande !"</p>
                    <span className="text-slate-500">- Thomas L., papa d'Emma</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <a 
                    href="https://trustpilot.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-blue-600 hover:underline"
                  >
                    Voir tous les avis sur Trustpilot →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-lg sticky top-4">
              <div className="flex items-center mb-3 md:mb-6">
                <Shield className="w-4 h-4 md:w-6 md:h-6 text-green-500 mr-2" />
                <h3 className="text-base md:text-xl font-bold text-slate-700">Paiement sécurisé</h3>
              </div>

              <div className="space-y-2 md:space-y-4">
                {/* Contact Info */}
                <div className="grid grid-cols-1 gap-2 md:gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateForm('email', e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full px-2 md:px-4 py-1 md:py-3 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-300 text-xs md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">Nom complet *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Nom et prénom"
                      className="w-full px-2 md:px-4 py-1 md:py-3 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-300 text-xs md:text-base"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">Adresse de livraison *</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => updateForm('address', e.target.value)}
                    placeholder="Adresse complète"
                    className="w-full px-2 md:px-4 py-1 md:py-3 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-300 text-xs md:text-base"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 md:gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">Ville *</label>
                    <Input
                      value={formData.city}
                      onChange={(e) => updateForm('city', e.target.value)}
                      placeholder="Ville"
                      className="w-full px-2 md:px-4 py-1 md:py-3 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-300 text-xs md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">Code postal *</label>
                    <Input
                      value={formData.postalCode}
                      onChange={(e) => updateForm('postalCode', e.target.value)}
                      placeholder="75000"
                      className="w-full px-2 md:px-4 py-1 md:py-3 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-300 text-xs md:text-base"
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="pt-2 md:pt-4 border-t border-slate-200">
                  <div className="flex items-center mb-2 md:mb-4">
                    <CreditCard className="w-3 h-3 md:w-5 md:h-5 text-slate-600 mr-2" />
                    <h4 className="font-semibold text-slate-700 text-xs md:text-base">Informations de paiement</h4>
                  </div>

                  <div className="space-y-2 md:space-y-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">Numéro de carte *</label>
                      <Input
                        value={formData.cardNumber}
                        onChange={(e) => updateForm('cardNumber', e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-2 md:px-4 py-1 md:py-3 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-300 text-xs md:text-base"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">Date d'expiration *</label>
                        <Input
                          value={formData.expiryDate}
                          onChange={(e) => updateForm('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-2 md:px-4 py-1 md:py-3 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-300 text-xs md:text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1 md:mb-2 text-xs md:text-base">CVV *</label>
                        <Input
                          value={formData.cvv}
                          onChange={(e) => updateForm('cvv', e.target.value)}
                          placeholder="123"
                          className="w-full px-2 md:px-4 py-1 md:py-3 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-300 text-xs md:text-base"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex items-center justify-center space-x-2 md:space-x-4 pt-2 md:pt-4 text-xs text-slate-500">
                  <div className="flex items-center">
                    <Lock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    <span className="text-xs">Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    <span className="text-xs">Données cryptées</span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handlePayment}
                  disabled={!isFormValid}
                  className={`
                    w-full flex items-center justify-center gap-2 px-4 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl text-white font-semibold transition-all duration-300 text-xs md:text-base mt-4
                    ${isFormValid 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105' 
                      : 'bg-gray-300 cursor-not-allowed'
                    }
                  `}
                >
                  <Lock className="w-3 h-3 md:w-4 md:h-4" />
                  Payer {plans[selectedPlan].price}€
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Suggestion Modal for One-time Purchase */}
        {showAccountSuggestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
                Créer un compte ?
              </h3>
              <p className="text-slate-600 mb-6 text-center text-sm md:text-base">
                Créez un compte pour suivre vos commandes et accéder facilement à vos livres personnalisés.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowAccountSuggestion(false);
                    setShowSignupModal(true);
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Créer un compte
                </Button>
                <Button
                  onClick={proceedWithoutAccount}
                  variant="outline"
                  className="w-full border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold py-3 rounded-xl"
                >
                  Continuer sans compte
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto mt-4 md:mt-8 gap-3 md:gap-4">
          <Button
            onClick={() => navigate('/personalize')}
            variant="outline"
            className="w-full md:w-auto flex items-center gap-2 px-3 md:px-6 py-2 md:py-3 rounded-full border-2 border-slate-300 hover:border-orange-300 transition-colors text-xs md:text-base"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
            Retour
          </Button>
        </div>
      </div>

      <Footer />

      {/* Signup Modal */}
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)}
        onSuccess={() => {
          navigate('/confirmation', { 
            state: { 
              children, 
              plan: selectedPlan, 
              amount: plans[selectedPlan].price 
            } 
          });
        }}
      />
    </div>
  );
};

export default Checkout;

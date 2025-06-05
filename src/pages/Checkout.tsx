
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CreditCard, Shield, Lock, User, UserPlus } from 'lucide-react';
import SignupModal from '@/components/SignupModal';

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
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-20 h-20 bg-gradient-to-br from-green-200 to-teal-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 animate-bounce"></div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-700 mb-4">
            Finalisez votre
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400"> commande magique</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600">
            Dernière étape avant de recevoir votre livre personnalisé
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Order Details */}
          <div className="space-y-4 md:space-y-6">
            {/* Plan Selection */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg">
              <h3 className="text-lg md:text-xl font-bold text-slate-700 mb-4">Choisissez votre formule</h3>
              <div className="space-y-3">
                {Object.entries(plans).map(([key, plan]) => (
                  <div
                    key={key}
                    onClick={() => handlePlanChange(key as 'onetime' | 'subscription')}
                    className={`
                      p-3 md:p-4 rounded-xl cursor-pointer transition-all duration-300 border-2
                      ${selectedPlan === key 
                        ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-pink-50 shadow-md' 
                        : 'border-slate-200 hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-slate-700 text-sm md:text-base">{plan.title}</h4>
                        <p className="text-slate-500 text-xs md:text-sm">{plan.subtitle}</p>
                        {key === 'subscription' && (
                          <p className="text-orange-600 text-xs font-semibold mt-1">Compte requis</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-bold text-slate-700">{plan.price}€</p>
                        {key === 'subscription' && <p className="text-green-600 text-xs md:text-sm font-semibold">Économisez 25%</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg">
              <h3 className="text-lg md:text-xl font-bold text-slate-700 mb-4">Résumé de votre commande</h3>
              <div className="space-y-3">
                {children.map((child: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      {child.photoUrl && (
                        <img 
                          src={child.photoUrl} 
                          alt={child.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-orange-200"
                        />
                      )}
                      <span className="text-slate-600 text-sm md:text-base">Livre pour {child.name} ({child.age} ans)</span>
                    </div>
                    <span className="font-semibold">✨</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-base md:text-lg font-semibold text-slate-700">Total</span>
                    <span className="text-xl md:text-2xl font-bold text-orange-500">{plans[selectedPlan].price}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-lg">
            <div className="flex items-center mb-4 md:mb-6">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-green-500 mr-2" />
              <h3 className="text-lg md:text-xl font-bold text-slate-700">Paiement sécurisé</h3>
            </div>

            <div className="space-y-3 md:space-y-4">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2 text-sm md:text-base">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-slate-200 focus:border-orange-300 text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2 text-sm md:text-base">Nom complet *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    placeholder="Nom et prénom"
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-slate-200 focus:border-orange-300 text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-slate-700 font-semibold mb-2 text-sm md:text-base">Adresse de livraison *</label>
                <Input
                  value={formData.address}
                  onChange={(e) => updateForm('address', e.target.value)}
                  placeholder="Adresse complète"
                  className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-slate-200 focus:border-orange-300 text-sm md:text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-2 text-sm md:text-base">Ville *</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => updateForm('city', e.target.value)}
                    placeholder="Ville"
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-slate-200 focus:border-orange-300 text-sm md:text-base"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-2 text-sm md:text-base">Code postal *</label>
                  <Input
                    value={formData.postalCode}
                    onChange={(e) => updateForm('postalCode', e.target.value)}
                    placeholder="75000"
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-slate-200 focus:border-orange-300 text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="pt-3 md:pt-4 border-t border-slate-200">
                <div className="flex items-center mb-3 md:mb-4">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-slate-600 mr-2" />
                  <h4 className="font-semibold text-slate-700 text-sm md:text-base">Informations de paiement</h4>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2 text-sm md:text-base">Numéro de carte *</label>
                    <Input
                      value={formData.cardNumber}
                      onChange={(e) => updateForm('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-slate-200 focus:border-orange-300 text-sm md:text-base"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-2 text-sm md:text-base">Date d'expiration *</label>
                      <Input
                        value={formData.expiryDate}
                        onChange={(e) => updateForm('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-slate-200 focus:border-orange-300 text-sm md:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-2 text-sm md:text-base">CVV *</label>
                      <Input
                        value={formData.cvv}
                        onChange={(e) => updateForm('cvv', e.target.value)}
                        placeholder="123"
                        className="w-full px-3 md:px-4 py-2 md:py-3 rounded-xl border-2 border-slate-200 focus:border-orange-300 text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center space-x-4 pt-3 md:pt-4 text-xs md:text-sm text-slate-500">
                <div className="flex items-center">
                  <Lock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Paiement sécurisé
                </div>
                <div className="flex items-center">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Données cryptées
                </div>
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
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto mt-6 md:mt-8 gap-4">
          <Button
            onClick={() => navigate('/personalize')}
            variant="outline"
            className="w-full md:w-auto flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full border-2 border-slate-300 hover:border-orange-300 transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>

          <Button
            onClick={handlePayment}
            disabled={!isFormValid}
            className={`
              w-full md:w-auto flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 rounded-full text-white font-semibold transition-all duration-300 text-sm md:text-base
              ${isFormValid 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transform hover:scale-105' 
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            <Lock className="w-4 h-4" />
            Payer {plans[selectedPlan].price}€
          </Button>
        </div>
      </div>

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

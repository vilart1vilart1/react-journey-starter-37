
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import SignupSuccessModal from './SignupSuccessModal';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignup: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
  onSwitchToLogin: () => void;
}

const countryCodes = [
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+216', country: 'Tunisie', flag: '🇹🇳' },
  { code: '+49', country: 'Allemagne', flag: '🇩🇪' },
  { code: '+39', country: 'Italie', flag: '🇮🇹' },
  { code: '+34', country: 'Espagne', flag: '🇪🇸' },
  { code: '+41', country: 'Suisse', flag: '🇨🇭' },
  { code: '+32', country: 'Belgique', flag: '🇧🇪' },
  { code: '+31', country: 'Pays-Bas', flag: '🇳🇱' },
  { code: '+43', country: 'Autriche', flag: '🇦🇹' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
];

const SignupModal = ({ isOpen, onClose, onSignup, onSwitchToLogin }: SignupModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+33');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setPassword('');
    setCountryCode('+33');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phoneNumber || !password) {
      setError('Tous les champs sont requis');
      return;
    }
    
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const fullPhone = `${countryCode}${phoneNumber}`;
      console.log('Submitting signup with:', { name, email, fullPhone });
      
      const result = await onSignup(name, email, fullPhone, password);
      console.log('Signup result:', result);
      
      if (result.success) {
        // Show success modal instead of immediately closing
        setShowSuccessModal(true);
      } else {
        setError(result.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Signup submission error:', error);
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
    resetForm();
  };

  const handleModalClose = () => {
    if (!showSuccessModal) {
      onClose();
      resetForm();
    }
  };

  return (
    <>
      <Dialog open={isOpen && !showSuccessModal} onOpenChange={handleModalClose}>
        <DialogContent className="w-full max-w-full sm:max-w-md bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-2 border-orange-300/50 p-4 sm:p-6 shadow-2xl">
          <DialogHeader className="pt-2 sm:pt-0">
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 px-2">
              S'inscrire
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg text-sm shadow-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="signup-name" className="text-slate-800 font-semibold flex items-center text-sm sm:text-base">
                <User className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                Prénom et nom
              </Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="Prénom Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-orange-300 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80 backdrop-blur-sm text-sm sm:text-base w-full shadow-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-slate-800 font-semibold flex items-center text-sm sm:text-base">
                <Mail className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                Email
              </Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-orange-300 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80 backdrop-blur-sm text-sm sm:text-base w-full shadow-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-phone" className="text-slate-800 font-semibold flex items-center text-sm sm:text-base">
                <Phone className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                Téléphone
              </Label>
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="w-32 border-orange-300 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80 backdrop-blur-sm shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-orange-200 shadow-xl z-50">
                    {countryCodes.map((country) => (
                      <SelectItem key={country.code} value={country.code} className="hover:bg-amber-50">
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="signup-phone"
                  type="tel"
                  placeholder="123456789"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 border-orange-300 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80 backdrop-blur-sm text-sm sm:text-base shadow-sm"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-slate-800 font-semibold flex items-center text-sm sm:text-base">
                <Lock className="w-4 h-4 mr-2 text-amber-600 flex-shrink-0" />
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-orange-300 focus:border-amber-500 focus:ring-amber-500/20 bg-white/80 backdrop-blur-sm pr-12 text-sm sm:text-base w-full shadow-sm"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-amber-600 p-1 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-600">Minimum 6 caractères</p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base mt-6"
              disabled={isLoading}
            >
              {isLoading ? 'Inscription...' : 'S\'inscrire'}
            </Button>
          </form>
          
          <div className="text-center text-sm text-slate-700 mt-4 px-2">
            <p className="break-words">Déjà un compte ? 
              <button 
                onClick={onSwitchToLogin}
                className="text-amber-600 hover:text-orange-600 hover:underline cursor-pointer ml-1 font-semibold transition-colors"
              >
                Se connecter
              </button>
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <SignupSuccessModal 
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        userName={name}
      />
    </>
  );
};

export default SignupModal;

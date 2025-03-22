
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { X, CreditCard, User, Mail, Phone, UserCircle, Users, CheckCircle2 } from 'lucide-react';
import { initKonnectPayment } from '../lib/payment';

interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
  eventName: string;
  eventPrice: number;
  eventId?: string;
}

const ReservationDialog: React.FC<ReservationDialogProps> = ({
  open,
  onClose,
  eventName,
  eventPrice,
  eventId
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    places: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'review'>('form');
  const [bypassPayment, setBypassPayment] = useState(false);

  const totalPrice = eventPrice * formData.places;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'places') {
      const places = parseInt(value) || 1;
      setFormData({ ...formData, places: Math.max(1, places) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }
    setStep('review');
  };

  const handleEditForm = () => {
    setStep('form');
  };

  const toggleBypassPayment = () => {
    setBypassPayment(!bypassPayment);
  };

  // Save reservation to the API
  const saveReservation = async (orderId: string, paymentRef: string, paymentStatus: string) => {
    try {
      const reservationData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        event_name: eventName,
        event_id: eventId || null,
        places: formData.places,
        unit_price: eventPrice,
        total_price: totalPrice,
        order_id: orderId,
        payment_ref: paymentRef,
        payment_status: paymentStatus
      };

      const response = await fetch('https://respizenmedical.com/vilartprod/api/reservations/create.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error saving reservation');
      }

      return await response.json();
    } catch (err) {
      console.error('API error:', err);
      throw err;
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      if (bypassPayment) {
        // Save the reservation with bypassed payment status
        await saveReservation(orderId, `BYPASS-${orderId}`, 'bypassed');
        
        // Store reservation details in localStorage
        localStorage.setItem('reservation', JSON.stringify({
          ...formData,
          eventName,
          totalPrice,
          orderId,
          paymentRef: `BYPASS-${orderId}`,
          date: new Date().toISOString(),
        }));
        
        // Redirect to success page
        window.location.href = `${window.location.origin}/payment-success`;
        return;
      }
      
      // Initialize payment with Konnect
      const paymentResponse = await initKonnectPayment({
        amount: totalPrice,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        orderId,
      });
      
      // Save the reservation with pending payment status
      await saveReservation(orderId, paymentResponse.paymentRef, 'pending');
      
      // Store reservation details in localStorage for the success page
      localStorage.setItem('reservation', JSON.stringify({
        ...formData,
        eventName,
        totalPrice,
        orderId,
        paymentRef: paymentResponse.paymentRef,
        date: new Date().toISOString(),
      }));
      
      // Redirect to the payment URL
      window.location.href = paymentResponse.payUrl;
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de l\'initialisation du paiement');
      setStep('form');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-[#222222] border border-gold-500/20 text-white px-8 py-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-gold-400">
            {step === 'form' ? 'Réserver votre place' : 'Confirmer votre réservation'}
          </DialogTitle>
          <Button 
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-white"
            onClick={onClose}
            size="icon"
            variant="ghost"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </Button>
        </DialogHeader>
        
        {step === 'form' ? (
          <form onSubmit={handleReview} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="flex items-center text-sm font-medium text-white">
                  <User className="h-4 w-4 mr-2 text-gold-400" />
                  Prénom <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 border border-gold-500/20 rounded-md text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors"
                  placeholder="Votre prénom"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="flex items-center text-sm font-medium text-white">
                  <UserCircle className="h-4 w-4 mr-2 text-gold-400" />
                  Nom <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black/30 border border-gold-500/20 rounded-md text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors"
                  placeholder="Votre nom"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center text-sm font-medium text-white">
                <Mail className="h-4 w-4 mr-2 text-gold-400" />
                Email <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-gold-500/20 rounded-md text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors"
                placeholder="votre@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="flex items-center text-sm font-medium text-white">
                <Phone className="h-4 w-4 mr-2 text-gold-400" />
                Numéro de téléphone <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-gold-500/20 rounded-md text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors"
                placeholder="Ex: 20 123 456"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="places" className="flex items-center text-sm font-medium text-white">
                <Users className="h-4 w-4 mr-2 text-gold-400" />
                Nombre de places <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="places"
                name="places"
                type="number"
                min="1"
                required
                value={formData.places}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-black/30 border border-gold-500/20 rounded-md text-white focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400 transition-colors"
              />
            </div>
            
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm">
                {error}
              </div>
            )}
            
            <div className="bg-black/40 p-5 rounded-md border border-gold-500/30">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/70">Prix unitaire:</span>
                <span className="font-medium text-white">{eventPrice} dt</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-white/70">Nombre de places:</span>
                <span className="font-medium text-white">{formData.places}</span>
              </div>
              <div className="border-t border-gold-500/20 my-3 pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-white">Total:</span>
                  <span className="font-bold text-gold-400 text-lg">{totalPrice} dt</span>
                </div>
              </div>
            </div>
          
            <DialogFooter className="pt-6 gap-4">
              <Button 
                variant="outline" 
                onClick={onClose}
                className="flex-1 border-gold-500/30 hover:bg-gold-500/10 text-white py-6"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                variant="premium"
                className="flex-1 py-6"
              >
                Continuer
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="p-6 bg-black/40 rounded-lg border border-gold-500/20">
              <h3 className="text-lg font-semibold text-gold-400 mb-4">Récapitulatif de la commande</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-white/70">Nom complet:</div>
                  <div className="text-white font-medium">{formData.firstName} {formData.lastName}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-white/70">Email:</div>
                  <div className="text-white font-medium">{formData.email}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-white/70">Téléphone:</div>
                  <div className="text-white font-medium">{formData.phone}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-white/70">Événement:</div>
                  <div className="text-white font-medium">{eventName}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-white/70">Places:</div>
                  <div className="text-white font-medium">{formData.places}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 border-t border-gold-500/20 pt-3 mt-3">
                  <div className="text-white font-semibold">Total à payer:</div>
                  <div className="text-gold-400 font-bold">{totalPrice} dt</div>
                </div>
              </div>
            </div>
            
            {/* Testing option */}
            <div className="border border-gold-500/20 rounded-md p-4 bg-black/20">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={bypassPayment} 
                  onChange={toggleBypassPayment}
                  className="h-4 w-4 rounded border-gold-500 text-gold-400 focus:ring-gold-400"
                />
                <span className="text-white/80 text-sm">Bypass paiement (Mode test uniquement)</span>
              </label>
            </div>
            
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm">
                {error}
              </div>
            )}
            
            <DialogFooter className="pt-6 gap-4">
              <Button 
                variant="outline" 
                onClick={handleEditForm}
                className="flex-1 border-gold-500/30 hover:bg-gold-500/10 text-white py-6"
              >
                Modifier
              </Button>
              <Button 
                onClick={handleSubmit} 
                variant="premium"
                className="flex-1 flex items-center justify-center gap-2 py-6"
                disabled={isLoading}
              >
                {isLoading ? 'Chargement...' : (
                  <>
                    {bypassPayment ? (
                      <>
                        <CheckCircle2 className="h-5 w-5" />
                        Confirmer
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5" />
                        Payer {totalPrice} dt
                      </>
                    )}
                  </>
                )}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDialog;

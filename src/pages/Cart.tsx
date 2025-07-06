
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Clock, User, Camera, MessageSquare, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useIncompleteOrder } from '@/hooks/useIncompleteOrder';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import Footer from '@/components/Footer';

const Cart = () => {
  useVisitorTracking('/cart');
  
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const { incompleteOrder, clearIncompleteOrder } = useIncompleteOrder();

  const hasItems = items.length > 0 || incompleteOrder !== null;

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueIncompleteOrder = () => {
    navigate('/checkout');
  };

  const handleRemoveIncompleteOrder = () => {
    clearIncompleteOrder();
  };

  const getObjectiveLabel = (objective: string) => {
    const labels = {
      'courage': 'Développer le courage',
      'confiance': 'Renforcer la confiance en soi',
      'creativite': 'Stimuler la créativité'
    };
    return labels[objective as keyof typeof labels] || objective;
  };

  return (
 <div 
          className="min-h-screen relative overflow-hidden font-baloo"
          style={{
            background: 'linear-gradient(135deg, #87CEEB 0%, #FFB6C1 25%, #DDA0DD 50%, #98FB98 75%, #F0E68C 100%)'
          }}
        >
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6 sm:mb-8">
            <Button
              variant="ghost"
              onClick={handleContinueShopping}
              className="mr-4 text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Votre panier
            </h1>
          </div>

          {!hasItems ? (
            /* Empty Cart */
            <Card className="text-center py-12">
              <CardContent className="space-y-6">
                <div className="w-16 h-16 bg-slate-100 rounded-full mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">
                    Votre panier est vide
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Découvrez nos histoires personnalisées pour vos enfants
                  </p>
                  <Button
                    onClick={handleContinueShopping}
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                  >
                    Commencer à créer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Cart with Items */
            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Incomplete Order Section */}
                {incompleteOrder && (
                  <Card className="border-orange-200 bg-orange-50">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-orange-800">
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          <span>Commande en cours</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRemoveIncompleteOrder}
                          className="text-orange-600 hover:text-orange-800 hover:bg-orange-100"
                        >
                          Supprimer
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Children Details */}
                      <div className="space-y-3">
                        {incompleteOrder.children.map((child, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-orange-200">
                            <div className="flex items-start space-x-4">
                              {/* Photo */}
                              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-orange-300">
                                {(child.photoUrl || child.photoData) ? (
                                  <img 
                                    src={child.photoData || child.photoUrl} 
                                    alt={child.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <Camera className="w-6 h-6 text-gray-400" />
                                  </div>
                                )}
                              </div>
                              
                              {/* Child Info */}
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold text-slate-800">
                                    {child.name || `Enfant ${index + 1}`}
                                  </h4>
                                  <span className="text-sm text-orange-600 font-medium">
                                    {child.age} ans
                                  </span>
                                </div>
                                
                                {child.objective && (
                                  <div className="flex items-center text-sm text-slate-600">
                                    <Target className="w-4 h-4 mr-1 text-orange-500" />
                                    <span>{getObjectiveLabel(child.objective)}</span>
                                  </div>
                                )}
                                
                                {child.message && (
                                  <div className="bg-orange-100 rounded-lg p-2">
                                    <div className="flex items-start">
                                      <MessageSquare className="w-4 h-4 mr-2 text-orange-600 mt-0.5 flex-shrink-0" />
                                      <p className="text-sm text-orange-800 leading-relaxed">
                                        "{child.message}"
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Plan Selection */}
                      {incompleteOrder.selectedPlan && (
                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                          <h5 className="font-semibold text-slate-800 mb-2">Plan sélectionné</h5>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-orange-800">{incompleteOrder.selectedPlan.name}</p>
                              <p className="text-sm text-slate-600">
                                {incompleteOrder.selectedPlan.features.join(', ')}
                              </p>
                            </div>
                            <span className="text-lg font-bold text-orange-600">
                              {incompleteOrder.selectedPlan.price}€
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <Button
                        onClick={handleContinueIncompleteOrder}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
                      >
                        Continuer la commande
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Regular Cart Items */}
                {items.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Articles ({items.length})</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearCart}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          Vider le panier
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                          {/* Product Image */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-100 to-pink-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src="/lovable-uploads/7765f19c-46fb-432c-b043-48d7fc0805ea.png"
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-800 text-sm sm:text-base truncate">
                              {item.title}
                            </h3>
                            <p className="text-slate-600 text-sm">
                              Prix unitaire: {item.price}€
                            </p>
                            <p className="text-slate-800 font-medium text-sm">
                              Sous-total: {(item.price * item.quantity).toFixed(2)}€
                            </p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            
                            <span className="text-sm font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                {items.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Résumé de la commande</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Sous-total:</span>
                          <span>{getTotalPrice().toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Livraison:</span>
                          <span>Gratuite</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-semibold text-base">
                            <span>Total:</span>
                            <span>{getTotalPrice().toFixed(2)}€</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 py-3"
                      >
                        Passer commande
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={handleContinueShopping}
                        className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
                      >
                        Continuer mes achats
                      </Button>
                    </CardContent>
                  </Card>
                )}

                {/* Trust Badges */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="text-green-700 text-sm">
                      <p className="font-semibold mb-2">🔒 Paiement sécurisé</p>
                      <p className="text-xs">Vos données sont protégées</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;

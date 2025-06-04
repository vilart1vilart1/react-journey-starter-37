
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  ShoppingBag, 
  Baby, 
  CreditCard, 
  Crown, 
  Mail, 
  Phone, 
  Calendar,
  MapPin,
  Heart,
  Book,
  CheckCircle,
  Package,
  Truck,
  Settings,
  X,
  TrendingUp,
  Star,
  Edit3
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Account = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    phone: '06 12 34 56 78',
    address: '123 Rue de la Paix, 75001 Paris'
  });

  const [subscription, setSubscription] = useState({
    isActive: true,
    plan: 'Premium',
    nextBilling: '2024-02-15',
    price: '19.99€/mois'
  });

  const orders = [
    {
      id: '#2024001',
      date: '2024-01-15',
      status: 'Livré',
      child: 'Emma, 6 ans',
      book: 'L\'Aventure Magique d\'Emma',
      price: '24.99€',
      image: '/placeholder.svg'
    },
    {
      id: '#2024002',
      date: '2024-01-28',
      status: 'En cours',
      child: 'Lucas, 4 ans',
      book: 'Lucas et le Dragon Gentil',
      price: '24.99€',
      image: '/placeholder.svg'
    }
  ];

  const children = [
    {
      id: 1,
      name: 'Emma',
      age: 6,
      preferences: 'Princesses, Animaux',
      booksCount: 3,
      favoriteTheme: 'Aventure'
    },
    {
      id: 2,
      name: 'Lucas',
      age: 4,
      preferences: 'Dragons, Voitures',
      booksCount: 2,
      favoriteTheme: 'Fantasy'
    }
  ];

  const paymentHistory = [
    { date: '2024-01-15', amount: '24.99€', description: 'Livre personnalisé - Emma', status: 'Payé' },
    { date: '2024-01-01', amount: '19.99€', description: 'Abonnement Premium', status: 'Payé' },
    { date: '2023-12-15', amount: '24.99€', description: 'Livre personnalisé - Lucas', status: 'Payé' }
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', userInfo);
  };

  const handleCancelSubscription = () => {
    setSubscription({ ...subscription, isActive: false });
    console.log('Subscription cancelled');
  };

  const handleReactivateSubscription = () => {
    setSubscription({ ...subscription, isActive: true });
    console.log('Subscription reactivated');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Bonjour, {userInfo.name.split(' ')[0]} 👋
                </h1>
                <p className="text-slate-600">
                  Gérez vos livres personnalisés et vos informations
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="default" className="bg-green-100 text-green-800 px-3 py-1">
                  <Crown className="w-4 h-4 mr-1" />
                  {subscription.plan}
                </Badge>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Livres créés</p>
                    <p className="text-2xl font-bold">5</p>
                  </div>
                  <Book className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Enfants</p>
                    <p className="text-2xl font-bold">{children.length}</p>
                  </div>
                  <Baby className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Commandes</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                  <ShoppingBag className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Économisé</p>
                    <p className="text-2xl font-bold">47€</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-white shadow-sm border">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Vue d'ensemble</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profil</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Commandes</span>
              </TabsTrigger>
              <TabsTrigger value="children" className="flex items-center space-x-2">
                <Baby className="w-4 h-4" />
                <span className="hidden sm:inline">Enfants</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">Facturation</span>
              </TabsTrigger>
              <TabsTrigger value="subscription" className="flex items-center space-x-2">
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Abonnement</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card className="bg-white shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingBag className="w-5 h-5 text-blue-500" />
                      <span>Commandes récentes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                              <Book className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 text-sm">{order.book}</p>
                              <p className="text-xs text-slate-600">{order.child}</p>
                            </div>
                          </div>
                          <Badge variant={order.status === 'Livré' ? 'default' : 'secondary'} className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Subscription Status */}
                <Card className="bg-white shadow-sm border-slate-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Crown className="w-5 h-5 text-orange-500" />
                      <span>Abonnement {subscription.plan}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Statut</span>
                        <Badge variant={subscription.isActive ? 'default' : 'secondary'} className="bg-green-100 text-green-800">
                          {subscription.isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Prix mensuel</span>
                        <span className="font-semibold">{subscription.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Prochain renouvellement</span>
                        <span className="font-medium">{subscription.nextBilling}</span>
                      </div>
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                        Gérer l'abonnement
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="bg-white shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-500" />
                    <span>Informations personnelles</span>
                  </CardTitle>
                  <CardDescription>
                    Modifiez vos informations de profil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-700 font-medium">Nom complet</Label>
                        <Input
                          id="name"
                          value={userInfo.name}
                          onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                          className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                          className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-slate-700 font-medium">Téléphone</Label>
                        <Input
                          id="phone"
                          value={userInfo.phone}
                          onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                          className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-slate-700 font-medium">Adresse</Label>
                        <Input
                          id="address"
                          value={userInfo.address}
                          onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                          className="border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Mettre à jour le profil
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="bg-white shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShoppingBag className="w-5 h-5 text-blue-500" />
                    <span>Mes commandes</span>
                  </CardTitle>
                  <CardDescription>
                    Suivez l'état de vos commandes de livres personnalisés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
                              <Book className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">{order.book}</h3>
                              <p className="text-sm text-slate-600">Pour {order.child}</p>
                              <p className="text-sm text-slate-600">Commande {order.id} • {order.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="font-semibold text-slate-800">{order.price}</p>
                              <Badge variant={order.status === 'Livré' ? 'default' : 'secondary'} className="mt-1">
                                {order.status === 'Livré' && <CheckCircle className="w-3 h-3 mr-1" />}
                                {order.status === 'En cours' && <Package className="w-3 h-3 mr-1" />}
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Children Tab */}
            <TabsContent value="children">
              <Card className="bg-white shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Baby className="w-5 h-5 text-blue-500" />
                    <span>Mes enfants</span>
                  </CardTitle>
                  <CardDescription>
                    Gérez les profils de vos enfants et leurs préférences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {children.map((child) => (
                      <div key={child.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                              <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">{child.name}</h3>
                              <p className="text-sm text-slate-600">{child.age} ans</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium text-slate-700">Préférences:</span>
                            <span className="text-slate-600 ml-2">{child.preferences}</span>
                          </div>
                          <div>
                            <span className="font-medium text-slate-700">Thème favori:</span>
                            <span className="text-slate-600 ml-2">{child.favoriteTheme}</span>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="font-medium text-slate-700">Livres créés:</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              {child.booksCount}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="text-center">
                        <Baby className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 font-medium">Ajouter un enfant</p>
                        <p className="text-sm text-slate-500">Créez un nouveau profil</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Tab */}
            <TabsContent value="billing">
              <Card className="bg-white shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-blue-500" />
                    <span>Historique des paiements</span>
                  </CardTitle>
                  <CardDescription>
                    Consultez l'historique de vos factures et paiements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {paymentHistory.map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <div>
                          <p className="font-medium text-slate-800">{payment.description}</p>
                          <p className="text-sm text-slate-600">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-slate-800">{payment.amount}</p>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subscription Tab */}
            <TabsContent value="subscription">
              <Card className="bg-white shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Crown className="w-5 h-5 text-blue-500" />
                    <span>Mon abonnement</span>
                  </CardTitle>
                  <CardDescription>
                    Gérez votre abonnement Premium
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Current Subscription */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Crown className="w-8 h-8 text-orange-500" />
                          <div>
                            <h3 className="text-xl font-bold text-slate-800">Plan {subscription.plan}</h3>
                            <p className="text-slate-600">{subscription.price}</p>
                          </div>
                        </div>
                        <Badge variant={subscription.isActive ? 'default' : 'secondary'} className="text-sm">
                          {subscription.isActive ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm font-medium text-slate-700">Prochaine facturation</p>
                          <p className="text-slate-600">{subscription.nextBilling}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">Statut</p>
                          <p className="text-slate-600">{subscription.isActive ? 'Renouvelé automatiquement' : 'Annulé'}</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        {subscription.isActive ? (
                          <Button 
                            variant="outline"
                            onClick={handleCancelSubscription}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Annuler l'abonnement
                          </Button>
                        ) : (
                          <Button 
                            onClick={handleReactivateSubscription}
                            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                          >
                            <Crown className="w-4 h-4 mr-2" />
                            Réactiver l'abonnement
                          </Button>
                        )}
                        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                          Modifier le plan
                        </Button>
                      </div>
                    </div>

                    {/* Subscription Benefits */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Avantages de votre abonnement Premium</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-slate-700">Livres illimités</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-slate-700">Livraison gratuite</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-slate-700">Histoires exclusives</span>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-slate-700">Support prioritaire</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Account;

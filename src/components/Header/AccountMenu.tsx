
import { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface AccountMenuProps {
  isLoggedIn: boolean;
  userEmail: string;
  onShowLogin: () => void;
  onShowSignup: () => void;
  onShowAccount: () => void;
  onLogout: () => void;
}

const AccountMenu = ({ 
  isLoggedIn, 
  userEmail, 
  onShowLogin, 
  onShowSignup, 
  onShowAccount, 
  onLogout 
}: AccountMenuProps) => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleShowAccount = () => {
    onShowAccount();
    setShowAccountMenu(false);
  };

  const handleLogout = () => {
    onLogout();
    setShowAccountMenu(false);
  };

  return (
    <Popover open={showAccountMenu} onOpenChange={setShowAccountMenu}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:block text-slate-700 font-medium">
            {isLoggedIn ? 'Mon compte' : 'Compte'}
          </span>
          <ChevronDown className="w-4 h-4 text-slate-600" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 bg-white border border-slate-200 shadow-xl" align="end">
        {isLoggedIn ? (
          <div className="p-4 space-y-3">
            <div className="border-b border-slate-200 pb-3">
              <p className="text-sm font-medium text-slate-800">Connecté en tant que:</p>
              <p className="text-sm text-slate-600 truncate">{userEmail}</p>
            </div>
            
            <Button
              onClick={handleShowAccount}
              variant="ghost"
              className="w-full justify-start text-slate-700 hover:bg-slate-50"
            >
              <User className="w-4 h-4 mr-2" />
              Mon compte
            </Button>
            
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <Button
              onClick={() => {
                onShowLogin();
                setShowAccountMenu(false);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              Se connecter
            </Button>
            
            <Button
              onClick={() => {
                onShowSignup();
                setShowAccountMenu(false);
              }}
              variant="outline"
              className="w-full border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              S'inscrire
            </Button>
            
            <p className="text-xs text-slate-500 text-center">
              Accédez à vos commandes et préférences
            </p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AccountMenu;

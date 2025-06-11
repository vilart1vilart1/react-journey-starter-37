
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import CartIcon from '@/components/ui/CartIcon';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';
import AccountModal from './auth/AccountModal';
import MobileSidebar from './MobileSidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const Header = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Hide header on specific pages
  const hiddenRoutes = ['/checkout', '/children', '/personalize'];
  const shouldHideHeader = hiddenRoutes.includes(location.pathname);

  const handleLogin = async (email: string, password: string) => {
    console.log('Login attempt:', { email, password });
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleSignup = async (name: string, email: string, phone: string, password: string) => {
    console.log('Signup attempt:', { name, email, phone, password });
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setShowAccountModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  if (shouldHideHeader) {
    return (
      <>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />

        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSignup={handleSignup}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />

        <AccountModal
          isOpen={showAccountModal}
          onClose={() => setShowAccountModal(false)}
          userEmail={userEmail}
        />
      </>
    );
  }

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Menu Icon */}
            <div className="flex-1 flex justify-start">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(true)}
                className="p-3 hover:bg-slate-100 transition-colors rounded-lg"
              >
                <Menu className="w-9 h-9 sm:w-10 sm:h-10 text-slate-700" />
              </Button>
            </div>
            
            {/* Center - Logo */}
            <div className="flex items-center justify-center">
              <Logo size="lg" clickable={true} />
            </div>
            
            {/* Right side - Cart and Profile */}
            <div className="flex items-center justify-end flex-1 space-x-1 sm:space-x-2">
              <div className="scale-125 sm:scale-150">
                <CartIcon />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleProfileClick}
                className="p-3 hover:bg-slate-100 transition-colors rounded-lg"
              >
                <User className="w-9 h-9 sm:w-10 sm:h-10 text-slate-700" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        onShowLogin={() => setShowLoginModal(true)}
        onShowAccount={() => setShowAccountModal(true)}
        onLogout={handleLogout}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={handleSignup}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />

      <AccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
        userEmail={userEmail}
      />
    </>
  );
};

export default Header;


import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import AccountMenu from './Header/AccountMenu';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import CartIcon from '@/components/ui/CartIcon';
import LoginModal from './auth/LoginModal';
import SignupModal from './auth/SignupModal';
import AccountModal from './auth/AccountModal';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

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

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-slate-200/50">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Logo */}
            <div className="flex items-center min-w-0 flex-1">
              <Logo size="lg" clickable={true} />
            </div>
            
            {/* Right side - Account and Cart */}
            <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
              <div className="order-2 sm:order-1">
                <AccountMenu
                  isLoggedIn={isLoggedIn}
                  userEmail={userEmail}
                  onShowLogin={() => setShowLoginModal(true)}
                  onShowSignup={() => setShowSignupModal(true)}
                  onShowAccount={() => setShowAccountModal(true)}
                  onLogout={handleLogout}
                />
              </div>
              <div className="order-1 sm:order-2">
                <CartIcon />
              </div>
            </div>
          </div>
        </div>
      </header>

      <WhatsAppButton />

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

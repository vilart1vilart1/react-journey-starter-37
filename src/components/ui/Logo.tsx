
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  clickable?: boolean;
}

const Logo = ({ className = '', showText = false, size = 'md', clickable = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-[65px] h-[65px]', // Increased by ~2% from 64px (w-16 h-16)
    xl: 'w-21 h-21',
    '2xl': 'w-20 h-20' // Reduced from w-25 h-25 for footer
  };

  const logoImage = (
    <img 
      src="/lovable-uploads/c91f2f1f-d57c-466e-806a-e0648f9ac238.png" 
      alt="My Little Hero Logo" 
      className={`${sizeClasses[size]} object-contain`}
    />
  );

  return (
    <div className={`flex items-center ${className}`}>
      {clickable ? (
        <Link to="/" className="hover:opacity-80 transition-opacity">
          {logoImage}
        </Link>
      ) : (
        logoImage
      )}
    </div>
  );
};

export default Logo;

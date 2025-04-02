import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  Calendar,
  Folder,
  MessageSquare,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Users2,
  Briefcase,
  CheckSquare,
  UserCircle,
  CircleDollarSign,
  LucideIcon,
} from 'lucide-react';

interface NavItemProps {
  label: string;
  icon: LucideIcon;
  to: string;
  exact?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon: Icon, to, exact }) => {
  const location = useLocation();
  const isActive = exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <NavLink
      to={to}
      className={`group flex items-center gap-3 rounded-md p-2 text-sm font-medium transition-colors hover:bg-gray-700 ${
        isActive ? 'bg-gray-700 text-white' : 'text-gray-400'
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { label: 'Accueil', icon: Home, to: '/', exact: true },
    { label: 'Artistes', icon: User, to: '/artistes' },
    { label: 'Événements', icon: Calendar, to: '/evenements' },
    { label: 'Projets', icon: Briefcase, to: '/projets' },
    { label: 'Tâches', icon: CheckSquare, to: '/taches' },
    { label: 'Factures', icon: FileText, to: '/factures' },
    { label: 'Transactions', icon: CircleDollarSign, to: '/transactions' },
    { label: 'Fichiers', icon: Folder, to: '/fichiers' },
    { label: 'Utilisateurs', icon: Users2, to: '/utilisateurs' },
    // { label: 'Messages', icon: MessageSquare, to: '/messages' },
    // { label: 'Profil', icon: UserCircle, to: '/profil' },
    // { label: 'Paramètres', icon: Settings, to: '/parametres' },
  ];

  return (
    <motion.div
      className={`flex h-full min-w-[200px] flex-col border-r border-gray-800 bg-gray-900 py-4 ${
        isCollapsed ? 'w-16' : 'w-64'
      } transition-all duration-200`}
    >
      <div className="mb-4 px-4">
        <button
          onClick={toggleCollapse}
          className="group flex items-center justify-center rounded-md p-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-700"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <NavItem label="Paramètres" icon={Settings} to="/parametres" />
      </div>
    </motion.div>
  );
};

export default Sidebar;

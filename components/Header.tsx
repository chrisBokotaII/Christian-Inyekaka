import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { GlobeIcon, ChevronDownIcon } from './IconComponents';

interface HeaderProps {
  professorName: string;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
];

const Header: React.FC<HeaderProps> = ({ professorName }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setisLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.research'), path: '/research' },
    { name: t('nav.teaching'), path: '/teaching' },
    { name: t('nav.news'), path: '/news' },
    { name: t('nav.cv'), path: '/cv' },
    { name: t('nav.contact'), path: '/contact' },
    { name: t('nav.dashboard'), path: '/dashboard' },
  ];

  const linkClass = "text-gray-600 hover:text-primary transition-colors duration-200";
  const activeLinkClass = "text-primary font-semibold";

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-xl font-bold text-gray-800 hover:text-primary">
              {professorName}
            </NavLink>
          </div>
          <div className="flex items-center">
            <nav className="hidden md:flex md:space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => (isActive ? activeLinkClass : linkClass)}
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <div className="hidden md:block border-l border-gray-200 ml-6 pl-6">
                 <div className="relative">
                    <button onClick={() => setisLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-2 text-gray-600 hover:text-primary">
                        <GlobeIcon className="w-5 h-5" />
                        <span>{language.toUpperCase()}</span>
                        <ChevronDownIcon className="w-4 h-4" />
                    </button>
                    {isLangMenuOpen && (
                        <div className="absolute end-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1">
                            {languages.map(lang => (
                                <button key={lang.code} onClick={() => { setLanguage(lang.code as any); setisLangMenuOpen(false); }} className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    )}
                 </div>
            </div>
            <div className="md:hidden ml-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-primary-light text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="px-3">
                    <label htmlFor="lang-select-mobile" className="block text-sm font-medium text-gray-700">Language</label>
                    <select
                        id="lang-select-mobile"
                        value={language}
                        onChange={(e) => { setLanguage(e.target.value as any); setIsMenuOpen(false); }}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                    >
                        {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

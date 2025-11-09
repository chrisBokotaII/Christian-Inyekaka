
import React from 'react';
import type { SocialLink } from '../types';

interface FooterProps {
  professorName: string;
  socialLinks: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ professorName, socialLinks }) => {
  return (
    <footer className="bg-secondary border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {professorName}. All rights reserved.
          </p>
          <div className="flex space-x-5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-primary transition-colors duration-200"
                aria-label={link.name}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

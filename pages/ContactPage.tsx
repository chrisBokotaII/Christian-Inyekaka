import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ProfessorInfo, SocialLink } from '../types';

interface ContactPageProps {
  professorInfo: ProfessorInfo;
  socialLinks: SocialLink[];
}

const ContactPage: React.FC<ContactPageProps> = ({ professorInfo, socialLinks }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary border-b pb-2">{t('contact.title')}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{t('contact.getInTouch')}</h2>
          <p>
            <strong>{t('contact.email')}:</strong> <a href={`mailto:${professorInfo.email}`} className="text-primary hover:underline">{professorInfo.email}</a>
          </p>
          <p>
            <strong>{t('contact.office')}:</strong> {professorInfo.office}
          </p>
          <p>
            <strong>{t('contact.affiliation')}:</strong> {professorInfo.affiliation}
          </p>
          <div className="flex space-x-4 mt-4">
            {socialLinks.map(link => (
              <a 
                key={link.name} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-500 hover:text-primary"
                aria-label={link.name}
              >
                <link.icon className="w-8 h-8" />
              </a>
            ))}
          </div>
        </div>
        <div>
            <h2 className="text-2xl font-semibold mb-4">{t('contact.officeLocation')}</h2>
            {/* Placeholder for a map */}
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center text-gray-500">
                {t('contact.mapPlaceholder')}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
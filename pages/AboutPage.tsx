import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ProfessorInfo } from '../types';

interface AboutPageProps {
  professorInfo: ProfessorInfo;
}

const AboutPage: React.FC<AboutPageProps> = ({ professorInfo }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary border-b pb-2">{t('about.title')}</h1>
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-shrink-0">
          <img
            src={professorInfo.photo}
            alt={professorInfo.name}
            className="w-64 h-64 rounded-lg object-cover shadow-md"
          />
        </div>
        <div className="space-y-4 text-lg">
          <h2 className="text-2xl font-semibold">{professorInfo.name}</h2>
          <p className="text-gray-600">{professorInfo.title}</p>
          <p className="text-gray-600">{professorInfo.affiliation}</p>
          <p className="text-gray-700 whitespace-pre-line">{professorInfo.bio}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-primary border-b pb-2 mt-8 mb-4">{t('about.researchInterests')}</h2>
        <div className="flex flex-wrap gap-3">
          {professorInfo.researchInterests.map(interest => (
            <span key={interest} className="bg-primary-light text-primary font-medium py-1 px-3 rounded-full text-sm">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
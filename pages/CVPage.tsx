import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CvSummaryData } from '../types';

interface CVPageProps {
  cvData: CvSummaryData;
}

const CVPage: React.FC<CVPageProps> = ({ cvData }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">{t('cv.title')}</h1>
        <button className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
          {t('cv.downloadButton')}
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-semibold border-b-2 border-primary-light pb-2 mb-4">{t('cv.education')}</h2>
        <ul className="space-y-3">
          {cvData.education.map((edu, i) => (
            <li key={i}>
              <p className="font-bold">{edu.degree}</p>
              <p>{edu.institution}, {edu.year}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold border-b-2 border-primary-light pb-2 mb-4">{t('cv.appointments')}</h2>
        <ul className="space-y-3">
          {cvData.appointments.map((app, i) => (
            <li key={i}>
              <p className="font-bold">{app.role}</p>
              <p>{app.institution}</p>
              <p className="text-gray-500 text-sm">{app.period}</p>
            </li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold border-b-2 border-primary-light pb-2 mb-4">{t('cv.selectedPublications')}</h2>
        <ul className="space-y-4">
          {cvData.selectedPublications.map((pub) => (
            <li key={pub.id}>
              <p className="font-semibold">{pub.title}</p>
              <p className="text-sm">{pub.authors} ({pub.year}). <em>{pub.journal}</em>.</p>
            </li>
          ))}
        </ul>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold border-b-2 border-primary-light pb-2 mb-4">{t('cv.grants')}</h2>
        <ul className="space-y-3">
          {cvData.grants.map((grant, i) => (
            <li key={i}>
              <p className="font-bold">{grant.agency}</p>
              <p>{grant.title}</p>
              <p className="text-gray-500 text-sm">{grant.period}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CVPage;
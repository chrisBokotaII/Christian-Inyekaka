import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ProfessorInfo, NewsItem, Publication } from '../types';

interface HomePageProps {
  professorInfo: ProfessorInfo;
  newsItems: NewsItem[];
  publications: Publication[];
}

const HomePage: React.FC<HomePageProps> = ({ professorInfo, newsItems, publications }) => {
  const { t } = useLanguage();
  const latestNews = newsItems.slice(0, 2);
  const recentPublications = publications.slice(0, 2);

  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-2">{t('home.welcome')}</h1>
        <p className="text-xl text-gray-600">
          {t('home.subheading', { name: professorInfo.name, title: professorInfo.title })}
        </p>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-8">
        <img
          src={professorInfo.photo}
          alt={professorInfo.name}
          className="w-48 h-48 rounded-full object-cover shadow-lg"
        />
        <div className="text-lg text-gray-700">
          <p>{professorInfo.bio.split('. ').slice(0, 2).join('. ')}.</p>
          <Link to="/about" className="text-primary hover:underline mt-2 inline-block">
            {t('home.readMore')} &raquo;
          </Link>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-primary-light pb-2 mb-4">{t('home.latestNews')}</h2>
          <ul className="space-y-4">
            {latestNews.map(item => (
              <li key={item.id}>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.date}</p>
                <p className="text-gray-700">{item.description}</p>
              </li>
            ))}
          </ul>
          <Link to="/news" className="text-primary hover:underline mt-4 inline-block">
            {t('home.moreNews')} &raquo;
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-semibold border-b-2 border-primary-light pb-2 mb-4">{t('home.recentPublications')}</h2>
          <ul className="space-y-4">
            {recentPublications.map(pub => (
              <li key={pub.id} className="text-gray-700">
                <p className="font-semibold">{pub.title}</p>
                <p>{pub.authors}</p>
                <p className="text-sm italic">{pub.journal}, {pub.year}</p>
              </li>
            ))}
          </ul>
          <Link to="/research" className="text-primary hover:underline mt-4 inline-block">
            {t('home.viewAllPublications')} &raquo;
          </Link>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
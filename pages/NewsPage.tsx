import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { NewsItem } from '../types';

interface NewsPageProps {
  newsItems: NewsItem[];
}

const NewsPage: React.FC<NewsPageProps> = ({ newsItems }) => {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary border-b pb-2 mb-6">{t('news.title')}</h1>
      <div className="space-y-6">
        {newsItems.map(item => (
          <div key={item.id} className="p-4 border-l-4 border-primary-light bg-gray-50 rounded">
            <p className="text-sm text-gray-500 mb-1">{item.date}</p>
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="text-gray-700 mt-2">{item.description}</p>
            {item.link && <a href={item.link} className="text-primary hover:underline mt-2 inline-block">{t('news.readMore')}</a>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
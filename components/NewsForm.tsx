import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface NewsFormProps {
  newsItem?: NewsItem | null;
  onSubmit: (data: NewsItem) => void;
}

const NewsForm: React.FC<NewsFormProps> = ({ newsItem, onSubmit }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    title: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    if (newsItem) {
      setFormData({
        date: newsItem.date,
        title: newsItem.title,
        description: newsItem.description,
        link: newsItem.link || ''
      });
    }
  }, [newsItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting news item:', formData);
    onSubmit({ ...formData, id: newsItem?.id || Date.now() });
  };
  
  const inputClass = "w-full p-2 border rounded-md focus:ring-primary focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">{t('forms.news.date')}</label>
        <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">{t('forms.news.title')}</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('forms.news.description')}</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} className={inputClass} required rows={3}></textarea>
      </div>
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">{t('forms.news.link')}</label>
        <input type="url" name="link" id="link" value={formData.link} onChange={handleChange} className={inputClass} />
      </div>
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
        {newsItem ? t('forms.common.update') : t('forms.common.add')} {t('dashboard.contentNames.news')}
      </button>
    </form>
  );
};

export default NewsForm;

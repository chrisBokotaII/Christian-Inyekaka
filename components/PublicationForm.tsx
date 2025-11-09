import React, { useState, useEffect } from 'react';
import { Publication } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface PublicationFormProps {
  publication?: Publication | null;
  onSubmit: (data: Publication) => void;
}

const PublicationForm: React.FC<PublicationFormProps> = ({ publication, onSubmit }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear(),
    doi: '',
    link: ''
  });

  useEffect(() => {
    if (publication) {
      setFormData({
        title: publication.title,
        authors: publication.authors,
        journal: publication.journal,
        year: publication.year,
        doi: publication.doi || '',
        link: publication.link || ''
      });
    }
  }, [publication]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission, e.g., API call
    console.log('Submitting publication:', formData);
    onSubmit({ ...formData, id: publication?.id || Date.now() });
  };

  const inputClass = "w-full p-2 border rounded-md focus:ring-primary focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">{t('forms.publication.title')}</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="authors" className="block text-sm font-medium text-gray-700">{t('forms.publication.authors')}</label>
        <input type="text" name="authors" id="authors" value={formData.authors} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="journal" className="block text-sm font-medium text-gray-700">{t('forms.publication.journal')}</label>
        <input type="text" name="journal" id="journal" value={formData.journal} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">{t('forms.publication.year')}</label>
        <input type="number" name="year" id="year" value={formData.year} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="doi" className="block text-sm font-medium text-gray-700">{t('forms.publication.doi')}</label>
        <input type="text" name="doi" id="doi" value={formData.doi} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">{t('forms.publication.link')}</label>
        <input type="url" name="link" id="link" value={formData.link} onChange={handleChange} className={inputClass} />
      </div>
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
        {publication ? t('forms.common.update') : t('forms.common.add')} {t('dashboard.contentNames.publication')}
      </button>
    </form>
  );
};

export default PublicationForm;

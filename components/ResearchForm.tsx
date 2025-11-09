import React, { useState, useEffect } from 'react';
import { ResearchProject } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ResearchFormProps {
  project?: ResearchProject | null;
  onSubmit: (data: ResearchProject) => void;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ project, onSubmit }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Current' as 'Current' | 'Past',
    funding: '',
    repoLink: ''
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        status: project.status,
        funding: project.funding || '',
        repoLink: project.repoLink || ''
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting research project:', formData);
    onSubmit({ ...formData, id: project?.id || Date.now() });
  };
  
  const inputClass = "w-full p-2 border rounded-md focus:ring-primary focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">{t('forms.research.title')}</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('forms.research.description')}</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} className={inputClass} required rows={4}></textarea>
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">{t('forms.research.status')}</label>
        <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass}>
          <option value="Current">{t('forms.research.statusOptions.current')}</option>
          <option value="Past">{t('forms.research.statusOptions.past')}</option>
        </select>
      </div>
      <div>
        <label htmlFor="funding" className="block text-sm font-medium text-gray-700">{t('forms.research.funding')}</label>
        <input type="text" name="funding" id="funding" value={formData.funding} onChange={handleChange} className={inputClass} />
      </div>
      <div>
        <label htmlFor="repoLink" className="block text-sm font-medium text-gray-700">{t('forms.research.repoLink')}</label>
        <input type="url" name="repoLink" id="repoLink" value={formData.repoLink} onChange={handleChange} className={inputClass} />
      </div>
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
        {project ? t('forms.common.update') : t('forms.common.add')} {t('dashboard.contentNames.research')}
      </button>
    </form>
  );
};

export default ResearchForm;

import React, { useState, useEffect } from 'react';
import { ProfessorInfo } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SiteSettingsFormProps {
  professorInfo: ProfessorInfo;
  onUpdate: (info: ProfessorInfo) => void;
}

const SiteSettingsForm: React.FC<SiteSettingsFormProps> = ({ professorInfo, onUpdate }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ProfessorInfo>(professorInfo);

  useEffect(() => {
    setFormData(professorInfo);
  }, [professorInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, researchInterests: e.target.value.split(',').map(s => s.trim()) }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    alert('Site settings updated.');
  };

  const inputClass = "w-full p-2 border rounded-md focus:ring-primary focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('forms.settings.name')}</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">{t('forms.settings.title')}</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700">{t('forms.settings.affiliation')}</label>
          <input type="text" name="affiliation" id="affiliation" value={formData.affiliation} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('forms.settings.email')}</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="office" className="block text-sm font-medium text-gray-700">{t('forms.settings.office')}</label>
          <input type="text" name="office" id="office" value={formData.office} onChange={handleChange} className={inputClass} />
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">{t('forms.settings.photoUrl')}</label>
          <input type="url" name="photo" id="photo" value={formData.photo} onChange={handleChange} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">{t('forms.settings.bio')}</label>
        <textarea name="bio" id="bio" value={formData.bio} onChange={handleChange} className={inputClass} required rows={6}></textarea>
      </div>
      <div>
        <label htmlFor="researchInterests" className="block text-sm font-medium text-gray-700">{t('forms.settings.interests')}</label>
        <input type="text" name="researchInterests" id="researchInterests" value={formData.researchInterests.join(', ')} onChange={handleInterestsChange} className={inputClass} />
      </div>

      <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
        {t('forms.settings.save')}
      </button>
    </form>
  );
};

export default SiteSettingsForm;
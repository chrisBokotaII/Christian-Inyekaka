import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface CourseFormProps {
  course?: Course | null;
  onSubmit: (data: Course) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, onSubmit }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    description: '',
    status: 'Current' as 'Current' | 'Past',
    syllabusLink: ''
  });

  useEffect(() => {
    if (course) {
      setFormData({
        code: course.code,
        title: course.title,
        description: course.description,
        status: course.status,
        syllabusLink: course.syllabusLink || ''
      });
    }
  }, [course]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting course:', formData);
    onSubmit({ ...formData, id: course?.id || Date.now() });
  };
  
  const inputClass = "w-full p-2 border rounded-md focus:ring-primary focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">{t('forms.course.code')}</label>
        <input type="text" name="code" id="code" value={formData.code} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">{t('forms.course.title')}</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className={inputClass} required />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('forms.course.description')}</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} className={inputClass} required rows={3}></textarea>
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">{t('forms.course.status')}</label>
        <select name="status" id="status" value={formData.status} onChange={handleChange} className={inputClass}>
          <option value="Current">{t('forms.course.statusOptions.current')}</option>
          <option value="Past">{t('forms.course.statusOptions.past')}</option>
        </select>
      </div>
      <div>
        <label htmlFor="syllabusLink" className="block text-sm font-medium text-gray-700">{t('forms.course.syllabusLink')}</label>
        <input type="url" name="syllabusLink" id="syllabusLink" value={formData.syllabusLink} onChange={handleChange} className={inputClass} />
      </div>
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
        {course ? t('forms.common.update') : t('forms.common.add')} {t('dashboard.contentNames.course')}
      </button>
    </form>
  );
};

export default CourseForm;

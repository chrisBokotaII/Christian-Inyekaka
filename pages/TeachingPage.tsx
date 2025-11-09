import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Course } from '../types';

interface TeachingPageProps {
  courses: Course[];
}

const TeachingPage: React.FC<TeachingPageProps> = ({ courses }) => {
  const { t } = useLanguage();
  const currentCourses = courses.filter(c => c.status === 'Current');
  const pastCourses = courses.filter(c => c.status === 'Past');

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold text-primary border-b pb-2 mb-6">{t('teaching.title')}</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">{t('teaching.currentCourses')}</h2>
        {currentCourses.length > 0 ? (
          <div className="space-y-6">
            {currentCourses.map(course => (
              <div key={course.id} className="p-4 border rounded-lg">
                <h3 className="text-xl font-bold">{course.code}: {course.title}</h3>
                <p className="text-gray-700 my-2">{course.description}</p>
                {course.syllabusLink && <a href={course.syllabusLink} className="text-primary hover:underline">{t('teaching.viewSyllabus')}</a>}
              </div>
            ))}
          </div>
        ) : <p>{t('teaching.noCurrentCourses')}</p>}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">{t('teaching.pastCourses')}</h2>
        {pastCourses.length > 0 ? (
          <div className="space-y-6">
            {pastCourses.map(course => (
              <div key={course.id} className="p-4 border rounded-lg bg-gray-50">
                <h3 className="text-xl font-bold">{course.code}: {course.title}</h3>
                <p className="text-gray-700 my-2">{course.description}</p>
              </div>
            ))}
          </div>
        ) : <p>{t('teaching.noPastCourses')}</p>}
      </section>
    </div>
  );
};

export default TeachingPage;
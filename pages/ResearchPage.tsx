import React from 'react';
import { GithubIcon } from '../components/IconComponents';
import { useLanguage } from '../contexts/LanguageContext';
import { ResearchProject, Publication } from '../types';

interface ResearchPageProps {
  researchProjects: ResearchProject[];
  publications: Publication[];
  searchQuery: string;
}

const ResearchPage: React.FC<ResearchPageProps> = ({ researchProjects, publications }) => {
  const { t } = useLanguage();
  const currentProjects = researchProjects.filter(p => p.status === 'Current');
  const pastProjects = researchProjects.filter(p => p.status === 'Past');

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-primary border-b pb-2 mb-6">{t('research.projectsTitle')}</h1>
        
        <h2 className="text-2xl font-semibold mb-4">{t('research.currentProjects')}</h2>
        <div className="space-y-6">
          {currentProjects.map(project => (
            <div key={project.id} className="p-4 border rounded-lg">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-700 my-2">{project.description}</p>
              {project.funding && <p className="text-sm text-gray-500"><strong>{t('research.funding')}:</strong> {project.funding}</p>}
              {project.repoLink && <a href={project.repoLink} className="text-primary hover:underline flex items-center gap-1 mt-1"><GithubIcon className="w-4 h-4" /> {t('research.viewRepo')}</a>}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">{t('research.pastProjects')}</h2>
        <div className="space-y-6">
          {pastProjects.map(project => (
            <div key={project.id} className="p-4 border rounded-lg bg-gray-50">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <p className="text-gray-700 my-2">{project.description}</p>
              {project.repoLink && <a href={project.repoLink} className="text-primary hover:underline flex items-center gap-1 mt-1"><GithubIcon className="w-4 h-4" /> {t('research.viewRepo')}</a>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h1 className="text-3xl font-bold text-primary border-b pb-2 mb-6">{t('research.publicationsTitle')}</h1>
        <div className="space-y-6">
          {publications.map(pub => (
            <div key={pub.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">{pub.title}</h3>
              <p className="text-gray-600">{pub.authors}</p>
              <p className="text-gray-500 italic">{pub.journal}, {pub.year}</p>
              <div className="mt-2">
                {pub.doi && <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mr-4">DOI</a>}
                {pub.link && <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{t('research.link')}</a>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ResearchPage;
import React, { useState } from 'react';
import PublicationForm from '../components/PublicationForm';
import ResearchForm from '../components/ResearchForm';
import CourseForm from '../components/CourseForm';
import NewsForm from '../components/NewsForm';
import SiteSettingsForm from '../components/SiteSettingsForm';
import Modal from '../components/Modal';
import { useLanguage } from '../contexts/LanguageContext';
import { ProfessorInfo, Publication, ResearchProject, Course, NewsItem } from '../types';

type ModalContent = 'publication' | 'research' | 'course' | 'news' | null;

interface DashboardPageProps {
  professorInfo: ProfessorInfo;
  publications: Publication[];
  researchProjects: ResearchProject[];
  courses: Course[];
  newsItems: NewsItem[];
  onUpdateProfessorInfo: (info: ProfessorInfo) => void;
  onAddOrUpdatePublication: (pub: Publication) => void;
  onDeletePublication: (id: number) => void;
  onAddOrUpdateResearch: (proj: ResearchProject) => void;
  onDeleteResearch: (id: number) => void;
  onAddOrUpdateCourse: (course: Course) => void;
  onDeleteCourse: (id: number) => void;
  onAddOrUpdateNews: (item: NewsItem) => void;
  onDeleteNews: (id: number) => void;
}


const DashboardPage: React.FC<DashboardPageProps> = ({
  professorInfo,
  onUpdateProfessorInfo,
  onAddOrUpdatePublication,
  onAddOrUpdateResearch,
  onAddOrUpdateCourse,
  onAddOrUpdateNews,
}) => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>(null);
  const [editingItem, setEditingItem] = useState<any>(null); // Simplified for example

  const openModal = (content: ModalContent, item: any = null) => {
    setModalContent(content);
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setEditingItem(null);
  };

  const handlePublicationSubmit = (data: Publication) => {
    onAddOrUpdatePublication(data);
    closeModal();
  };

  const handleResearchSubmit = (data: ResearchProject) => {
    onAddOrUpdateResearch(data);
    closeModal();
  };

  const handleCourseSubmit = (data: Course) => {
    onAddOrUpdateCourse(data);
    closeModal();
  };

  const handleNewsSubmit = (data: NewsItem) => {
    onAddOrUpdateNews(data);
    closeModal();
  };

  const getModalTitle = () => {
    if (!modalContent) return '';
    const action = editingItem ? t('dashboard.edit') : t('dashboard.addNew');
    const contentName = t(`dashboard.contentNames.${modalContent}`);
    return `${action} ${contentName}`;
  };
  
  const buttonClass = "bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors";

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary border-b pb-2">{t('dashboard.title')}</h1>
      
      <p>{t('dashboard.placeholder')}</p>

      <div className="grid md:grid-cols-2 gap-6">
        <DashboardSection title={t('dashboard.publications.title')}>
          <button onClick={() => openModal('publication')} className={buttonClass}>{t('dashboard.publications.add')}</button>
        </DashboardSection>

        <DashboardSection title={t('dashboard.research.title')}>
          <button onClick={() => openModal('research')} className={buttonClass}>{t('dashboard.research.add')}</button>
        </DashboardSection>

        <DashboardSection title={t('dashboard.courses.title')}>
          <button onClick={() => openModal('course')} className={buttonClass}>{t('dashboard.courses.add')}</button>
        </DashboardSection>

        <DashboardSection title={t('dashboard.news.title')}>
          <button onClick={() => openModal('news')} className={buttonClass}>{t('dashboard.news.add')}</button>
        </DashboardSection>
      </div>

      <DashboardSection title={t('dashboard.siteSettings.title')}>
        <SiteSettingsForm professorInfo={professorInfo} onUpdate={onUpdateProfessorInfo} />
      </DashboardSection>


      <Modal isOpen={isModalOpen} onClose={closeModal} title={getModalTitle()}>
        {modalContent === 'publication' && <PublicationForm publication={editingItem} onSubmit={handlePublicationSubmit} />}
        {modalContent === 'research' && <ResearchForm project={editingItem} onSubmit={handleResearchSubmit} />}
        {modalContent === 'course' && <CourseForm course={editingItem} onSubmit={handleCourseSubmit} />}
        {modalContent === 'news' && <NewsForm newsItem={editingItem} onSubmit={handleNewsSubmit} />}
      </Modal>
    </div>
  );
};

const DashboardSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
  <div className="p-6 border rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

export default DashboardPage;
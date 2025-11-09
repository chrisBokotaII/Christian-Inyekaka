import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ResearchPage from './pages/ResearchPage';
import TeachingPage from './pages/TeachingPage';
import NewsPage from './pages/NewsPage';
import CVPage from './pages/CVPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';

import { 
  PROFESSOR_INFO as defaultProfessorInfo, 
  PUBLICATIONS_DATA,
  RESEARCH_PROJECTS_DATA,
  COURSES_DATA,
  NEWS_DATA,
  CV_DATA,
} from './constants';

import { LanguageProvider } from './contexts/LanguageContext';
import { SocialLink, Publication, ResearchProject, Course, NewsItem, ProfessorInfo } from './types';
import { GoogleScholarIcon, TwitterIcon, LinkedInIcon, GithubIcon } from './components/IconComponents';

function App() {
  // Centralized state for all content
  const [professorInfo, setProfessorInfo] = useState<ProfessorInfo>(defaultProfessorInfo);
  const [publications, setPublications] = useState<Publication[]>(PUBLICATIONS_DATA);
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>(RESEARCH_PROJECTS_DATA);
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [news, setNews] = useState<NewsItem[]>(NEWS_DATA);
  const [searchQuery, setSearchQuery] = useState('');

  // CRUD handlers
  const handleUpdateProfessorInfo = (info: ProfessorInfo) => setProfessorInfo(info);
  
  const handleAddOrUpdatePublication = (pub: Publication) => {
    setPublications(prev => prev.find(p => p.id === pub.id) ? prev.map(p => p.id === pub.id ? pub : p) : [...prev, pub]);
  };
  const handleDeletePublication = (id: number) => setPublications(prev => prev.filter(p => p.id !== id));

  const handleAddOrUpdateResearch = (proj: ResearchProject) => {
    setResearchProjects(prev => prev.find(p => p.id === proj.id) ? prev.map(p => p.id === proj.id ? proj : p) : [...prev, proj]);
  };
  const handleDeleteResearch = (id: number) => setResearchProjects(prev => prev.filter(p => p.id !== id));

  const handleAddOrUpdateCourse = (course: Course) => {
    setCourses(prev => prev.find(c => c.id === course.id) ? prev.map(c => c.id === course.id ? course : c) : [...prev, course]);
  };
  const handleDeleteCourse = (id: number) => setCourses(prev => prev.filter(c => c.id !== id));

  const handleAddOrUpdateNews = (item: NewsItem) => {
    setNews(prev => prev.find(n => n.id === item.id) ? prev.map(n => n.id === item.id ? item : n) : [...prev, item].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };
  const handleDeleteNews = (id: number) => setNews(prev => prev.filter(n => n.id !== id));

  const socialLinks: SocialLink[] = [
    { name: 'Google Scholar', url: '#', icon: GoogleScholarIcon },
    { name: 'Twitter', url: '#', icon: TwitterIcon },
    { name: 'LinkedIn', url: '#', icon: LinkedInIcon },
    { name: 'Github', url: '#', icon: GithubIcon },
  ];

  const filteredPublications = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-background text-text">
          <Header professorName={professorInfo.name} />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<HomePage professorInfo={professorInfo} newsItems={news} publications={publications} />} />
              <Route path="/about" element={<AboutPage professorInfo={professorInfo} />} />
              <Route path="/research" element={<ResearchPage researchProjects={researchProjects} publications={filteredPublications} searchQuery={searchQuery} />} />
              <Route path="/teaching" element={<TeachingPage courses={courses} />} />
              <Route path="/news" element={<NewsPage newsItems={news} />} />
              <Route path="/cv" element={<CVPage cvData={{...CV_DATA, selectedPublications: publications.slice(0,3)}} />} />
              <Route path="/contact" element={<ContactPage professorInfo={professorInfo} socialLinks={socialLinks} />} />
              <Route path="/dashboard" element={
                <DashboardPage 
                  professorInfo={professorInfo}
                  publications={publications}
                  researchProjects={researchProjects}
                  courses={courses}
                  newsItems={news}
                  onUpdateProfessorInfo={handleUpdateProfessorInfo}
                  onAddOrUpdatePublication={handleAddOrUpdatePublication}
                  onDeletePublication={handleDeletePublication}
                  onAddOrUpdateResearch={handleAddOrUpdateResearch}
                  onDeleteResearch={handleDeleteResearch}
                  onAddOrUpdateCourse={handleAddOrUpdateCourse}
                  onDeleteCourse={handleDeleteCourse}
                  onAddOrUpdateNews={handleAddOrUpdateNews}
                  onDeleteNews={handleDeleteNews}
                />
              } />
            </Routes>
          </main>
          <Footer professorName={professorInfo.name} socialLinks={socialLinks} />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
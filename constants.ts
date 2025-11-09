import {
  ProfessorInfo,
  SocialLink,
  Publication,
  ResearchProject,
  Course,
  NewsItem,
  CvSummaryData,
} from './types';
import { GoogleScholarIcon, TwitterIcon, LinkedInIcon, GithubIcon } from './components/IconComponents';

export const PROFESSOR_INFO: ProfessorInfo = {
  name: 'Dr. Evelyn Reed',
  title: 'Associate Professor of Computer Science',
  affiliation: 'University of Techland',
  email: 'e.reed@university.edu',
  office: '404, Gates Hall',
  bio: `Dr. Evelyn Reed is an Associate Professor in the Department of Computer Science at the University of Techland. 
        Her research focuses on the intersection of artificial intelligence, human-computer interaction, and computational linguistics. 
        She is passionate about developing intelligent systems that can understand and generate human language to facilitate more natural and effective communication between people and machines.
        Before joining U of T, she was a postdoctoral researcher at the AI Institute. She received her Ph.D. from the University of Innovation.`,
  researchInterests: [
    'Natural Language Processing',
    'Human-Computer Interaction',
    'Machine Learning',
    'AI Ethics',
  ],
  photo: 'https://via.placeholder.com/300', // Placeholder image
};

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Google Scholar', url: '#', icon: GoogleScholarIcon },
  { name: 'Twitter', url: '#', icon: TwitterIcon },
  { name: 'LinkedIn', url: '#', icon: LinkedInIcon },
  { name: 'Github', url: '#', icon: GithubIcon },
];

export const PUBLICATIONS_DATA: Publication[] = [
  { id: 1, title: 'The Future of Conversational AI', authors: 'Reed, E., et al.', journal: 'Journal of AI Research', year: 2023, doi: '10.1234/jai.2023.001' },
  { id: 2, title: 'Ethical Considerations in NLP Models', authors: 'Reed, E., Chen, L.', journal: 'AI & Society', year: 2022, link: '#' },
  { id: 3, title: 'A Novel Architecture for Language Understanding', authors: 'Smith, J., Reed, E.', journal: 'Proceedings of ACL', year: 2021 },
];

export const RESEARCH_PROJECTS_DATA: ResearchProject[] = [
  { id: 1, title: 'Project CogniText', description: 'Developing next-generation text summarization models that preserve nuance and context.', status: 'Current', funding: 'National Science Foundation', repoLink: '#' },
  { id: 2, title: 'Human-AI Collaboration', description: 'Investigating how humans and AI can collaborate effectively on complex creative tasks.', status: 'Current' },
  { id: 3, title: 'Dialogue Systems for Education', description: 'Built an AI-powered tutor to help students learn programming.', status: 'Past', repoLink: '#' },
];

export const COURSES_DATA: Course[] = [
  { id: 1, code: 'CS 401', title: 'Advanced Natural Language Processing', description: 'A graduate-level course on the latest techniques in NLP.', status: 'Current', syllabusLink: '#' },
  { id: 2, code: 'CS 101', title: 'Introduction to AI', description: 'An introductory course covering the fundamentals of Artificial Intelligence.', status: 'Past' },
];

export const NEWS_DATA: NewsItem[] = [
  { id: 1, date: '2023-10-26', title: 'New Grant Awarded', description: 'Dr. Reed received a new grant from the NSF to study Human-AI collaboration.', link: '#' },
  { id: 2, date: '2023-09-01', title: 'Paper Accepted at NeurIPS', description: 'Our latest work on ethical AI has been accepted to NeurIPS 2023.', link: '#' },
];

export const CV_DATA: CvSummaryData = {
  education: [
    { degree: 'Ph.D. in Computer Science', institution: 'University of Innovation', year: '2018' },
    { degree: 'M.S. in Computer Science', institution: 'State University', year: '2014' },
  ],
  appointments: [
    { role: 'Associate Professor', institution: 'University of Techland', period: '2022 - Present' },
    { role: 'Assistant Professor', institution: 'University of Techland', period: '2018 - 2022' },
  ],
  selectedPublications: PUBLICATIONS_DATA.slice(0, 2),
  grants: [
    { agency: 'National Science Foundation', title: 'Project CogniText', period: '2022 - 2025' }
  ]
};

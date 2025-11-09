
import React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: React.FC<{ className?: string }>;
}

export interface Publication {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  link?: string;
}

export interface ResearchProject {
  id: number;
  title: string;
  description: string;
  status: 'Current' | 'Past';
  funding?: string;
  repoLink?: string;
}

export interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  status: 'Current' | 'Past';
  syllabusLink?: string;
}

export interface NewsItem {
  id: number;
  date: string;
  title: string;
  description: string;
  link?: string;
}

export interface Education {
    degree: string;
    institution: string;
    year: string;
}

export interface Appointment {
    role: string;
    institution: string;
    period: string;
}

export interface Grant {
    agency: string;
    title: string;
    period: string;
}

export interface CvSummaryData {
    education: Education[];
    appointments: Appointment[];
    selectedPublications: Publication[];
    grants: Grant[];
}

export interface ProfessorInfo {
  name: string;
  title: string;
  affiliation: string;
  email: string;
  office: string;
  bio: string;
  researchInterests: string[];
  photo: string;
}

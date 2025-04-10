import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define database types
export type ContactMessage = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'read' | 'replied';
};

export type Project = {
  id: string;
  created_at: string;
  title: string;
  summary: string;
  description: string;
  industry: string;
  client?: string;
  featured: boolean;
  image_url: string;
};

export type Service = {
  id: string;
  created_at: string;
  title: string;
  description: string;
  short_description: string;
  icon: string;
  featured: boolean;
};

export type Industry = {
  id: string;
  created_at: string;
  name: string;
  description: string;
  icon?: string;
  applications: string[] | string;
  image_url?: string;
};

export type WebContent = {
  id: string;
  created_at: string;
  key: string;
  value: string;
  section: string;
  type: 'text' | 'html' | 'image';
};

export type Job = {
  id: string;
  created_at: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[]; // or string if stored as JSON
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  postDate: string;
  expiryDate?: string;
  status: 'open' | 'closed' | 'draft';
  featured: boolean;
};

export type JobApplication = {
  id: string;
  created_at: string;
  job_id: string | null; // null for general applications
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  resume_url: string;
  cover_letter_url?: string;
  message?: string;
  status: 'new' | 'reviewing' | 'interview' | 'rejected' | 'hired';
};

// Contact Message Functions
export const getContactMessages = async (): Promise<ContactMessage[]> => {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching contact messages:', error);
    throw error;
  }

  return data || [];
};

export const getNewContactMessagesCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new');

  if (error) {
    console.error('Error fetching new contact messages count:', error);
    throw error;
  }

  return count || 0;
};

export const updateMessageStatus = async (
  messageId: string, 
  status: 'new' | 'read' | 'replied'
): Promise<void> => {
  const { error } = await supabase
    .from('contact_messages')
    .update({ status })
    .eq('id', messageId);

  if (error) {
    console.error('Error updating message status:', error);
    throw error;
  }
};

// Project Functions
export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }

  return data || [];
};

export const getFeaturedProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured projects:', error);
    throw error;
  }

  return data || [];
};

export const getProject = async (id: string): Promise<Project> => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    if (error.code === 'PGRST116') {
      throw new Error(`Project with ID ${id} not found`);
    } else {
      throw new Error(error.message || 'Failed to fetch project');
    }
  }

  if (!data) {
    throw new Error(`Project with ID ${id} not found`);
  }

  return data;
};

export const createProject = async (project: Omit<Project, 'id' | 'created_at'>): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .insert([project]);

  if (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

export const updateProject = async (id: string, project: Partial<Project>): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id);

  if (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

// Service Functions
export const getServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching services:', error);
    throw error;
  }

  return data || [];
};

export const getFeaturedServices = async (): Promise<Service[]> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching featured services:', error);
    throw error;
  }

  return data || [];
};

export const getService = async (id: string): Promise<Service> => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching service:', error);
    if (error.code === 'PGRST116') {
      throw new Error(`Service with ID ${id} not found`);
    } else {
      throw new Error(error.message || 'Failed to fetch service');
    }
  }

  if (!data) {
    throw new Error(`Service with ID ${id} not found`);
  }

  return data;
};

export const createService = async (service: Omit<Service, 'id' | 'created_at'>): Promise<void> => {
  const { error } = await supabase
    .from('services')
    .insert([service]);

  if (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

export const updateService = async (id: string, service: Partial<Service>): Promise<void> => {
  const { error } = await supabase
    .from('services')
    .update(service)
    .eq('id', id);

  if (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

export const deleteService = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// Industry Functions
export const getIndustries = async (): Promise<Industry[]> => {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching industries:', error);
    throw error;
  }

  return data || [];
};

export const getIndustry = async (id: string): Promise<Industry> => {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching industry:', error);
    if (error.code === 'PGRST116') {
      throw new Error(`Industry with ID ${id} not found`);
    } else {
      throw new Error(error.message || 'Failed to fetch industry');
    }
  }

  if (!data) {
    throw new Error(`Industry with ID ${id} not found`);
  }

  return data;
};

export const createIndustry = async (industry: Omit<Industry, 'id' | 'created_at'>): Promise<void> => {
  const { error } = await supabase
    .from('industries')
    .insert([industry]);

  if (error) {
    console.error('Error creating industry:', error);
    throw error;
  }
};

export const updateIndustry = async (id: string, industry: Partial<Industry>): Promise<void> => {
  const { error } = await supabase
    .from('industries')
    .update(industry)
    .eq('id', id);

  if (error) {
    console.error('Error updating industry:', error);
    throw error;
  }
};

export const deleteIndustry = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('industries')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting industry:', error);
    throw error;
  }
};

// Web Content Functions
export const getWebContent = async (): Promise<WebContent[]> => {
  const { data, error } = await supabase
    .from('web_content')
    .select('*')
    .order('section', { ascending: true });

  if (error) {
    console.error('Error fetching web content:', error);
    throw error;
  }

  return data || [];
};

export const getContentByKey = async (key: string): Promise<WebContent> => {
  const { data, error } = await supabase
    .from('web_content')
    .select('*')
    .eq('key', key)
    .single();

  if (error) {
    console.error('Error fetching content by key:', error);
    if (error.code === 'PGRST116') {
      throw new Error(`Content with key '${key}' not found`);
    } else {
      throw new Error(error.message || 'Failed to fetch content');
    }
  }

  if (!data) {
    throw new Error(`Content with key '${key}' not found`);
  }

  return data;
};

export const getContentBySection = async (section: string): Promise<WebContent[]> => {
  const { data, error } = await supabase
    .from('web_content')
    .select('*')
    .eq('section', section);

  if (error) {
    console.error(`Error fetching content for section ${section}:`, error);
    throw error;
  }

  return data || [];
};

export const createWebContent = async (content: Omit<WebContent, 'id' | 'created_at'>): Promise<void> => {
  const { error } = await supabase
    .from('web_content')
    .insert([content]);

  if (error) {
    console.error('Error creating web content:', error);
    throw error;
  }
};

export const updateWebContent = async (id: string, content: Partial<WebContent>): Promise<void> => {
  const { error } = await supabase
    .from('web_content')
    .update(content)
    .eq('id', id);

  if (error) {
    console.error('Error updating web content:', error);
    throw error;
  }
};

export const deleteWebContent = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('web_content')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting web content:', error);
    throw error;
  }
};

// Job Functions
export const getJobs = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'open')
    .order('postDate', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }

  return data || [];
};

export const getFeaturedJobs = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('status', 'open')
    .eq('featured', true)
    .order('postDate', { ascending: false });

  if (error) {
    console.error('Error fetching featured jobs:', error);
    throw error;
  }

  return data || [];
};

export const getJob = async (id: string): Promise<Job> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching job:', error);
    if (error.code === 'PGRST116') {
      // PostgreSQL error code for 'not found'
      throw new Error(`Job with ID ${id} not found`);
    } else {
      throw new Error(error.message || 'Failed to fetch job');
    }
  }

  if (!data) {
    throw new Error(`Job with ID ${id} not found`);
  }

  return data;
};

export const createJob = async (job: Omit<Job, 'id' | 'created_at'>): Promise<void> => {
  const { error } = await supabase
    .from('jobs')
    .insert([job]);

  if (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const updateJob = async (id: string, job: Partial<Job>): Promise<void> => {
  const { error } = await supabase
    .from('jobs')
    .update(job)
    .eq('id', id);

  if (error) {
    console.error('Error updating job:', error);
    throw error;
  }
};

export const deleteJob = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting job:', error);
    throw error;
  }
};

// Functions for job applications
export const submitJobApplication = async (
  application: Omit<JobApplication, 'id' | 'created_at' | 'status'>,
): Promise<void> => {
  const { error } = await supabase
    .from('job_applications')
    .insert([{ ...application, status: 'new' }]);

  if (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export const getJobApplications = async (): Promise<JobApplication[]> => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching job applications:', error);
    throw error;
  }

  return data || [];
};

export const getJobApplicationsByJob = async (jobId: string): Promise<JobApplication[]> => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('job_id', jobId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching job applications for job:', error);
    throw error;
  }

  return data || [];
};

export const updateJobApplicationStatus = async (
  id: string,
  status: JobApplication['status']
): Promise<void> => {
  const { error } = await supabase
    .from('job_applications')
    .update({ status })
    .eq('id', id);

  if (error) {
    console.error('Error updating job application status:', error);
    throw new Error(error.message || `Failed to update application status to ${status}`);
  }
};

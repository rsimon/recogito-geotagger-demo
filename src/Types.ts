export interface UserProfile {

  id: string;

  nickname?: string;

  avatar_url?: string;

}

export interface Project {

  id: string;

  created_at: string;

  created_by: string;

  updated_at: string;

  updated_by: string;

  name: string;

  description: string;

}

export interface Document {

  id: string; 

  created_at: string;

  created_by: string;

  updated_at?: string;

  updated_by?: string;

  name: string;

}

export interface Context {

  id: string;

  created_at: string;

  created_by: string;

  updated_at?: string;

  updated_by?: string;

  name: string;

  project_id: string;

}

export interface Layer {

  id: string;

  created_at: string;

  created_by: string;

  updated_at?: string;

  updated_by?: string;

  context_id: string;

  document_id: string;

  name?: string;

  description?: string;

}

export interface Translations { 
 
  lang: string;

  t: { [key: string]: string };

}
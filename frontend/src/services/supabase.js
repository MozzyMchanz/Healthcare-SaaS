import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kmciitkwywtjmzoomqgh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__sjphBCtIm1V0BMNu_zgPw_OmZHNyes';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth
export const supabaseAuth = {
  signIn: (email, password) => supabase.auth.signInWithPassword({ email, password }),
  signUp: (email, password) => supabase.auth.signUp({ email, password }),
  signOut: () => supabase.auth.signOut(),
  getSession: () => supabase.auth.getSession(),
};

// Example CRUD for patients (replace 'patients' table)
export const supabasePatients = {
  getAll: () => supabase.from('patients').select('*'),
  create: (data) => supabase.from('patients').insert([data]),
  update: (id, data) => supabase.from('patients').update(data).eq('id', id),
  delete: (id) => supabase.from('patients').delete().eq('id', id),
};

// Similar for doctors, appointments, etc.
export const supabaseDoctors = {
  getAll: () => supabase.from('doctors').select('*'),
  create: (data) => supabase.from('doctors').insert([data]),
};

export const supabaseAppointments = {
  getAll: () => supabase.from('appointments').select('*'),
  create: (data) => supabase.from('appointments').insert([data]),
};

export const supabaseMedicalRecords = {
  getAll: () => supabase.from('medical_records').select('*'),
  create: (data) => supabase.from('medical_records').insert([data]),
};

export const supabaseBilling = {
  getAll: () => supabase.from('billing').select('*'),
  create: (data) => supabase.from('billing').insert([data]),
};

export default supabase;


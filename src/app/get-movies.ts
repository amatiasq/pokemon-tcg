import { supabase } from '../supabase';

// these functions are unused
// here just for reference

export async function getAllMovies() {
  const { data: movies, error } = await supabase
    // you need to create this table in the supabase dashboard
    // and protect which users my read and write to it using
    // Row Level Security (RLS)
    // check it out, it's amazing
    .from('movies')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  console.log('movies', movies);
}

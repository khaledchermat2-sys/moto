'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * PUBLIC: Récupérer tous les podcasts
 */
export async function getPodcasts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('podcasts')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    // Silently handle error for the showroom, but keep logging for debug
    console.warn('Note: Podcasts fetch failed, returning empty list.', error.message)
    return []
  }
  return data
}

/**
 * ADMIN: Créer un podcast
 */
export async function createPodcast(formData: FormData) {
  const supabase = await createClient()
  const titre = formData.get('titre') as string
  const description = formData.get('description') as string
  const video_url = formData.get('video_url') as string
  const thumbnail_url = formData.get('thumbnail_url') as string

  const { error } = await supabase
    .from('podcasts')
    .insert([{ 
      titre, 
      description, 
      video_url, 
      thumbnail_url 
    }])

  if (error) throw error
  revalidatePath('/admin/podcasts')
  revalidatePath('/podcasts')
}

/**
 * ADMIN: Supprimer un podcast
 */
export async function deletePodcast(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('podcasts')
    .delete()
    .eq('id', id)

  if (error) throw error
  revalidatePath('/admin/podcasts')
  revalidatePath('/podcasts')
}

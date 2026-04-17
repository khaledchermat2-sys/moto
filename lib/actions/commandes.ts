'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function creerCommande(data: {
  nom: string
  telephone: string
  wilaya: string
  adresse: string
  notes?: string
  produit_id: string
}) {
  const supabase = await createClient()
  const { error } = await supabase.from('commandes').insert(data)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/commandes')
}

export async function changerStatutCommande(id: string, statut: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('commandes')
    .update({ statut })
    .eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/commandes')
}

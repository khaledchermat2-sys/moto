'use server'

import { createAdminClient, createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * MARQUES
 */
export async function getMarques() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('marques')
    .select('*')
    .order('nom')
  
  if (error) throw error
  return data
}

export async function getMarqueById(id: string) {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('marques')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function createMarque(formData: FormData) {
  const supabase = await createAdminClient()
  const nom = formData.get('nom') as string
  const logo_url = formData.get('logo_url') as string

  const { error } = await supabase
    .from('marques')
    .insert([{ nom, logo_url }])

  if (error) throw error
  revalidatePath('/admin/marques')
}

export async function updateMarque(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  const nom = formData.get('nom') as string
  const logo_url = formData.get('logo_url') as string

  const { error } = await supabase
    .from('marques')
    .update({ nom, logo_url })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/admin/marques')
}

export async function deleteMarque(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('marques')
    .delete()
    .eq('id', id)

  if (error) throw error
  revalidatePath('/admin/marques')
}

/**
 * PRODUITS
 */
export async function getProduits() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('produits')
    .select('*, marques(nom)')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function getProduitById(id: string) {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('produits')
    .select('*, marques(*), produit_photos(*)')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function createProduit(formData: FormData) {
  const supabase = await createAdminClient()
  const nom = formData.get('nom') as string
  const description = formData.get('description') as string
  const prix = parseFloat(formData.get('prix') as string)
  const stock = parseInt(formData.get('stock') as string)
  const categorie = formData.get('categorie') as string
  const marque_id = formData.get('marque_id') as string
  const image_url = formData.get('image_url') as string
  const gallery = formData.get('gallery') as string // Comma separated URLs

  const { data: product, error: pError } = await supabase
    .from('produits')
    .insert([{
      nom,
      description,
      prix,
      stock,
      categorie,
      marque_id,
      publie: true
    }])
    .select()
    .single()

  if (pError) throw pError

  const photosToInsert = []
  
  if (image_url) {
    photosToInsert.push({
      produit_id: product.id,
      url: image_url,
      ordre: 0
    })
  }

  if (gallery) {
    const urls = gallery.split(',').filter(u => u.trim() !== '')
    urls.forEach((url, index) => {
      photosToInsert.push({
        produit_id: product.id,
        url: url,
        ordre: index + 1
      })
    })
  }

  if (photosToInsert.length > 0) {
    const { error: photoError } = await supabase
      .from('produit_photos')
      .insert(photosToInsert)
    
    if (photoError) throw photoError
  }

  revalidatePath('/admin/produits')
}

export async function updateProduit(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  const nom = formData.get('nom') as string
  const description = formData.get('description') as string
  const prix = parseFloat(formData.get('prix') as string)
  const stock = parseInt(formData.get('stock') as string)
  const categorie = formData.get('categorie') as string
  const marque_id = formData.get('marque_id') as string
  const image_url = formData.get('image_url') as string

  const { error: pError } = await supabase
    .from('produits')
    .update({
      nom,
      description,
      prix,
      stock,
      categorie,
      marque_id
    })
    .eq('id', id)

  if (pError) throw pError

  if (image_url) {
    // Check if simple image exists
    const { data: existingPhotos } = await supabase
      .from('produit_photos')
      .select('id')
      .eq('produit_id', id)
      .order('ordre')
      .limit(1)

    if (existingPhotos && existingPhotos.length > 0) {
      await supabase
        .from('produit_photos')
        .update({ url: image_url })
        .eq('id', existingPhotos[0].id)
    } else {
      await supabase
        .from('produit_photos')
        .insert([{ produit_id: id, url: image_url, ordre: 0 }])
    }
  }

  revalidatePath('/admin/produits')
}

export async function deleteProduit(id: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('produits')
    .delete()
    .eq('id', id)

  if (error) throw error
  revalidatePath('/admin/produits')
}

export async function addProduitPhoto(produitId: string, url: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('produit_photos')
    .insert([{ produit_id: produitId, url, ordre: 99 }])

  if (error) throw error
  revalidatePath(`/admin/produits/${produitId}`)
}

export async function deleteProduitPhoto(photoId: string, produitId: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('produit_photos')
    .delete()
    .eq('id', photoId)

  if (error) throw error
  revalidatePath(`/admin/produits/${produitId}`)
}

/**
 * COMMANDES
 */
export async function getCommandes() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from('commandes')
    .select('*, produits(nom)')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

export async function updateCommandeStatut(id: string, statut: string) {
  const supabase = await createAdminClient()
  const { error } = await supabase
    .from('commandes')
    .update({ statut })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/admin/commandes')
}

/**
 * DASHBOARD STATS
 */
export async function getDashboardStats() {
  const supabase = await createAdminClient()
  
  const { count: productsCount } = await supabase.from('produits').select('*', { count: 'exact', head: true })
  const { count: ordersCount } = await supabase.from('commandes').select('*', { count: 'exact', head: true })
  const { count: pendingCount } = await supabase.from('commandes').select('*', { count: 'exact', head: true }).eq('statut', 'en_attente')
  
  const { data: recentOrders } = await supabase.from('commandes').select('*, produits(nom, statut)').limit(5).order('created_at', { ascending: false })
  
  // Calculate revenue
  const { data: confirmedOrders } = await supabase
    .from('commandes')
    .select('produits(prix)')
    .in('statut', ['confirmee', 'livree'])
  
  const revenue = confirmedOrders?.reduce((acc, curr: any) => acc + (curr.produits?.prix || 0), 0) || 0
  
  return {
    productsCount: productsCount || 0,
    ordersCount: ordersCount || 0,
    pendingCount: pendingCount || 0,
    revenue,
    recentOrders: recentOrders || []
  }
}

export async function adminLogout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}

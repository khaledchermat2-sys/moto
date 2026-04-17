'use server'

import { createClient } from '@/lib/supabase/server'

/**
 * MARQUES
 */
export async function getPublicMarques() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('marques')
    .select('*')
    .order('nom')
  
  if (error) {
    console.error('Error fetching brands:', error)
    return []
  }
  return data
}

/**
 * PRODUITS
 */
export async function getLatestProducts(limit = 6) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('produits')
    .select('*, marques(nom), produit_photos(*)')
    .eq('publie', true)
    .limit(limit)
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching latest products:', error)
    return []
  }
  return data
}

export async function getCatalogueProducts(filters: { brandId?: string, category?: string, search?: string }) {
  const supabase = await createClient()
  let query = supabase
    .from('produits')
    .select('*, marques(nom), produit_photos(*)')
    .eq('publie', true)
    .order('created_at', { ascending: false })

  if (filters.brandId && filters.brandId !== 'all') {
    query = query.eq('marque_id', filters.brandId)
  }

  if (filters.category && filters.category !== 'all') {
    query = query.eq('categorie', filters.category)
  }

  if (filters.search) {
    query = query.ilike('nom', `%${filters.search}%`)
  }

  const { data, error } = await query
  
  if (error) {
    console.error('Error fetching catalogue products:', error)
    return []
  }
  return data
}

export async function getProductDetail(id: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('produits')
    .select('*, marques(*), produit_photos(*)')
    .eq('id', id)
    .single()
  
  if (error) {
    console.error('Error fetching product detail:', error)
    return null
  }
  return data
}

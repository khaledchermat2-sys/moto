export type Marque = {
  id: string
  nom: string
  logo_url: string | null
  created_at: string
}

export type Produit = {
  id: string
  nom: string
  description: string
  prix: number
  stock: number
  categorie: 'moto' | 'piece'
  publie: boolean
  marque_id: string
  marque?: Marque
  produit_photos?: { url: string; ordre: number }[]
  created_at: string
}

export type Commande = {
  id: string
  nom: string
  telephone: string
  wilaya: string
  adresse: string
  notes: string | null
  statut: 'en_attente' | 'confirmee' | 'refusee' | 'livree'
  produit_id: string
  produit?: Produit
  created_at: string
}

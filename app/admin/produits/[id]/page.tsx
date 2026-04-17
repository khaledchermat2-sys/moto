'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { getMarques, getProduitById, updateProduit, addProduitPhoto, deleteProduitPhoto } from '@/lib/actions/admin'
import { ArrowLeft, Loader2, Save, Package, Image as ImageIcon, Tag, DollarSign, Briefcase, Trash2, Plus, X } from 'lucide-react'
import Link from 'next/link'
import ImageUpload from '@/app/components/Admin/ImageUpload'

export default function EditProduitPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const id = resolvedParams.id

  const [marques, setMarques] = useState<any[]>([])
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const fetchData = async () => {
    try {
      const [marquesData, productData] = await Promise.all([
        getMarques(),
        getProduitById(id)
      ])
      setMarques(marquesData)
      setProduct(productData)
      setImageUrl(productData.produit_photos?.[0]?.url || '')
    } catch (err) {
      console.error(err)
      alert("Erreur lors du chargement des données")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const handleAddGalleryPhoto = async (url: string) => {
    try {
      await addProduitPhoto(id, url)
      fetchData()
    } catch (err) {
      alert("Erreur lors de l'ajout de la photo")
    }
  }

  const handleDeleteGalleryPhoto = async (photoId: string) => {
    if (!window.confirm("Supprimer cette photo ?")) return
    try {
      await deleteProduitPhoto(photoId, id)
      fetchData()
    } catch (err) {
      alert("Erreur lors de la suppression")
    }
  }
// ... [handleSubmit remains same]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.set('image_url', imageUrl)

    try {
      await updateProduit(id, formData)
      router.push('/admin/produits')
      router.refresh()
    } catch (err) {
      alert("Erreur lors de la modification du produit")
    } finally {
      setIsSubmitting(false)
    }
  }
// ... [rest of the component structure remains the same, update JSX below]

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
        <Loader2 className="animate-spin" size={40} color="var(--green)" />
      </div>
    )
  }

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Produit non trouvé</h2>
        <Link href="/admin/produits" style={{ color: 'var(--green)', textDecoration: 'none', marginTop: '20px', display: 'inline-block' }}>Retour à la liste</Link>
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      <div style={{ marginBottom: '40px' }}>
        <Link href="/admin/produits" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '16px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Retour à la liste
        </Link>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-1px' }}>Modifier: {product.nom}</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
        {/* Colonne Gauche: Infos Principales */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Nom du Produit</label>
              <input required name="nom" type="text" defaultValue={product.nom} placeholder="Ex: TVS RTR 200 4V" style={inputStyle} />
            </div>

            <div style={{ marginBottom: '0' }}>
              <label style={labelStyle}>Description</label>
              <textarea name="description" rows={6} defaultValue={product.description} placeholder="Détails du produit, caractéristiques techniques..." style={inputStyle}></textarea>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px' }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <ImageIcon size={20} color="var(--green)" /> Média Principal
             </h3>
             <ImageUpload 
               bucket="produits"
               defaultValue={product.produit_photos?.[0]?.url}
               onUpload={(url) => setImageUrl(url)}
             />
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px' }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Plus size={20} color="var(--green)" /> Galerie d'images
             </h3>
             
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {product.produit_photos?.slice(1).map((photo: any) => (
                  <div key={photo.id} style={{ position: 'relative', aspectRatio: '1', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      type="button"
                      onClick={() => handleDeleteGalleryPhoto(photo.id)}
                      style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255,0,0,0.7)', border: 'none', color: '#fff', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                
                <div style={{ aspectRatio: '1', border: '2px dashed var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                   <ImageUpload 
                     bucket="produits"
                     onUpload={(url) => handleAddGalleryPhoto(url)}
                   />
                </div>
             </div>
             <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ajoutez des photos supplémentaires pour la galerie du produit.</p>
          </div>
        </div>

        {/* Colonne Droite: Détails & Prix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Prix (DA)</label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={18} style={iconInputStyle} />
                <input required name="prix" type="number" step="0.1" defaultValue={product.prix} placeholder="0.00" style={{ ...inputStyle, paddingLeft: '48px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Stock Actuel</label>
              <div style={{ position: 'relative' }}>
                <Package size={18} style={iconInputStyle} />
                <input required name="stock" type="number" defaultValue={product.stock} style={{ ...inputStyle, paddingLeft: '48px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Catégorie</label>
              <div style={{ position: 'relative' }}>
                <Tag size={18} style={iconInputStyle} />
                <select name="categorie" required defaultValue={product.categorie} style={{ ...inputStyle, paddingLeft: '48px', appearance: 'none' }}>
                  <option value="moto">Moto</option>
                  <option value="piece">Pièce Détachée</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '0' }}>
              <label style={labelStyle}>Marque</label>
              <div style={{ position: 'relative' }}>
                <Briefcase size={18} style={iconInputStyle} />
                <select name="marque_id" required defaultValue={product.marque_id} style={{ ...inputStyle, paddingLeft: '48px', appearance: 'none' }}>
                  <option value="">Sélectionner une marque</option>
                  {marques.map(m => (
                    <option key={m.id} value={m.id}>{m.nom}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-green" style={{ width: '100%', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1rem' }}>
            {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <><Save size={20} /> Mettre à jour</>}
          </button>
        </div>
      </form>
    </div>
  )
}

const labelStyle = { display: 'block', marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }
const inputStyle = { width: '100%', background: '#1a1a1a', border: '1px solid var(--border)', padding: '14px 16px', borderRadius: '12px', color: '#fff', fontSize: '0.95rem' }
const iconInputStyle = { position: 'absolute' as const, left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }

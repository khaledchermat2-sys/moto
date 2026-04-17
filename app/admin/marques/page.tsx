'use client'

import { useState, useEffect } from 'react'
import { getMarques, createMarque, updateMarque, deleteMarque } from '@/lib/actions/admin'
import { Plus, Trash2, Edit, X, Loader2, Image as ImageIcon, Tags } from 'lucide-react'
import ImageUpload from '@/app/components/Admin/ImageUpload'

export default function MarquesPage() {
  const [marques, setMarques] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingMarque, setEditingMarque] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoUrl, setLogoUrl] = useState('')

  const fetchMarques = async () => {
    try {
      const data = await getMarques()
      setMarques(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarques()
  }, [])

  const handleOpenModal = (marque: any = null) => {
    setEditingMarque(marque)
    setLogoUrl(marque?.logo_url || '')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setEditingMarque(null)
    setLogoUrl('')
    setShowModal(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    // Manually add logo_url since it's not a direct input anymore
    formData.set('logo_url', logoUrl)
    
    try {
      if (editingMarque) {
        await updateMarque(editingMarque.id, formData)
      } else {
        await createMarque(formData)
      }
      handleCloseModal()
      fetchMarques()
    } catch (err) {
      alert("Erreur lors de l'opération")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette marque ?")) return
    try {
      await deleteMarque(id)
      fetchMarques()
    } catch (err) {
      alert("Erreur lors de la suppression")
    }
  }

  return (
    <div className="animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-1px' }}>Gestion des Marques</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Gérez les logos et noms des marques de motos.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-green" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 700 }}
        >
          <Plus size={20} /> Nouvelle Marque
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
          <Loader2 className="animate-spin" size={40} color="var(--green)" />
        </div>
      ) : marques.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 40px', background: 'var(--bg-card)', borderRadius: '24px', border: '1px dashed var(--border)' }}>
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ padding: '24px', background: 'rgba(57,230,0,0.1)', borderRadius: '50%' }}>
              <Tags size={48} color="var(--green)" />
            </div>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Aucune marque trouvée</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Commencez par ajouter votre première marque.</p>
          <button onClick={() => handleOpenModal()} className="btn-outline">Ajouter maintenant</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {marques.map((m) => (
            <div key={m.id} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  width: 64, height: 64, background: 'var(--bg-primary)', borderRadius: '16px', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)',
                  overflow: 'hidden'
                }}>
                  {m.logo_url ? (
                    <img src={m.logo_url} alt={m.nom} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} />
                  ) : (
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--green)' }}>{m.nom[0]}</span>
                  )}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{m.nom}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {new Date(m.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => handleOpenModal(m)}
                  style={{ background: 'rgba(57,230,0,0.1)', border: 'none', color: 'var(--green)', cursor: 'pointer', padding: '10px', borderRadius: '10px', transition: '0.2s' }}
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(m.id)}
                  style={{ background: 'rgba(255,68,68,0.1)', border: 'none', color: '#ff4444', cursor: 'pointer', padding: '10px', borderRadius: '10px', transition: '0.2s' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#111', border: '1px solid var(--border)', borderRadius: '24px', width: '100%', maxWidth: '500px', overflow: 'hidden' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{editingMarque ? 'Modifier' : 'Nouvelle'} Marque</h2>
              <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} style={{ padding: '32px' }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Nom de la marque</label>
                <input 
                  autoFocus
                  required
                  name="nom"
                  type="text" 
                  defaultValue={editingMarque?.nom || ''}
                  placeholder="Ex: Yamaha, Suzuki..."
                  style={{ width: '100%', background: '#1a1a1a', border: '1px solid var(--border)', padding: '14px 16px', borderRadius: '12px', color: '#fff' }}
                />
              </div>

              <div style={{ marginBottom: '32px' }}>
                <ImageUpload 
                  label="Logo de la marque"
                  bucket="logos"
                  defaultValue={editingMarque?.logo_url}
                  onUpload={(url) => setLogoUrl(url)}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={handleCloseModal} className="btn-outline" style={{ flex: 1 }}>Annuler</button>
                <button type="submit" disabled={isSubmitting} className="btn-green" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : (editingMarque ? "Mettre à jour" : "Créer la marque")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

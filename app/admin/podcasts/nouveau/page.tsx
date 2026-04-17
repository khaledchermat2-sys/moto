'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPodcast } from '@/lib/actions/podcasts'
import { ArrowLeft, Loader2, Save, Video, Type, AlignLeft, Globe } from 'lucide-react'
import Link from 'next/link'
import ImageUpload from '@/app/components/Admin/ImageUpload'

export default function NouveauPodcastPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    formData.set('thumbnail_url', thumbnailUrl)
    
    try {
      await createPodcast(formData)
      router.push('/admin/podcasts')
      router.refresh()
    } catch (err) {
      alert("Erreur lors de la création du podcast")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="animate-fadeIn">
      <div style={{ marginBottom: '40px' }}>
        <Link href="/admin/podcasts" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '16px', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Retour à la liste
        </Link>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-1px' }}>Nouveau Podcast</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Ajoutez un nouvel épisode à votre série de podcasts vidéo.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
        {/* Colonne Gauche: Contenu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Titre du Podcast</label>
              <div style={{ position: 'relative' }}>
                <Type size={18} style={iconInputStyle} />
                <input required name="titre" type="text" placeholder="Ex: Épisode 01 - L'avenir de la moto en Algérie" style={{ ...inputStyle, paddingLeft: '48px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>URL de la Vidéo (YouTube/Vimeo)</label>
              <div style={{ position: 'relative' }}>
                <Globe size={18} style={iconInputStyle} />
                <input required name="video_url" type="url" placeholder="https://www.youtube.com/watch?v=..." style={{ ...inputStyle, paddingLeft: '48px' }} />
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Copiez simplement le lien de votre vidéo YouTube ou Vimeo.</p>
            </div>

            <div>
              <label style={labelStyle}>Description / Notes</label>
              <div style={{ position: 'relative' }}>
                <AlignLeft size={18} style={{ ...iconInputStyle, top: '24px' }} />
                <textarea name="description" rows={5} placeholder="Décrivez le contenu de cet épisode..." style={{ ...inputStyle, paddingLeft: '48px' }}></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Droite: Média & Validation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Video size={18} color="var(--green)" /> Miniature (Thumbnail)
            </h3>
            <ImageUpload 
              bucket="produits"
              onUpload={(url) => setThumbnailUrl(url)}
              label="Image de couverture"
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-green" style={{ width: '100%', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1rem' }}>
            {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <><Save size={20} /> Publier le Podcast</>}
          </button>
        </div>
      </form>
    </div>
  )
}

const labelStyle = { display: 'block', marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }
const inputStyle = { width: '100%', background: '#1a1a1a', border: '1px solid var(--border)', padding: '14px 16px', borderRadius: '12px', color: '#fff', fontSize: '0.95rem' }
const iconInputStyle = { position: 'absolute' as const, left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPodcasts, deletePodcast } from '@/lib/actions/podcasts'
import { Plus, Trash2, Loader2, Video, Search, ExternalLink } from 'lucide-react'

export default function PodcastsAdminPage() {
  const [podcasts, setPodcasts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchPodcasts = async () => {
    try {
      const data = await getPodcasts()
      setPodcasts(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce podcast ?")) return
    try {
      await deletePodcast(id)
      fetchPodcasts()
    } catch (err) {
      alert("Erreur lors de la suppression")
    }
  }

  const filteredPodcasts = podcasts.filter(p => 
    p.titre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-1px' }}>Video Podcasts</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Gérez les épisodes de votre podcast vidéo.</p>
        </div>
        <Link href="/admin/podcasts/nouveau" className="btn-green" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
          <Plus size={20} /> Nouveau Podcast
        </Link>
      </div>

      <div style={{ marginBottom: '30px', position: 'relative', maxWidth: '400px' }}>
        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          placeholder="Rechercher un podcast..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '12px 16px', paddingLeft: '48px', borderRadius: '12px', color: '#fff' }}
        />
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
            <Loader2 className="animate-spin" size={40} color="var(--green)" />
          </div>
        ) : filteredPodcasts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <Video size={48} color="var(--border)" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Aucun podcast trouvé</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Commencez par ajouter votre premier épisode.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '20px 24px' }}>Podcast</th>
                <th style={{ padding: '20px 24px' }}>Date</th>
                <th style={{ padding: '20px 24px' }}>Lien Video</th>
                <th style={{ padding: '20px 24px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPodcasts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: 60, height: 40, background: 'var(--bg-primary)', borderRadius: 8, border: '1px solid var(--border)', overflow: 'hidden' }}>
                        {p.thumbnail_url ? (
                          <img src={p.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--border)' }}>
                            <Video size={18} />
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 700 }}>{p.titre}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.description?.substring(0, 40)}...</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {new Date(p.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <a href={p.video_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--green)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}>
                      Voir la vidéo <ExternalLink size={14} />
                    </a>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      style={{ padding: '8px', color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

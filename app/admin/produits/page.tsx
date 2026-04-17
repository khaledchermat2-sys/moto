'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { getProduits, deleteProduit } from '@/lib/actions/admin'
import { Plus, Trash2, Edit2, Loader2, Package, Search } from 'lucide-react'

export default function ProduitsAdminPage() {
  const [produits, setProduits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchProduits = async () => {
    try {
      const data = await getProduits()
      setProduits(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProduits()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return
    try {
      await deleteProduit(id)
      fetchProduits()
    } catch (err) {
      alert("Erreur lors de la suppression")
    }
  }

  const filteredProduits = produits.filter(p => 
    p.nom.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="animate-fadeIn">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-1px' }}>Gestion des Produits</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Gérez le catalogue de motos et pièces.</p>
        </div>
        <Link href="/admin/produits/nouveau" className="btn-green" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
          <Plus size={20} /> Nouveau Produit
        </Link>
      </div>

      <div style={{ marginBottom: '30px', position: 'relative', maxWidth: '400px' }}>
        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
        <input 
          type="text" 
          placeholder="Rechercher un produit..." 
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
        ) : filteredProduits.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 40px' }}>
            <Package size={48} color="var(--border)" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Aucun produit trouvé</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Ajoutez des produits pour commencer.</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
              <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '20px 24px' }}>Produit</th>
                <th style={{ padding: '20px 24px' }}>Marque</th>
                <th style={{ padding: '20px 24px' }}>Catégorie</th>
                <th style={{ padding: '20px 24px' }}>Prix</th>
                <th style={{ padding: '20px 24px' }}>Statut</th>
                <th style={{ padding: '20px 24px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProduits.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="table-row">
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: 44, height: 44, background: 'var(--bg-primary)', borderRadius: 10, border: '1px solid var(--border)', overflow: 'hidden' }}>
                        {p.produit_photos?.[0]?.url ? (
                          <img src={p.produit_photos[0].url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--border)' }}>
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                      <span style={{ fontWeight: 700 }}>{p.nom}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>{p.marques?.nom || 'Sans marque'}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{p.categorie}</td>
                  <td style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--green)' }}>{parseFloat(p.prix).toLocaleString()} DA</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      background: p.stock > 0 ? 'rgba(57,230,0,0.1)' : 'rgba(255,68,68,0.1)', 
                      color: p.stock > 0 ? 'var(--green)' : '#ff4444', 
                      padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 
                    }}>
                      {p.stock > 0 ? `En stock (${p.stock})` : 'Rupture'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <Link href={`/admin/produits/${p.id}`} className="btn-icon" style={{ padding: '8px', color: 'var(--text-secondary)' }}>
                        <Edit2 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="btn-icon" style={{ padding: '8px', color: '#ff4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{`
        .table-row:hover {
          background: rgba(255,255,255,0.01);
        }
        .btn-icon {
          border-radius: 8px;
          transition: background 0.2s;
        }
        .btn-icon:hover {
          background: rgba(255,255,255,0.05);
        }
      `}</style>
    </div>
  )
}

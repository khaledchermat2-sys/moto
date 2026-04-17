'use client'

import { useState, useEffect } from 'react'
import { getCommandes, updateCommandeStatut } from '@/lib/actions/admin'
import { Search, Filter, Calendar, Phone, MapPin, Package, CheckCircle2, Clock, XCircle, Truck } from 'lucide-react'
import { Loader2 } from 'lucide-react'

export default function CommandesPage() {
  const [commandes, setCommandes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  const fetchCommandes = async () => {
    try {
      const data = await getCommandes()
      setCommandes(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommandes()
  }, [])

  const handleStatusChange = async (id: string, newStatut: string) => {
    try {
      await updateCommandeStatut(id, newStatut)
      fetchCommandes()
    } catch (err) {
      alert("Erreur lors de la mise à jour du statut")
    }
  }

  const filteredCommandes = filterStatus === 'all' 
    ? commandes 
    : commandes.filter(c => c.statut === filterStatus)

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
        <Loader2 className="animate-spin" size={40} color="var(--green)" />
      </div>
    )
  }

  return (
    <div className="animate-fadeIn">
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, letterSpacing: '-1px' }}>Commandes Clients</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Gérez les réservations et les ventes en direct.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="all">Tous les statuts</option>
            <option value="en_attente">En attente</option>
            <option value="confirmee">Confirmée</option>
            <option value="refusee">Refusée</option>
            <option value="livree">Livrée</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {filteredCommandes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', background: 'var(--bg-card)', borderRadius: '24px', border: '1px dashed var(--border)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Aucune commande trouvée.</p>
          </div>
        ) : (
          filteredCommandes.map(c => (
            <div key={c.id} style={orderCardStyle}>
              {/* Header: Status & ID */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getStatusIcon(c.statut)}
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>Commande #{c.id.substring(0, 8).toUpperCase()}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Statut:</span>
                  <select 
                    value={c.statut} 
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    style={{ ...selectStyle, background: getStatusBg(c.statut), color: getStatusColor(c.statut), border: 'none', padding: '6px 12px' }}
                  >
                    <option value="en_attente">En attente</option>
                    <option value="confirmee">Confirmée</option>
                    <option value="refusee">Refusée</option>
                    <option value="livree">Livrée</option>
                  </select>
                </div>
              </div>

              {/* Grid: Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
                {/* Client Info */}
                <div>
                   <h4 style={sectionTitleStyle}>Client</h4>
                   <div style={infoRowStyle}><Search size={14} style={{ opacity: 0.5 }} /> {c.nom}</div>
                   <div style={infoRowStyle}><Phone size={14} style={{ opacity: 0.5 }} /> {c.telephone}</div>
                </div>

                {/* Logistics */}
                <div>
                   <h4 style={sectionTitleStyle}>Logistique</h4>
                   <div style={infoRowStyle}><MapPin size={14} style={{ opacity: 0.5 }} /> {c.wilaya}</div>
                   <div style={{ ...infoRowStyle, fontSize: '0.85rem' }}>{c.adresse}</div>
                </div>

                {/* Product Related */}
                <div>
                   <h4 style={sectionTitleStyle}>Produit</h4>
                   <div style={infoRowStyle}><Package size={14} style={{ opacity: 0.5 }} /> {c.produits?.nom || 'Inconnu'}</div>
                   <div style={infoRowStyle}><Calendar size={14} style={{ opacity: 0.5 }} /> {new Date(c.created_at).toLocaleDateString()}</div>
                </div>
              </div>

              {c.notes && (
                <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  Note: {c.notes}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function getStatusIcon(statut: string) {
  switch (statut) {
    case 'en_attente': return <Clock size={20} color="#ffaa00" />
    case 'confirmee': return <CheckCircle2 size={20} color="var(--green)" />
    case 'refusee': return <XCircle size={20} color="#ff4444" />
    case 'livree': return <Truck size={20} color="#00aaff" />
    default: return null
  }
}

function getStatusBg(statut: string) {
  switch (statut) {
    case 'en_attente': return 'rgba(255,170,0,0.1)'
    case 'confirmee': return 'rgba(57,230,0,0.1)'
    case 'refusee': return 'rgba(255,68,68,0.1)'
    case 'livree': return 'rgba(0,170,255,0.1)'
    default: return 'var(--bg-secondary)'
  }
}

function getStatusColor(statut: string) {
  switch (statut) {
    case 'en_attente': return '#ffaa00'
    case 'confirmee': return 'var(--green)'
    case 'refusee': return '#ff4444'
    case 'livree': return '#00aaff'
    default: return '#fff'
  }
}

const selectStyle = { 
  background: 'var(--bg-card)', 
  border: '1px solid var(--border)', 
  color: '#fff', 
  padding: '10px 16px', 
  borderRadius: '12px', 
  fontSize: '0.9rem', 
  fontWeight: 600,
  cursor: 'pointer'
}

const orderCardStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: '24px',
  padding: '30px',
  transition: '0.3s'
}

const sectionTitleStyle = {
  fontSize: '0.75rem',
  fontWeight: 800,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  marginBottom: '12px'
}

const infoRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: '#fff',
  fontWeight: 600,
  marginBottom: '8px'
}

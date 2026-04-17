'use client'

import { useState, useEffect } from 'react'
import { getDashboardStats } from '@/lib/actions/admin'
import { Loader2, TrendingUp, Package, ShoppingCart, Clock } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
        <Loader2 className="animate-spin" size={40} color="var(--green)" />
      </div>
    )
  }

  const statCards = [
    { label: 'Chiffre d\'Affaire', value: `${stats.revenue.toLocaleString()} DA`, icon: <TrendingUp size={24} />, color: 'var(--green)' },
    { label: 'Commandes Totales', value: stats.ordersCount, icon: <ShoppingCart size={24} />, color: '#00aaff' },
    { label: 'En Attente', value: stats.pendingCount, icon: <Clock size={24} />, color: '#ffaa00' },
  ]

  return (
    <div className="animate-fadeIn">
      <div style={{ marginBottom: '50px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: '-2px', marginBottom: '8px' }}>
          <span className="text-gradient">Vue d'ensemble</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '3px', background: 'var(--green)', borderRadius: '2px' }}></div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500 }}>Statistiques en temps réel • MOTORCYCLE DZ</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        {statCards.map((stat, i) => (
          <div key={i} className="glass card-hover" style={{ padding: '40px', borderRadius: '32px', border: '1px solid var(--border)', animation: `fadeInUp 0.6s ease forwards ${i * 0.1}s`, opacity: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>{stat.label}</div>
              <div style={{ padding: '12px', background: `${stat.color}15`, borderRadius: '16px', color: stat.color, boxShadow: `0 0 20px -5px ${stat.color}30` }}>{stat.icon}</div>
            </div>
            <div className="text-gradient" style={{ fontSize: '3.8rem', fontWeight: 900 }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '30px' }}>
        {/* Dernières Commandes */}
        <div className="glass" style={{ borderRadius: '32px', padding: '40px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '14px' }}>
              <ShoppingCart size={28} color="var(--green)" /> Commandes Récentes
            </h2>
            <Link href="/admin/commandes" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '0.85rem' }}>
              Tout voir
            </Link>
          </div>
          
          {stats.recentOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.01)', borderRadius: '24px', border: '1px dashed var(--border)' }}>
              Aucune commande à afficher pour le moment.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
                    <th style={{ padding: '0 16px' }}>Client</th>
                    <th style={{ padding: '0 16px' }}>Détails Produit</th>
                    <th style={{ padding: '0 16px', textAlign: 'right' }}>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order: any) => (
                    <tr key={order.id} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', transition: 'background 0.2s' }} className="table-row">
                      <td style={{ padding: '20px 16px', borderRadius: '16px 0 0 16px', fontWeight: 800, fontSize: '1.05rem' }}>{order.nom}</td>
                      <td style={{ padding: '20px 16px', color: 'var(--text-secondary)', fontWeight: 500 }}>{order.produits?.nom || 'Produit inconnu'}</td>
                      <td style={{ padding: '20px 16px', borderRadius: '0 16px 16px 0', textAlign: 'right' }}>
                        <span style={{ 
                          background: `${getStatusColor(order.statut)}15`, 
                          color: getStatusColor(order.statut), 
                          padding: '8px 16px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800,
                          textTransform: 'uppercase', letterSpacing: '0.5px',
                          boxShadow: `0 0 15px -5px ${getStatusColor(order.statut)}20`
                        }}>
                          {order.statut.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Alertes Stock */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass" style={{ borderRadius: '32px', padding: '40px', border: '1px solid var(--border)', background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,170,0,0.02) 100%)' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '14px' }}>
               <Package size={28} color="#ffaa00" /> Alertes Stock
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '24px', background: 'rgba(255,170,0,0.05)', borderRadius: '24px', border: '1px solid rgba(255,170,0,0.1)', transition: 'transform 0.2s' }} className="card-hover">
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 900, color: '#ffaa00', fontSize: '1.1rem' }}>TVS XL 100</div>
                    <span style={{ background: '#ffaa0020', color: '#ffaa00', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>CRITIQUE</span>
                 </div>
                 <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Plus que **2 unités** en stock.</div>
              </div>
              <div style={{ padding: '24px', background: 'rgba(255,170,0,0.05)', borderRadius: '24px', border: '1px solid rgba(255,170,0,0.1)', transition: 'transform 0.2s' }} className="card-hover">
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 900, color: '#ffaa00', fontSize: '1.1rem' }}>Liquide de frein (Castrol)</div>
                    <span style={{ background: '#ff444420', color: '#ff4444', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 800 }}>RUPTURE</span>
                 </div>
                 <div style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>**0 unité** restante. Réapprovisionnement urgent.</div>
              </div>
            </div>
          </div>

          <div className="glass" style={{ borderRadius: '32px', padding: '30px', textAlign: 'center', background: 'rgba(57,230,0,0.02)', border: '1px solid var(--border)' }}>
             <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
               Vous avez <strong style={{ color: 'var(--green)' }}>{stats.pendingCount}</strong> commandes en attente de traitement.
             </p>
             <Link href="/admin/commandes" className="btn-green" style={{ display: 'inline-block', marginTop: '16px', width: '100%', textDecoration: 'none' }}>
                Accéder aux Commandes
             </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .table-row:hover {
          background: rgba(255,255,255,0.05) !important;
        }
      `}</style>
    </div>
  )
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

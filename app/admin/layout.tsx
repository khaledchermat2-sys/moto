"use client"
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, Bike, Tags, LogOut, Video } from 'lucide-react'
import { adminLogout } from '@/lib/actions/admin'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'

  const handleLogout = async () => {
    try {
      await adminLogout()
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  if (isLoginPage) {
    return (
      <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '70px' }}>
        {children}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505', paddingTop: '70px' }}>
      
      {/* Admin Sidebar */}
      <aside style={{ width: '260px', background: 'var(--bg-card)', borderRight: '1px solid var(--border)', padding: '30px 0', position: 'fixed', left: 0, top: '70px', bottom: 0, overflowY: 'auto' }}>
        <div style={{ padding: '0 24px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Motorcycle<span style={{ color: 'var(--green)' }}> DZ</span>
            </span>
          </div>
          <h2 style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700, opacity: 0.6 }}>Panel d'administration</h2>
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
          {[
            { label: 'Vue d\'ensemble', href: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
            { label: 'Commandes', href: '/admin/commandes', icon: <ShoppingCart size={20} /> },
            { label: 'Produits', href: '/admin/produits', icon: <Bike size={20} /> },
            { label: 'Marques', href: '/admin/marques', icon: <Tags size={20} /> },
            { label: 'Podcasts', href: '/admin/podcasts', icon: <Video size={20} /> },
          ].map(link => (
            <li key={link.href}>
              <a href={link.href} style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 24px', 
                color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500,
                borderLeft: pathname === link.href ? '3px solid var(--green)' : '3px solid transparent',
                background: pathname === link.href ? 'rgba(57,230,0,0.05)' : 'transparent'
              }}>
                <span style={{ fontSize: '1.2rem' }}>{link.icon}</span>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button 
              onClick={handleLogout}
              style={{ 
                width: '100%', border: 'none', padding: '14px 24px', 
                background: 'transparent', color: '#ff4444', 
                display: 'flex', alignItems: 'center', gap: '12px', 
                cursor: 'pointer', fontWeight: 500, borderLeft: '3px solid transparent' 
              }}
            >
              <span style={{ fontSize: '1.2rem' }}><LogOut size={20} /></span>
              Déconnexion
            </button>
          </li>
        </ul>
      </aside>

      {/* Admin Content */}
      <main style={{ flex: 1, marginLeft: '260px', padding: '40px' }}>
        {children}
      </main>

    </div>
  )
}

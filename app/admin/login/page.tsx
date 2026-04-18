'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setErrorMsg(error.message)
      } else {
        router.push('/admin/dashboard')
        router.refresh()
      }
    } catch {
      setErrorMsg('Erreur serveur, veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="animate-fadeInUp" style={{ background: 'var(--bg-card)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <LockKeyhole size={48} color="var(--green)" />
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '10px' }}>Motorcycle DZ Admin</h1>
        </div>

        {errorMsg && <div style={{ color: '#ff4444', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem', background: '#ff444415', padding: '10px', borderRadius: '8px' }}>{errorMsg}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} placeholder="admin@motorcycledz.com" />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Mot de passe</label>
            <input required type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', background: 'var(--bg-primary)', border: '1px solid var(--border)', color: '#fff', padding: '12px', borderRadius: '8px', fontSize: '1rem', outline: 'none' }} placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} className="btn-green" style={{ textDecoration: 'none', textAlign: 'center', padding: '14px', marginTop: '10px', border: 'none', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}

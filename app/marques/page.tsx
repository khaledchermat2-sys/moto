import Link from "next/link"
import { getPublicMarques } from "@/lib/actions/public"
import { LayoutGrid, ChevronRight } from "lucide-react"

export default async function MarquesPublicPage() {
  const marques = await getPublicMarques()

  return (
    <div style={{ maxWidth: 1280, margin: '60px auto 100px', padding: '0 24px' }}>
      <div style={{ marginBottom: '80px', textAlign: 'center' }}>
        <h1 className="section-title animate-fadeInUp text-gradient" style={{ fontSize: '4rem' }}>Nos Marques Partenaires</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.25rem', maxWidth: '700px', margin: '16px auto 0' }}>
          La crème de la crème de l'industrie motocycliste, sélectionnée pour vous.
        </p>
      </div>

      {marques.length === 0 ? (
        <div className="glass" style={{ textAlign: 'center', padding: '100px 0', borderRadius: '32px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Bientôt plus de marques disponibles.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '40px' }}>
          {marques.map((m, i) => (
            <Link 
              key={m.id} 
              href={`/catalogue?marque=${m.id}`}
              className="glass card-hover animate-fadeInUp"
              style={{ 
                borderRadius: '32px', 
                padding: '50px', 
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '32px',
                animationDelay: `${i * 0.1}s`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: 'var(--green)' }}></div>
              
              <div className="glass-dark" style={{ 
                width: 160, height: 160, 
                borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                padding: '30px',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)'
              }}>
                {m.logo_url ? (
                  <img src={m.logo_url} alt={m.nom} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                ) : (
                  <LayoutGrid size={60} color="var(--green)" />
                )}
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: '12px' }}>{m.nom}</h3>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--green)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>
                  Découvrir la collection <ChevronRight size={18} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

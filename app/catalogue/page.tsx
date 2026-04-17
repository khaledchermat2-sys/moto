import Link from "next/link"
import { getPublicMarques, getCatalogueProducts } from "@/lib/actions/public"
import { Bike, Search, Filter, ChevronRight } from "lucide-react"
import SearchInput from "@/app/components/SearchInput"

export default async function Catalogue({ searchParams }: { searchParams: Promise<{ marque?: string, categorie?: string, search?: string }> }) {
  const { marque, categorie, search } = await searchParams
  
  const marques = await getPublicMarques()
  const products = await getCatalogueProducts({ brandId: marque, category: categorie, search })

  const categories = [
    { id: 'all', label: 'Toutes les catégories' },
    { id: 'moto', label: 'Motos' },
    { id: 'piece', label: 'Pièces Détachées' },
  ]

  return (
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 24px 100px 24px' }}>
      <div style={{ marginBottom: '80px' }}>
        <h1 className="section-title animate-slideInLeft text-gradient" style={{ fontSize: '4rem' }}>Showroom Digital</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '1.2rem' }}>Explorez notre flotte d'exception. Filtrée par vos exigences.</p>
      </div>

      <div style={{ display: 'flex', gap: '50px', alignItems: 'flex-start' }}>
        {/* Filtres Sidebar */}
        <aside className="animate-fadeInUp" style={{ width: '320px', flexShrink: 0, position: 'sticky', top: '100px' }}>
          <SearchInput />
          <div className="glass" style={{ padding: '40px', borderRadius: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', color: '#fff' }}>
              <div style={{ padding: '8px', background: 'rgba(57,230,0,0.2)', borderRadius: '10px' }}>
                <Filter size={24} color="var(--green)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '1px' }}>FILTRES</h3>
            </div>
            
            <div style={{ marginBottom: '40px' }}>
              <h4 style={{ color: 'var(--green)', marginBottom: '20px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>CATÉGORIES</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {categories.map(cat => (
                  <Link 
                    key={cat.id} 
                    href={`/catalogue?categorie=${cat.id}${marque ? `&marque=${marque}` : ''}`}
                    style={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderRadius: '16px',
                      textDecoration: 'none', background: (categorie === cat.id || (!categorie && cat.id === 'all')) ? 'var(--green)' : 'rgba(255,255,255,0.03)',
                      color: (categorie === cat.id || (!categorie && cat.id === 'all')) ? '#000' : 'var(--text-secondary)',
                      fontWeight: (categorie === cat.id || (!categorie && cat.id === 'all')) ? 800 : 600,
                      transition: '0.3s',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    {cat.label}
                    <ChevronRight size={18} style={{ opacity: (categorie === cat.id || (!categorie && cat.id === 'all')) ? 1 : 0.3 }} />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ color: 'var(--green)', marginBottom: '20px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>MARQUES</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link 
                  href={`/catalogue?marque=all${categorie ? `&categorie=${categorie}` : ''}`}
                  style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderRadius: '16px',
                    textDecoration: 'none', background: (marque === 'all' || !marque) ? 'var(--green)' : 'rgba(255,255,255,0.03)',
                    color: (marque === 'all' || !marque) ? '#000' : 'var(--text-secondary)',
                    fontWeight: (marque === 'all' || !marque) ? 800 : 600,
                    transition: '0.3s',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  Toutes les marques
                </Link>
                {marques.map(m => (
                  <Link 
                    key={m.id} 
                    href={`/catalogue?marque=${m.id}${categorie ? `&categorie=${categorie}` : ''}`}
                    style={{ 
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderRadius: '16px',
                      textDecoration: 'none', background: (marque === m.id) ? 'var(--green)' : 'rgba(255,255,255,0.03)',
                      color: (marque === m.id) ? '#000' : 'var(--text-secondary)',
                      fontWeight: (marque === m.id) ? 800 : 600,
                      transition: '0.3s',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}
                  >
                    {m.nom}
                    <ChevronRight size={18} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Grille Produits */}
        <div style={{ flex: 1 }}>
          {products.length === 0 ? (
            <div className="glass" style={{ textAlign: 'center', padding: '120px 40px', borderRadius: '40px' }}>
              <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
                <div style={{ padding: '30px', background: 'rgba(57,230,0,0.1)', borderRadius: '50%' }}>
                  <Bike size={80} color="var(--green)" />
                </div>
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '12px' }}>Aucune moto trouvée</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>Essayez d'autres filtres pour trouver votre perle rare.</p>
              <Link href="/catalogue" className="btn-premium">Réinitialiser</Link>
            </div>
          ) : (
            <div className="grid-auto-fit">
              {products.map((p, i) => (
                <div key={p.id} className="glass card-hover animate-fadeInUp" style={{ animationDelay: `${i * 0.05}s`, borderRadius: '32px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <div className="glass-dark" style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--green)', border: '1px solid var(--green)' }}>STOCK</div>
                    <div className="glass-dark" style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, color: '#fff', border: '1px solid var(--border)' }}>{p.categorie.toUpperCase()}</div>
                  </div>
                  
                  <div style={{ height: '260px', position: 'relative', overflow: 'hidden' }}>
                     {p.produit_photos && p.produit_photos[0] ? (
                       <img src={p.produit_photos[0].url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     ) : (
                       <div style={{ width: '100%', height: '100%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <Bike size={50} color="var(--border)" />
                       </div>
                     )}
                     <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}></div>
                  </div>
                  
                  <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ color: 'var(--green)', fontSize: '0.8rem', marginBottom: '8px', fontWeight: 800, letterSpacing: '1px' }}>{p.marques?.nom.toUpperCase()}</div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '16px', color: '#fff' }}>{p.nom}</h3>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--green)' }}>{parseFloat(p.prix).toLocaleString()} DA</span>
                      </div>
                      <Link href={`/produit/${p.id}`} className="btn-premium" style={{ padding: '10px 18px', borderRadius: '12px' }}>
                        <ChevronRight size={22} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

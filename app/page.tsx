import Image from "next/image"
import Link from "next/link"
import { Bike, MapPin, Phone, Mail, ChevronRight } from "lucide-react"
import { getPublicMarques, getLatestProducts } from "@/lib/actions/public"
import Logo from "@/app/components/Logo"

export default async function Home() {
  const marques = await getPublicMarques()
  const products = await getLatestProducts(6)

  return (
    <>
      {/* 1. Hero Section */}
      <section className="hero-stripes border-b border-[var(--border)] overflow-hidden" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '120px 24px', width: '100%', position: 'relative', zIndex: 30 }}>
          <div style={{ maxWidth: 750 }}>
            <div className="animate-fadeInUp glass" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '50px', marginBottom: '24px', border: '1px solid var(--green)' }}>
              <span style={{ width: '8px', height: '8px', background: 'var(--green)', borderRadius: '50%', display: 'inline-block' }}></span>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '1px' }}>SHOWROOM OUVERT - 58 WILAYAS</span>
            </div>
            
            <h1 className="animate-slideInLeft text-gradient" style={{ fontSize: '5.5rem', fontWeight: 900, lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-3px' }}>
              DOMINEZ LA <br />
              <span className="text-gradient-green">ROUTE DZ</span>
            </h1>
            
            <p className="animate-slideInLeft" style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.5, maxWidth: '550px' }}>
              Découvrez l'excellence sur deux roues. La plus grande sélection de motos premium en Algérie au meilleur prix.
            </p>
            
            <div className="animate-slideInLeft" style={{ display: 'flex', gap: '16px', animationDelay: '0.4s' }}>
              <Link href="/catalogue" className="btn-premium">
                Explorer maintenant
              </Link>
              <Link href="/catalogue" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Showroom <Bike size={18} />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', zIndex: 1, pointerEvents: 'none' }}>
          <div style={{ width: 1000, height: 1000, background: 'radial-gradient(circle, rgba(57,230,0,0.2) 0%, transparent 60%)', opacity: 0.6 }}></div>
        </div>
        
        <div className="animate-float" style={{ position: 'absolute', right: '-5%', top: '35%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
           <img 
            src="/assets/hero-premium.png" 
            alt="Motorcycle Premium" 
            style={{ width: '850px', height: 'auto', borderRadius: '40px', boxShadow: '0 50px 120px -20px rgba(57,230,0,0.4)', border: '1px solid rgba(57,230,0,0.2)', transform: 'perspective(1000px) rotateY(-3deg) rotateX(1deg)' }} 
           />
           <div className="glass" style={{ position: 'absolute', bottom: '-40px', right: '40px', padding: '30px', borderRadius: '30px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--green)' }}>50+</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Modèles en Stock</div>
           </div>
        </div>
      </section>

      {/* 2. Brands Bar */}
      <div style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: 'var(--green)', fontWeight: 800, fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>Distributeur Officiel</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
            {marques.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>Nos marques partenaires bientôt disponibles.</p>
            ) : marques.map((m, i) => (
              <Link key={m.id} href={`/catalogue?marque=${m.id}`} className="glass-dark animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s`, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 30px', borderRadius: '50px', border: '1px solid var(--border)', transition: '0.3s' }}>
                {m.logo_url && <img src={m.logo_url} alt={m.nom} style={{ height: 30, width: 'auto', opacity: 0.8 }} />}
                <span style={{ color: '#fff', fontWeight: 700, letterSpacing: '1px' }}>{m.nom}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Products Grid */}
      <section className="section-padding">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
            <div>
              <h2 className="section-title text-gradient" style={{ fontSize: '3rem' }}>Arrivages Récents</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '1.1rem' }}>Les dernières pépites disponibles dans notre showroom.</p>
            </div>
            <Link href="/catalogue" className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              Voir tout le catalogue <ChevronRight size={18} />
            </Link>
          </div>
          
          {products.length === 0 ? (
            <div className="glass" style={{ textAlign: 'center', padding: '100px 0', borderRadius: '32px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Nouveaux produits bientôt disponibles.</p>
            </div>
          ) : (
            <div className="grid-auto-fit">
              {products.map((p, i) => (
                <div key={p.id} className="glass card-hover animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s`, borderRadius: '32px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <div className="glass-dark" style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--green)', border: '1px solid var(--green)' }}>NEW</div>
                    <div className="glass-dark" style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, color: '#fff', border: '1px solid var(--border)' }}>{p.categorie.toUpperCase()}</div>
                  </div>
                  
                  <div style={{ height: '300px', position: 'relative', overflow: 'hidden' }}>
                    {p.produit_photos && p.produit_photos[0] ? (
                      <img src={p.produit_photos[0].url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bike size={64} color="var(--border)" />
                      </div>
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)' }}></div>
                  </div>
                  
                  <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ color: 'var(--green)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 800, letterSpacing: '1px' }}>{p.marques?.nom.toUpperCase()}</div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '16px', color: '#fff' }}>{p.nom}</h3>
                    
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 700 }}>PRIX SHOWROOM</span>
                        <span className="text-gradient-green" style={{ fontSize: '1.8rem', fontWeight: 900 }}>{parseFloat(p.prix).toLocaleString()} DA</span>
                      </div>
                      <Link href={`/produit/${p.id}`} className="btn-premium" style={{ padding: '12px 20px', borderRadius: '12px' }}>
                        <ChevronRight size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Footer */}
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', paddingTop: '80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Logo size={45} />
                <span style={{ fontWeight: 900, fontSize: '1.4rem', color: '#fff' }}>
                  MOTORCYCLE<span style={{ color: 'var(--green)' }}> DZ</span>
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Vente de motos et pièces de rechange au meilleur prix en Algérie. 58 Wilayas.
              </p>
            </div>
            
            <div>
              <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: 24, fontSize: '1.1rem' }}>Liens Rapides</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li><Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Accueil</Link></li>
                <li><Link href="/catalogue" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Catalogue</Link></li>
                <li><Link href="/marques" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Marques</Link></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border)', padding: '24px 0', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <p>© {new Date().getFullYear()} MOTORCYCLE DZ. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

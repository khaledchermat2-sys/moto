import { Check } from "lucide-react"
import Link from "next/link"

export default function CommandeSucces() {
  return (
    <div style={{ maxWidth: 800, margin: '80px auto', padding: '40px 24px', textAlign: 'center' }}>
      <div className="animate-fadeInUp" style={{ 
        background: 'var(--bg-card)', 
        padding: '60px 40px', 
        borderRadius: '24px', 
        border: '1px solid var(--green)',
        boxShadow: '0 20px 40px rgba(57, 230, 0, 0.1)'
      }}>
        <div style={{ 
          width: 80, height: 80, 
          background: 'var(--green)', 
          color: '#000', 
          borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          margin: '0 auto 30px' 
        }}>
          <Check size={48} strokeWidth={4} />
        </div>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '20px' }}>
          Commande confirmée !
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
          Merci pour votre confiance. Votre commande a été enregistrée avec succès. <br/>
          Notre équipe vous contactera dans les plus brefs délais pour confirmer la livraison.
        </p>

        <Link href="/catalogue" className="btn-green" style={{ textDecoration: 'none', padding: '16px 36px', fontSize: '1.1rem' }}>
          Retour au catalogue
        </Link>
      </div>
    </div>
  )
}

import Link from "next/link"
import { notFound } from "next/navigation"
import { getProductDetail } from "@/lib/actions/public"
import OrderForm from "@/app/components/OrderForm"
import { ShieldCheck, Truck, Clock, ArrowLeft } from "lucide-react"
import ProductGallery from "@/app/components/ProductGallery"

export default async function ProduitDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const p = await getProductDetail(id)

  if (!p) {
    notFound()
  }

  return (
    <div style={{ maxWidth: 1280, margin: '60px auto 100px', padding: '0 24px' }}>
      
      <Link href="/catalogue" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Retour au catalogue
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '80px', alignItems: 'start' }}>
        
        {/* Product Images & Info */}
        <div className="animate-slideInLeft">
          <ProductGallery photos={p.produit_photos} productName={p.nom} />
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '20px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <ShieldCheck size={24} color="var(--green)" style={{ marginBottom: '10px' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>Garantie Assurée</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '20px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <Truck size={24} color="var(--green)" style={{ marginBottom: '10px' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>Livraison 58 Wilayas</div>
            </div>
            <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: '20px', border: '1px solid var(--border)', textAlign: 'center' }}>
              <Clock size={24} color="var(--green)" style={{ marginBottom: '10px' }} />
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff' }}>Support 24/7</div>
            </div>
          </div>
        </div>

        {/* Product Details & Form */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div style={{ background: 'rgba(57,230,0,0.1)', padding: '8px 20px', borderRadius: '50px', display: 'inline-block', color: 'var(--green)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {p.marques?.nom} — {p.categorie}
          </div>
          
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-1.5px' }}>
            {p.nom}
          </h1>
          
          <div className="price" style={{ fontSize: '2.8rem', marginBottom: '32px', fontWeight: 900 }}>
            {parseFloat(p.prix).toLocaleString()} DA
          </div>
          
          <div style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '40px', whiteSpace: 'pre-wrap' }}>
            {p.description || "Aucune description disponible pour ce produit."}
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '40px', borderRadius: '32px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '30px', color: '#fff' }}>Passer une commande</h3>
            <OrderForm produitId={p.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

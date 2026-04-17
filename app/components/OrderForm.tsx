'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { creerCommande } from "@/lib/actions/commandes"
import { Loader2, Send } from "lucide-react"

const wilayasList = [
  "01 - Adrar", "02 - Chlef", "03 - Laghouat", "04 - Oum El Bouaghi", "05 - Batna",
  "06 - Béjaïa", "07 - Biskra", "08 - Béchar", "09 - Blida", "10 - Bouira",
  "11 - Tamanrasset", "12 - Tébessa", "13 - Tlemcen", "14 - Tiaret", "15 - Tizi Ouzou",
  "16 - Alger", "17 - Djelfa", "18 - Jijel", "19 - Sétif", "20 - Saïda",
  "21 - Skikda", "22 - Sidi Bel Abbès", "23 - Annaba", "24 - Guelma", "25 - Constantine",
  "26 - Médéa", "27 - Mostaganem", "28 - M'Sila", "29 - Mascara", "30 - Ouargla",
  "31 - Oran", "32 - El Bayadh", "33 - Illizi", "34 - Bordj Bou Arréridj", "35 - Boumerdès",
  "36 - El Tarf", "37 - Tindouf", "38 - Tissemsilt", "39 - El Oued", "40 - Khenchela",
  "41 - Souk Ahras", "42 - Tipaza", "43 - Mila", "44 - Aïn Defla", "45 - Naâma",
  "46 - Aïn Témouchent", "47 - Ghardaïa", "48 - Relizane", "49 - Timimoun", "50 - Bordj Badji Mokhtar",
  "51 - Ouled Djellal", "52 - Béni Abbès", "53 - In Salah", "54 - In Guezzam", "55 - Touggourt",
  "56 - Djanet", "57 - El M'Ghair", "58 - El Meniaa"
];

export default function OrderForm({ produitId }: { produitId: string }) {
  const router = useRouter()
  const [isOrdering, setIsOrdering] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOrdering(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      nom: formData.get('nom') as string,
      telephone: formData.get('telephone') as string,
      wilaya: formData.get('wilaya') as string,
      adresse: formData.get('adresse') as string,
      notes: formData.get('notes') as string,
      produit_id: produitId
    }

    try {
      await creerCommande(data)
      router.push('/commande/succes')
    } catch (err) {
      alert("Erreur lors de l'envoi de la commande. Veuillez réessayer.")
    } finally {
      setIsOrdering(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Nom complet *</label>
          <input required name="nom" type="text" style={inputStyle} placeholder="Votre nom" />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Téléphone *</label>
          <input required name="telephone" type="tel" style={inputStyle} placeholder="05 / 06 / 07..." />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Wilaya *</label>
          <select required name="wilaya" style={inputStyle}>
            <option value="">Sélectionnez</option>
            {wilayasList.map(w => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Adresse complète *</label>
          <input required name="adresse" type="text" style={inputStyle} placeholder="Commune, quartier..." />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Notes (optionnel)</label>
        <textarea name="notes" style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} placeholder="Heure de livraison préférée, etc." />
      </div>

      <button type="submit" disabled={isOrdering} className="btn-green" style={{ width: '100%', padding: '18px', fontSize: '1.2rem', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        {isOrdering ? <Loader2 className="animate-spin" size={24} /> : <><Send size={20} /> Confirmer la commande</>}
      </button>
      <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Aucun paiement requis maintenant. On vous appelle à la livraison.</p>
    </form>
  )
}

const labelStyle = { display: 'block', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 600 }
const inputStyle = { width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)', color: '#fff', padding: '14px', borderRadius: '12px', fontSize: '1rem', outline: 'none', fontFamily: 'inherit', transition: '0.2s' }

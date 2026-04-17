'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react'

interface ImageUploadProps {
  bucket: 'logos' | 'produits'
  onUpload: (url: string) => void
  defaultValue?: string
  label?: string
}

export default function ImageUpload({ bucket, onUpload, defaultValue, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(defaultValue || null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return

      setUploading(true)
      setStatus('idle')
      
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      setPreview(publicUrl)
      onUpload(publicUrl)
      setStatus('success')
    } catch (error) {
      console.error('Error uploading image:', error)
      setStatus('error')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setPreview(null)
    onUpload('')
    setStatus('idle')
  }

  return (
    <div style={{ width: '100%' }}>
      {label && <label style={labelStyle}>{label}</label>}
      
      <div style={{ 
        position: 'relative',
        width: '100%',
        minHeight: '180px',
        background: '#1a1a1a',
        border: '2px dashed var(--border)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: '0.3s',
        borderColor: status === 'success' ? 'var(--green)' : status === 'error' ? '#ff4444' : 'var(--border)'
      }}>
        {preview ? (
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', minHeight: '180px', objectFit: 'contain', background: '#000' }} />
            <button 
              type="button"
              onClick={removeImage}
              style={{ 
                position: 'absolute', top: '10px', right: '10px', 
                background: 'rgba(255,68,68,0.8)', border: 'none', color: '#fff', 
                padding: '6px', borderRadius: '50%', cursor: 'pointer' 
              }}
            >
              <X size={16} />
            </button>
            {status === 'success' && (
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--green)' }}>
                <CheckCircle2 size={12} /> Prêt
              </div>
            )}
          </div>
        ) : (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            {uploading ? (
              <Loader2 className="animate-spin" size={32} color="var(--green)" />
            ) : (
              <>
                <Upload size={32} color="var(--text-secondary)" style={{ marginBottom: '12px' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Cliquez pour uploader une image</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', marginTop: '4px' }}>PNG, JPG up to 5MB</p>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleUpload} 
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} 
                />
              </>
            )}
          </div>
        )}
      </div>
      {status === 'error' && <p style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '6px' }}>Erreur lors de l'upload. Réessayez.</p>}
    </div>
  )
}

const labelStyle = { display: 'block', marginBottom: '10px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }

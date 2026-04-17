'use client'

import { useState } from 'react'
import { Bike } from 'lucide-react'

interface ProductGalleryProps {
  photos: { url: string; id: string }[]
  productName: string
}

export default function ProductGallery({ photos, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!photos || photos.length === 0) {
    return (
      <div style={{ 
        aspectRatio: '4/3', 
        background: 'var(--bg-card)', 
        borderRadius: '32px', 
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '24px',
        overflow: 'hidden'
      }}>
        <div style={{ color: 'var(--border)' }}>
          <Bike size={80} />
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Main Image */}
      <div style={{ 
        aspectRatio: '4/3', 
        background: 'var(--bg-card)', 
        borderRadius: '32px', 
        border: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '16px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img 
          src={photos[activeIndex].url} 
          alt={`${productName} - ${activeIndex + 1}`} 
          style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#000' }} 
        />
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
          {photos.map((photo, index) => (
            <button
              key={photo.id || index}
              onClick={() => setActiveIndex(index)}
              style={{
                width: '80px',
                height: '60px',
                borderRadius: '12px',
                border: activeIndex === index ? '2px solid var(--green)' : '2px solid transparent',
                overflow: 'hidden',
                background: 'var(--bg-card)',
                cursor: 'pointer',
                padding: 0,
                transition: '0.2s',
                opacity: activeIndex === index ? 1 : 0.6
              }}
            >
              <img src={photo.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

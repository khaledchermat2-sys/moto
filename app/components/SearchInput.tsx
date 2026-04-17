'use client'

import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/app/hooks/useDebounce'

export default function SearchInput() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get('search') || '')
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedValue) {
      params.set('search', debouncedValue)
    } else {
      params.delete('search')
    }
    router.push(`/catalogue?${params.toString()}`)
  }, [debouncedValue, router, searchParams])

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '32px' }}>
      <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
        <Search size={20} />
      </div>
      <input
        type="text"
        placeholder="Rechercher une moto..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: '100%',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '14px 16px 14px 48px',
          color: '#fff',
          fontSize: '1rem',
          outline: 'none',
          transition: '0.3s'
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--green)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      />
      {value && (
        <button
          onClick={() => setValue('')}
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}

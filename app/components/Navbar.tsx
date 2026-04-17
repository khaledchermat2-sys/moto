'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from './Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 70,
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo size={40} />
          <span style={{
            fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.5px',
            color: '#fff', fontFamily: 'Outfit, sans-serif',
            textTransform: 'uppercase'
          }}>
            MOTORCYCLE<span style={{ color: '#39e600' }}> DZ</span>
          </span>
        </Link>

        {/* Links desktop */}
        <div style={{ display: 'flex', gap: 36, alignItems: 'center' }} className="nav-links-desktop">
          {[
            { label: 'Accueil', href: '/' },
            { label: 'Catalogue', href: '/catalogue' },
            { label: 'Marques', href: '/marques' },
            { label: 'Podcasts', href: '/podcasts' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              color: '#a0a0a0', textDecoration: 'none', fontWeight: 500,
              fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#39e600')}
              onMouseLeave={e => (e.currentTarget.style.color = '#a0a0a0')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Link href="/admin/login" style={{
            background: '#39e600', color: '#000', fontWeight: 700,
            padding: '9px 22px', borderRadius: 8, textDecoration: 'none',
            fontSize: '0.88rem', fontFamily: 'Outfit, sans-serif',
            transition: 'background 0.2s, transform 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#2bb800'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#39e600'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Admin →
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#fff', padding: 8, display: 'none',
            }}
            className="hamburger-btn"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: '#111', borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {[
            { label: 'Accueil', href: '/' },
            { label: 'Catalogue', href: '/catalogue' },
            { label: 'Marques', href: '/marques' },
            { label: 'Podcasts', href: '/podcasts' },
          ].map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setOpen(false)}
              style={{
                color: '#fff', textDecoration: 'none', fontWeight: 600,
                fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}

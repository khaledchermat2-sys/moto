import React from 'react';

export default function Logo({ size = 32, className = "" }: { size?: number, className?: string }) {
  return (
    <div 
      className={className} 
      style={{ 
        width: size, 
        height: size, 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease'
      }}
    >
      <img 
        src="/assets/logo.png" 
        alt="MOTORCYCLE DZ" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
      />
    </div>
  );
}

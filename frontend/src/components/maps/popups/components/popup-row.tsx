// src/components/maps/popups/components/PopupRow.tsx

import { PopupRowProps } from '@/types/maps';

/**
 * Reusable row component for map popups
 */
export function PopupRow({ icon, label, value, color = '#0891b2' }: PopupRowProps) {
  // Asegurar que el icono tenga el prefijo correcto
  const iconClass = icon.startsWith('fa-') ? `fa-solid ${icon}` : icon;
  
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '8px 0',
      borderBottom: `1px solid ${color}20`,
    }}>
      <div style={{
        width: '28px',
        height: '28px',
        background: `${color}15`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <i className={iconClass} style={{ color, fontSize: '14px' }}></i>
      </div>
      <div style={{ flex: 1 }}>
        <span style={{
          color,
          fontWeight: 600,
          fontSize: '14px',
          display: 'block',
          marginBottom: '4px',
        }}>
          {label}
        </span>
        <div style={{ color: '#34495e', fontSize: '14px' }}>
          {value}
        </div>
      </div>
    </div>
  );
}

// src/components/maps/popups/components/PopupHeader.tsx

import { PopupHeaderProps } from '@/types/maps';

/**
 * Header component for map popups
 */
export function PopupHeader({ title, subtitle, color = '#0891b2', icon }: PopupHeaderProps) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <h3 style={{ 
        margin: '0 0 4px 0',
        fontSize: '20px',
        fontWeight: '600',
        color: color,
        borderBottom: `2px solid ${color}`,
        paddingBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        {icon && <i className={`fa-solid ${icon}`} style={{ fontSize: '24px' }}></i>}
        <span>{title}</span>
      </h3>
      {subtitle && (
        <p style={{ 
          margin: '8px 0 0 0',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

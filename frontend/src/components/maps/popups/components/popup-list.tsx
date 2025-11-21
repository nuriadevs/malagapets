// src/components/maps/popups/components/PopupList.tsx

import { ReactNode } from 'react';

interface PopupListProps {
  items: ReactNode[];
  icon?: string;
  color?: string;
}

/**
 * List component for map popups
 */
export function PopupList({ items, icon = 'fa-check', color = '#0891b2' }: PopupListProps) {
  // Asegurar que el icono tenga el prefijo correcto
  const iconClass = icon.startsWith('fa-') ? `fa-solid ${icon}` : icon;
  
  return (
    <ul style={{
      listStyle: 'none',
      padding: 0,
      margin: '8px 0',
    }}>
      {items.map((item, index) => (
        <li
          key={index}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            marginBottom: '4px',
            fontSize: '14px',
          }}
        >
          <i
            className={iconClass}
            style={{
              color,
              fontSize: '12px',
              marginTop: '4px',
              minWidth: '16px',
            }}
          />
          <span style={{ color: '#4b5563' }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

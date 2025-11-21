// src/components/maps/popups/components/PopupButton.tsx

import { PopupButtonProps } from '@/types/maps';
import { Link } from '@/i18n/navigation';
import { MouseEvent } from 'react';

/**
 * Button/Link component for map popups
 */
export function PopupButton({ href, label, color = '#0891b2' }: PopupButtonProps) {
  return (
    <Link
      href={href}
      style={{
        display: 'inline-block',
        marginTop: '12px',
        padding: '8px 16px',
        backgroundColor: color,
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'opacity 0.2s',
      }}
      onMouseEnter={(e: MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.opacity = '0.8';
      }}
      onMouseLeave={(e: MouseEvent<HTMLAnchorElement>) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      {label} →
    </Link>
  );
}

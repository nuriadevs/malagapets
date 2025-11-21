// src/components/maps/popups/VetPopup.tsx
'use client';

import { useTranslations } from 'next-intl';
import { PopupHeader, PopupRow } from './components';
import { safeString } from '@/utils/maps';
import { vetsData } from '@/lib/data/vets';

type VetData = typeof vetsData;
type VetCenter = VetData[number];

interface VetPopupProps {
  vet: VetCenter;
  centerColor: string;
}

/**
 * Popup component for veterinary center markers
 */
export function VetPopup({ vet, centerColor }: VetPopupProps) {
  const t = useTranslations('data-cards');
  const validPhones = vet.phone.filter(p => p.number !== null);
  
  const phoneTypes: Record<string, string> = {
    'landline': t('phone.landlineFull'),
    'mobile': t('phone.mobileFull'),
    'emergency': t('phone.emergency'),
  };

  return (
    <div style={{
      maxWidth: '28rem',
      width: '100%',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fcfd 100%)',
      border: `2px solid ${centerColor}`,
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 8px 24px rgba(239, 68, 68, 0.15)',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <PopupHeader 
        title={vet.name} 
        color={centerColor}
        icon="fa-user-md"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        {/* Dirección */}
        <PopupRow
          icon="fa-map-marker-alt"
          label={t('adress')}
          value={safeString(vet.address)}
          color={centerColor}
        />

        {/* Código Postal */}
        <PopupRow
          icon="fa-mail-bulk"
          label={t('postalCode')}
          value={safeString(vet.postalCode) || t('notAvailable')}
          color={centerColor}
        />

        {/* Teléfonos */}
        {(() => {
          if (validPhones.length > 0) {
            return (
              <PopupRow
                icon="fa-phone"
                label={t('phone.phones')}
                value={
                  <div>
                    {validPhones.map((phone, i) => (
                      <div 
                        key={i} 
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          marginBottom: i < validPhones.length - 1 ? '8px' : 0 
                        }}
                      >
                        <span style={{
                          background: `${centerColor}15`,
                          color: centerColor,
                          padding: '2px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}>
                          {phoneTypes[phone.type] || phone.type}
                        </span>
                        <a 
                          href={`tel:${phone.number}`} 
                          style={{ 
                            color: centerColor, 
                            textDecoration: 'none', 
                            fontWeight: 500 
                          }}
                        >
                          {phone.number}
                        </a>
                      </div>
                    ))}
                  </div>
                }
                color={centerColor}
              />
            );
          }
          return null;
        })()}

        {/* Horario */}
        {(() => {
          if (vet.schedule) {
            return (
              <PopupRow
                icon="fa-clock"
                label={t('schedule')}
                value={safeString(vet.schedule)}
                color={centerColor}
              />
            );
          }
          return null;
        })()}

        {/* Días */}
        {(() => {
          if (vet.daysOpen) {
            return (
              <PopupRow
                icon="fa-calendar-alt"
                label={t('days')}
                value={safeString(vet.daysOpen)}
                color={centerColor}
              />
            );
          }
          return null;
        })()}

        {/* Email */}
        {(() => {
          if (vet.email) {
            return (
              <PopupRow
                icon="fa-envelope"
                label={t('email')}
                value={
                  <a 
                    href={`mailto:${vet.email}`} 
                    style={{ color: centerColor }}
                  >
                    {vet.email}
                  </a>
                }
                color={centerColor}
              />
            );
          }
          return null;
        })()}

        {/* Website */}
        {(() => {
          if (vet.website) {
            return (
              <PopupRow
                icon="fa-globe"
                label={t('website')}
                value={
                  <a 
                    href={vet.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: centerColor }}
                  >
                    {t('visit')}
                  </a>
                }
                color={centerColor}
              />
            );
          }
          return null;
        })()}

        {/* Botón Google Maps */}
        {(() => {
          if (vet.googleMapsUrl) {
            return (
              <a
                href={vet.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px',
                  background: centerColor,
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 2px 8px ${centerColor}40`,
                  marginTop: '8px',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${centerColor}60`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 2px 8px ${centerColor}40`;
                }}
              >
                <i className="fa-solid fa-map-marked-alt"></i>
                <span>{t('viewInMaps')}</span>
                <i className="fa-solid fa-external-link-alt" style={{ fontSize: '12px' }}></i>
              </a>
            );
          }
          return null;
        })()}
      </div>
    </div>
  );
}

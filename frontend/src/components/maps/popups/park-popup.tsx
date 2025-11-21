// src/components/maps/popups/ParkPopup.tsx
'use client';

import { useTranslations } from 'next-intl';
import { PopupHeader, PopupRow } from './components';
import { getMapColor, safeString } from '@/utils/maps';

interface ParkInfoEsp {
  Fuente?: string;
  Extension?: string;
  'Bi-zona'?: string;
}

interface ParkProperties {
  NOMBRE?: string;
  DIRECCION?: string;
  ACCESOPMR?: string;
  HORARIOS?: string;
  INFOESP?: ParkInfoEsp[];
  DESCRIPCION?: string;
  TITULARIDAD?: string;
  ID?: number;
  URL?: string | null;
  PRECIOS?: string | null;
  TARJETAJOVEN?: string;
  CONTACTO?: string | null;
  EMAIL?: string | null;
}

interface ParkFeature {
  type: string;
  properties: ParkProperties;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface ParkPopupProps {
  park: ParkFeature;
}

const PARK_COLOR = getMapColor('park');

/**
 * Popup component for park markers
 */
export function ParkPopup({ park }: ParkPopupProps) {
  const t = useTranslations('data-cards');
  const props = park.properties;
  const infoEsp = props.INFOESP?.[0];
  const [lng, lat] = park.geometry.coordinates;
  const streetViewUrl = `https://www.google.com/maps?q=&layer=c&cbll=${lat},${lng}`;

  return (
    <div style={{
      maxWidth: '28rem',
      width: '100%',
      background: 'white',
      border: `2px solid ${PARK_COLOR}`,
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <PopupHeader 
        title={props.NOMBRE || t('unknown')} 
        color={PARK_COLOR}
        icon="fa-dog"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
        {/* Dirección */}
        {(() => {
          if (props.DIRECCION) {
            return (
              <PopupRow
                icon="fa-map-marker-alt"
                label={t('adress')}
                value={safeString(props.DIRECCION)}
                color={PARK_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Horarios */}
        {(() => {
          if (props.HORARIOS) {
            return (
              <PopupRow
                icon="fa-clock"
                label={t('schedules')}
                value={
                  <span style={{ whiteSpace: 'pre-line' }}>
                    {safeString(props.HORARIOS)}
                  </span>
                }
                color={PARK_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Extensión */}
        {(() => {
          if (infoEsp?.Extension) {
            return (
              <PopupRow
                icon="fa-ruler-combined"
                label={t('length')}
                value={safeString(infoEsp.Extension)}
                color={PARK_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Acceso PMR */}
        {(() => {
          if (props.ACCESOPMR) {
            return (
              <PopupRow
                icon="fa-universal-access"
                label={t('accessibility')}
                value={
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: props.ACCESOPMR.toLowerCase() === 'si' ? `${PARK_COLOR}15` : '#f1f1f1',
                    color: props.ACCESOPMR.toLowerCase() === 'si' ? PARK_COLOR : '#7f8c8d',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    {props.ACCESOPMR.toLowerCase() === 'si' ? (
                      <>
                        <i className="fa-solid fa-check-circle"></i>
                        {t('accessible')}
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-times-circle"></i>
                        {t('notAccessible')}
                      </>
                    )}
                  </span>
                }
                color={PARK_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Fuente */}
        {(() => {
          if (infoEsp?.Fuente) {
            return (
              <PopupRow
                icon="fa-faucet"
                label={t('waterFountain')}
                value={
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: infoEsp.Fuente.toLowerCase() === 'si' ? `${PARK_COLOR}15` : '#f1f1f1',
                    color: infoEsp.Fuente.toLowerCase() === 'si' ? PARK_COLOR : '#7f8c8d',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    {infoEsp.Fuente.toLowerCase() === 'si' ? (
                      <>
                        <i className="fa-solid fa-check-circle"></i>
                        {t('available')}
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-times-circle"></i>
                        {t('notAvailableShort')}
                      </>
                    )}
                  </span>
                }
                color={PARK_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Bi-zona */}
        {(() => {
          if (infoEsp?.['Bi-zona']) {
            return (
              <PopupRow
                icon="fa-arrows-split-up-and-left"
                label={t('biZone')}
                value={
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: infoEsp['Bi-zona'].toLowerCase() === 'si' ? `${PARK_COLOR}15` : '#f1f1f1',
                    color: infoEsp['Bi-zona'].toLowerCase() === 'si' ? PARK_COLOR : '#7f8c8d',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    {infoEsp['Bi-zona'].toLowerCase() === 'si' ? t('yes') : t('no')}
                  </span>
                }
                color={PARK_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Descripción */}
        {(() => {
          if (props.DESCRIPCION) {
            return (
              <PopupRow
                icon="fa-info-circle"
                label={t('description')}
                value={safeString(props.DESCRIPCION)}
                color={PARK_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Botón Street View */}
        <a
          href={streetViewUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: PARK_COLOR,
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
            marginTop: '8px',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
          }}
        >
          <i className="fa-solid fa-street-view"></i>
          <span>{t('viewInMaps')}</span>
          <i className="fa-solid fa-external-link-alt" style={{ fontSize: '12px' }}></i>
        </a>
      </div>
    </div>
  );
}

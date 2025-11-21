// src/components/maps/popups/BeachPopup.tsx
'use client';

import { useTranslations } from 'next-intl';
import { PopupHeader, PopupRow, PopupList } from './components';
import { getMapColor, safeString } from '@/utils/maps';
import { beachesData } from '@/lib/data/beaches';

type BeachData = typeof beachesData;
type Beach = BeachData[number];

interface BeachPopupProps {
  beach: Beach;
}

const BEACH_COLOR = getMapColor('beach');

/**
 * Popup component for beach markers
 */
export function BeachPopup({ beach }: BeachPopupProps) {
  const t = useTranslations('data-cards');
  const beachData = beach as unknown as Record<string, unknown>;
  const mapsUrl = ('googleMapsUrl' in beach && typeof beachData.googleMapsUrl === 'string') 
    ? beachData.googleMapsUrl 
    : `https://www.google.com/maps?q=${beach.coordinates.latitude},${beach.coordinates.longitude}`;

  return (
    <div style={{
      maxWidth: '28rem',
      width: '100%',
      background: 'white',
      border: `2px solid ${BEACH_COLOR}`,
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 8px 24px rgba(8, 145, 178, 0.15)',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <PopupHeader 
        title={safeString(beach.name)} 
        color={BEACH_COLOR}
        icon="fa-umbrella-beach"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Municipio */}
        <PopupRow
          icon="fa-map-marker-alt"
          label={t('municipality')}
          value={safeString(beach.municipality)}
          color={BEACH_COLOR}
        />

        {/* Localidad */}
        {(() => {
          if (beachData.locality) {
            return (
              <PopupRow
                icon="fa-location-dot"
                label={t('locality')}
                value={safeString(beachData.locality)}
                color={BEACH_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Características */}
        {(() => {
          if ('features' in beach && beachData.features) {
            const features = beachData.features as Record<string, unknown>;
            return (
              <PopupRow
                icon="fa-info-circle"
                label={t('features')}
                value={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div>
                      <strong>{t('groundType')}:</strong>{' '}
                      {safeString(features.ground_type) || t('notAvailable')}
                    </div>
                    <div>
                      <strong>{t('occupancy')}:</strong>{' '}
                      {safeString(features.occupancy) || t('notAvailable')}
                    </div>
                    <div>
                      <strong>{t('environment')}:</strong>{' '}
                      {safeString(features.environment) || t('notAvailable')}
                    </div>
                  </div>
                }
                color={BEACH_COLOR}
              />
            );
          }
          return null;
        })()}

                {/* Servicios */}
        {(() => {
          if ('services' in beach && beachData.services) {
            return (
              <PopupRow
                icon="fa-concierge-bell"
                label={t('services')}
                value={
                  <ServicesBadges services={beachData.services as Record<string, unknown>} color={BEACH_COLOR} t={t} />
                }
                color={BEACH_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Horarios */}
        <PopupRow
          icon="fa-clock"
          label={t('openingHours')}
          value={<OpeningHours openingHours={beachData.opening_hours as Record<string, unknown> | undefined} t={t} />}
          color={BEACH_COLOR}
        />

        {/* Acceso */}
        {(() => {
          if ('access' in beach && beachData.access) {
            return (
              <PopupRow
                icon="fa-road"
                label={t('access')}
                value={<AccessInfo access={beachData.access as Record<string, unknown>} color={BEACH_COLOR} t={t} />}
                color={BEACH_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Certificaciones */}
        {(() => {
          if (Array.isArray(beachData.certifications) && beachData.certifications.length > 0) {
            return (
              <PopupRow
                icon="fa-certificate"
                label={t('certifications')}
                value={
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {(beachData.certifications as string[]).map((cert, i) => (
                      <span key={i} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: `${BEACH_COLOR}15`,
                        color: BEACH_COLOR,
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 600,
                      }}>
                        <i className="fa-solid fa-award"></i>
                        {cert}
                      </span>
                    ))}
                  </div>
                }
                color={BEACH_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Destacados */}
        {(() => {
          if (Array.isArray(beachData.highlights) && beachData.highlights.length > 0) {
            return (
              <PopupRow
                icon="fa-star"
                label={t('highlights')}
                value={
                  <PopupList
                    items={(beachData.highlights as string[]).slice(0, 3)}
                    color={BEACH_COLOR}
                  />
                }
                color={BEACH_COLOR}
              />
            );
          }
          return null;
        })()}

        {/* Botón Google Maps */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: BEACH_COLOR,
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(8, 145, 178, 0.3)',
            marginTop: '8px',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(8, 145, 178, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(8, 145, 178, 0.3)';
          }}
        >
          <i className="fa-solid fa-map-marked-alt"></i>
          <span>{t('viewInMaps')}</span>
          <i className="fa-solid fa-external-link-alt" style={{ fontSize: '12px' }}></i>
        </a>
      </div>
    </div>
  );
}

// Componentes auxiliares
function ServicesBadges({ services, color, t }: { services: Record<string, unknown>; color: string; t: ReturnType<typeof useTranslations> }) {
  const servicesList = [
    { key: 'trash_bins', icon: 'fa-trash', label: t('trashBinsShort') },
    { key: 'dog_shower', icon: 'fa-shower', label: t('dogShowerShort') },
    { key: 'bag_dispenser', icon: 'fa-bag-shopping', label: t('bagDispenserShort') },
    { key: 'water_fountain', icon: 'fa-faucet', label: t('waterFountainShort') },
    { key: 'parking', icon: 'fa-square-parking', label: t('parking') },
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {servicesList.map(({ key, icon, label }) => {
        const available = !!services[key];
        return (
          <span key={key} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: available ? `${color}15` : '#f1f1f1',
            color: available ? color : '#7f8c8d',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 600,
          }}>
            <i className={`fa-solid ${icon}`}></i>
            {label}
          </span>
        );
      })}
    </div>
  );
}

function OpeningHours({ openingHours, t }: { openingHours: Record<string, unknown> | undefined; t: ReturnType<typeof useTranslations> }) {
  if (!openingHours) return <>{t('notAvailable')}</>;
  
  if (openingHours.year_round) {
    return <>{t('year_round')}</>;
  }

  return (
    <>
      {openingHours.summer && (
        <div style={{ marginBottom: '4px' }}>
          <strong>{t('summerSchedule')}:</strong> {safeString(openingHours.summer)}
        </div>
      )}
      {openingHours.winter && (
        <div>
          <strong>{t('winterSchedule')}:</strong> {safeString(openingHours.winter)}
        </div>
      )}
    </>
  );
}

function AccessInfo({ access, color, t }: { access: Record<string, unknown>; color: string; t: ReturnType<typeof useTranslations> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div>
        <strong>{t('accessType')}:</strong> {safeString(access.type) || t('notAvailable')}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <strong>{t('accessByCar')}:</strong>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          background: access.by_car ? `${color}15` : '#f1f1f1',
          color: access.by_car ? color : '#7f8c8d',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 600,
        }}>
          <i className={`fa-solid ${access.by_car ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
          {access.by_car ? t('yes') : t('no')}
        </span>
      </div>

      {(() => {
        if (access.references) {
          return (
            <div>
              <strong>{t('accessReferences')}:</strong> {safeString(access.references)}
            </div>
          );
        }
        return null;
      })()}
    </div>
  );
}

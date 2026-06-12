// src/hooks/maps/useMapIcons.ts

import { renderToStaticMarkup } from 'react-dom/server'
import type { IconType } from 'react-icons'
import type L from 'leaflet'
import { createElement } from 'react'

interface CreateIconOptions {
  icon: IconType
  color: string
  size?: number
}

export function useMapIcons(leaflet: typeof L | null) {
  const createCustomIcon = ({ icon, color, size = 40 }: CreateIconOptions) => {
    if (!leaflet) return null

    const halfSize = size / 2
    const svgString = renderToStaticMarkup(
      createElement(icon, { size: halfSize, color })
    )

    return leaflet.divIcon({
      html: `
        <div style="
          background: white;
          border: 3px solid ${color};
          border-radius: 50%;
          width: ${size}px;
          height: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          ${svgString}
        </div>
      `,
      className: '',
      iconSize: [size, size],
      iconAnchor: [halfSize, size],
      popupAnchor: [0, -size],
    })
  }

  const createUserLocationIcon = () => {
    if (!leaflet) return null

    return leaflet.divIcon({
      html: `
        <div style="
          position: relative;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            position: absolute;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.2);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: user-loc-pulse 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
          <div style="
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #3b82f6;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
            position: relative;
            z-index: 1;
          "></div>
          <style>
            @keyframes user-loc-pulse {
              0%   { transform: translate(-50%, -50%) scale(1);   opacity: 1; }
              100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
            }
          </style>
        </div>
      `,
      className: '',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -14],
    })
  }

  return { createCustomIcon, createUserLocationIcon }
}
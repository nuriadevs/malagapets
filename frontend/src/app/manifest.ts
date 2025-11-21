// src/app/manifest.ts
// ============================================
// PWA MANIFEST - APLICACIÓN WEB PROGRESIVA
// ============================================

import { MetadataRoute } from "next";
import { Locale } from "@/i18n/routing";

// ============================================
// MANIFEST PRINCIPAL (español por defecto)
// ============================================
export default function manifest(): MetadataRoute.Manifest {
  return {
    // Información básica
    name: "MálagaPets - Guía Completa para Mascotas en Málaga",
    short_name: "MálagaPets",
    description:
      "Tu guía completa sobre cuidado, salud y bienestar de mascotas. Encuentra parques caninos, veterinarios y consejos expertos.",

    // URLs
    start_url: "/es",
    scope: "/",
    id: "/es", // Importante para identificar la instalación

    // Visualización
    display: "standalone",
    orientation: "portrait-primary",

    // Colores
    background_color: "#ffffff",
    theme_color: "#10b981",

    // Categorías
    categories: ["lifestyle", "pets", "health", "education", "reference"],

    // Idioma
    lang: "es",
    dir: "ltr",

    // ============================================
    // ICONOS - CRÍTICO PARA PWA
    // ============================================
    icons: [
      // Android - Tamaños estándar
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },

      // Android Maskable (adaptativos)
      {
        src: "/icons/icon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },

      // iOS
      {
        src: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },

      // Tamaños adicionales opcionales
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
    ],

    // ============================================
    // SCREENSHOTS - REQUERIDOS DESDE 2024
    // ============================================
    screenshots: [
      // Mobile
      {
        src: "/screenshots/mobile-home.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "Página principal - Encuentra todo sobre mascotas",
      },
      {
        src: "/screenshots/mobile-blog.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "Blog - Consejos y guías para tu mascota",
      },
      {
        src: "/screenshots/mobile-maps.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "Mapas - Parques y veterinarios cerca de ti",
      },

      // Desktop
      {
        src: "/screenshots/desktop-home.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "Vista de escritorio",
      },
    ],

    // ============================================
    // SHORTCUTS - ANDROID
    // ============================================
    shortcuts: [
      {
        name: "Blog de Mascotas",
        short_name: "Blog",
        description: "Ver últimos artículos sobre mascotas",
        url: "/es/blog",
        icons: [
          {
            src: "/icons/shortcut-blog.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
      {
        name: "Parques Caninos",
        short_name: "Parques",
        description: "Encuentra parques cerca de ti",
        url: "/es/maps/parks",
        icons: [
          {
            src: "/icons/shortcut-parks.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
      {
        name: "Veterinarios",
        short_name: "Vets",
        description: "Localiza veterinarios",
        url: "/es/maps/vets",
        icons: [
          {
            src: "/icons/shortcut-vets.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
    ],

    // ============================================
    // SHARE TARGET - Compartir hacia la app
    // ============================================
    share_target: {
      action: "/es/blog/search",
      method: "GET",
      enctype: "application/x-www-form-urlencoded",
      params: {
        title: "title",
        text: "text",
        url: "url",
      },
    },

    // Aplicaciones relacionadas
    related_applications: [],
    prefer_related_applications: false,
  };
}

// ============================================
// MANIFEST POR IDIOMA
// ============================================
export function generateLocaleManifest(locale: Locale): MetadataRoute.Manifest {
  const translations = {
    es: {
      name: "MálagaPets - Guía Completa para Mascotas",
      short_name: "MálagaPets",
      description: "Tu guía completa sobre cuidado de mascotas en Málaga",
    },
    en: {
      name: "MálagaPets - Complete Pet Guide",
      short_name: "MálagaPets",
      description: "Your complete guide to pet care in Málaga",
    },
    de: {
      name: "MálagaPets - Vollständiger Haustier-Leitfaden",
      short_name: "MálagaPets",
      description: "Ihr kompletter Leitfaden zur Haustierpflege in Málaga",
    },
    fr: {
      name: "MálagaPets - Guide Complet pour Animaux",
      short_name: "MálagaPets",
      description: "Votre guide complet sur les soins des animaux à Málaga",
    },
  };

  return {
    ...manifest(),
    ...translations[locale],
    lang: locale,
    start_url: `/${locale}`,
    id: `/${locale}`,
  };
}

// ============================================
// NOTAS Y GUÍA DE IMPLEMENTACIÓN
// ============================================
/*
📱 CHECKLIST DE ARCHIVOS NECESARIOS:

public/
├── icons/
│   ├── icon-144x144.png       (Opcional)
│   ├── icon-192x192.png       ✅ REQUERIDO
│   ├── icon-384x384.png       (Opcional)
│   ├── icon-512x512.png       ✅ REQUERIDO
│   ├── icon-maskable-192x192.png
│   ├── icon-maskable-512x512.png ✅ REQUERIDO (Android 13+)
│   ├── apple-touch-icon.png   ✅ REQUERIDO (iOS)
│   ├── shortcut-blog.png
│   ├── shortcut-parks.png
│   └── shortcut-vets.png
└── screenshots/
    ├── mobile-home.png        ✅ REQUERIDO (desde 2024)
    ├── mobile-blog.png
    ├── mobile-maps.png
    └── desktop-home.png

🎨 CÓMO GENERAR ICONOS:

1. Crea un ícono SVG/PNG de 1024x1024px
2. Usa un generador automático:
   - https://realfavicongenerator.net/
   - https://www.pwa-builder.com/
   - https://favicon.io/

3. Para maskable icons (Android 13+):
   - https://maskable.app/
   - Asegúrate de que el contenido importante está en la "safe zone"

📸 SCREENSHOTS:

Tamaños recomendados:
- Mobile: 750x1334 (iPhone 8)
- Desktop: 1920x1080

Herramientas:
- Chrome DevTools Device Mode
- https://www.screely.com/ (mockups)
- Puppeteer para automatizar

🛠️ IMPLEMENTACIÓN EN NEXT.JS 15:

// src/app/[locale]/layout.tsx
import { generateLocaleManifest } from '@/app/manifest';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  
  return {
    manifest: `/manifest-${locale}.json`, // Si usas manifests por idioma
  };
}

// O usa el manifest global:
export const metadata = {
  manifest: '/manifest.json', // Next.js lo genera automáticamente
};

✅ TESTING:

1. Chrome DevTools:
   - Application > Manifest
   - Verifica que todos los campos estén correctos

2. Lighthouse:
   - Ejecuta audit PWA
   - Debe obtener 100/100

3. Instalación:
   - Chrome: chrome://flags → #enable-desktop-pwas
   - Verifica en móvil Android/iOS

4. Validadores:
   - https://www.pwabuilder.com/
   - Chrome DevTools > Application > Manifest

⚠️ ERRORES COMUNES:

❌ Iconos no existen en /public
❌ Tamaños incorrectos (192 y 512 son obligatorios)
❌ Sin screenshots (requeridos desde 2024)
❌ start_url no coincide con tu routing
❌ theme_color no coincide con tu CSS
❌ Sin maskable icons (Android moderno)

🚀 FEATURES AVANZADAS (Opcional):

// File handlers (abrir archivos)
file_handlers: [{
  action: "/open-file",
  accept: {
    "image/*": [".png", ".jpg", ".jpeg"]
  }
}]

// Protocol handlers (manejar URLs custom)
protocol_handlers: [{
  protocol: "web+malagapets",
  url: "/handle?url=%s"
}]

// Handle links (capturar enlaces)
handle_links: "preferred"

📊 ANALYTICS DE PWA:

Trackea en Google Analytics:
- Evento: 'pwa_install'
- Fuente: navigator.standalone ? 'pwa' : 'web'

window.addEventListener('beforeinstallprompt', (e) => {
  // Track install prompt
  gtag('event', 'pwa_install_prompt');
});

window.addEventListener('appinstalled', () => {
  // Track successful install
  gtag('event', 'pwa_installed');
});

🌍 MULTI-IDIOMA:

Opción 1: Manifest único (actual)
- Más simple
- Usa start_url por locale

Opción 2: Manifest por idioma
- src/app/[locale]/manifest.ts
- Mejor UX para cada idioma
- Requiere configuración adicional

💡 MEJORES PRÁCTICAS:

1. ✅ theme_color = color primario de tu marca
2. ✅ background_color = color de fondo real de tu app
3. ✅ short_name ≤ 12 caracteres (espacio en home screen)
4. ✅ description ≤ 132 caracteres
5. ✅ Incluir al menos 3 screenshots
6. ✅ Shortcuts relevantes y útiles
7. ✅ Iconos con buena resolución
8. ✅ Testear en dispositivos reales
*/
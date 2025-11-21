# MálagaDogParks

📘 README disponible en [English](./README.md)

¡Bienvenid@ a **MálagaDogParks**! Este proyecto es una plataforma web desarrollada con Next.js y Tailwind CSS que recopila y muestra los parques caninos de la ciudad de Málaga (España), donde podrás pasear y disfrutar de la compañía de tu mascota.

[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://malaga-dog-parks.vercel.app/) [![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/) [![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/) [![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=react)](https://ui.shadcn.com/) [![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright)](https://playwright.dev/) [![Open Data](https://img.shields.io/badge/Data-Open_Government-2B8CC4?style=for-the-badge)](https://datosabiertos.malaga.eu/)

----------

## 🚀 Características principales

-   🐕 **Mapa interactivo** de parques caninos en Málaga  
    _(Localización, fotos y características de cada parque)_
    
-   📊 **Datos actualizados** del portal abierto del Ayuntamiento de Málaga
    
-   📲 **Diseño responsive**  
    _(Funciona en móvil, tablet y desktop)_
    
-   🌎 **Modo multiidioma**  
    _(Español/Inglés/Alemán/Francés, con i18n integrado)_
    
-   🔍 **Tamaño del texto**  
    Puedes ampliar o reducir el tamaño de la letra en cualquier momento desde el panel de selección de tamaño
    
-   🌓 **Modo Claro/Oscuro**  
    La web incluye un selector de tema claro y oscuro
    
-   ✅ **Testing automatizado**  
    Tests end-to-end con Playwright para garantizar la calidad
    
-  **♿ Accesible**: Etiquetas de accesibilidad web
    

## 🛠️ Tecnologías utilizadas

-   **Frontend:** [Next.js](https://nextjs.org/) 15 con App Router
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4
-   **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
-   **Maps:** [Folium](https://python-visualization.github.io/folium/) (Python + Leaflet.js)
-   **Internationalization:** next-intl
-   **Testing:** [Playwright](https://playwright.dev/) para tests E2E
-   **Deployment:** [Vercel](https://vercel.com/)
-   **Data Source:** Portal de Datos Abiertos del Ayuntamiento de Málaga

## 🗺️ Visualización de Mapas con Folium

Para la generación de mapas en este proyecto, se ha utilizado la librería **[Folium](https://python-visualization.github.io/folium/)**, una herramienta de Python basada en **Leaflet.js** que permite crear visualizaciones geográficas dinámicas.

## 🚀 Demo

Visita la web [malagadogparks.vercel.app](https://malaga-dog-parks.vercel.app/) para ver el proyecto en vivo.

## 🎬 Video Demo

<a href="https://youtu.be/J16aTuQrtns" 
   target="_blank" 
   rel="noopener noreferrer" 
   aria-label="Ver demostración de la aplicación Málaga Dog Parks en YouTube (se abre en nueva pestaña)">
   Ver video demo en Youtube
</a>

## 📱 Capturas de pantalla

<details> <summary>Ver capturas de pantalla</summary>

### 💻 Escritorio

<img src="./public/images/desktop-view.png" alt="Desktop View" width="500" />

### 📱 Tablet

<img src="./public/images/tablet-view.png" alt="Tablet View" width="350" />

### 📱 Móvil

<img src="./public/images/mobile-view.png" alt="Mobile View" width="250" /> </details>

## 📦 Instalación y uso

### Prerrequisitos

-   Node.js 18+
-   npm o yarn

### Instalación

1.  **Clona el repositorio:**
    
    ```bash
    git clone https://github.com/nuriadevs/malaga-dog-parks.git
    cd malaga-dog-parks
    
    ```
    
2.  **Instala las dependencias:**
    
    ```bash
    npm install
    # o
    yarn install
    
    ```
    
3.  **Inicia el servidor de desarrollo:**
    
    ```bash
    npm run dev
    # o
    yarn dev
    
    ```
    
4.  **Abre tu navegador:** Visita [http://localhost:3000](http://localhost:3000/)
    

## 🧪 Testing

Este proyecto utiliza **Playwright** para realizar tests end-to-end automatizados que garantizan el correcto funcionamiento algunas funcionalidades.

### Ejecutar tests

```bash
# Instalar los navegadores de Playwright (solo la primera vez)
npx playwright install

# Ejecutar todos los tests
npx playwright test e2e
```

## 📁 Estructura del proyecto

```plaintext
📁 malaga-dogs-parks/
├── 📁 e2e/                        # Testing E2E con Playwright
│   ├── 📁 config/                 # Configuración de tests
│   ├── 📁 tests/                  # Tests del mapa interactivo
│   └── playwright.config.ts
├── 📁 public/                     # Assets estáticos
│   ├── 📁 images/                 # Imágenes del proyecto
│   ├── 📁 maps/                   # Mapas HTML generados con Folium
├── 📁 src/                        # Código fuente principal
│   ├── 📁 app/                    # App Router de Next.js 15
│   │   └── 📁 [locale]/           # Rutas dinámicas por idioma
│   ├── 📁 components/             # Componentes reutilizables
│   │   ├── 📁 layouts/            # Header, Footer, Navigation
│   │   ├── 📁 maps/               # Componentes de mapas
│   │   ├── 📁 providers/          # Context providers
│   │   ├── 📁 sections/           # Secciones de páginas
│   │   └── 📁 ui/                 # Componentes UI 
│   ├── 📁 data/                   # Datos estáticos
│   ├── 📁 hooks/                  # Custom React hooks
│   ├── 📁 i18n/                   # Configuración de internacionalización
│   ├── 📁 lib/                    # Utilidades y configuraciones
│   ├── 📁 messages/               # Archivos de traducción (es, en, de, fr)
│   ├── 📁 types/                  # Types
│   ├── 📁 styles/                 # Estilos globales
│   ├── 📁 utils/                  # Funciones helper
└── └── middleware.ts
```

## ♿ Accesibilidad

Este proyecto ha sido desarrollado poniendo especial atención en la accesibilidad, siguiendo las pautas **WCAG 2.1** y buenas prácticas para garantizar que cualquier persona pueda navegar y utilizar la web cómodamente. 

Si encuentras algún problema de accesibilidad o tienes sugerencias de mejora, por favor [abre un issue](https://github.com/nuriadevs/malaga-dog-parks/issues).

## 📊 Fuente de Datos

Los datos utilizados en este proyecto han sido recopilados del **Portal de Datos Abiertos del Ayuntamiento de Málaga**, bajo su política de datos abiertos y reutilización de información pública.

### 🔗 Enlace oficial al dataset

👉 [Parques Caninos - Ayuntamiento de Málaga](https://datosabiertos.malaga.eu/dataset/parques-caninos)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Si quieres contribuir al proyecto:

1. Haz un **fork** del proyecto  
2. Crea una rama para tu nueva funcionalidad (`git checkout -b feature/nueva-funcionalidad`)  
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`)  
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`)  
5. Abre un **Pull Request** para revisión  


## 📬 Contacto
Si tienes preguntas, sugerencias o simplemente quieres charlar sobre el proyecto, enviáme un mensaje.
[![Email](https://img.shields.io/badge/Email-D14836?logo=gmail&logoColor=white)](mailto:nuriadevs@gmail.com) 

## 💝 Sobre el proyecto

**Hecho con ❤️ para nuestras mascotas**

[![Adopta](https://img.shields.io/badge/%F0%9F%90%B6-Adopta_no_compres-FF5722?style=flat-square)](https://www.protectoramalaga.com/)

----------

### ⭐ ¿Te gusta el proyecto?

¡Dale estrella en GitHub y compártelo con otros dueños de perros!

[![GitHub Stars](https://img.shields.io/github/stars/nuriadevs/malaga-dog-parks?style=social)](https://github.com/nuriadevs/malaga-dog-parks) [![GitHub Forks](https://img.shields.io/github/forks/nuriadevs/malaga-dog-parks?style=social)](https://github.com/nuriadevs/malaga-dog-parks)
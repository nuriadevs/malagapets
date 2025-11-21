import { routing } from "@/i18n/routing";

// Extract the pathnames from the routing configuration
// Exclude dynamic route keys that include params like [slug] because the Link
// component expects either the static path or an object with params.
type Pathname = Exclude<keyof typeof routing.pathnames, `${string}[${string}]`>;

export interface NavigationLink {
  key: string;
  href: Pathname;
  labelKey: string;
  submenu?: NavigationLink[];
}

export interface ThemeOption {
  key: string;
  value: string;
  label: string;
}


/*

  "legal": {
    "terms": {
      "title": "Términos y Condiciones de Uso",
      "lastUpdate": "Última actualización: Octubre",
      
      "intro": {
        "title": "1. Introducción",
        "description": "Bienvenido a Pet Travel Guide. Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones de uso. Si no estás de acuerdo con alguno de estos términos, por favor, no utilices este sitio."
      },

      "usage": {
        "title": "2. Uso del Sitio",
        "intro": "Este sitio web es un proyecto personal informativo sobre viajes con mascotas. Puedes:",
        "allowed": {
          "read": "Leer y consultar todo el contenido publicado",
          "share": "Compartir enlaces a nuestros artículos en redes sociales",
          "contact": "Contactarnos a través del formulario disponible"
        },
        "notAllowed": {
          "title": "No está permitido",
          "copy": "Copiar, reproducir o redistribuir el contenido sin autorización expresa",
          "commercial": "Usar el contenido con fines comerciales sin permiso",
          "illegal": "Realizar actividades ilegales o fraudulentas",
          "harm": "Intentar dañar, hackear o comprometer la seguridad del sitio",
          "scraping": "Hacer scraping automatizado del contenido"
        }
      },

      "intellectual": {
        "title": "3. Propiedad Intelectual",
        "description": "Todo el contenido de este sitio web (textos, imágenes, diseño, código, logos) está protegido por derechos de autor y pertenece a Pet Travel Guide o a sus respectivos propietarios.",
        "copyright": {
          "title": "Copyright",
          "description": "© 2025 Pet Travel Guide. Todos los derechos reservados."
        },
        "permission": "Si deseas utilizar algún contenido, por favor contáctanos para solicitar permiso."
      },

      "thirdParty": {
        "title": "4. Contenido de Terceros",
        "description": "Este sitio puede incluir:",
        "images": "Imágenes de bancos de fotos con licencia (Unsplash, Pexels, etc.)",
        "links": "Enlaces a sitios web externos",
        "embeds": "Contenido embebido de servicios como Google Maps, YouTube, etc."
      },

      "externalLinks": {
        "title": "5. Enlaces Externos",
        "description": "Este sitio puede contener enlaces a sitios web de terceros. No nos hacemos responsables del contenido, políticas de privacidad o prácticas de estos sitios externos. Te recomendamos leer sus términos antes de interactuar con ellos."
      },

      "disclaimer": {
        "title": "6. Limitación de Responsabilidad",
        "intro": "El contenido de este sitio se proporciona \"tal cual\" con fines informativos. No garantizamos:",
        "accuracy": "La exactitud, completitud o actualidad de la información",
        "availability": "La disponibilidad ininterrumpida del sitio",
        "errors": "La ausencia de errores o virus",
        "damages": "No nos hacemos responsables de daños derivados del uso de este sitio",
        "note": "Importante",
        "noteText": "La información sobre viajes con mascotas puede cambiar. Siempre verifica con las autoridades oficiales antes de viajar."
      },

      "modifications": {
        "title": "7. Modificaciones",
        "description": "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos inmediatamente tras su publicación en esta página. Te recomendamos revisar esta página periódicamente."
      },

      "law": {
        "title": "8. Ley Aplicable y Jurisdicción",
        "description": "Estos términos se rigen por las leyes de España. Cualquier disputa se resolverá en los tribunales de Málaga, España."
      },

      "contact": {
        "title": "9. Contacto",
        "description": "Si tienes preguntas sobre estos términos, puedes contactarnos a través del formulario de contacto disponible en el sitio web."
      },

      "acceptance": {
        "title": "Aceptación de los Términos",
        "description": "Al utilizar este sitio web, confirmas que has leído, entendido y aceptado estos Términos y Condiciones de Uso."
      }
    }
  },

  "metadata": {
    "legal": {
      "termsTitle": "Términos y Condiciones | Pet Travel Guide",
      "termsDescription": "Términos y condiciones de uso del sitio web Pet Travel Guide. Lee nuestras normas antes de utilizar el sitio."
    }
  },

  "main": {
    "legalContent": "Contenido legal"
  }
*/
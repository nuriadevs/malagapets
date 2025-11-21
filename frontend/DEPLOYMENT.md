# 🚀 Guía de Deployment en Vercel - MálagaPets

## ✅ CHECKLIST PRE-DEPLOYMENT

### 1. Variables de Entorno Requeridas

Configura estas variables en **Vercel Dashboard** > **Settings** > **Environment Variables**:

#### 🌐 **Variables Públicas (NEXT_PUBLIC_*)**
Estas son visibles en el cliente y deben configurarse para **Production**, **Preview** y **Development**:

```bash
# URL del sitio (¡IMPORTANTE!)
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com

# URL de Strapi CMS
NEXT_PUBLIC_STRAPI_URL=https://cms.tu-dominio.com
# o si usas Strapi Cloud:
# NEXT_PUBLIC_STRAPI_URL=https://tu-proyecto.strapiapp.com

# Google Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Verificación de Google Search Console (opcional)
NEXT_PUBLIC_GOOGLE_VERIFICATION=tu-codigo-de-verificacion

# Bloquear robots en preview (opcional)
NEXT_PUBLIC_BLOCK_ROBOTS=false
```

#### 🔒 **Variables Privadas (Solo servidor)**
Estas NO son visibles en el cliente:

```bash
# Token de API de Strapi (CRÍTICO)
STRAPI_API_TOKEN=tu-token-secreto-de-strapi

# Resend API para emails (CRÍTICO para formulario contacto)
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXX

# Email de origen para Resend
RESEND_FROM_EMAIL=MálagaPets <info@malagapets.com>

# Email de contacto
CONTACT_EMAIL=holamalagapets@gmail.com
```

---

## 📝 CONFIGURACIÓN PASO A PASO EN VERCEL

### Paso 1: Conectar Repositorio

1. Ve a [vercel.com](https://vercel.com)
2. Click en **"Add New"** > **"Project"**
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente que es Next.js

### Paso 2: Configurar Build Settings

Vercel detecta automáticamente:
- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

✅ **No necesitas cambiar nada aquí**

### Paso 3: Configurar Variables de Entorno

En **Environment Variables**, añade:

#### Para PRODUCTION:
```
NEXT_PUBLIC_SITE_URL = https://malagapets.com
NEXT_PUBLIC_STRAPI_URL = https://cms.malagapets.com
STRAPI_API_TOKEN = [tu-token]
RESEND_API_KEY = [tu-key]
RESEND_FROM_EMAIL = MálagaPets <info@malagapets.com>
CONTACT_EMAIL = holamalagapets@gmail.com
NEXT_PUBLIC_GA_ID = [opcional]
```

#### Para PREVIEW (opcional):
Usa las mismas o versiones de staging

#### Para DEVELOPMENT (opcional):
```
NEXT_PUBLIC_SITE_URL = http://localhost:3000
NEXT_PUBLIC_STRAPI_URL = http://localhost:1337
```

### Paso 4: Deploy

1. Click en **"Deploy"**
2. Vercel construirá tu proyecto
3. Te dará una URL temporal: `https://tu-proyecto.vercel.app`

---

## 🌍 CONFIGURAR DOMINIO PERSONALIZADO

### En Vercel:

1. Ve a **Settings** > **Domains**
2. Añade tu dominio: `malagapets.com`
3. Vercel te dará registros DNS para configurar

### En tu Proveedor de Dominios (Namecheap, GoDaddy, etc):

Añade estos registros DNS:

```
Tipo: A
Nombre: @
Valor: 76.76.21.21

Tipo: CNAME
Nombre: www
Valor: cname.vercel-dns.com
```

⏱️ **Espera**: Puede tardar hasta 48h en propagarse

---

## 🔍 VALIDACIÓN POST-DEPLOYMENT

### 1. Verifica Variables de Entorno

En tu deployment, revisa los logs:

```
✅ Site URL: https://malagapets.com
✅ Strapi URL: https://cms.malagapets.com
✅ Strapi Token: ✅ Configurado
✅ Google Analytics: G-XXXXXXXXXX
✅ Email (Resend): ✅ Configurado
```

### 2. Prueba Funcionalidades Críticas

- [ ] **Homepage** carga correctamente
- [ ] **Blog** muestra artículos desde Strapi
- [ ] **Mapas** se cargan correctamente
- [ ] **Formulario de contacto** funciona
- [ ] **i18n** (ES/EN/DE/FR) funciona
- [ ] **SEO** meta tags aparecen
- [ ] **Sitemap** accesible en `/sitemap.xml`
- [ ] **Robots.txt** accesible en `/robots.txt`

### 3. Verifica Analytics

Si configuraste Google Analytics:
- Visita tu sitio
- Ve a Google Analytics en tiempo real
- Deberías ver tu visita

### 4. Prueba Email

Envía un mensaje de contacto y verifica:
- [ ] Recibes el email en `CONTACT_EMAIL`
- [ ] El usuario recibe confirmación
- [ ] Rate limiting funciona (intenta enviar 6 mensajes)

---

## ⚠️ ERRORES COMUNES Y SOLUCIONES

### Error: "NEXT_PUBLIC_SITE_URL is not defined"

**Solución**: 
1. Ve a Vercel Dashboard > Settings > Environment Variables
2. Añade `NEXT_PUBLIC_SITE_URL` con tu dominio
3. Redeploy

### Error: "Failed to fetch from Strapi"

**Soluciones**:
1. Verifica `NEXT_PUBLIC_STRAPI_URL` esté correcta
2. Verifica `STRAPI_API_TOKEN` esté configurado
3. Verifica que Strapi esté accesible públicamente
4. Revisa CORS en Strapi: debe permitir tu dominio de Vercel

### Error: "Email failed to send"

**Soluciones**:
1. Verifica `RESEND_API_KEY` esté configurado
2. Verifica `RESEND_FROM_EMAIL` use un dominio verificado en Resend
3. Verifica `CONTACT_EMAIL` esté correcta

### Error: "Rate limit exceeded" en mapas

**Solución**:
Espera 1 minuto o limpia cookies/caché

---

## 🔐 SEGURIDAD POST-DEPLOYMENT

### Headers de Seguridad

Tu proyecto ya tiene configurados:
- ✅ Content-Security-Policy
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### Rate Limiting

Configurado automáticamente:
- ✅ API Contact: 5 req/15min
- ✅ API Maps: 60 req/min
- ✅ API Veterinary: 100 req/min
- ✅ API Beaches: 100 req/min

### CORS

Configurado para aceptar solo desde tu dominio

---

## 📊 MONITOREO POST-DEPLOYMENT

### Vercel Analytics (incluido gratis)

1. Ve a tu proyecto en Vercel
2. Click en **"Analytics"**
3. Verás métricas de rendimiento automáticamente

### Logs

Para ver logs de errores:
1. Vercel Dashboard > Tu proyecto
2. Click en **"Logs"**
3. Filtra por errores

### Console Logs

En producción, `console.log` se eliminan automáticamente (ver `next.config.ts`)

Solo verás en logs de Vercel:
- `console.error`
- `console.warn`

---

## 🚀 OPTIMIZACIONES RECOMENDADAS

### 1. Configurar Dominio Personalizado

✅ Ya tienes: `malagapets.com` (según tu código)

### 2. Activar Analytics

```bash
# En Vercel Dashboard, añade:
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 3. Configurar Email (Resend)

1. Regístrate en [resend.com](https://resend.com)
2. Verifica tu dominio
3. Copia API Key
4. Añade en Vercel:
```bash
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=MálagaPets <info@malagapets.com>
```

### 4. Optimizar Imágenes

Tu proyecto ya usa `next/image` con optimización automática ✅

### 5. Configurar Strapi

Si usas Strapi:
1. Despliega Strapi (Strapi Cloud, Railway, DigitalOcean)
2. Configura CORS en Strapi para permitir tu dominio
3. Genera API Token en Strapi
4. Añade variables en Vercel

---

## 🔄 REDEPLOYMENT

### Automático (Recomendado)

Cada push a `main` en GitHub redeploya automáticamente

### Manual

En Vercel Dashboard:
1. Ve a **Deployments**
2. Click en los `...` del último deployment
3. Click **"Redeploy"**

---

## 📱 PREVIEW DEPLOYMENTS

Cada Pull Request crea un deployment de preview automáticamente:
- URL única: `https://tu-proyecto-git-branch-user.vercel.app`
- Variables de entorno de Preview
- Perfecto para testing antes de merge

---

## 🎯 CHECKLIST FINAL

Antes de considerar el deployment completo:

- [ ] Dominio personalizado configurado
- [ ] Todas las variables de entorno configuradas
- [ ] SSL/HTTPS funcionando (automático en Vercel)
- [ ] Blog muestra artículos correctamente
- [ ] Formulario de contacto funciona
- [ ] Emails se envían correctamente
- [ ] Mapas cargan correctamente
- [ ] Analytics configurado y funcionando
- [ ] SEO meta tags verificados
- [ ] Sitemap.xml accesible
- [ ] Robots.txt configurado
- [ ] Performance: >90 en Lighthouse
- [ ] Mobile responsive verificado
- [ ] i18n (4 idiomas) funciona

---

## 🆘 SOPORTE

### Recursos Útiles

- [Documentación Vercel](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Resend Docs](https://resend.com/docs)
- [Strapi Docs](https://docs.strapi.io)

### Logs de Debugging

```bash
# Ver logs de producción
vercel logs [url-de-tu-deployment]

# Ver logs en tiempo real
vercel logs --follow
```

---

## 🎉 ¡LISTO!

Tu proyecto **MálagaPets** está ahora en producción 🚀

Comparte tu URL: `https://malagapets.com`

// strapi-project/src/emails/welcome-email.ts
import React from 'react';
import * as ReactModule from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
  Tailwind,
} from '@react-email/components';

interface WelcomeEmailProps {
  name: string;
  email: string;
  frontendUrl: string;
  unsubscribeUrl: string;
  locale?: string;
}

const MalagaPetsWelcomeEmail = ({ name, email, frontendUrl, unsubscribeUrl, locale = 'es' }: WelcomeEmailProps) => {
  return (
    <Html lang={locale} dir="ltr">
      <Tailwind>
        <Head />
        <Preview>¡Ya eres parte de MálagaPets! Descubre todo lo que tenemos para ti 🐾</Preview>
        <Body className="bg-gradient-to-br from-cyan-50 to-blue-50 font-sans py-[40px]">
          <Container className="bg-white rounded-[16px] shadow-2xl max-w-[600px] mx-auto overflow-hidden">
            
            {/* Hero Header con degradado */}
            <Section className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-center py-[48px] px-[40px]">
              <Heading className="text-[36px] font-bold text-gray-800  m-0 mb-[12px] tracking-tight">
                ¡Bienvenido/a a MálagaPets!
              </Heading>
              <Text className="text-[20px] text-gray-800 m-0 font-light">
                Tu aventura mascota comienza aquí 🐾
              </Text>
            </Section>

            {/* Contenido Principal */}
            <Section className="px-[40px] py-[40px]">
              <Text className="text-[18px] text-gray-800 leading-[28px] mb-[24px] m-0 font-medium">
                ¡Hola {name}! 👋
              </Text>
              
              <Text className="text-[16px] text-gray-600 leading-[26px] mb-[32px] m-0 pb-[10px]">
                Oficialmente ya formas parte de nuestra familia de mascotas. Gracias por confirmar
                tu suscripción. Estamos emocionados de compartir contigo todo lo mejor del mundo
                de las mascotas en Málaga.
              </Text>

              {/* Tarjetas de beneficios */}
              <Text className="text-[18px] text-gray-800 leading-[24px] mb-[20px] pb-[10px] font-semibold">
                ¿Qué puedes esperar de nosotros?
              </Text>

              {/* Beneficio 1 */}
              <Section className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-[12px] pb-[10px] p-[20px] mb-[16px] border-l-4 border-r-4 border-solid border-cyan-600">
                <Text className="text-[16px] text-gray-800 leading-[24px] mb-[4px] font-semibold">
                  📧 Noticias de la plataforma
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0">
                  Mantente al día con novedades, actualizaciones y mejoras exclusivas
                </Text>
              </Section>

              {/* Beneficio 2 */}
              <Section className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-[12px] pb-[10px] p-[20px] mb-[16px] border-l-4 border-r-4 border-solid border-blue-500">
                <Text className="text-[16px] text-gray-800 leading-[24px] mb-[4px] font-semibold">
                  📝 Artículos y consejos
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0">
                  Historias inspiradoras y guías prácticas para cuidar mejor de tu mascota
                </Text>
              </Section>

              {/* Beneficio 3 */}
              <Section className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-[12px] pb-[10px] p-[20px] mb-[32px] border-l-4 border-r-4 border-solid border-teal-500">
                <Text className="text-[16px] text-gray-800 leading-[24px] mb-[4px] font-semibold">
                  🗺️ Mapas y guías locales
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0">
                  Descubre los mejores lugares pet-friendly de Málaga
                </Text>
              </Section>

              {/* CTA Principal */}
              <Section className="text-center mb-[32px]">
                <Button
                  href="https://www.malagapets.com"
                  className="bg-cyan-600 text-white px-[40px] py-[18px] rounded-[12px] text-[16px] font-semibold no-underline inline-block shadow-lg hover:shadow-xl transition-all"
                >
                  Explorar MálagaPets
                </Button>
              </Section>
            </Section>

            {/* Sección Comunidad */}
            <Section className="bg-gradient-to-r from-gray-50 to-gray-100 px-[40px] py-[32px] border-t border-solid border-gray-200">
              <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[12px] font-semibold text-center">
                ¡Únete a nuestra comunidad! 🎉
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[22px] m-0 mb-[16px] text-center">
                Síguenos en redes sociales para contenido diario y conecta con otros amantes
                de mascotas de Málaga
              </Text>
              <Section className="text-center">
                <Link 
                  href="https://instagram.com/malagapets" 
                  className="inline-block bg-white text-cyan-600 px-[24px] py-[10px] rounded-[8px] text-[14px] font-semibold no-underline shadow-md hover:shadow-lg transition-all border border-solid border-cyan-200"
                >
                  📱 Síguenos en Instagram
                </Link>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-800 px-[40px] py-[32px] text-center">
              <Text className="text-[14px] text-gray-300 leading-[22px] m-0 mb-[16px]">
                ¡Que comience la diversión! 🐾<br />
                <span className="text-cyan-400 font-semibold">El equipo de MálagaPets</span>
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[18px] m-0 mb-[8px]">
                Si deseas cancelar tu suscripción, puedes hacerlo{' '}
                <Link
                  href={unsubscribeUrl}
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  aquí
                </Link>
              </Text>
              <Text className="text-[11px] text-gray-500 leading-[16px] m-0">
                © {new Date().getFullYear()} MálagaPets. Todos los derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

MalagaPetsWelcomeEmail.PreviewProps = {
  name: "María",
  email: "maria@ejemplo.com",
  frontendUrl: "https://malagapets.com",
  unsubscribeUrl: "https://malagapets.com/es/newsletter/unsubscribe?email=maria@ejemplo.com",
} as WelcomeEmailProps;

export default MalagaPetsWelcomeEmail;
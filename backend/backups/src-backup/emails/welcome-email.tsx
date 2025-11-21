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
}

const MalagaPetsWelcomeEmail = ({ name, email, frontendUrl }: WelcomeEmailProps) => {
  return (
    <Html lang="es" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>¡Ya eres parte de MálagaPets! Descubre todo lo que tenemos para ti 🐾</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[32px] font-bold text-orange-600 m-0 mb-[16px]">
                ¡Bienvenido/a a MálagaPets! 🐾
              </Heading>
              <Text className="text-[18px] text-gray-700 m-0">
                Tu aventura de mascotas comienza aquí
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] m-0">
                ¡Hola {name || 'amigo perruno'}!
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] m-0">
                ¡Oficialmente ya formas parte de nuestra familia perruna! Gracias por confirmar 
                tu suscripción. Estamos emocionados de compartir contigo todo lo mejor del mundo 
                de las mascotas en nuestra querida Málaga.
              </Text>
              
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[20px] m-0 py-[10px]">
                <strong>¿Qué puedes esperar de nosotros?</strong>
              </Text>
              
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] m-0">
                📧 <strong>Noticias de la plataforma:</strong> Novedades, actualizaciones y mejoras
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] m-0">
                📝 <strong>Nuevos artículos del blog:</strong> Consejos, historias y guías sobre mascotas
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={`${frontendUrl}/blog`}
                className="bg-cyan-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border hover:bg-cyan-500/80"
              >
                Explorar nuestro blog
              </Button>
            </Section>

            {/* Community section */}
            <Section className="bg-orange-50 rounded-[8px] p-[24px] mb-[24px]">
              <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[12px]">
                <strong>¡Únete a nuestra comunidad!</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[12px]">
                Síguenos en redes sociales para contenido diario y conecta con otros amantes 
                de mascotas de Málaga:
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                <Link href="https://instagram.com/malagapets" className="text-orange-600 underline">Instagram</Link>
                </Text>
            </Section>

            {/* Preferences */}
            <Section className="mb-[24px]">
              <Text className="text-[13px] text-gray-600 leading-[18px] m-0">
                <strong>Personaliza tu experiencia:</strong> Puedes gestionar tus preferencias 
                en cualquier momento para recibir solo el contenido que más te interese.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px] text-center">
                ¡Que comience la diversión perruna! 🎉<br />
                El equipo de MálagaPets
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0 text-center">
                <Link 
                  href={`${frontendUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`} 
                  className="text-gray-400 underline"
                >
                  Darse de baja
                </Link>
                {' | '}
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
} as WelcomeEmailProps;

export default MalagaPetsWelcomeEmail;
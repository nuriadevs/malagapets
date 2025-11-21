// strapi-project/src/emails/confirmation-email.tsx
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

interface ConfirmationEmailProps {
  email: string;
  confirmationUrl: string;
}

const MalagaPetsConfirmationEmail = ({ email, confirmationUrl }: ConfirmationEmailProps) => {
  return (
    <Html lang="es" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>¡Solo falta un clic para unirte a MálagaPets! 🐾</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-orange-600 m-0 mb-[16px]">
                ¡Un paso más para unirte! 🐾
              </Heading>
              <Text className="text-[18px] text-gray-700 m-0">
                Confirma tu suscripción a MálagaPets
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] m-0">
                ¡Hola!
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] m-0">
                ¡Qué alegría saber que quieres formar parte de nuestra comunidad de mascotas! 
                Gracias por tu interés en MálagaPets.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] m-0">
                <strong>Para empezar a recibir nuestros emails, necesitas confirmar tu suscripción.</strong>
              </Text>
              <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px] m-0">
                Una vez confirmada, recibirás noticias de nuestra plataforma y notificaciones 
                cuando publiquemos nuevos artículos en nuestro blog sobre mascotas en Málaga.
              </Text>
            </Section>

            {/* CTA Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={confirmationUrl}
                className="bg-orange-500 text-white px-[40px] py-[18px] rounded-[8px] text-[18px] font-bold no-underline box-border hover:bg-orange-600 shadow-lg"
              >
                ✅ Sí, quiero suscribirme
              </Button>
              <Text className="text-[12px] text-gray-500 mt-[12px] m-0">
                Haz clic para confirmar tu suscripción
              </Text>
            </Section>

            {/* Alternative text link */}
            <Section className="text-center mb-[24px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                ¿No puedes ver el botón? Copia y pega este enlace:
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[18px] m-0 break-all">
                <Link href={confirmationUrl} className="text-orange-600 underline">
                  {confirmationUrl}
                </Link>
              </Text>
            </Section>

            {/* Expiration warning */}
            <Section className="bg-yellow-50 border-l-4 border-yellow-400 rounded-[8px] p-[20px] mb-[24px]">
              <Text className="text-[13px] text-yellow-800 leading-[18px] m-0">
                ⏰ <strong>Este enlace expirará en 24 horas</strong> por seguridad.
              </Text>
            </Section>

            {/* Preferences note */}
            <Section className="bg-orange-50 rounded-[8px] p-[20px] mb-[24px]">
              <Text className="text-[13px] text-gray-600 leading-[18px] m-0">
                <strong>Nota:</strong> Podrás gestionar tus preferencias de email en cualquier momento 
                desde los enlaces que incluiremos en nuestros envíos.
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-solid border-gray-200 pt-[20px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px] text-center">
                Con cariño de mascota,<br />
                El equipo de MálagaPets
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[16px] m-0 text-center">
                Si no solicitaste esta suscripción, puedes ignorar este email de forma segura.
              </Text>
              <Text className="text-[11px] text-gray-400 leading-[14px] m-0 mt-[12px] text-center">
                © {new Date().getFullYear()} MálagaPets. Todos los derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

MalagaPetsConfirmationEmail.PreviewProps = {
  email: "usuario@ejemplo.com",
  confirmationUrl: "https://malagapets.com/api/newsletter/confirm?id=123&email=usuario@ejemplo.com",
} as ConfirmationEmailProps;

export default MalagaPetsConfirmationEmail;
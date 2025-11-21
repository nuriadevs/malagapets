import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
  Row,
  Column,
  Tailwind,
} from '@react-email/components';

const ContactFormEmail = (props: {
  name: string;
  email: string;
  subject: string;
  message: string;
  ip: string;
  timestamp?: string;
}) => {
  const currentDate = new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Html lang="es" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Nuevo mensaje de contacto de {props.name} - MálagaPets</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[12px] shadow-lg max-w-[600px] mx-auto overflow-hidden">
            {/* Header con gradiente */}
            <Section className="bg-gradient-to-r from-[#0097b2] to-[#00768d] px-[32px] py-[40px] text-center">
              <Text className="text-[32px] font-bold text-gray-800 m-0 mb-[8px]">
                🐾 MálagaPets
              </Text>
              <Text className="text-[18px] text-gray-800m-0">
                Nuevo mensaje de contacto recibido
              </Text>
            </Section>

            {/* Contenido principal */}
            <Section className="px-[32px] py-[32px]">
              <Heading className="text-[24px] font-bold text-gray-800 mb-[24px] text-center">
                Tienes un nuevo mensaje 📧
              </Heading>

              {/* Información del remitente */}
              <Section className="bg-gray-50 rounded-[8px] p-[24px] mb-[24px]">
                <Row>
                  <Column className="w-full">
                    <Text className="text-[16px] font-semibold text-[#00768d] mb-[12px] m-0">
                      👤 Información del remitente
                    </Text>
                  </Column>
                </Row>
                
                <Row className="mb-[8px]">
                  <Column className="w-[80px]">
                    <Text className="text-[14px] font-medium text-gray-600 m-0">
                      Nombre:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="text-[14px] text-gray-800 m-0 font-medium">
                      {props.name}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column className="w-[80px]">
                    <Text className="text-[14px] font-medium text-gray-600 m-0">
                      Email:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="text-[14px] text-[#0097b2] m-0 font-medium">
                      {props.email}
                    </Text>
                  </Column>
                </Row>
              </Section>

              {/* Asunto del mensaje */}
              <Section className="mb-[24px]">
                <Text className="text-[16px] font-semibold text-[#00768d] mb-[8px] m-0">
                  📋 Asunto
                </Text>
                <Section className="bg-[#0097b2]/5 border-l-[4px] border-[#0097b2] pl-[16px] py-[12px]">
                  <Text className="text-[16px] text-gray-800 m-0 font-medium">
                    {props.subject}
                  </Text>
                </Section>
              </Section>

              {/* Mensaje */}
              <Section className="mb-[32px]">
                <Text className="text-[16px] font-semibold text-[#00768d] mb-[12px] m-0">
                  💬 Mensaje
                </Text>
                <Section className="bg-gray-50 rounded-[8px] p-[20px] border border-gray-200">
                  <Text className="text-[15px] text-gray-700 leading-[24px] m-0 whitespace-pre-wrap">
                    {props.message}
                  </Text>
                </Section>
              </Section>

              {/* Botón CTA */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={`mailto:${props.email}?subject=Re: ${props.subject}`}
                  className="bg-gradient-to-r from-[#0097b2] to-[#00768d] text-gray-800 py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border hover:shadow-lg transition-all duration-200"
                >
                  📧 Responder directamente
                </Button>
              </Section>

              <Hr className="border-gray-200 my-[24px]" />

              {/* Información técnica */}
              <Section className="bg-gray-50 rounded-[8px] p-[20px]">
                <Text className="text-[14px] font-semibold text-gray-600 mb-[12px] m-0">
                  📊 Información técnica
                </Text>
                
                <Row className="mb-[4px]">
                  <Column className="w-[120px]">
                    <Text className="text-[13px] text-gray-500 m-0">
                      Fecha y hora:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="text-[13px] text-gray-700 m-0">
                      {currentDate}
                    </Text>
                  </Column>
                </Row>

                <Row>
                  <Column className="w-[120px]">
                    <Text className="text-[13px] text-gray-500 m-0">
                      Dirección IP:
                    </Text>
                  </Column>
                  <Column>
                    <Text className="text-[13px] text-gray-700 m-0 font-mono">
                      {props.ip}
                    </Text>
                  </Column>
                </Row>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-800 px-[32px] py-[24px] text-center">
              <Text className="text-[14px] text-gray-300 m-0 mb-[8px]">
                🐾 MálagaPets - Tu plataforma de confianza para mascotas
              </Text>
              <Text className="text-[12px] text-gray-400 m-0">
                Este mensaje fue generado automáticamente desde el formulario de contacto de MálagaPets
              </Text>
              <Text className="text-[12px] text-gray-500 m-0 mt-[8px]">
                © {new Date().getFullYear()} MálagaPets. Todos los derechos reservados.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default ContactFormEmail;
import * as React from 'react';
import { socialLinks } from "@/data/social-links";
import {
    Body,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Text,
    Hr,
    Row,
    Column,
    Tailwind,
} from '@react-email/components';

const ContactConfirmationEmail = (props: {
    name: string;
    email: string;
    subject: string;
    message: string;
}) => {
    // Extraer los primeros 150 caracteres del mensaje para el resumen
    const messagePreview = props.message.length > 150
        ? props.message.substring(0, 150) + '...'
        : props.message;

    return (
        <Html lang="es" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>¡Gracias por contactar con MálagaPets! Hemos recibido tu mensaje</Preview>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[12px] shadow-lg max-w-[600px] mx-auto overflow-hidden">

                        {/* Header cálido */}
                        <Section className="bg-gradient-to-r from-[#0097b2] to-[#00768d] px-[32px] py-[32px] text-center">
                            <Text className="text-[28px] font-bold text-[#00768d] m-0 mb-[4px]">
                                🐾 MálagaPets
                            </Text>
                            <Text className="text-[16px] text-gray-700 m-0">
                                ¡Tu mensaje nos importa!
                            </Text>
                        </Section>

                        {/* Mensaje principal */}
                        <Section className="px-[32px] py-[32px]">
                            <Text className="text-[20px] font-semibold text-[#00768d] mb-[16px] m-0">
                                ¡Hola {props.name}! 👋
                            </Text>

                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[24px] m-0">
                                Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y queremos que sepas que es muy importante para MálagaPets.
                            </Text>

                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[32px] m-0">
                                Nos encanta poder ayudarte con todo lo relacionado al mundo de las mascotas. Revisaremos tu consulta con atención y te responderemos lo antes posible.
                            </Text>

                            {/* Resumen del mensaje */}
                            <Section className="bg-[#0097b2]/5 rounded-[12px] p-[24px] mb-[32px] border-l-[4px] border-[#0097b2]">
                                <Text className="text-[16px] font-semibold text-[#00768d] mb-[16px] m-0">
                                    📝 Resumen de tu mensaje
                                </Text>

                                <Row className="mb-[12px]">
                                    <Column className="w-[80px]">
                                        <Text className="text-[14px] font-medium text-gray-600 m-0">
                                            Asunto:
                                        </Text>
                                    </Column>
                                    <Column>
                                        <Text className="text-[14px] text-gray-800 m-0 font-medium">
                                            {props.subject}
                                        </Text>
                                    </Column>
                                </Row>

                                <Text className="text-[14px] font-medium text-gray-600 mb-[8px] m-0">
                                    Tu mensaje:
                                </Text>
                                <Text className="text-[14px] text-gray-700 leading-[20px] m-0 bg-white p-[16px] rounded-[8px] border border-gray-200">
                                    {messagePreview}
                                </Text>
                            </Section>

                            {/* Tiempo de respuesta */}
                            <Section className="bg-gradient-to-r from-[#0097b2]/10 to-[#00768d]/10 rounded-[12px] p-[24px] mb-[32px] text-center">
                                <Text className="text-[18px] font-semibold text-[#00768d] mb-[8px] m-0">
                                    ⏰ Te responderemos pronto
                                </Text>
                                <Text className="text-[14px] text-gray-600 m-0">
                                    Revisaremos tu consulta y te contactaremos en breve
                                </Text>
                            </Section>
                            <Hr className="border-gray-200 my-[32px]" />

                            {/* Mensaje de cierre cálido */}
                            <Section className="text-center mb-[24px]">
                                <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] m-0">
                                    Gracias por confiar en MálagaPets. Estamos aquí para hacer que la vida con tu mascota sea aún más especial. 🐕🐱
                                </Text>
                                <Text className="text-[15px] text-[#0097b2] font-medium m-0">
                                    ¡Nos vemos pronto!
                                </Text>
                            </Section>
                        </Section>
                        <section className="px-[32px] pb-[32px] text-center">
                            <Text className="text-[15px] text-[#0097b2] font-medium m-0">
                                Visítanos en:
                            </Text>
                            <Row className="">
                                <Text className="text-[12px] text-gray-400 m-0">
                                    Web: www.malagapets.com
                                </Text>
                                <Text className="text-[12px] text-gray-400 mb-[4px] m-0">
                                    Email: info@malagapets.com
                                </Text>
                            </Row>
                        </section>
                        {/* Footer final */}
                        <Section className="bg-gray-800 px-[32px] py-[20px] text-center">
                            <Text className="text-[14px] text-gray-300 m-0 mb-[8px]">
                                🐾 MálagaPets - Conectando corazones con patitas
                            </Text>
                            <Text className="text-[14px] text-gray-400 m-0 mb-[8px]">
                                Síguenos en redes sociales:{" "}
                                <a
                                    href={socialLinks[0].href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-600 hover:text-cyan-500 underline transition-colors duration-200"
                                    aria-label={`Visita nuestro perfil de ${socialLinks[0].label} (se abre en una nueva pestaña)`}
                                >
                                    {socialLinks[0].label}
                                </a>
                            </Text>

                            <Text className="text-[12px] text-gray-300 m-0">
                                © {new Date().getFullYear()} MálagaPets.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ContactConfirmationEmail;
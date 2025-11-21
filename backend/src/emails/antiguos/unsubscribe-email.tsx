// strapi-project/src/emails/unsubscribe-email.ts

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

interface UnsubscribeEmailProps {
    name: string;
    email: string;
    frontendUrl: string;
    locale?: string;
}

const MalagaPetsUnsubscribeEmail = ({ name, email, frontendUrl, locale = 'es' }: UnsubscribeEmailProps) => {
    return (
        <Html lang={locale} dir="ltr">
            <Tailwind>
                <Head />
                <Preview>Tu suscripción a MálagaPets ha sido cancelada - ¡Gracias por acompañarnos!</Preview>
                <Body className="bg-gradient-to-br from-gray-50 to-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[16px] shadow-2xl max-w-[600px] mx-auto overflow-hidden">
                        
                        {/* Header con tono suave */}
                        <Section className="bg-gradient-to-r from-gray-100 to-gray-200 text-center py-[28px] px-[20px]">
                            <Text className="text-[48px] m-0 mb-[12px]">🐾</Text>
                            <Heading className="text-[32px] font-bold text-gray-700 m-0 mb-[12px] tracking-tight">
                                Te echaremos de menos
                            </Heading>
                            <Text className="text-[16px] text-gray-600 m-0 font-light">
                                Confirmación de baja de suscripción
                            </Text>
                        </Section>

                        {/* Contenido Principal */}
                        <Section className="px-[40px] py-[40px]">
                            <Text className="text-[18px] text-gray-800 leading-[28px] mb-[24px] m-0 font-medium">
                                Hola {name},
                            </Text>
                            
                            <Text className="text-[16px] text-gray-600 leading-[26px] mb-[32px] m-0">
                                Hemos procesado tu solicitud de baja y tu suscripción a MálagaPets ha sido
                                cancelada exitosamente. Ya no recibirás más emails de nuestra parte.
                            </Text>

                            {/* Detalles en tarjeta */}
                            <Section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[12px] pb-[10px] pt-[10px] p-[24px] mb-[32px] border border-solid border-gray-200">
                                <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[16px] font-semibold">
                                    Detalles de la baja
                                </Text>
                                <Text className="text-[14px] text-gray-600 leading-[22px] mb-[8px] m-0">
                                    📧 <strong>Email:</strong> {email}
                                </Text>
                                <Text className="text-[14px] text-gray-600 leading-[22px] mb-[8px] m-0">
                                    📅 <strong>Fecha:</strong> {new Date().toLocaleDateString('es-ES', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </Text>
                                <Text className="text-[14px] text-gray-600 leading-[22px] m-0">
                                    ⏰ <strong>Efectiva:</strong> Inmediatamente
                                </Text>
                            </Section>

                            {/* Feedback section */}
                            <Section className="bg-gradient-to-br from-cyan-50 to-cyan-50 rounded-[12px] pb-[10px] p-[24px] mb-[32px] border-l-4 border-r-4 border-solid border-cyan-600">
                                <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[12px] font-semibold">
                                    ¿Nos ayudas a mejorar? 💭
                                </Text>
                                <Text className="text-[14px] text-gray-600 leading-[22px] m-0 mb-[16px]">
                                    Tu opinión es muy valiosa para nosotros. Si tienes un minuto, nos encantaría
                                    saber qué podríamos haber hecho mejor.
                                </Text>
                                <Button
                                    href={`${frontendUrl}/contact?subject=Feedback+Newsletter`}
                                    className="bg-cyan-600 text-white px-[24px] py-[12px] rounded-[8px] text-[14px] font-semibold no-underline inline-block shadow-md hover:shadow-lg transition-all"
                                >
                                    Enviar comentarios
                                </Button>
                            </Section>

                            {/* Stay connected */}
                            <Section className="mb-[32px]">
                                <Text className="text-[18px] text-gray-800 leading-[24px] pb-[10px] mb-[16px] m-0 font-semibold">
                                    ¡Pero no te vayas del todo! 💚
                                </Text>
                                <Text className="text-[14px] text-gray-600 leading-[22px] pb-[10px] mb-[16px] m-0">
                                    Aunque ya no recibas nuestros emails, siempre puedes:
                                </Text>
                                
                                <Section className="bg-white rounded-[10px] p-[16px] mb-[12px] border border-solid border-gray-200 pt-[10px]">
                                    <Text className="text-[14px] text-gray-700 leading-[22px] m-0">
                                        🌐 Visitar nuestro{' '}
                                        <Link href={`${frontendUrl}/blog`} className="text-cyan-600 underline font-semibold">
                                            blog
                                        </Link>
                                        {' '}cuando quieras
                                    </Text>
                                </Section>
                                
                                <Section className="bg-white rounded-[10px] p-[16px] border border-solid border-gray-200">
                                    <Text className="text-[14px] text-gray-700 leading-[22px] m-0">
                                        📱 Seguirnos en{' '}
                                        <Link href="https://instagram.com/malagapets" className="text-cyan-600 underline font-semibold">
                                            Instagram
                                        </Link>
                                    </Text>
                                </Section>
                            </Section>

                            {/* Resubscribe option */}
                            <Section className="text-center bg-gradient-to-br from-cyan-50 to-blue-50 rounded-[12px] p-[24px]">
                                <Text className="text-[16px] text-gray-700 pb-[10px] leading-[22px] mb-[16px] m-0 font-medium">
                                    ¿Cambio de planes? 🔄
                                </Text>
                                <Text className="text-[14px] pb-[10px] text-gray-600 leading-[22px] mb-[20px] m-0">
                                    Puedes volver cuando quieras. Siempre serás bienvenido.
                                </Text>
                                <Button
                                    href={`${frontendUrl}/blog`}
                                    className="bg-cyan-600 text-white px-[32px] py-[14px] rounded-[10px] text-[15px] font-semibold no-underline inline-block shadow-lg hover:shadow-xl transition-all"
                                >
                                    Volver a suscribirme
                                </Button>
                            </Section>
                        </Section>

                        {/* Footer */}
                        <Section className="bg-gray-800 px-[40px] py-[32px] text-center">
                            <Text className="text-[14px] text-gray-300 leading-[22px] m-0 mb-[4px]">
                                Gracias por haber formado parte de nuestra familia 💚
                            </Text>
                            <Text className="text-[14px] text-gray-300 leading-[22px] m-0 mb-[16px]">
                                ¡Hasta pronto!
                            </Text>
                            <Text className="text-[13px] text-cyan-400 leading-[20px] m-0 mb-[16px] font-semibold">
                                El equipo de MálagaPets
                            </Text>
                            <Text className="text-[12px] text-gray-400 leading-[18px] m-0 mb-[8px]">
                                Si esta baja fue un error, puedes{' '}
                                <Link href={`${frontendUrl}/contact`} className="text-cyan-400 underline hover:text-cyan-300">
                                    contactarnos
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

MalagaPetsUnsubscribeEmail.PreviewProps = {
    name: "María",
    email: "maria@ejemplo.com",
    frontendUrl: "https://malagapets.com",
} as UnsubscribeEmailProps;

export default MalagaPetsUnsubscribeEmail;
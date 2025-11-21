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
}

const MalagaPetsUnsubscribeEmail = ({ name, email, frontendUrl }: UnsubscribeEmailProps) => {
    return (
        <Html lang="es" dir="ltr">
            <Tailwind>
                <Head />
                <Preview>Tu suscripción a MálagaPets ha sido cancelada - ¡Gracias por acompañarnos!</Preview>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-lg max-w-[600px] mx-auto p-[40px]">
                        {/* Header */}
                        <Section className="text-center mb-[32px]">
                            <Heading className="text-[28px] font-bold text-gray-700 m-0 mb-[16px]">
                                Te echaremos de menos 🐾
                            </Heading>
                            <Text className="text-[18px] text-gray-600 m-0">
                                Confirmación de baja de suscripción
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] m-0">
                                Hola {name},
                            </Text>
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] m-0">
                                Hemos procesado tu solicitud de baja y tu suscripción a MálagaPets ha sido
                                cancelada exitosamente. Ya no recibirás más emails de nuestra parte.
                            </Text>
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[20px] m-0">
                                <strong>Detalles de la baja:</strong>
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] m-0">
                                📧 <strong>Email:</strong> {email}
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] m-0">
                                📅 <strong>Fecha de baja:</strong> {new Date().toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px] m-0">
                                ⏰ <strong>Efectiva:</strong> Inmediatamente
                            </Text>
                        </Section>

                        {/* Feedback section */}
                        <Section className="bg-orange-50 rounded-[8px] p-[24px] mb-[32px]">
                            <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[12px]">
                                <strong>¿Nos ayudas a mejorar?</strong>
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
                                Tu opinión es muy valiosa para nosotros. Si tienes un minuto, nos encantaría
                                saber qué podríamos haber hecho mejor.
                            </Text>
                            <Button
                                href={`${frontendUrl}/contact?subject=Feedback+Newsletter`}
                                className="bg-orange-500 text-white px-[24px] py-[12px] rounded-[6px] text-[14px] font-semibold no-underline box-border hover:bg-orange-600"
                            >
                                Enviar comentarios
                            </Button>
                        </Section>

                        {/* Stay connected */}
                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px] m-0">
                                <strong>¡Pero no te vayas del todo!</strong>
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px] m-0">
                                Aunque ya no recibas nuestros emails, siempre puedes:
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] m-0">
                                🌐 Visitar nuestro{' '}
                                <Link href={`${frontendUrl}/blog`} className="text-orange-600 underline">
                                    blog
                                </Link>
                                {' '}cuando quieras
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] m-0">
                                📱 Seguirnos en{' '}
                                <Link href="https://instagram.com/malagapets" className="text-orange-600 underline">
                                    Instagram
                                </Link>
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Section className="border-t border-solid border-gray-200 pt-[24px]">
                            <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px] text-center">
                                Gracias por haber formado parte de nuestra familia de mascotas 💚<br />
                                ¡Hasta pronto!<br /><br />
                                El equipo de MálagaPets
                            </Text>
                            <Text className="text-[12px] text-gray-400 leading-[16px] m-0 text-center">
                                Si esta baja fue un error, puedes{' '}
                                <Link href={`${frontendUrl}/contact`} className="text-gray-400 underline">
                                    contactarnos
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

MalagaPetsUnsubscribeEmail.PreviewProps = {
    name: "María",
    email: "maria@ejemplo.com",
    frontendUrl: "https://malagapets.com",
} as UnsubscribeEmailProps;

export default MalagaPetsUnsubscribeEmail;
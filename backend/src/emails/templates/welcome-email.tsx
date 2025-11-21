// src/emails/templates/welcome-email.tsx

import React from 'react';
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
import { useEmailTranslations } from '../utils/i18n';

interface WelcomeEmailProps {
  name: string;
  email: string;
  frontendUrl: string;
  unsubscribeUrl: string;
  locale?: string;
}

const MalagaPetsWelcomeEmail = ({ 
  name, 
  email, 
  frontendUrl,
  unsubscribeUrl,
  locale = 'es' 
}: WelcomeEmailProps) => {
  const { t, translations } = useEmailTranslations(locale);
  
  return (
    <Html lang={locale} dir="ltr">
      <Tailwind>
        <Head />
        <Preview>{t('welcome.preview')}</Preview>
        <Body className="bg-gradient-to-br from-cyan-50 to-blue-50 font-sans py-[40px]">
          <Container className="bg-white rounded-[16px] shadow-2xl max-w-[600px] mx-auto overflow-hidden">
            
            {/* Hero Header */}
            <Section className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-center py-[28px] px-[20px]">
              <Heading className="text-[36px] font-bold text-gray-800 m-0 mb-[12px] tracking-tight">
                {t('welcome.hero.title')}
              </Heading>
              <Text className="text-[18px] text-gray-800 m-0 font-light">
                {t('welcome.hero.subtitle')}
              </Text>
            </Section>

            {/* Contenido Principal */}
            <Section className="px-[40px] py-[40px]">
              <Text className="text-[18px] text-gray-800 leading-[28px] mb-[24px] m-0 font-medium">
                {t('welcome.greeting', { name })}
              </Text>
              
              <Text className="text-[16px] text-gray-600 leading-[26px] mb-[32px] m-0">
                {t('welcome.intro')}
              </Text>

              {/* Benefits Section */}
              <Section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-[16px] p-[32px] mb-[32px]">
                <Text className="text-[20px] text-gray-800 leading-[28px] m-0 mb-[24px] font-bold text-center">
                  {t('welcome.benefits.title')}
                </Text>

                {/* Platform News */}
                <Section className="mb-[20px] bg-white rounded-[12px] p-[20px] shadow-sm">
                  <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[8px] font-semibold">
                    {t('welcome.benefits.platform.title')}
                  </Text>
                  <Text className="text-[14px] text-gray-600 leading-[22px] m-0">
                    {t('welcome.benefits.platform.description')}
                  </Text>
                </Section>

                {/* Articles */}
                <Section className="mb-[20px] bg-white rounded-[12px] p-[20px] shadow-sm">
                  <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[8px] font-semibold">
                    {t('welcome.benefits.articles.title')}
                  </Text>
                  <Text className="text-[14px] text-gray-600 leading-[22px] m-0">
                    {t('welcome.benefits.articles.description')}
                  </Text>
                </Section>

                {/* Maps */}
                <Section className="bg-white rounded-[12px] p-[20px] shadow-sm">
                  <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[8px] font-semibold">
                    {t('welcome.benefits.maps.title')}
                  </Text>
                  <Text className="text-[14px] text-gray-600 leading-[22px] m-0">
                    {t('welcome.benefits.maps.description')}
                  </Text>
                </Section>
              </Section>

              {/* CTA Principal */}
              <Section className="text-center mb-[32px]">
                <Button
                  href={`${frontendUrl}/${locale}`}
                  className="bg-cyan-600 text-white px-[48px] py-[20px] rounded-[12px] text-[18px] font-bold no-underline inline-block shadow-lg hover:shadow-2xl transition-all"
                >
                  {t('welcome.cta')}
                </Button>
              </Section>

              {/* Community Section */}
              <Section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-[16px] p-[28px] mb-[24px] border border-solid border-purple-200">
                <Text className="text-[18px] text-gray-800 leading-[26px] m-0 mb-[12px] font-bold text-center">
                  {t('welcome.community.title')}
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0 mb-[20px] text-center">
                  {t('welcome.community.description')}
                </Text>
                <Section className="text-center">
                  <Button
                    href="https://instagram.com/malagapets"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-[32px] py-[14px] rounded-[10px] text-[15px] font-semibold no-underline inline-block"
                  >
                    {t('welcome.community.button')}
                  </Button>
                </Section>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-700 px-[40px] py-[32px] text-center">
              <Text className="text-[14px] text-gray-300 leading-[22px] m-0 mb-[16px]">
                {t('welcome.footer.signature')}<br />
                <span className="text-cyan-400 font-semibold">
                  {t('welcome.footer.team')}
                </span>
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[18px] m-0 mb-[8px]">
                {t('welcome.footer.unsubscribe')}{' '}
                <Link href={unsubscribeUrl} className="text-cyan-400 underline">
                  {t('welcome.footer.unsubscribeLink')}
                </Link>
              </Text>
              <Text className="text-[11px] text-gray-400 leading-[16px] m-0">
                {t('welcome.footer.copyright', { year: new Date().getFullYear() })}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default MalagaPetsWelcomeEmail;
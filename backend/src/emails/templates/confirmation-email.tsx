// src/emails/templates/confirmation-email.tsx

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

interface ConfirmationEmailProps {
  name: string;
  email: string;
  confirmationUrl: string;
  locale?: string;
}

const MalagaPetsConfirmationEmail = ({ 
  name, 
  email, 
  confirmationUrl, 
  locale = 'es' 
}: ConfirmationEmailProps) => {
  const { t, translations } = useEmailTranslations(locale);
  
  return (
    <Html lang={locale} dir="ltr">
      <Tailwind>
        <Head />
        <Preview>{t('confirmation.preview')}</Preview>
        <Body className="bg-gradient-to-br from-cyan-50 to-blue-50 font-sans py-[40px]">
          <Container className="bg-white rounded-[16px] shadow-2xl max-w-[600px] mx-auto overflow-hidden">
            
            {/* Hero Header */}
            <Section className="bg-gradient-to-r from-cyan-600 to-cyan-500 text-center py-[28px] px-[20px]">
              <Text className="text-[56px] m-0 mb-[8px]">
                {t('confirmation.hero.emoji')}
              </Text>
              <Heading className="text-[32px] font-bold text-gray-800 m-0 mb-[12px] tracking-tight">
                {t('confirmation.hero.title')}
              </Heading>
              <Text className="text-[18px] text-gray-800 m-0 font-light">
                {t('confirmation.hero.subtitle')}
              </Text>
            </Section>

            {/* Contenido Principal */}
            <Section className="px-[40px] py-[40px]">
              <Text className="text-[18px] text-gray-800 leading-[28px] mb-[24px] m-0 font-medium">
                {t('confirmation.greeting', { name })}
              </Text>
              
              <Text className="text-[16px] text-gray-600 leading-[26px] mb-[24px] m-0">
                {t('confirmation.intro')}
              </Text>

              <Section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-[12px] p-[24px] mb-[32px] mt-[32px] border-l-4 border-r-4 border-solid border-cyan-600">
                <Text className="text-[16px] text-gray-800 leading-[24px] m-0 font-semibold">
                  {t('confirmation.callout')}
                </Text>
              </Section>

              <Text className="text-[14px] text-gray-600 leading-[22px] mb-[32px] m-0">
                {t('confirmation.description')}
              </Text>

              {/* CTA Principal */}
              <Section className="text-center mb-[32px] bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-[16px] p-[32px] shadow-xl">
                <Button
                  href={confirmationUrl}
                  className="bg-cyan-600 text-white px-[48px] py-[20px] rounded-[12px] text-[18px] font-bold no-underline inline-block shadow-lg hover:shadow-2xl transition-all"
                >
                  {t('confirmation.cta.button')}
                </Button>
                <Text className="text-[13px] text-gray-800 mt-[16px] font-light">
                  {t('confirmation.cta.helper')}
                </Text>
              </Section>

              {/* Alternative link */}
              <Section className="bg-gray-50 rounded-[12px] p-[20px] mb-[24px]">
                <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[12px] font-medium text-center">
                  {t('confirmation.alternative.title')}
                </Text>
                <Text className="text-[12px] text-gray-600 leading-[18px] m-0 text-center break-all">
                  {t('confirmation.alternative.text')}<br />
                  <Link href={confirmationUrl} className="text-cyan-600 underline font-medium">
                    {confirmationUrl}
                  </Link>
                </Text>
              </Section>

              {/* Alertas importantes */}
              <Section className="mb-[24px]">
                <Section className="bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-r-4 border-solid border-amber-500 rounded-[10px] p-[20px] mb-[16px]">
                  <Text className="text-[14px] text-amber-800 leading-[22px] m-0">
                    {t('confirmation.warnings.expiration')}
                  </Text>
                </Section>

                <Section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-[10px] p-[20px] border border-solid border-cyan-200">
                  <Text className="text-[13px] text-gray-700 leading-[20px] m-0">
                    {t('confirmation.warnings.preferences')}
                  </Text>
                </Section>
              </Section>

              {/* What you'll receive */}
              <Section className="bg-white rounded-[12px] p-[24px] border border-solid border-gray-200 mb-[24px]">
                <Text className="text-[15px] text-gray-800 leading-[22px] m-0 mb-[16px] font-semibold">
                  {t('confirmation.benefits.title')}
                </Text>
                {translations.confirmation.benefits.items.map((item, index) => (
                  <Text key={index} className="text-[13px] text-gray-600 leading-[20px] m-0 mb-[8px]">
                    {item}
                  </Text>
                ))}
              </Section>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-700 px-[40px] py-[32px] text-center">
              <Text className="text-[14px] text-gray-300 leading-[22px] m-0 mb-[16px]">
                {t('confirmation.footer.signature')}<br />
                <span className="text-cyan-400 font-semibold">
                  {t('confirmation.footer.team')}
                </span>
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[18px] m-0 mb-[8px]">
                {t('confirmation.footer.disclaimer')}
              </Text>
              <Text className="text-[11px] text-gray-400 leading-[16px] m-0">
                {t('confirmation.footer.copyright', { year: new Date().getFullYear() })}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default MalagaPetsConfirmationEmail;
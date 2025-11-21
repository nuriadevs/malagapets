// src/emails/templates/unsubscribe-email.tsx

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

interface UnsubscribeEmailProps {
  name: string;
  email: string;
  frontendUrl: string;
  locale?: string;
}

const MalagaPetsUnsubscribeEmail = ({ 
  name, 
  email, 
  frontendUrl,
  locale = 'es' 
}: UnsubscribeEmailProps) => {
  const { t } = useEmailTranslations(locale);
  
  return (
    <Html lang={locale} dir="ltr">
      <Tailwind>
        <Head />
        <Preview>{t('unsubscribe.preview')}</Preview>
        <Body className="bg-gradient-to-br from-gray-50 to-blue-50 font-sans py-[40px]">
          <Container className="bg-white rounded-[16px] shadow-2xl max-w-[600px] mx-auto overflow-hidden">
            
            {/* Hero Header */}
            <Section className="bg-gradient-to-r from-gray-600 to-gray-500 text-center py-[28px] px-[20px]">
              <Text className="text-[56px] m-0 mb-[8px]">
                {t('unsubscribe.hero.emoji')}
              </Text>
              <Heading className="text-[32px] font-bold m-0 mb-[12px] tracking-tight">
                {t('unsubscribe.hero.title')}
              </Heading>
              <Text className="text-[18px]  m-0 font-light">
                {t('unsubscribe.hero.subtitle')}
              </Text>
            </Section>

            {/* Contenido Principal */}
            <Section className="px-[40px] py-[40px]">
              <Text className="text-[18px] text-gray-800 leading-[28px] mb-[16px] m-0 font-medium">
                {t('unsubscribe.greeting', { name })}
              </Text>
              
              <Text className="text-[16px] text-gray-600 leading-[26px] mb-[32px] m-0">
                {t('unsubscribe.intro')}
              </Text>

              {/* Unsubscribe Details */}
              <Section className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-[12px] p-[24px] mb-[32px] border border-solid border-gray-200">
                <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[16px] font-bold">
                  {t('unsubscribe.details.title')}
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0 mb-[8px]">
                  {t('unsubscribe.details.email')} <strong>{email}</strong>
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0 mb-[8px]">
                  {t('unsubscribe.details.date')} <strong>{new Date().toLocaleDateString(locale)}</strong>
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0">
                  {t('unsubscribe.details.effective')}
                </Text>
              </Section>

              {/* Feedback Section */}
              <Section className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-[12px] p-[24px] mb-[24px] border border-solid border-purple-200">
                <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[12px] font-bold">
                  {t('unsubscribe.feedback.title')}
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0 mb-[20px]">
                  {t('unsubscribe.feedback.description')}
                </Text>
                <Section className="text-center">
                  <Button
                    href={`${frontendUrl}/${locale}/contact?subject=feedback-unsubscribe`}
                    className="bg-purple-600 text-white px-[32px] py-[14px] rounded-[10px] text-[15px] font-semibold no-underline inline-block"
                  >
                    {t('unsubscribe.feedback.button')}
                  </Button>
                </Section>
              </Section>

              {/* Stay Connected */}
              <Section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-[12px] p-[24px] mb-[24px]">
                <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[12px] font-bold">
                  {t('unsubscribe.stayConnected.title')}
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0 mb-[16px]">
                  {t('unsubscribe.stayConnected.description')}
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0 mb-[8px]">
                  {t('unsubscribe.stayConnected.blog')}{' '}
                  <Link href={`${frontendUrl}/${locale}/blog`} className="text-cyan-600 underline font-medium">
                    {t('unsubscribe.stayConnected.blogLink')}
                  </Link>{' '}
                  {t('unsubscribe.stayConnected.blogText')}
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0">
                  {t('unsubscribe.stayConnected.social')}{' '}
                  <Link href="https://instagram.com/malagapets" className="text-cyan-600 underline font-medium">
                    {t('unsubscribe.stayConnected.socialLink')}
                  </Link>
                </Text>
              </Section>

              {/* Resubscribe Option */}
              <Section className="bg-white border-2 border-solid border-cyan-600 rounded-[12px] p-[24px] mb-[24px] text-center">
                <Text className="text-[16px] text-gray-800 leading-[24px] m-0 mb-[12px] font-bold">
                  {t('unsubscribe.resubscribe.title')}
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[22px] m-0 mb-[20px]">
                  {t('unsubscribe.resubscribe.description')}
                </Text>
                <Button
                  href={`${frontendUrl}/${locale}/blog`}
                  className="bg-cyan-600 text-white px-[32px] py-[14px] rounded-[10px] text-[15px] font-semibold no-underline inline-block"
                >
                  {t('unsubscribe.resubscribe.button')}
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="bg-gray-700 px-[40px] py-[32px] text-center">
              <Text className="text-[14px] text-gray-300 leading-[22px] m-0 mb-[16px]">
                {t('unsubscribe.footer.thankYou')}<br />
                {t('unsubscribe.footer.goodbye')}<br />
                <span className="text-cyan-400 font-semibold">
                  {t('unsubscribe.footer.team')}
                </span>
              </Text>
              <Text className="text-[12px] text-gray-400 leading-[18px] m-0 mb-[8px]">
                {t('unsubscribe.footer.errorText')}{' '}
                <Link href={`${frontendUrl}/${locale}/contact`} className="text-cyan-400 underline">
                  {t('unsubscribe.footer.errorLink')}
                </Link>
              </Text>
              <Text className="text-[11px] text-gray-400 leading-[16px] m-0">
                {t('unsubscribe.footer.copyright', { year: new Date().getFullYear() })}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};


export default MalagaPetsUnsubscribeEmail;
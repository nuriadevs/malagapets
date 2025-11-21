import { BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ComingSoon() {

  const t = useTranslations('comingSoon');

  return (
    <div className="max-w-7xlcontainer max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center min-h-[50vh]">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-800">
          <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t('title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {t('description')}
        </p>
      </div>
    </div>
  );
}
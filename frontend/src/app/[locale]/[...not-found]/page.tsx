// src/app/[locale]/[...not-found]/page.tsx
import { notFound } from 'next/navigation';

/**
 * Component for handling not found pages
 */
export default function NotFoundCatchAll() {
  notFound();
}
// src/components/ui/toast-provider.tsx
"use client";

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
          borderRadius: '10px',
          padding: '16px',
          fontSize: '14px',
        },
        success: {
          duration: 5000,
          style: {
            background: '#0891b2',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#0891b2',
          },
        },
        error: {
          duration: 5000,
          style: {
            background: '#ef4444',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          },
        },
        loading: {
          style: {
            background: '#0097b2',
          },
        },
      }}
    />
  );
}
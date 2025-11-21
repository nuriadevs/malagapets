import { type ReactNode } from 'react';

export interface ActionButtonProps {
    href?: string;
    onClick?: () => void;
    icon: ReactNode;
    children: ReactNode;
    variant?: 'maps' | 'phone' | 'website';
    className?: string;
    ariaLabel?: string;
    external?: boolean;
}


export interface TypeFilterProps {
    options: { value: string; label: string }[];
    selected: string;
    onChange: (value: string) => void;
    label: string;
    className?: string;
}

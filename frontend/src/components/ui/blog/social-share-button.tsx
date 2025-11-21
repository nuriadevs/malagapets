// components/ui/blog/SocialShareButton.tsx
'use client';

import { useTranslations } from "next-intl";
import {SocialShareButtonProps} from "@/types/blog";


export default function SocialShareButton({ config, onClick }: SocialShareButtonProps) {
    const tAccess = useTranslations("accessibility.sharePost");
    const Icon = config.icon;

    return (
        <button
            onClick={onClick}
            className={`cursor-pointer flex items-center justify-center w-9 h-9 rounded-full ${config.bgColor} ${config.hoverColor} ease-in duration-300 transition-all hover:scale-110`}
            aria-label={tAccess(config.ariaLabelKey)}
        >
            <Icon className="w-5 h-5 text-white" />
        </button>
    );
}
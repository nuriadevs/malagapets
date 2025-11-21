// components/ui/blog/share-post-config.ts
import { FaFacebook, FaLinkedin, FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import { IconType } from "react-icons";

export type SocialPlatform = 'facebook' | 'linkedin' | 'whatsapp' | 'telegram';

export interface SocialButtonConfig {
    platform: SocialPlatform;
    icon: IconType;
    bgColor: string;
    hoverColor: string;
    ariaLabelKey: string;
}

export const socialButtons: SocialButtonConfig[] = [
    {
        platform: 'facebook',
        icon: FaFacebook,
        bgColor: 'bg-[#1877F2]',
        hoverColor: 'hover:bg-[#1877F2]/90',
        ariaLabelKey: 'shareFacebook'
    },
    {
        platform: 'linkedin',
        icon: FaLinkedin,
        bgColor: 'bg-[#0A66C2]',
        hoverColor: 'hover:bg-[#0A66C2]/90',
        ariaLabelKey: 'shareLinkedIn'
    },
    {
        platform: 'whatsapp',
        icon: FaWhatsapp,
        bgColor: 'bg-[#25D366]',
        hoverColor: 'hover:bg-[#25D366]/90',
        ariaLabelKey: 'shareWhatsApp'
    },
    {
        platform: 'telegram',
        icon: FaTelegramPlane,
        bgColor: 'bg-[#0088cc]',
        hoverColor: 'hover:bg-[#0088cc]/90',
        ariaLabelKey: 'shareTelegram'
    }
];

export const generateShareUrl = (
    platform: SocialPlatform,
    url: string,
    title: string
): string => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const shareUrls: Record<SocialPlatform, string> = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`
    };

    return shareUrls[platform];
};
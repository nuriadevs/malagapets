// components/ui/blog/share-post.tsx
'use client';

import { useTranslations } from "next-intl";
import type { SharePostProps } from "@/types/components";
import SocialShareButton from "@/components/ui/blog/social-share-button";
import { socialButtons, generateShareUrl, type SocialPlatform } from "@/data/share-post-config";

export default function SharePost({
    title = "Check out this post",
    url
}: SharePostProps) {
    const t = useTranslations("blog.sharePost");

    const handleShare = (platform: SocialPlatform): void => {
        // Usar url prop si existe, sino fallback a window.location
        const shareUrl = generateShareUrl(
            platform, 
            url || (typeof window !== 'undefined' ? window.location.href : ''), 
            title
        );
        window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
    };

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
                <p className="text-muted-foreground">{t("shareText")}</p>
            </div>

            <div className="flex items-center gap-3">
                {socialButtons.map((button) => (
                    <SocialShareButton
                        key={button.platform}
                        config={button}
                        onClick={() => handleShare(button.platform)}
                    />
                ))}
            </div>
        </div>
    );
}
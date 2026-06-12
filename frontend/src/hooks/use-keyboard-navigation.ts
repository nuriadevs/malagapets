
import { useEffect } from "react";

/**
 * Custom hook for managing keyboard navigation.
 */
export function useKeyboardNavigation({
  enabled,
  selector,
  onEscape,
}: {
  enabled: boolean;
  selector: string;
  orientation?: 'vertical' | 'horizontal'; 
  onEscape?: () => void;
}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const links = document.querySelectorAll<HTMLElement>(selector);
      const active = document.activeElement;
      const index = Array.from(links).indexOf(active as HTMLElement);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = (index + 1) % links.length;
          links[nextIndex]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = (index - 1 + links.length) % links.length;
          links[prevIndex]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          links[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          links[links.length - 1]?.focus();
          break;
        case 'Escape':
          onEscape?.();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, selector, onEscape]);
}

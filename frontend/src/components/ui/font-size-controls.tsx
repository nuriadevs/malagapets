'use client';

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { Minus, Plus, RotateCcw, Glasses } from "lucide-react";

/**
 * Dropdown menu for selecting text size.
 */
export function TextSizeDropdown() {
  const [fontSize, setFontSize] = useState(100);
  const tAccessibility = useTranslations("accessibility");
  const t = tAccessibility.raw("fontSize");


  useEffect(() => {
    const saved = localStorage.getItem("malagadogparks-font-size");
    if (saved) {
      const size = parseInt(saved);
      setFontSize(size);
      applyFontSize(size);
    }
  }, []);

  const applyFontSize = (size: number) => {
    document.documentElement.style.setProperty("--user-font-size", `${size}%`);
    localStorage.setItem("malagadogparks-font-size", size.toString());
  };

  const increase = () => {
    const newSize = Math.min(fontSize + 10, 150);
    setFontSize(newSize);
    applyFontSize(newSize);
  };

  const decrease = () => {
    const newSize = Math.max(fontSize - 10, 80);
    setFontSize(newSize);
    applyFontSize(newSize);
  };

  const reset = () => {
    setFontSize(100);
    applyFontSize(100);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cursor-pointer"
          aria-label={t.accessibilityOptions}
        >
          <Glasses className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 space-y-3 p-4">

        <div className="text-sm font-medium text-muted-foreground">
          {t.textSize}
        </div>
        <div className="flex items-center justify-between">
          <Button 
            onClick={decrease} 
            size="icon" 
            variant="outline" 
            disabled={fontSize <= 80} 
            className="cursor-pointer"
            aria-label={t.decreaseText}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <div className="font-semibold text-base tabular-nums">{fontSize}%</div>
          <Button 
            onClick={increase} 
            size="icon" 
            variant="outline" 
            disabled={fontSize >= 150} 
            className="cursor-pointer"
            aria-label={t.increaseText}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <Button
          onClick={reset}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {t.reset}
        </Button>
        <div className="sr-only" aria-live="polite">
          {t.currentTextSize.replace('{size}', fontSize.toString())}
        </div>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
import React from 'react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (langCode: string) => {
        i18n.changeLanguage(langCode);
    };

    const getCurrentLabel = () => {
        switch (i18n.language) {
            case 'hi': return 'हिंदी';
            case 'te': return 'తెలుగు';
            default: return 'English';
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="w-auto px-2 gap-2">
                    <Languages className="h-4 w-4" />
                    <span className="hidden sm:inline-block text-sm">{getCurrentLabel()}</span>
                    <span className="sm:hidden">{i18n.language.toUpperCase()}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                    English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('hi')}>
                    हिंदी
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('te')}>
                    తెలుగు
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

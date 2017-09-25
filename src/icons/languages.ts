import { LanguageIcons } from '../models';

/**
 * Defines icons for language ids
 */
export const languageIcons: LanguageIcons = {
    types: [
        { icon: 'php', languageId: 'php' },
        { icon: 'javascript', languageId: 'javascript' },
        { icon: 'hack', languageId: 'hack' }
    ],
};

/**
 * Get all language icons that can be used in this theme.
 */
export const getLanguageIconDefinitions = (): string[] => [
    ...languageIcons.types.map(type => type.icon)
];

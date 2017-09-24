import { files, folders, languages } from './index';
import * as path from 'path';

export const iconGenerator = () => {
    return {
        iconDefinitions: getIconDefinitions()
    };
};

const getIconDefinitions = () => {
    const defs = {};
    const allIcons: string[] = [
        files.default,
        ...files.types.map(type => type.icon),
        folders.default,
        folders.rootFolder ? folders.rootFolder : folders.default,
        ...folders.types.map(type => type.icon),
        ...languages.types.map(type => type.icon)
    ];

    allIcons.forEach(icon => {
        defs[`_file_${path.parse(icon).name}`] = {
            iconPath: `./../../icons/${icon}`
        };
    });

    return defs;
};

const getIconName = (fileName: string) => {
    return fileName.split('.')[0];
};

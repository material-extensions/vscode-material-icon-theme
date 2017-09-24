export interface Icon {
    /** file name of the icon (e.g. sample.svg) */
    fileName: string;
    /** the name of the icon (e.g. sample) */
    iconName: string;
}

export interface MarkdownConfig {
    /** list of icons */
    iconList: Icon[];
    /** name of the markdown file */
    markdownName: string;
    /** path for the output */
    outputPath: string;
    /** amount of columns */
    columns: number;
    /** which icon names should be exluded */
    exclude?: string[];
    /** which parts of the icon names should be removed */
    filterName?: string;
}

const ESC = '\x1b';
const RED = `${ESC}[31m`;
const GREEN = `${ESC}[32m`;
const YELLOW = `${ESC}[33m`;
const RESET = `${ESC}[0m`;

export const red = (value: string) => `${RED}${value}${RESET}`;
export const green = (value: string) => `${GREEN}${value}${RESET}`;
export const yellow = (value: string) => `${YELLOW}${value}${RESET}`;

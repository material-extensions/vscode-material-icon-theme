import type { Translation } from '../../models/i18n/translation';

export const translation: Translation = {
  activate: 'Aktivovat',
  activated: 'Material Icon Téma je aktivní.',
  iconPacks: {
    selectPack: 'Vyberte sadu ikon',
    description: "Vyberte sadu ikon '%0'",
    disabled: 'Zakázat balíčky ikon',
  },
  folders: {
    toggleIcons: 'Vyberte motiv složky',
    disabled: 'Žádné ikony složek',
    theme: {
      description: "Vyberte motiv složky '%0'",
    },
  },
  colorSelect: {
    color: 'Vyberte barvu',
    hexCode: 'Vložte hexadecimální kód barvy',
    wrongHexCode: 'Neplatný hexadecimální kód barvy!',
  },
  opacity: {
    inputPlaceholder: 'Hodnota průhlednosti (od 0 do 1)',
    wrongValue: 'Zadejte desetinné číslo mezi 0 a 1.',
  },
  toggleSwitch: {
    on: 'ZAPNUTO',
    off: 'VYPNUTO',
  },
  explorerArrows: {
    toggle: 'Šipky složek v průzkumníkovi',
    enable: 'Zobrazit šipky složek v Průzkumníkovi',
    disable: 'Skrýt šipky složek v Průzkumníkovi',
  },
  grayscale: {
    toggle: 'Zobrazovat ikony ve stupních šedi',
    enable: 'Povolit ikony ve stupních šedi',
    disable: 'Zakázat ikony ve stupních šedi',
  },
  saturation: {
    inputPlaceholder: 'Hodnota sytosti (mezi 0 a 1)',
    wrongValue: 'Zadejte desetinné číslo mezi 0 a 1.',
  },
};

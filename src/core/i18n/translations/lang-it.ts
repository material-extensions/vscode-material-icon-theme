import type { Translation } from '../../models/i18n/translation';

export const translation: Translation = {
  activate: 'Attiva',
  activated: 'Material Icon Theme è attivo.',
  iconPacks: {
    selectPack: 'Seleziona un pacchetto icone',
    description: "Seleziona il pacchetto icone '%0'",
    disabled: 'Disabilita pacchetti delle icone',
  },
  folders: {
    toggleIcons: 'Scegli un tema per le cartelle',
    disabled: 'Nessuna icona cartella',
    theme: {
      description: "Seleziona il tema cartelle '%0'",
    },
  },
  colorSelect: {
    color: 'Scegli un colore',
    hexCode: 'Inserisci un codice HEX',
    wrongHexCode: 'Codice HEX non valido!',
  },
  opacity: {
    inputPlaceholder: 'Valore opacità (tra 0 e 1)',
    wrongValue: 'Inserisci un numero decimale tra 0 e 1.',
  },
  toggleSwitch: {
    on: 'ON',
    off: 'OFF',
  },
  explorerArrows: {
    toggle: 'Attiva/Disattiva frecce cartelle in Explorer',
    enable: 'Mostra le frecce nelle cartelle in Explorer',
    disable: 'Nascondi le frecce nelle cartelle in Explorer',
  },
  grayscale: {
    toggle: 'Attiva/Disattiva icone in scala di grigi',
    enable: 'Abilita icone in scala di grigi',
    disable: 'Disabilita icone in scala di grigi',
  },
  saturation: {
    inputPlaceholder: 'Valore saturazione (tra 0 e 1)',
    wrongValue: 'Inserisci un numero decimale tra 0 e 1.',
  },
};

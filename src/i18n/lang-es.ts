import { Translation } from '../models';

export const translation: Translation = {
  activate: 'Activar',
  activated: 'Material Icon Theme está activado.',
  iconPacks: {
    selectPack: 'Seleccione un paquete de iconos',
    description: "Seleccione el paquete de iconos '%0'",
    disabled: 'Desactivar paquetes de iconos',
  },
  folders: {
    toggleIcons: 'Cambiar activación de iconos de carpetas',
    color: 'Elija un color de carpeta',
    hexCode: 'Insertar un código de color HEX',
    wrongHexCode: '¡Código de color HEX inválido!',
    disabled: 'Sin iconos de carpeta',
    theme: {
      description: "Iconos de carpeta '%0'",
    },
  },
  opacity: {
    inputPlaceholder: 'Valor de opacidad (entre 0 y 1)',
    wrongValue: '¡El valor debe estar entre 0 y 1!',
  },
  toggleSwitch: {
    on: 'ON',
    off: 'OFF',
  },
  explorerArrows: {
    toggle: 'Conmutar las flechas de carpetas',
    enable: 'Mostrar flechas de carpeta',
    disable: 'Ocultar las flechas de carpetas',
  },
  grayscale: {
    toggle: 'Alternar los iconos en escala de grises',
    enable: 'Activar los iconos en escala de grises',
    disable: 'Desactivar los iconos en escala de grises',
  },
  saturation: {
    inputPlaceholder: 'Valor de saturación (entre 0 y 1)',
    wrongValue: 'El valor debe estar entre 0 y 1.',
  },
};

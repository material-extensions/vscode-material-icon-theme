import { Translation } from '../models';

export const translation: Translation = {
  activate: 'Ativar',
  activated: 'O Material Icon Theme está ativo.',
  iconPacks: {
    selectPack: 'Selecione um pacote de ícones',
    description: "Selecionar o pacote de ícones '%0'",
    disabled: 'Desabilitar pacotes de ícones',
  },
  folders: {
    toggleIcons: 'Escolha um tema para as pastas',
    disabled: 'Nenhum ícone de pasta',
    theme: {
      description: "Selecionar o tema para pastas '%0'",
    },
  },
  colorSelect: {
    color: 'Escolha uma cor',
    hexCode: 'Insira um código de cor hexadecimal',
    wrongHexCode: 'Código de cor hexadecimal inválido!',
  },
  opacity: {
    inputPlaceholder: 'Valor de opacidade (entre 0 e 1)',
    wrongValue: 'O valor deve estar entre 0 e 1!',
  },
  toggleSwitch: {
    on: 'ON',
    off: 'OFF',
  },
  explorerArrows: {
    toggle: 'Alternar setas do explorador de arquivos',
    enable: 'Exibir setas do explorador de arquivos',
    disable: 'Ocultar setas do explorador de arquivos',
  },
  grayscale: {
    toggle: 'Alternar os ícones em escala de cinza',
    enable: 'Habilitar ícones em escala de cinza',
    disable: 'Desativar ícones em escala de cinza',
  },
  saturation: {
    inputPlaceholder: 'Valor de saturação (entre 0 e 1)',
    wrongValue: 'O valor deve estar entre 0 e 1!',
  },
};

import type { Translation } from '../../models/i18n/translation';

export const translation: Translation = {
  activate: 'Aktifkan',
  activated: 'Tema Ikon Material aktif.',
  iconPacks: {
    selectPack: 'Pilih paket ikon',
    description: "Pilih paket ikon '%0'",
    disabled: 'Nonaktifkan paket ikon',
  },
  folders: {
    toggleIcons: 'Pilih tema folder',
    disabled: 'Tidak ada ikon folder',
    theme: {
      description: "Pilih tema folder '%0'",
    },
  },
  colorSelect: {
    color: 'Pilih warna',
    hexCode: 'Masukkan kode warna HEX',
    wrongHexCode: 'Kode warna HEX tidak valid!',
  },
  opacity: {
    inputPlaceholder: 'Nilai opasitas (antara 0 dan 1)',
    wrongValue: 'Silakan masukkan angka desimal antara 0 dan 1.',
  },
  toggleSwitch: {
    on: 'AKTIF',
    off: 'NONAKTIF',
  },
  explorerArrows: {
    toggle: 'Alihkan panah folder di Explorer',
    enable: 'Tampilkan panah folder di Explorer',
    disable: 'Sembunyikan panah folder di Explorer',
  },
  grayscale: {
    toggle: 'Alihkan ikon grayscale',
    enable: 'Aktifkan ikon grayscale',
    disable: 'Nonaktifkan ikon grayscale',
  },
  saturation: {
    inputPlaceholder: 'Nilai saturasi (antara 0 dan 1)',
    wrongValue: 'Silakan masukkan angka desimal antara 0 dan 1.',
  },
};

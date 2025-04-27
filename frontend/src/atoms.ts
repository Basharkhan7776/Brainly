import { atom } from 'recoil';

export const dash = atom({
  key: 'dash',
  default: false,
});

export const selectedContentType = atom({
  key: 'selectedContentType',
  default: 'all' as 'all' | 'twitter' | 'youtube' | 'document' | 'link',
});

export const toastState = atom<{ message: string; type: 'success' | 'error' | 'info' } | null>({
  key: 'toastState',
  default: null,
});
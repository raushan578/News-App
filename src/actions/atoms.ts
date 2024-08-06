import {atom} from 'recoil';

export const pinnedNewsAtom = atom<any[]>({
  key: 'pinnedNewsAtom',
  default: [],
});

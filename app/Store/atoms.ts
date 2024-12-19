import { atom } from 'jotai';

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type NavigationHistoryItem = {
  tabId: number;
  timestamp: number;
};

export const activeTabAtom = atom(0);
export const cartItemsAtom = atom<CartItem[]>([]);
export const navigationHistoryAtom = atom<NavigationHistoryItem[]>([]);
export const isLoadingAtom = atom(false);
export const errorAtom = atom<string | null>(null); 
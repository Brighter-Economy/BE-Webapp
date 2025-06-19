export interface PlayerAccount {
  uuid: string;
  username: string;
  locked: boolean;
  money: number;
}

export interface ItemDetails {
  item: string;
  count: number;
  nbt: string | null;
}

export interface Transaction {
  id: string;
  type: string;
  participants: string;
  uuidFrom: string | null;
  uuidTo: string | null;
  nameFrom: string | null;
  nameTo: string | null;
  money: number;
  itemPurchased: ItemDetails | null;
  timestamp: number;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface ItemStack {
  customName: string | null;
  item: string;
  count: number;
  enchantments: Enchantment[] | null;
  lore: string | null;
}

export interface Enchantment {
  id: string;
  level: number | null;
}

export interface ShopDetails {
  id: string;
  ownerUuid: string;
  ownerName: string;
  dimension: string;
  position: Position;
  itemStack: ItemStack;
  price: number;
}


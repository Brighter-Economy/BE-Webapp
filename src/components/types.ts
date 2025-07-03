export interface PlayerAccount {
  uuid: string;
  username: string;
  locked: boolean;
  money: number;
}

export interface Transaction {
  id: string;
  type: string;
  shopId: string | null;
  participants: string;
  uuidFrom: string | null;
  uuidTo: string | null;
  nameFrom: string | null;
  nameTo: string | null;
  money: number;
  itemStack: ItemStack | null;
  timestamp: number;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface ItemStack {
  name: string | null;
  customName: string | null;
  item: string;
  count: number;
  enchantments: Enchantment[];
  lore: string | null;
}

export interface Enchantment {
  name: string | null;
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


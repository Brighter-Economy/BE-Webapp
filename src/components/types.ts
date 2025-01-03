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
  money: number;
  itemPurchased: ItemDetails | null;
  timestamp: number;
}

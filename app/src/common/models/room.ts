export interface Room {
  id: string;
  type: string;
  name: string;
  owner: string;
}

export interface HistoryItem {
  selectedNumber: number;
  number: number;
  result: number;
  user: string;
  id: string;
}


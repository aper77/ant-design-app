import { type } from "os";

export type User = {
  id: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  userConfigs: UserConfigs | null;
  role: {
    name: string;
    permissions: string[];
  };
};

export type UserConfigs = {
  dashboard: { isOpen: boolean; value: string };
  monitoring: { isOpen: boolean; value: string };
  overview: { isOpen: boolean; value: string };
  games: { isOpen: boolean; value: string };
  users: { isOpen: boolean; value: string };
};

export type Markets = {
  id: string;
  place: string;
  totalAmount: string;
  isWorked: boolean;
  marketProducts: MarketProducts;
};

export type MarketProducts = [
  { id: string; price: string; count: string },
  { id: string; price: string; count: string },
  { id: string; price: string; count: string },
  { id: string; price: string; count: string }
];

export type Role = {
  id: number;
  name: string;
  permissions: string[];
};

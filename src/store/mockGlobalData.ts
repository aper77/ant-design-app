import { Markets, Role, User } from "./types";

export const mockUsers: User[] = [
  {
    id: "77",
    username: "aper",
    password: "aper1234",
    name: "Aramayis",
    surname: "Bryan",
    email: "Bryanmayis95@gmail.com",
    phone: "077420300",
    userConfigs: {
      dashboard: { isOpen: true, value: "500$" },
      monitoring: { isOpen: true, value: "500$" },
      overview: { isOpen: true, value: "Is Ready" },
      games: { isOpen: true, value: "Is Ready" },
      users: { isOpen: true, value: "Is Ready" },
    },
    role: {
      name: "Admin",
      permissions: [
        "Create User",
        "Delete User",
        "Edit User",
        "View User",
        "Create Role",
        "Delete Role",
        "Edit Role",
        "View Role",
      ],
    },
  },
  {
    id: "23",
    username: "johndoe",
    password: "johndoe123",
    name: "John",
    surname: "Doe",
    email: "johndoe@gmail.com",
    phone: "1234567890",
    userConfigs: {
      dashboard: { isOpen: true, value: "1000$" },
      monitoring: { isOpen: false, value: "500$" },
      overview: { isOpen: true, value: "Is Ready" },
      games: { isOpen: false, value: "Coming Soon" },
      users: { isOpen: true, value: "Is Ready" },
    },
    role: {
      name: "Manager",
      permissions: ["Create User", "Edit User", "View User", "View Role"],
    },
  },
  {
    id: "63",
    username: "janedoe",
    password: "janedoe123",
    name: "Jane",
    surname: "Doe",
    email: "janedoe@gmail.com",
    phone: "0987654321",
    userConfigs: {
      dashboard: { isOpen: false, value: "500$" },
      monitoring: { isOpen: true, value: "1000$" },
      overview: { isOpen: true, value: "Is Ready" },
      games: { isOpen: true, value: "Is Ready" },
      users: { isOpen: false, value: "Coming Soon" },
    },
    role: {
      name: "Manager",
      permissions: ["Create User", "Edit User", "View User", "View Role"],
    },
  },
  {
    id: "1",
    username: "bobsmith",
    password: "bobsmith123",
    name: "Bob",
    surname: "Smith",
    email: "bobsmith@gmail.com",
    phone: "5551234",
    userConfigs: {
      dashboard: { isOpen: true, value: "750$" },
      monitoring: { isOpen: true, value: "750$" },
      overview: { isOpen: false, value: "Coming Soon" },
      games: { isOpen: false, value: "Coming Soon" },
      users: { isOpen: true, value: "Is Ready" },
    },
    role: {
      name: "Guest",
      permissions: ["View User", "View Role"],
    },
  },
];

export const mockMarkets: Markets[] = [
  {
    id: "11",
    place: "Asia",
    totalAmount: "40",
    isWorked: false,
    marketProducts: [
      { id: "304", price: "225", count: "100" },
      { id: "3445", price: "11", count: "122" },
      { id: "22", price: "33", count: "145" },
      { id: "123", price: "567", count: "3223" },
    ],
  },
  {
    id: "111",
    place: "Europ",
    totalAmount: "50",
    isWorked: true,
    marketProducts: [
      { id: "3444", price: "25", count: "1" },
      { id: "21", price: "25", count: "1" },
      { id: "65", price: "243", count: "189" },
      { id: "78", price: "25", count: "1" },
    ],
  },
  {
    id: "1145",
    place: "USA",
    totalAmount: "100",
    isWorked: false,
    marketProducts: [
      { id: "34", price: "25", count: "1" },
      { id: "56", price: "25", count: "1" },
      { id: "23", price: "25", count: "1" },
      { id: "123", price: "25", count: "1" },
    ],
  },
  {
    id: "123",
    place: "RUS",
    totalAmount: "10",
    isWorked: true,
    marketProducts: [
      { id: "23", price: "32", count: "1122" },
      { id: "64", price: "3542", count: "837" },
      { id: "354", price: "23", count: "1" },
      { id: "45", price: "231", count: "9871" },
    ],
  },
];

export const mockRoles: Role[] = [
  {
    id: 1,
    name: "Admin",
    permissions: [
      "Create User",
      "Delete User",
      "Edit User",
      "View User",
      "Create Role",
      "Delete Role",
      "Edit Role",
      "View Role",
    ],
  },
  {
    id: 2,
    name: "Manager",
    permissions: ["Create User", "Edit User", "View User", "View Role"],
  },
  {
    id: 3,
    name: "Guest",
    permissions: ["View User", "View Role"],
  },
];

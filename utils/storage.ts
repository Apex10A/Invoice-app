import { InvoiceStatus } from "../components/StatusBadge";

export interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}

const STORAGE_KEY = "invoices";

export const getInvoices = (): Invoice[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveInvoices = (invoices: Invoice[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};

export const addInvoice = (invoice: Invoice) => {
  const invoices = getInvoices();
  saveInvoices([...invoices, invoice]);
};

export const updateInvoice = (updatedInvoice: Invoice) => {
  const invoices = getInvoices();
  saveInvoices(
    invoices.map((inv) => (inv.id === updatedInvoice.id ? updatedInvoice : inv))
  );
};

export const deleteInvoice = (id: string) => {
  const invoices = getInvoices();
  saveInvoices(invoices.filter((inv) => inv.id !== id));
};

export const generateId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let id = "";
  for (let i = 0; i < 2; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 4; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return id;
};

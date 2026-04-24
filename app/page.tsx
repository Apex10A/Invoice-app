"use client";

import { useState } from "react";
import Header from "../components/Header";
import InvoiceItem from "../components/InvoiceItem";
import { InvoiceStatus } from "../components/StatusBadge";
import InvoiceForm from "../components/InvoiceForm";
import Link from "next/link";

interface Invoice {
  id: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
}

const DUMMY_INVOICES: Invoice[] = [
  {
    id: "RT3080",
    dueDate: "Due 19 Aug 2021",
    clientName: "Jensen Huang",
    amount: 1800.9,
    status: "paid",
  },
  {
    id: "XM9141",
    dueDate: "Due 20 Sep 2021",
    clientName: "Alex Grim",
    amount: 556.0,
    status: "pending",
  },
  {
    id: "RG0314",
    dueDate: "Due 01 Oct 2021",
    clientName: "John Morrison",
    amount: 14002.33,
    status: "paid",
  },
  {
    id: "RT2080",
    dueDate: "Due 12 Oct 2021",
    clientName: "Alysa Werner",
    amount: 102.04,
    status: "pending",
  },
  {
    id: "AA1449",
    dueDate: "Due 14 Oct 2021",
    clientName: "Mellisa Clarke",
    amount: 4032.33,
    status: "pending",
  },
  {
    id: "TY9141",
    dueDate: "Due 31 Oct 2021",
    clientName: "Thomas Wayne",
    amount: 6155.91,
    status: "pending",
  },
  {
    id: "FV2353",
    dueDate: "Due 12 Nov 2021",
    clientName: "Anita Wainwright",
    amount: 3102.04,
    status: "draft",
  },
];

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<InvoiceStatus[]>([]);

  const toggleStatus = (status: InvoiceStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredInvoices = DUMMY_INVOICES.filter((invoice) => {
    if (selectedStatuses.length === 0) return true;
    return selectedStatuses.includes(invoice.status);
  });

  const isEmpty = filteredInvoices.length === 0;

  return (
    <div>
      <Header 
        count={filteredInvoices.length} 
        onNewInvoice={() => setIsFormOpen(true)} 
        selectedStatuses={selectedStatuses}
        onStatusChange={toggleStatus}
      />
      
      {isFormOpen && (
        <InvoiceForm type="new" onClose={() => setIsFormOpen(false)} />
      )}

      {isEmpty ? (
        <div className="mt-20 flex flex-col items-center text-center">
          <div className="mb-16">
            <img 
              src="https://raw.githubusercontent.com/FrontendMasters/fm-challenges/main/invoice-app/public/assets/illustration-empty.svg" 
              alt="No invoices"
              className="h-auto w-[242px]"
            />
          </div>
          <h2 className="mb-6">There is nothing here</h2>
          <p className="max-w-[220px] text-muted-blue">
            Create an invoice by clicking the <span className="font-bold">New Invoice</span> button and get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredInvoices.map((invoice) => (
            <Link href={`/${invoice.id}`} key={invoice.id}>
              <InvoiceItem
                id={invoice.id}
                dueDate={invoice.dueDate}
                clientName={invoice.clientName}
                amount={invoice.amount}
                status={invoice.status}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

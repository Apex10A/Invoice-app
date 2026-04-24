"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import InvoiceItem from "../components/InvoiceItem";
import { InvoiceStatus } from "../components/StatusBadge";
import InvoiceForm from "../components/InvoiceForm";
import Link from "next/link";
import { getInvoices, Invoice } from "../utils/storage";

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<InvoiceStatus[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    setInvoices(getInvoices());
  }, []);

  const toggleStatus = (status: InvoiceStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredInvoices = invoices.filter((invoice) => {
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
        <InvoiceForm type="new" onClose={() => {
          setIsFormOpen(false);
          setInvoices(getInvoices());
        }} />
      )}

      {isEmpty ? (
        <div className="mt-16 flex flex-col items-center text-center lg:mt-24">
          <div className="mb-10 lg:mb-16">
            <img 
              src="/emptystate.png" 
              alt="No invoices"
              className="h-auto w-[193px] lg:w-[242px]"
            />
          </div>
          <h2 className="mb-6 text-xl font-bold lg:text-2xl dark:text-white">There is nothing here</h2>
          <p className="max-w-[220px] text-muted-blue dark:text-light-grey-blue">
            Create an invoice by clicking the <span className="font-bold">New Invoice</span> button and get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredInvoices.map((invoice) => (
            <Link href={`/${invoice.id}`} key={invoice.id}>
              <InvoiceItem
                id={invoice.id}
                dueDate={`Due ${invoice.paymentDue}`}
                clientName={invoice.clientName}
                amount={invoice.total}
                status={invoice.status}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

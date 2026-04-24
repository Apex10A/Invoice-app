"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import StatusBadge from "../../components/StatusBadge";
import DeleteModal from "../../components/DeleteModal";
import InvoiceForm from "../../components/InvoiceForm";
import { Invoice, getInvoices, deleteInvoice, updateInvoice } from "../../utils/storage";

export default function InvoiceDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  useEffect(() => {
    const invoices = getInvoices();
    const found = invoices.find((inv) => inv.id === id);
    if (found) {
      setInvoice(found);
    } else {
      // Handle not found if needed, or redirect
    }
  }, [id]);

  const handleDelete = () => {
    deleteInvoice(id);
    setIsDeleteModalOpen(false);
    router.push("/");
  };

  const handleMarkAsPaid = () => {
    if (invoice) {
      const updated = { ...invoice, status: "paid" as const };
      updateInvoice(updated);
      setInvoice(updated);
    }
  };

  if (!invoice) return <div className="p-8 text-center">Loading invoice...</div>;

  return (
    <div className="pb-20">
      {isDeleteModalOpen && (
        <DeleteModal
          id={invoice.id}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}

      {isEditFormOpen && (
        <InvoiceForm
          type="edit"
          id={invoice.id}
          onClose={() => {
            setIsEditFormOpen(false);
            // Refresh local state after edit
            const invoices = getInvoices();
            const found = invoices.find((inv) => inv.id === id);
            if (found) setInvoice(found);
          }}
        />
      )}

      <Link
        href="/"
        className="mb-8 flex items-center gap-6 transition-colors hover:text-muted-blue"
      >
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.342.886L2.114 5.114l4.228 4.228"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <span className="heading-s-variant dark:text-white">Go back</span>
      </Link>

      <div className="mb-6 flex items-center justify-between rounded-lg bg-invoice-bg p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="body dark:text-[#DFE3FA] text-[#858BB2]">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditFormOpen(true)}
            className="rounded-full bg-[#F9FAFE] cursor-pointer px-6 py-3 text-muted-blue transition-colors hover:bg-light-grey-blue dark:bg-darker-blue dark:text-light-grey-blue dark:hover:bg-white dark:hover:text-muted-blue"
          >
            <span className="heading-s-variant">Edit</span>
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="rounded-full bg-error cursor-pointer px-6 py-3 text-white transition-colors hover:bg-error-light"
          >
            <span className="heading-s-variant">Delete</span>
          </button>
          {invoice.status !== "paid" && (
            <button 
              onClick={handleMarkAsPaid}
              className="rounded-full bg-primary cursor-pointer px-6 py-3 text-white transition-colors hover:bg-primary-light"
            >
              <span className="heading-s-variant">Mark as Paid</span>
            </button>
          )}
        </div>
      </div>

      <div className="rounded-lg bg-invoice-bg p-12 shadow-sm">
        <div className="mb-12 flex justify-between">
          <div>
            <h3 className="mb-2 uppercase dark:text-white">
              <span className="text-muted-blue">#</span>
              {invoice.id}
            </h3>
            <p className="body dark:text-[#DFE3FA] text-[#858BB2]">{invoice.description}</p>
          </div>
          <div className="text-right">
            <p className="body-variant dark:text-[#DFE3FA] text-[#858BB2]">{invoice.senderAddress.street}</p>
            <p className="body-variant dark:text-[#DFE3FA] text-[#858BB2]">{invoice.senderAddress.city}</p>
            <p className="body-variant dark:text-[#DFE3FA] text-[#858BB2]">{invoice.senderAddress.postCode}</p>
            <p className="body-variant dark:text-[#DFE3FA] text-[#858BB2]">{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-3 gap-10">
          <div className="flex flex-col gap-8">
            <div>
              <p className="body dark:text-[#DFE3FA] text-[#858BB2]">Invoice Date</p>
              <p className="heading-s dark:text-white text-[#0C0E16]">{invoice.createdAt}</p>
            </div>
            <div>
              <p className="body dark:text-[#DFE3FA] text-[#858BB2]">Payment Due</p>
              <p className="heading-s dark:text-white text-[#0C0E16]">{invoice.paymentDue}</p>
            </div>
          </div>

          <div>
            <p className="body dark:text-[#DFE3FA] text-[#858BB2]">Bill To</p>
            <p className="heading-s mb-2 dark:text-white text-[#0C0E16]">{invoice.clientName}</p>
            <div className="flex flex-col">
              <p className="body-variant text-muted-blue">{invoice.clientAddress.street}</p>
              <p className="body-variant text-muted-blue">{invoice.clientAddress.city}</p>
              <p className="body-variant text-muted-blue">{invoice.clientAddress.postCode}</p>
              <p className="body-variant text-muted-blue">{invoice.clientAddress.country}</p>
            </div>
          </div>

          <div>
            <p className="body dark:text-[#DFE3FA] text-[#858BB2]">Sent to</p>
            <p className="heading-s dark:text-white text-[#0C0E16]">{invoice.clientEmail}</p>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-[#F9FAFE] dark:bg-[#252945]">
          <div className="p-8 pb-4">
            <div className="mb-8 grid grid-cols-5 text-muted-blue body">
              <span className="col-span-2">Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>
            {invoice.items.map((item, index) => (
              <div key={index} className="mb-8 grid grid-cols-5 items-center heading-s last:mb-0 dark:text-white">
                <span className="col-span-2">{item.name}</span>
                <span className="text-center text-muted-blue">{item.quantity}</span>
                <span className="text-right text-muted-blue">
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(item.price)}
                </span>
                <span className="text-right">
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                  }).format(item.total)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between bg-[#373B53] p-8 text-white dark:bg-[#0C0E16]">
            <span className="body">Amount Due</span>
            <span className="heading-m text-2xl">
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(invoice.total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

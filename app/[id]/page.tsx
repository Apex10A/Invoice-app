"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import StatusBadge, { InvoiceStatus } from "../../components/StatusBadge";
import DeleteModal from "../../components/DeleteModal";
import InvoiceForm from "../../components/InvoiceForm";

// Dummy data for demonstration
const DUMMY_INVOICES = [
  {
    id: "XM9141",
    description: "Graphic Design",
    senderAddress: {
      street: "19 Union Terrace",
      city: "London",
      postCode: "E1 3EZ",
      country: "United Kingdom",
    },
    clientName: "Alex Grim",
    clientEmail: "alexgrim@mail.com",
    clientAddress: {
      street: "84 Church Way",
      city: "Bradford",
      postCode: "BD1 9PB",
      country: "United Kingdom",
    },
    createdAt: "21 Aug 2021",
    paymentDue: "20 Sep 2021",
    items: [
      { name: "Banner Design", quantity: 1, price: 156.0, total: 156.0 },
      { name: "Email Design", quantity: 2, price: 200.0, total: 400.0 },
    ],
    total: 556.0,
    status: "pending" as InvoiceStatus,
  },
];

export default function InvoiceDetail() {
  const params = useParams();
  const id = params.id as string;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const invoice = DUMMY_INVOICES.find((inv) => inv.id === id) || DUMMY_INVOICES[0];

  return (
    <div className="pb-20">
      {isDeleteModalOpen && (
        <DeleteModal
          id={invoice.id}
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={() => {
            console.log("Deleted");
            setIsDeleteModalOpen(false);
          }}
        />
      )}

      {isEditFormOpen && (
        <InvoiceForm
          type="edit"
          id={invoice.id}
          onClose={() => setIsEditFormOpen(false)}
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
        <span className="heading-s-variant">Go back</span>
      </Link>

      {/* Action Bar */}
      <div className="mb-6 flex items-center justify-between rounded-lg bg-invoice-bg p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="body text-muted-blue">Status</span>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditFormOpen(true)}
            className="rounded-full bg-[#F9FAFE] px-6 py-4 text-muted-blue transition-colors hover:bg-light-grey-blue dark:bg-darker-blue dark:text-light-grey-blue dark:hover:bg-white dark:hover:text-muted-blue"
          >
            <span className="heading-s-variant">Edit</span>
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="rounded-full bg-error px-6 py-4 text-white transition-colors hover:bg-error-light"
          >
            <span className="heading-s-variant">Delete</span>
          </button>
          <button className="rounded-full bg-primary px-6 py-4 text-white transition-colors hover:bg-primary-light">
            <span className="heading-s-variant">Mark as Paid</span>
          </button>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="rounded-lg bg-invoice-bg p-12 shadow-sm">
        <div className="mb-12 flex justify-between">
          <div>
            <h3 className="mb-2 uppercase">
              <span className="text-muted-blue">#</span>
              {invoice.id}
            </h3>
            <p className="body text-muted-blue">{invoice.description}</p>
          </div>
          <div className="text-right">
            <p className="body-variant text-muted-blue">{invoice.senderAddress.street}</p>
            <p className="body-variant text-muted-blue">{invoice.senderAddress.city}</p>
            <p className="body-variant text-muted-blue">{invoice.senderAddress.postCode}</p>
            <p className="body-variant text-muted-blue">{invoice.senderAddress.country}</p>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-3 gap-10">
          <div className="flex flex-col gap-8">
            <div>
              <p className="body text-muted-blue mb-3">Invoice Date</p>
              <p className="heading-s">{invoice.createdAt}</p>
            </div>
            <div>
              <p className="body text-muted-blue mb-3">Payment Due</p>
              <p className="heading-s">{invoice.paymentDue}</p>
            </div>
          </div>

          <div>
            <p className="body text-muted-blue mb-3">Bill To</p>
            <p className="heading-s mb-2">{invoice.clientName}</p>
            <div className="flex flex-col">
              <p className="body-variant text-muted-blue">{invoice.clientAddress.street}</p>
              <p className="body-variant text-muted-blue">{invoice.clientAddress.city}</p>
              <p className="body-variant text-muted-blue">{invoice.clientAddress.postCode}</p>
              <p className="body-variant text-muted-blue">{invoice.clientAddress.country}</p>
            </div>
          </div>

          <div>
            <p className="body text-muted-blue mb-3">Sent to</p>
            <p className="heading-s">{invoice.clientEmail}</p>
          </div>
        </div>

        {/* Item List */}
        <div className="overflow-hidden rounded-lg bg-[#F9FAFE] dark:bg-darker-blue">
          <div className="p-8 pb-4">
            <div className="mb-8 grid grid-cols-4 text-muted-blue body">
              <span className="col-span-2">Item Name</span>
              <span className="text-center">QTY.</span>
              <span className="text-right">Price</span>
              <span className="text-right">Total</span>
            </div>
            {invoice.items.map((item, index) => (
              <div key={index} className="mb-8 grid grid-cols-4 items-center heading-s last:mb-0">
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

          {/* Grand Total */}
          <div className="flex items-center justify-between bg-[#373B53] p-8 text-white dark:bg-very-dark-blue">
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

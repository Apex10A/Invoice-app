import { useState } from "react";
import { InvoiceStatus } from "./StatusBadge";

interface HeaderProps {
  count: number;
  onNewInvoice: () => void;
  selectedStatuses: InvoiceStatus[];
  onStatusChange: (status: InvoiceStatus) => void;
}

export default function Header({ 
  count, 
  onNewInvoice, 
  selectedStatuses, 
  onStatusChange 
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const statuses: InvoiceStatus[] = ["draft", "pending", "paid"];

  return (
    <header className="mb-16 flex items-center justify-between">
      <div>
        <h1 className="mb-2">Invoices</h1>
        <p className="dark:text-[#DFE3FA] text-[#888EB0]">
          {count > 0 ? `There are ${count} total invoices` : "No invoices"}
        </p>
      </div>

      <div className="flex items-center gap-10">
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-4 cursor-pointer"
          >
            <span className="heading-s">Filter by status</span>
            <svg 
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              width="11" height="7" xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1l4.228 4.228L9.456 1"
                stroke="#7C5DFA"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute left-1/2 top-12 w-48 -translate-x-1/2 rounded-lg bg-white p-6 shadow-xl dark:bg-[#252945]">
              <div className="flex flex-col gap-4">
                {statuses.map((status) => (
                  <label key={status} className="flex cursor-pointer items-center gap-3 group">
                    <div className="relative flex h-4 w-4 items-center justify-center rounded-[2px] border border-transparent bg-[#DFE3FA] transition-colors group-hover:border-primary dark:bg-[#1E2139]">
                      <input 
                        type="checkbox" 
                        className="peer absolute h-full w-full cursor-pointer opacity-0"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => onStatusChange(status)}
                      />
                      <div className="hidden h-full w-full items-center justify-center rounded-[2px] bg-primary peer-checked:flex">
                        <svg width="10" height="8" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 4.5l2.124 2.124L8.97 1.28" stroke="#FFF" strokeWidth="2" fill="none" fillRule="evenodd"/>
                        </svg>
                      </div>
                    </div>
                    <span className="heading-s capitalize dark:text-white">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={onNewInvoice}
          className="flex items-center gap-4 cursor-pointer rounded-full bg-primary p-2 pr-4 text-white transition-colors hover:bg-primary-light"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.313 10.034v-3.721h3.721v-1.313H6.313V1.28h-1.313v3.721H1.28v1.313h3.721v3.721z"
                fill="#7C5DFA"
                fillRule="nonzero"
              />
            </svg>
          </div>
          <span className="heading-s text-white">New Invoice</span>
        </button>
      </div>
    </header>
  );
}

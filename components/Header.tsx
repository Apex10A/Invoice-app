import { InvoiceStatus } from "./StatusBadge";

interface HeaderProps {
  count: number;
  onNewInvoice: () => void;
}

export default function Header({ count, onNewInvoice }: HeaderProps) {
  return (
    <header className="mb-16 flex items-center justify-between">
      <div>
        <h1 className="mb-2">Invoices</h1>
        <p className="dark:text-[#DFE3FA] text-[#888EB0]">
          {count > 0 ? `There are ${count} total invoices` : "No invoices"}
        </p>
      </div>

      <div className="flex items-center gap-10">
        <button className="flex items-center gap-4 cursor-pointer">
          <span className="heading-s">Filter by status</span>
          <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1 1l4.228 4.228L9.456 1"
              stroke="#7C5DFA"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>

        <button 
          onClick={onNewInvoice}
          className="flex items-center gap-4 rounded-full bg-primary p-2 pr-4 text-white transition-colors hover:bg-primary-light"
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

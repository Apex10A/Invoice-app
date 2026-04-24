import StatusBadge, { InvoiceStatus } from "./StatusBadge";

interface InvoiceItemProps {
  id: string;
  dueDate: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
}

export default function InvoiceItem({
  id,
  dueDate,
  clientName,
  amount,
  status,
}: InvoiceItemProps) {
  const formattedAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);

  return (
    <div className="flex cursor-pointer items-center rounded-lg bg-invoice-bg p-6 shadow-sm transition-all hover:border hover:border-primary dark:hover:border-primary">
      <div className="flex flex-1 items-center gap-10">
        <span className="heading-s w-20">
          <span className="text-muted-blue">#</span>
          {id}
        </span>
        <span className="body text-muted-blue flex-1">{dueDate}</span>
        <span className="body text-muted-blue flex-1">{clientName}</span>
        <span className="heading-m w-32 text-right">{formattedAmount}</span>
      </div>
      <div className="ml-10 flex items-center gap-5">
        <StatusBadge status={status} />
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 1l4 4-4 4"
            stroke="#7C5DFA"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

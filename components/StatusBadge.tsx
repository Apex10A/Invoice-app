export type InvoiceStatus = "paid" | "pending" | "draft";

interface StatusBadgeProps {
  status: InvoiceStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    paid: {
      bg: "bg-[#33D69F]/5",
      text: "text-[#33D69F]",
      dot: "bg-[#33D69F]",
      label: "Paid",
    },
    pending: {
      bg: "bg-[#FF8F00]/5",
      text: "text-[#FF8F00]",
      dot: "bg-[#FF8F00]",
      label: "Pending",
    },
    draft: {
      bg: "bg-[#373B53]/5 dark:bg-[#DFE3FA]/5",
      text: "text-[#373B53] dark:text-[#DFE3FA]",
      dot: "bg-[#373B53] dark:bg-[#DFE3FA]",
      label: "Draft",
    },
  };

  const current = styles[status];

  return (
    <div
      className={`flex h-10 w-[104px] items-center justify-center gap-2 rounded-md ${current.bg}`}
    >
      <div className={`h-2 w-2 rounded-full ${current.dot}`} />
      <span className={`heading-s-variant capitalize ${current.text}`}>
        {current.label}
      </span>
    </div>
  );
}

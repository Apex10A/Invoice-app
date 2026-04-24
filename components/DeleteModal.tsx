interface DeleteModalProps {
  id: string;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ id, onCancel, onDelete }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-6">
      <div className="w-full max-w-[480px] rounded-lg bg-invoice-bg p-12 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">Confirm Deletion</h2>
        <p className="body mb-8 text-muted-blue">
          Are you sure you want to delete invoice #{id}? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-full bg-[#F9FAFE] px-6 py-4 text-muted-blue transition-colors hover:bg-light-grey-blue dark:bg-darker-blue dark:text-light-grey-blue dark:hover:bg-white dark:hover:text-muted-blue"
          >
            <span className="heading-s-variant">Cancel</span>
          </button>
          <button
            onClick={onDelete}
            className="rounded-full bg-error px-6 py-4 text-white transition-colors hover:bg-error-light"
          >
            <span className="heading-s-variant">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

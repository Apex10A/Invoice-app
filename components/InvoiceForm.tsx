"use client";

import { useState } from "react";
import { 
  Invoice, 
  getInvoices, 
  addInvoice, 
  updateInvoice, 
  generateId,
  Item
} from "../utils/storage";

interface InvoiceFormProps {
  type: "new" | "edit";
  id?: string;
  onClose: () => void;
}

export default function InvoiceForm({ type, id, onClose }: InvoiceFormProps) {
  const [formData, setFormData] = useState<Partial<Invoice>>(() => {
    if (type === "edit" && id) {
      const invoices = getInvoices();
      const existing = invoices.find((inv) => inv.id === id);
      if (existing) return existing;
    }
    return {
      senderAddress: { street: "", city: "", postCode: "", country: "" },
      clientAddress: { street: "", city: "", postCode: "", country: "" },
      clientName: "",
      clientEmail: "",
      description: "",
      paymentTerms: 30,
      status: "pending",
      items: [{ name: "", quantity: 1, price: 0, total: 0 }],
    };
  });

  const handleInputChange = (
    section: keyof Invoice | "senderAddress" | "clientAddress",
    field: string,
    value: string | number
  ) => {
    if (section === "senderAddress" || section === "clientAddress") {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section] as any),
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [section]: value,
      }));
    }
  };

  const handleItemChange = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...(formData.items || [])];
    const item = { ...newItems[index] };
    
    if (field === "quantity" || field === "price") {
      item[field] = Number(value);
      item.total = item.quantity * item.price;
    } else {
      (item as any)[field] = value;
    }
    
    newItems[index] = item;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...(prev.items || []), { name: "", quantity: 1, price: 0, total: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      items: (prev.items || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent, statusOverride?: "pending" | "draft") => {
    e.preventDefault();
    
    const total = (formData.items || []).reduce((acc, item) => acc + item.total, 0);
    const createdAt = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    
    // Calculate payment due based on terms
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (formData.paymentTerms || 30));
    const paymentDue = dueDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const invoiceData: Invoice = {
      ...(formData as Invoice),
      id: type === "edit" ? id! : generateId(),
      status: statusOverride || formData.status || "pending",
      total,
      createdAt: formData.createdAt || createdAt,
      paymentDue,
    };

    if (type === "edit") {
      updateInvoice(invoiceData);
    } else {
      addInvoice(invoiceData);
    }
    
    onClose();
    window.location.reload(); // Simple way to refresh data
  };

  return (
    <div className="fixed inset-0 z-40 flex bg-black/50">
      <div className="custom-scrollbar h-full w-full max-w-[720px] overflow-y-auto bg-white p-8 pt-32 dark:bg-dark-bg-alt lg:p-14 lg:pt-8 lg:pl-40">
        <h1 className="mb-12 text-[24px] font-bold dark:text-white">
          {type === "edit" ? (
            <>
              Edit <span className="text-muted-blue">#</span>
              {id}
            </>
          ) : (
            "New Invoice"
          )}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          {/* Bill From */}
          <section className="flex flex-col gap-6">
            <p className="heading-s-variant text-primary">Bill From</p>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Street Address</label>
              <input 
                type="text" 
                className="input-field" 
                value={formData.senderAddress?.street}
                onChange={(e) => handleInputChange("senderAddress", "street", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">City</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.senderAddress?.city}
                  onChange={(e) => handleInputChange("senderAddress", "city", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">Post Code</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.senderAddress?.postCode}
                  onChange={(e) => handleInputChange("senderAddress", "postCode", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">Country</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.senderAddress?.country}
                  onChange={(e) => handleInputChange("senderAddress", "country", e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <p className="heading-s-variant text-primary">Bill To</p>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Client's Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={formData.clientName}
                onChange={(e) => handleInputChange("clientName", "", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Client's Email</label>
              <input 
                type="email" 
                placeholder="e.g. email@example.com" 
                className="input-field" 
                value={formData.clientEmail}
                onChange={(e) => handleInputChange("clientEmail", "", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Street Address</label>
              <input 
                type="text" 
                className="input-field" 
                value={formData.clientAddress?.street}
                onChange={(e) => handleInputChange("clientAddress", "street", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">City</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.clientAddress?.city}
                  onChange={(e) => handleInputChange("clientAddress", "city", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">Post Code</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.clientAddress?.postCode}
                  onChange={(e) => handleInputChange("clientAddress", "postCode", e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">Country</label>
                <input 
                  type="text" 
                  className="input-field" 
                  value={formData.clientAddress?.country}
                  onChange={(e) => handleInputChange("clientAddress", "country", e.target.value)}
                  required
                />
              </div>
            </div>
          </section>

          {/* Dates & Description */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Invoice Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  className="input-field w-full" 
                  value={formData.createdAt || "Pending..."} 
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Payment Terms</label>
              <select 
                className="input-field bg-white dark:bg-darker-blue appearance-none cursor-pointer"
                value={formData.paymentTerms}
                onChange={(e) => handleInputChange("paymentTerms", "", Number(e.target.value))}
              >
                <option value={30}>Net 30 Days</option>
                <option value={1}>Net 1 Day</option>
                <option value={7}>Net 7 Days</option>
                <option value={14}>Net 14 Days</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="body text-muted-blue">Project Description</label>
            <input 
              type="text" 
              placeholder="e.g. Graphic Design Service" 
              className="input-field" 
              value={formData.description}
              onChange={(e) => handleInputChange("description", "", e.target.value)}
              required
            />
          </div>

          {/* Item List */}
          <section className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-[#777FB1]">Item List</h3>
            <div className="grid grid-cols-[2.5fr_1fr_1.5fr_1.5fr_auto] gap-4 items-center mb-4">
              <span className="body text-muted-blue">Item Name</span>
              <span className="body text-muted-blue">Qty.</span>
              <span className="body text-muted-blue">Price</span>
              <span className="body text-muted-blue">Total</span>
              <span></span>
            </div>

            {formData.items?.map((item, index) => (
              <div key={index} className="grid grid-cols-[2.5fr_1fr_1.5fr_1.5fr_auto] gap-4 items-center mb-4">
                <input 
                  type="text" 
                  className="input-field" 
                  value={item.name}
                  onChange={(e) => handleItemChange(index, "name", e.target.value)}
                  required
                />
                <input 
                  type="number" 
                  className="input-field text-center" 
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                  min={1}
                  required
                />
                <input 
                  type="number" 
                  className="input-field" 
                  value={item.price}
                  onChange={(e) => handleItemChange(index, "price", e.target.value)}
                  min={0}
                  step="0.01"
                  required
                />
                <span className="heading-s-variant text-muted-blue">
                  {new Intl.NumberFormat("en-GB", { minimumFractionDigits: 2 }).format(item.total)}
                </span>
                <button 
                  type="button"
                  onClick={() => removeItem(index)} 
                  className="p-2 transition-colors hover:text-error text-muted-blue"
                >
                   <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .896-.728 1.622-1.622 1.622H3.244a1.622 1.622 0 01-1.622-1.622V3.556h9.961zM9.089.444L10.2 1.556h2.8V3.333H1.2V1.556h2.8L5.111.444h3.978z" fill="currentColor" fillRule="nonzero"/></svg>
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              className="w-full rounded-full bg-[#F9FAFE] py-4 transition-colors hover:bg-light-grey-blue dark:bg-darker-blue dark:hover:bg-[#373B53]"
            >
              <span className="heading-s-variant text-muted-blue">+ Add New Item</span>
            </button>
          </section>

          {/* Form Actions */}
          <div className="sticky bottom-0 mt-8 flex justify-between bg-white py-8 dark:bg-dark-bg-alt">
            {type === "edit" ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-[#F9FAFE] px-6 py-4 text-muted-blue transition-colors hover:bg-light-grey-blue dark:bg-darker-blue"
                >
                  <span className="heading-s-variant">Cancel</span>
                </button>
                <button type="submit" className="rounded-full bg-primary px-6 py-4 text-white transition-colors hover:bg-primary-light">
                  <span className="heading-s-variant">Save Changes</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full bg-[#F9FAFE] px-6 py-4 text-muted-blue transition-colors hover:bg-light-grey-blue dark:bg-darker-blue"
                >
                  <span className="heading-s-variant">Discard</span>
                </button>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={(e) => handleSubmit(e, "draft")}
                    className="rounded-full bg-[#373B53] px-6 py-4 text-muted-blue transition-colors hover:bg-very-dark-blue dark:bg-darker-blue dark:text-light-grey-blue"
                  >
                    <span className="heading-s-variant">Save as Draft</span>
                  </button>
                  <button type="submit" className="rounded-full bg-primary px-6 py-4 text-white transition-colors hover:bg-primary-light">
                    <span className="heading-s-variant">Save & Send</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

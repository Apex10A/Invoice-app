"use client";

import { useState } from "react";

interface InvoiceFormProps {
  type: "new" | "edit";
  id?: string;
  onClose: () => void;
}

export default function InvoiceForm({ type, id, onClose }: InvoiceFormProps) {
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0, total: 0 }]);

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-[60] flex bg-black/50">
      <div className="h-full w-full max-w-[720px] overflow-y-auto bg-white p-8 pt-32 dark:bg-dark-bg-alt lg:p-14 lg:pt-8 lg:pl-[135px]">
        <h1 className="mb-12 text-2xl font-bold dark:text-white">
          {type === "edit" ? (
            <>
              Edit <span className="text-muted-blue">#</span>
              {id}
            </>
          ) : (
            "New Invoice"
          )}
        </h1>

        <form className="flex flex-col gap-10">
          {/* Bill From */}
          <section className="flex flex-col gap-6">
            <p className="heading-s-variant text-primary">Bill From</p>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Street Address</label>
              <input type="text" className="input-field" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">City</label>
                <input type="text" className="input-field" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">Post Code</label>
                <input type="text" className="input-field" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">Country</label>
                <input type="text" className="input-field" />
              </div>
            </div>
          </section>

          {/* Bill To */}
          <section className="flex flex-col gap-6">
            <p className="heading-s-variant text-primary">Bill To</p>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Client's Name</label>
              <input type="text" className="input-field" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Client's Email</label>
              <input type="email" placeholder="e.g. email@example.com" className="input-field" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Street Address</label>
              <input type="text" className="input-field" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">City</label>
                <input type="text" className="input-field" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">Post Code</label>
                <input type="text" className="input-field" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="body text-muted-blue">Country</label>
                <input type="text" className="input-field" />
              </div>
            </div>
          </section>

          {/* Dates & Description */}
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Invoice Date</label>
              <div className="relative">
                <input type="text" className="input-field w-full" defaultValue="21 Aug 2021" />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M14 2h-.5V1a1 1 0 00-2 0v1h-3V1a1 1 0 00-2 0v1h-3V1a1 1 0 00-2 0v1H2a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zm0 12H2V7h12v7z" fill="#7E88C3" fillRule="nonzero"/></svg>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="body text-muted-blue">Payment Terms</label>
              <select className="input-field bg-white dark:bg-darker-blue appearance-none cursor-pointer">
                <option>Net 30 Days</option>
                <option>Net 1 Day</option>
                <option>Net 7 Days</option>
                <option>Net 14 Days</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="body text-muted-blue">Project Description</label>
            <input type="text" placeholder="e.g. Graphic Design Service" className="input-field" />
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

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-[2.5fr_1fr_1.5fr_1.5fr_auto] gap-4 items-center mb-4">
                <input type="text" className="input-field" defaultValue={item.name} />
                <input type="number" className="input-field text-center" defaultValue={item.quantity} />
                <input type="number" className="input-field" defaultValue={item.price} />
                <span className="heading-s-variant text-muted-blue">0.00</span>
                <button onClick={() => removeItem(index)} className="p-2 transition-colors hover:text-error text-muted-blue">
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
                <button className="rounded-full bg-primary px-6 py-4 text-white transition-colors hover:bg-primary-light">
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
                  <button className="rounded-full bg-[#373B53] px-6 py-4 text-muted-blue transition-colors hover:bg-very-dark-blue dark:bg-darker-blue dark:text-light-grey-blue">
                    <span className="heading-s-variant">Save as Draft</span>
                  </button>
                  <button className="rounded-full bg-primary px-6 py-4 text-white transition-colors hover:bg-primary-light">
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

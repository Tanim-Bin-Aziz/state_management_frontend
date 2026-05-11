"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────
interface FlatSizeItem {
  type: string;
  size: string;
}

export interface FullEditForm {
  title: string;
  lat: number;
  lng: number;
  status: "pending" | "approved" | "rejected";
  plotDetails: {
    plotOwnerName: string;
    plotSize: string;
    address: string;
    plotPhoto: string;
  };
  flatDetails: {
    pricePerSqFt: number | "";
    flatSize: FlatSizeItem[];
  };
  salesInformation: {
    totalFlats: number | "";
    soldFlats: number | "";
  };
}

interface Props {
  form: FullEditForm;
  loading: boolean;
  onSave: (form: FullEditForm) => void;
  onClose: () => void;
}

// ── Sub-component: Section Header ─────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 mt-5 first:mt-0 border-b border-gray-100 pb-1">
      {children}
    </p>
  );
}

// ── Sub-component: Label + Input wrapper ──────────────────────
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white";

// ── Main Modal ────────────────────────────────────────────────
export default function AdminPropertyEditModal({
  form: initialForm,
  loading,
  onSave,
  onClose,
}: Props) {
  const [form, setForm] = useState<FullEditForm>(initialForm);

  // Generic top-level field setter
  function setField<K extends keyof FullEditForm>(
    key: K,
    value: FullEditForm[K],
  ) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Nested plot setter
  function setPlot(key: keyof FullEditForm["plotDetails"], value: string) {
    setForm((f) => ({
      ...f,
      plotDetails: { ...f.plotDetails, [key]: value },
    }));
  }

  // Nested flat setter
  function setFlat(
    key: keyof Omit<FullEditForm["flatDetails"], "flatSize">,
    value: number | "",
  ) {
    setForm((f) => ({
      ...f,
      flatDetails: { ...f.flatDetails, [key]: value },
    }));
  }

  // Nested sales setter
  function setSales(
    key: keyof FullEditForm["salesInformation"],
    value: number | "",
  ) {
    setForm((f) => ({
      ...f,
      salesInformation: { ...f.salesInformation, [key]: value },
    }));
  }

  // FlatSize row operations
  function setFlatSizeRow(
    index: number,
    key: keyof FlatSizeItem,
    value: string,
  ) {
    setForm((f) => {
      const updated = [...f.flatDetails.flatSize];
      updated[index] = { ...updated[index], [key]: value };
      return { ...f, flatDetails: { ...f.flatDetails, flatSize: updated } };
    });
  }

  function addFlatSizeRow() {
    setForm((f) => ({
      ...f,
      flatDetails: {
        ...f.flatDetails,
        flatSize: [...f.flatDetails.flatSize, { type: "", size: "" }],
      },
    }));
  }

  function removeFlatSizeRow(index: number) {
    setForm((f) => ({
      ...f,
      flatDetails: {
        ...f.flatDetails,
        flatSize: f.flatDetails.flatSize.filter((_, i) => i !== index),
      },
    }));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Edit Property</h3>
            <p className="text-xs text-gray-400 mt-0.5">
              All fields can be updated
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-4 space-y-1 custom-scroll flex-1">
          {/* ── Basic Info ── */}
          <SectionTitle>Basic Information</SectionTitle>
          <div className="space-y-3">
            <Field label="Title">
              <input
                type="text"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                className={inputCls}
                placeholder="Property title"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Latitude">
                <input
                  type="number"
                  value={form.lat}
                  onChange={(e) => setField("lat", Number(e.target.value))}
                  className={inputCls}
                  step="any"
                />
              </Field>
              <Field label="Longitude">
                <input
                  type="number"
                  value={form.lng}
                  onChange={(e) => setField("lng", Number(e.target.value))}
                  className={inputCls}
                  step="any"
                />
              </Field>
            </div>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) =>
                  setField(
                    "status",
                    e.target.value as "pending" | "approved" | "rejected",
                  )
                }
                className={inputCls}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </Field>
          </div>

          {/* ── Plot Details ── */}
          <SectionTitle>Plot Details</SectionTitle>
          <div className="space-y-3">
            <Field label="Owner Name">
              <input
                type="text"
                value={form.plotDetails.plotOwnerName}
                onChange={(e) => setPlot("plotOwnerName", e.target.value)}
                className={inputCls}
                placeholder="Plot owner name"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Plot Size">
                <input
                  type="text"
                  value={form.plotDetails.plotSize}
                  onChange={(e) => setPlot("plotSize", e.target.value)}
                  className={inputCls}
                  placeholder="e.g. 5 Katha"
                />
              </Field>
              <Field label="Address">
                <input
                  type="text"
                  value={form.plotDetails.address}
                  onChange={(e) => setPlot("address", e.target.value)}
                  className={inputCls}
                  placeholder="Full address"
                />
              </Field>
            </div>
            <Field label="Plot Photo URL">
              <input
                type="url"
                value={form.plotDetails.plotPhoto}
                onChange={(e) => setPlot("plotPhoto", e.target.value)}
                className={inputCls}
                placeholder="https://..."
              />
            </Field>
            {form.plotDetails.plotPhoto && (
              <div className="mt-1">
                <p className="text-xs text-gray-400 mb-1">Preview</p>
                <img
                  src={form.plotDetails.plotPhoto}
                  alt="Plot preview"
                  className="h-32 w-full object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* ── Flat Details ── */}
          <SectionTitle>Flat Details</SectionTitle>
          <div className="space-y-3">
            <Field label="Price per Sqft (৳)">
              <input
                type="number"
                value={form.flatDetails.pricePerSqFt}
                onChange={(e) =>
                  setFlat(
                    "pricePerSqFt",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                className={inputCls}
                placeholder="e.g. 4500"
                min={0}
              />
            </Field>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Flat Size Variants
                </label>
                <button
                  type="button"
                  onClick={addFlatSizeRow}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold px-2 py-1 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  + Add Row
                </button>
              </div>

              {form.flatDetails.flatSize.length === 0 ? (
                <p className="text-xs text-gray-400 py-2 text-center border border-dashed border-gray-200 rounded-lg">
                  No flat size variants yet
                </p>
              ) : (
                <div className="space-y-2">
                  {form.flatDetails.flatSize.map((row, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={row.type}
                        onChange={(e) =>
                          setFlatSizeRow(i, "type", e.target.value)
                        }
                        placeholder="Type (e.g. 3 Bed)"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <input
                        type="text"
                        value={row.size}
                        onChange={(e) =>
                          setFlatSizeRow(i, "size", e.target.value)
                        }
                        placeholder="Size (e.g. 1200 sqft)"
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeFlatSizeRow(i)}
                        className="text-red-400 hover:text-red-600 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors text-base shrink-0"
                        title="Remove row"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Sales Information ── */}
          <SectionTitle>Sales Information</SectionTitle>
          <div className="grid grid-cols-2 gap-3 pb-2">
            <Field label="Total Flats">
              <input
                type="number"
                value={form.salesInformation.totalFlats}
                onChange={(e) =>
                  setSales(
                    "totalFlats",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                className={inputCls}
                placeholder="e.g. 24"
                min={0}
              />
            </Field>
            <Field label="Sold Flats">
              <input
                type="number"
                value={form.salesInformation.soldFlats}
                onChange={(e) =>
                  setSales(
                    "soldFlats",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
                className={inputCls}
                placeholder="e.g. 10"
                min={0}
              />
            </Field>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }
      `}</style>
    </div>
  );
}

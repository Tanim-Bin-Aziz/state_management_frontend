"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { createProperty } from "@/lib/api";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const AddPropertyModal = ({ onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Basic info
  const [title, setTitle] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  // Plot details
  const [plotOwnerName, setPlotOwnerName] = useState("");
  const [plotSize, setPlotSize] = useState("");
  const [address, setAddress] = useState("");
  const [plotPhoto, setPlotPhoto] = useState("");

  // Flat details
  const [pricePerSqFt, setPricePerSqFt] = useState("");
  const [flatSizes, setFlatSizes] = useState([{ type: "", size: "" }]);
  const [flatPlans, setFlatPlans] = useState([{ name: "", image: "" }]);

  // Sales info
  const [totalFlats, setTotalFlats] = useState("");
  const [soldFlats, setSoldFlats] = useState("");

  const handleSubmit = async () => {
    setError("");

    if (
      !title ||
      !lat ||
      !lng ||
      !plotOwnerName ||
      !plotSize ||
      !address ||
      !plotPhoto
    ) {
      setError("required field");
      return;
    }

    setLoading(true);
    try {
      await createProperty({
        id: Date.now(),
        title,
        lat,
        lng,
        plotDetails: { plotOwnerName, plotSize, address, plotPhoto },
        flatDetails: {
          flatSize: flatSizes.filter((f) => f.type && f.size),
          pricePerSqFt: Number(pricePerSqFt),
          flatPlan: flatPlans.filter((f) => f.name && f.image),
        },
        salesInformation: {
          totalFlats: Number(totalFlats),
          soldFlats: Number(soldFlats),
        },
      });
      onSuccess();
      onClose();
    } catch {
      setError("Submit failed! try again।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-xl h-[85vh] flex flex-col">
        {/* Header - fixed */}
        <div className="flex items-center justify-between p-4 border-b shrink-0">
          <h2 className="text-lg font-bold">New Property</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body - scrollable */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {error && (
            <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <Section title="Basic Info">
            <Input label="Title *" value={title} onChange={setTitle} />
            <MapPicker
              lat={lat}
              lng={lng}
              onChange={(la, ln) => {
                setLat(la);
                setLng(ln);
              }}
            />
          </Section>

          <Section title="Plot Details">
            <Input
              label="Owner Name *"
              value={plotOwnerName}
              onChange={setPlotOwnerName}
            />
            <Input
              label="Plot Size *"
              value={plotSize}
              onChange={setPlotSize}
              placeholder="e.g. 5 Katha"
            />
            <Input label="Address *" value={address} onChange={setAddress} />
            <Input
              label="Plot Photo URL *"
              value={plotPhoto}
              onChange={setPlotPhoto}
              placeholder="https://..."
            />
          </Section>

          <Section title="Flat Details">
            <Input
              label="Price Per Sq Ft"
              value={pricePerSqFt}
              onChange={setPricePerSqFt}
              type="number"
            />
            <div>
              <label className="text-sm font-medium text-gray-700">
                Flat Sizes
              </label>
              {flatSizes.map((fs, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <input
                    className={inputClass}
                    placeholder="Type (e.g. 3BHK)"
                    value={fs.type}
                    onChange={(e) => {
                      const n = [...flatSizes];
                      n[i].type = e.target.value;
                      setFlatSizes(n);
                    }}
                  />
                  <input
                    className={inputClass}
                    placeholder="Size (e.g. 1200 sqft)"
                    value={fs.size}
                    onChange={(e) => {
                      const n = [...flatSizes];
                      n[i].size = e.target.value;
                      setFlatSizes(n);
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  setFlatSizes([...flatSizes, { type: "", size: "" }])
                }
                className="text-blue-500 text-sm mt-1"
              >
                + Add more
              </button>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Flat Plans
              </label>
              {flatPlans.map((fp, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <input
                    className={inputClass}
                    placeholder="Plan name"
                    value={fp.name}
                    onChange={(e) => {
                      const n = [...flatPlans];
                      n[i].name = e.target.value;
                      setFlatPlans(n);
                    }}
                  />
                  <input
                    className={inputClass}
                    placeholder="Image URL"
                    value={fp.image}
                    onChange={(e) => {
                      const n = [...flatPlans];
                      n[i].image = e.target.value;
                      setFlatPlans(n);
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  setFlatPlans([...flatPlans, { name: "", image: "" }])
                }
                className="text-blue-500 text-sm mt-1"
              >
                + Add more
              </button>
            </div>
          </Section>

          <Section title="Sales Information">
            <Input
              label="Total Flats"
              value={totalFlats}
              onChange={setTotalFlats}
              type="number"
            />
            <Input
              label="Sold Flats"
              value={soldFlats}
              onChange={setSoldFlats}
              type="number"
            />
          </Section>
        </div>

        {/* Footer - fixed */}
        <div className="flex gap-3 p-4 border-t shrink-0">
          <button
            onClick={onClose}
            className="flex-1 border p-2 rounded hover:bg-gray-50 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50 text-sm"
          >
            {loading ? "Submitting..." : "Submit for Review"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper components
const inputClass =
  "border p-2 rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-300";

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      className={`${inputClass} mt-1`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-3">
    <h3 className="font-semibold text-gray-800 border-b pb-1">{title}</h3>
    {children}
  </div>
);

export default AddPropertyModal;

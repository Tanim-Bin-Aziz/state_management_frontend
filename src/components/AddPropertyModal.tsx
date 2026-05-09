/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
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

  const [visible, setVisible] = useState(false);

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

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 250);
  };

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
      setError("Required fields missing");
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
      handleClose();
    } catch {
      setError("Submit failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`relative w-full max-w-2xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200
        transition-all duration-300 ease-out
        ${
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4  bg-white/80 backdrop-blur">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              New Property
            </h2>
            <p className="text-xs text-gray-500">
              Add property listing details
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-8">
          {error && (
            <div className="text-sm bg-red-50 text-red-600 p-3 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <Section title="Basic Info">
            <Input label="Title *" value={title} onChange={setTitle} />

            <div className="rounded-xl overflow-hidden">
              <MapPicker
                lat={lat}
                lng={lng}
                onChange={(la, ln) => {
                  setLat(la);
                  setLng(ln);
                }}
              />
            </div>
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
            />
            <Input label="Address *" value={address} onChange={setAddress} />
            <Input
              label="Photo URL *"
              value={plotPhoto}
              onChange={setPlotPhoto}
            />
          </Section>

          <Section title="Flat Details">
            <Input
              label="Price / Sq Ft"
              value={pricePerSqFt}
              onChange={setPricePerSqFt}
            />

            <label className="text-sm font-medium text-gray-700">
              Flat Sizes
            </label>

            {flatSizes.map((fs, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <input
                  className={inputClass}
                  placeholder="Type"
                  value={fs.type}
                  onChange={(e) => {
                    const n = [...flatSizes];
                    n[i].type = e.target.value;
                    setFlatSizes(n);
                  }}
                />
                <input
                  className={inputClass}
                  placeholder="Size"
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
              className="text-emerald-600 text-sm hover:text-emerald-700"
            >
              + Add more
            </button>

            <label className="text-sm font-medium text-gray-700 mt-4 block">
              Flat Plans
            </label>

            {flatPlans.map((fp, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <input
                  className={inputClass}
                  placeholder="Name"
                  value={fp.name}
                  onChange={(e) => {
                    const n = [...flatPlans];
                    n[i].name = e.target.value;
                    setFlatPlans(n);
                  }}
                />
                <input
                  className={inputClass}
                  placeholder="Image"
                  value={fp.image}
                  onChange={(e) => {
                    const n = [...flatPlans];
                    n[i].image = e.target.value;
                    setFlatPlans(n);
                  }}
                />
              </div>
            ))}
          </Section>

          <Section title="Sales Info">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Total Flats"
                value={totalFlats}
                onChange={setTotalFlats}
              />
              <Input
                label="Sold Flats"
                value={soldFlats}
                onChange={setSoldFlats}
              />
            </div>
          </Section>
        </div>

        <div className="p-4 bg-white flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

const inputClass =
  "w-full bg-gray-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300 outline-none";

const Input = ({ label, value, onChange }: any) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-700">{label}</label>
    <input
      className={inputClass}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Section = ({ title, children }: any) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-emerald-500" />
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

export default AddPropertyModal;

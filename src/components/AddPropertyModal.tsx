/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

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
  const [plotPhotoFile, setPlotPhotoFile] = useState<File | null>(null);
  const [plotPhotoPreview, setPlotPhotoPreview] = useState("");

  // Flat details
  const [pricePerSqFt, setPricePerSqFt] = useState("");
  const [flatSizes, setFlatSizes] = useState([{ type: "", size: "" }]);
  const [flatPlanFiles, setFlatPlanFiles] = useState<
    { name: string; file: File | null; preview: string }[]
  >([{ name: "", file: null, preview: "" }]);

  // Sales info
  const [totalFlats, setTotalFlats] = useState("");
  const [soldFlats, setSoldFlats] = useState("");

  const plotPhotoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  // Plot photo handler
  const handlePlotPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPlotPhotoFile(file);
    setPlotPhotoPreview(URL.createObjectURL(file));
  };

  // Flat plan handlers
  const handleFlatPlanFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const updated = [...flatPlanFiles];
    updated[index] = {
      ...updated[index],
      file,
      preview: URL.createObjectURL(file),
    };
    setFlatPlanFiles(updated);
  };

  const handleFlatPlanNameChange = (index: number, name: string) => {
    const updated = [...flatPlanFiles];
    updated[index] = { ...updated[index], name };
    setFlatPlanFiles(updated);
  };

  const addFlatPlan = () => {
    if (flatPlanFiles.length >= 2) return; // max 2
    setFlatPlanFiles([...flatPlanFiles, { name: "", file: null, preview: "" }]);
  };

  const removeFlatPlan = (index: number) => {
    setFlatPlanFiles(flatPlanFiles.filter((_, i) => i !== index));
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
      !plotPhotoFile
    ) {
      setError("Required fields missing");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("lat", String(lat));
      formData.append("lng", String(lng));
      formData.append("plotOwnerName", plotOwnerName);
      formData.append("plotSize", plotSize);
      formData.append("address", address);
      formData.append("plotPhoto", plotPhotoFile);

      flatSizes
        .filter((f) => f.type && f.size)
        .forEach((fs) => formData.append("flatSize", JSON.stringify(fs)));

      formData.append("pricePerSqFt", pricePerSqFt);

      flatPlanFiles.forEach((fp, i) => {
        if (fp.file) {
          formData.append("flatPlanImages", fp.file);
          formData.append(`flatPlanName_${i}`, fp.name || `Plan ${i + 1}`);
        }
      });

      formData.append("totalFlats", totalFlats);
      formData.append("soldFlats", soldFlats);

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server error: " + text.slice(0, 150));
      }

      if (!data.success) throw new Error(data.message);

      onSuccess();
      handleClose();
    } catch (err: any) {
      setError(err.message || "Submit failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      />
      <div
        className={`relative w-full max-w-2xl h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200
          transition-all duration-300 ease-out
          ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur">
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

          {/* Basic Info */}
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

          {/* Plot Details */}
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

            {/* Plot Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm text-gray-700">Plot Photo *</label>
              <div
                onClick={() => plotPhotoRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-4 cursor-pointer hover:border-emerald-400 transition text-center"
              >
                {plotPhotoPreview ? (
                  <img
                    src={plotPhotoPreview}
                    alt="preview"
                    className="h-32 mx-auto object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-gray-400 text-sm py-4">
                    <div className="text-2xl mb-1">📷</div>
                    Click to select photo
                  </div>
                )}
              </div>
              <input
                ref={plotPhotoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePlotPhotoChange}
              />
            </div>
          </Section>

          {/* Flat Details */}
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

            {/* Flat Plans with image upload */}
            <label className="text-sm font-medium text-gray-700 mt-4 block">
              Flat Plans (max 2)
            </label>
            {flatPlanFiles.map((fp, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl p-3 space-y-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    className={`${inputClass} flex-1`}
                    placeholder="Plan name"
                    value={fp.name}
                    onChange={(e) =>
                      handleFlatPlanNameChange(i, e.target.value)
                    }
                  />
                  <button
                    onClick={() => removeFlatPlan(i)}
                    className="text-red-400 hover:text-red-600 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>

                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center hover:border-emerald-400 transition">
                    {fp.preview ? (
                      <img
                        src={fp.preview}
                        alt="plan"
                        className="h-24 mx-auto object-cover rounded"
                      />
                    ) : (
                      <div className="text-gray-400 text-xs py-2">
                        <div className="text-xl">🏗️</div>
                        Click to upload plan image
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFlatPlanFileChange(i, e)}
                  />
                </label>
              </div>
            ))}
            {flatPlanFiles.length < 2 && (
              <button
                onClick={addFlatPlan}
                className="text-emerald-600 text-sm hover:text-emerald-700"
              >
                + Add flat plan
              </button>
            )}
          </Section>

          {/* Sales Info */}
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

        {/* Footer */}
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

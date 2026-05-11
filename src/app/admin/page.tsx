/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  getPendingProperties,
  getAllProperties,
  approveProperty,
  rejectProperty,
  deleteProperty,
  updateProperty,
  Property,
} from "@/lib/api";
import AdminPropertyPreview from "../admin/AdminPropertyPreview";
import AdminPropertyEditModal, { FullEditForm } from "./AdminPropertyEditModal";
import Image from "next/image";

interface PlotDetails {
  plotOwnerName?: string;
  plotSize?: string;
  address?: string;
  plotPhoto?: string;
}

interface FlatSizeItem {
  type: string;
  size: string;
}

interface FlatDetails {
  pricePerSqFt?: number;
  flatSize?: FlatSizeItem[];
  flatPlan?: { name: string; image: string }[];
}

interface SalesInformation {
  totalFlats?: number;
  soldFlats?: number;
}

type TypedProperty = Omit<
  Property,
  | "plotDetails"
  | "flatDetails"
  | "salesInformation"
  | "image"
  | "tag"
  | "location"
  | "beds"
  | "baths"
  | "sqft"
> & {
  plotDetails?: PlotDetails;
  flatDetails?: FlatDetails;
  salesInformation?: SalesInformation;
};

function PanelLoader() {
  return (
    <div className="flex items-center justify-center py-16 text-gray-400">
      <svg
        className="animate-spin h-5 w-5 mr-2"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      Loading...
    </div>
  );
}

function PanelError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-center gap-3 text-sm">
      <span>⚠️</span>
      <span>{message}</span>
      <button
        onClick={onRetry}
        className="ml-auto underline hover:no-underline text-xs"
      >
        Retry
      </button>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center py-16 text-gray-400">
      <p className="text-4xl mb-3">{icon}</p>
      <p className="text-base font-medium text-gray-500">{title}</p>
      {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
    </div>
  );
}

function cast(p: Property): TypedProperty {
  return p as unknown as TypedProperty;
}

function buildEditForm(property: TypedProperty): FullEditForm {
  return {
    title: property.title ?? "",
    lat: property.lat ?? 0,
    lng: property.lng ?? 0,
    status: property.status ?? "pending",
    plotDetails: {
      plotOwnerName: property.plotDetails?.plotOwnerName ?? "",
      plotSize: property.plotDetails?.plotSize ?? "",
      address: property.plotDetails?.address ?? "",
      plotPhoto: property.plotDetails?.plotPhoto ?? "",
    },
    flatDetails: {
      pricePerSqFt: property.flatDetails?.pricePerSqFt ?? "",
      flatSize: property.flatDetails?.flatSize
        ? property.flatDetails.flatSize.map((f) => ({ ...f }))
        : [],
    },
    salesInformation: {
      totalFlats: property.salesInformation?.totalFlats ?? "",
      soldFlats: property.salesInformation?.soldFlats ?? "",
    },
  };
}

// ── Main Component ────────────────────────────────────────────
export default function AdminDashboard() {
  const [allProperties, setAllProperties] = useState<TypedProperty[]>([]);
  const [allLoading, setAllLoading] = useState(true);
  const [allError, setAllError] = useState<string | null>(null);
  const [selectedAll, setSelectedAll] = useState<TypedProperty | null>(null);

  const [pendingProperties, setPendingProperties] = useState<TypedProperty[]>(
    [],
  );
  const [pendingLoading, setPendingLoading] = useState(true);
  const [pendingError, setPendingError] = useState<string | null>(null);
  const [selectedPending, setSelectedPending] = useState<TypedProperty | null>(
    null,
  );
  const [isPendingVisible, setIsPendingVisible] = useState(false);

  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {},
  );

  // Edit modal state
  const [editProperty, setEditProperty] = useState<TypedProperty | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    fetchAll();
    fetchPending();
  }, []);

  useEffect(() => {
    if (selectedPending) {
      requestAnimationFrame(() => setIsPendingVisible(true));
    }
  }, [selectedPending]);

  function closePendingModal() {
    setIsPendingVisible(false);
    setTimeout(() => setSelectedPending(null), 250);
  }

  async function fetchAll() {
    try {
      setAllLoading(true);
      setAllError(null);
      const data = await getAllProperties();
      setAllProperties(data.map(cast));
    } catch (err: unknown) {
      setAllError(
        err instanceof Error ? err.message : "Failed to load properties",
      );
    } finally {
      setAllLoading(false);
    }
  }

  async function fetchPending() {
    try {
      setPendingLoading(true);
      setPendingError(null);
      const data = await getPendingProperties();
      setPendingProperties(data.map(cast));
    } catch (err: unknown) {
      setPendingError(
        err instanceof Error
          ? err.message
          : "Failed to load pending properties",
      );
    } finally {
      setPendingLoading(false);
    }
  }

  async function handleApprove(id: string) {
    setActionLoading((prev) => ({ ...prev, [`approve-${id}`]: true }));
    try {
      await approveProperty(id);
      setPendingProperties((prev) => prev.filter((p) => p._id !== id));
      setAllProperties((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: "approved" as const } : p,
        ),
      );
      closePendingModal();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Approve Error!");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`approve-${id}`]: false }));
    }
  }

  async function handleReject(id: string) {
    setActionLoading((prev) => ({ ...prev, [`reject-${id}`]: true }));
    try {
      await rejectProperty(id);
      setPendingProperties((prev) => prev.filter((p) => p._id !== id));
      setAllProperties((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: "rejected" as const } : p,
        ),
      );
      closePendingModal();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Reject Error!");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`reject-${id}`]: false }));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this property?")) return;
    setActionLoading((prev) => ({ ...prev, [`delete-${id}`]: true }));
    try {
      await deleteProperty(id);
      setAllProperties((prev) => prev.filter((p) => p._id !== id));
      if (selectedAll?._id === id) setSelectedAll(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Delete Error!");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`delete-${id}`]: false }));
    }
  }

  async function handleEditSave(form: FullEditForm) {
    if (!editProperty) return;
    setEditLoading(true);
    try {
      const updated = cast(
        await updateProperty(editProperty._id, form as Partial<Property>),
      );
      setAllProperties((prev) =>
        prev.map((p) =>
          p._id === editProperty._id ? { ...p, ...updated } : p,
        ),
      );
      if (selectedAll?._id === editProperty._id) {
        setSelectedAll((prev) => (prev ? { ...prev, ...updated } : prev));
      }
      setEditProperty(null);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Update Error!");
    } finally {
      setEditLoading(false);
    }
  }

  function getStatusBadge(status: "pending" | "approved" | "rejected") {
    const map: Record<string, { label: string; className: string }> = {
      approved: {
        label: "Approved",
        className: "bg-emerald-100 text-emerald-700",
      },
      pending: { label: "Pending", className: "bg-amber-100 text-amber-700" },
      rejected: { label: "Rejected", className: "bg-red-100 text-red-600" },
    };
    const s = map[status] ?? {
      label: status,
      className: "bg-gray-100 text-gray-600",
    };
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${s.className}`}
      >
        {s.label}
      </span>
    );
  }

  function getPrice(property: TypedProperty): string {
    const price = property.flatDetails?.pricePerSqFt;
    return price != null
      ? `৳${Number(price).toLocaleString("en-BD")}/sqft`
      : "N/A";
  }

  const totalAll = allProperties.length;
  const totalApproved = allProperties.filter(
    (p) => p.status === "approved",
  ).length;
  const totalRejected = allProperties.filter(
    (p) => p.status === "rejected",
  ).length;
  const totalPending = pendingProperties.length;

  return (
    <div className="min-h-screen bg-[#f5f6fa] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Property Management System
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold rounded-full">
            Admin ✓
          </span>
        </div>
      </header>

      {/* Stats */}
      <div className="px-8 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Properties",
            value: allLoading ? "—" : totalAll,
            color: "text-gray-800",
            bg: "bg-white",
            border: "border-gray-200",
          },
          {
            label: "Approved",
            value: allLoading ? "—" : totalApproved,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-200",
          },
          {
            label: "Pending",
            value: pendingLoading ? "—" : totalPending,
            color: "text-amber-500",
            bg: "bg-amber-50",
            border: "border-amber-200",
          },
          {
            label: "Rejected",
            value: allLoading ? "—" : totalRejected,
            color: "text-red-500",
            bg: "bg-red-50",
            border: "border-red-200",
          },
        ].map((card) => (
          <div
            key={card.label}
            className={`rounded-xl border ${card.border} ${card.bg} p-5 shadow-sm`}
          >
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              {card.label}
            </p>
            <p className={`text-3xl font-extrabold mt-1 ${card.color}`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="px-8 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── LEFT: All Properties ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">All Properties</h2>
            <button
              onClick={fetchAll}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Refresh
            </button>
          </div>

          {allLoading && <PanelLoader />}
          {allError && <PanelError message={allError} onRetry={fetchAll} />}
          {!allLoading && !allError && allProperties.length === 0 && (
            <EmptyState icon="🏚️" title="No properties found" />
          )}

          {!allLoading && allProperties.length > 0 && (
            <div className="space-y-3 max-h-[calc(100vh-260px)] overflow-y-auto pr-1 custom-scroll">
              {allProperties.map((property) => {
                const isSelected = selectedAll?._id === property._id;
                return (
                  <div key={property._id}>
                    <div
                      onClick={() =>
                        setSelectedAll(isSelected ? null : property)
                      }
                      className={`bg-white rounded-xl border shadow-sm p-4 cursor-pointer transition-all duration-200
                        ${
                          isSelected
                            ? "border-blue-400 ring-2 ring-blue-100"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusBadge(property.status)}
                          </div>
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {property.title || "Untitled"}
                          </h3>
                          <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
                            {property.lat && property.lng && (
                              <span>
                                {property.lat.toFixed(3)},{" "}
                                {property.lng.toFixed(3)}
                              </span>
                            )}
                            <span> {getPrice(property)}</span>
                            {property.createdAt && (
                              <span>
                                {" "}
                                {new Date(
                                  property.createdAt,
                                ).toLocaleDateString("en-US")}
                              </span>
                            )}
                          </div>
                        </div>

                        <div
                          className="flex gap-1.5 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => setEditProperty(property)}
                            className="px-2.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(property._id)}
                            disabled={!!actionLoading[`delete-${property._id}`]}
                            className="px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {actionLoading[`delete-${property._id}`]
                              ? "..."
                              : "🗑️ Delete"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Inline detail panel */}
                    {isSelected && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-1 text-sm text-gray-700 space-y-2 animate-fadeIn">
                        <p className="font-semibold text-blue-800 text-base">
                          {property.title}
                        </p>

                        {property.plotDetails && (
                          <div className="space-y-1">
                            {property.plotDetails.plotOwnerName && (
                              <p>
                                <span className="font-medium">Owner:</span>{" "}
                                {property.plotDetails.plotOwnerName}
                              </p>
                            )}
                            {property.plotDetails.plotSize && (
                              <p>
                                <span className="font-medium">Plot Size:</span>{" "}
                                {property.plotDetails.plotSize}
                              </p>
                            )}
                            {property.plotDetails.address && (
                              <p>
                                <span className="font-medium">Address:</span>{" "}
                                {property.plotDetails.address}
                              </p>
                            )}
                          </div>
                        )}

                        {property.flatDetails && (
                          <div className="space-y-1">
                            {property.flatDetails.pricePerSqFt != null && (
                              <p>
                                <span className="font-medium">Price/sqft:</span>{" "}
                                ৳
                                {Number(
                                  property.flatDetails.pricePerSqFt,
                                ).toLocaleString("en-BD")}
                              </p>
                            )}
                            {property.flatDetails.flatSize &&
                              property.flatDetails.flatSize.length > 0 && (
                                <p>
                                  <span className="font-medium">
                                    Flat Types:
                                  </span>{" "}
                                  {property.flatDetails.flatSize
                                    .map((f) => `${f.type} (${f.size})`)
                                    .join(", ")}
                                </p>
                              )}
                          </div>
                        )}

                        {property.salesInformation && (
                          <div className="flex gap-4">
                            {property.salesInformation.totalFlats != null && (
                              <p>
                                <span className="font-medium">
                                  Total Flats:
                                </span>{" "}
                                {property.salesInformation.totalFlats}
                              </p>
                            )}
                            {property.salesInformation.soldFlats != null && (
                              <p>
                                <span className="font-medium">Sold:</span>{" "}
                                {property.salesInformation.soldFlats}
                              </p>
                            )}
                          </div>
                        )}

                        {property.plotDetails?.plotPhoto && (
                          <Image
                            src={property.plotDetails.plotPhoto}
                            width={100}
                            height={100}
                            alt="Plot"
                            className="rounded-lg mt-2 max-h-40 object-cover w-full"
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── RIGHT: Pending Review ── */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Pending Review
              {!pendingLoading && (
                <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-semibold">
                  {totalPending}
                </span>
              )}
            </h2>
            <button
              onClick={fetchPending}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Refresh
            </button>
          </div>

          {pendingLoading && <PanelLoader />}
          {pendingError && (
            <PanelError message={pendingError} onRetry={fetchPending} />
          )}
          {!pendingLoading &&
            !pendingError &&
            pendingProperties.length === 0 && (
              <EmptyState
                icon="🎉"
                title="No pending properties"
                subtitle="All reviews are complete!"
              />
            )}

          {!pendingLoading && pendingProperties.length > 0 && (
            <div className="space-y-3 max-h-[calc(100vh-260px)] overflow-y-auto pr-1 custom-scroll">
              {pendingProperties.map((property) => {
                const isSelected = selectedPending?._id === property._id;
                return (
                  <div
                    key={property._id}
                    onClick={() => {
                      if (isSelected) closePendingModal();
                      else setSelectedPending(property);
                    }}
                    className={`bg-white rounded-xl border shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer transition-all duration-200
                      ${
                        isSelected
                          ? "border-amber-400 ring-2 ring-amber-100"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          Pending
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 truncate">
                        {property.title || "Untitled"}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-gray-400">
                        {property.lat && property.lng && (
                          <span>
                            📍 {property.lat.toFixed(3)},{" "}
                            {property.lng.toFixed(3)}
                          </span>
                        )}
                        <span>💰 {getPrice(property)}</span>
                        {property.createdAt && (
                          <span>
                            🕐{" "}
                            {new Date(property.createdAt).toLocaleDateString(
                              "en-US",
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className="flex gap-2 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleApprove(property._id)}
                        disabled={!!actionLoading[`approve-${property._id}`]}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        {actionLoading[`approve-${property._id}`]
                          ? "..."
                          : "✓ Approve"}
                      </button>
                      <button
                        onClick={() => handleReject(property._id)}
                        disabled={!!actionLoading[`reject-${property._id}`]}
                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 text-xs font-semibold rounded-lg border border-red-200 transition-colors"
                      >
                        {actionLoading[`reject-${property._id}`]
                          ? "..."
                          : "✗ Reject"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {selectedPending && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-250
            ${isPendingVisible ? "bg-black/40 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"}`}
          onClick={closePendingModal}
        >
          <div
            className={`w-full max-w-lg transition-all duration-250
              ${isPendingVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <AdminPropertyPreview
              property={selectedPending as any}
              onClose={closePendingModal}
              onApprove={handleApprove}
              onReject={handleReject}
              actionLoading={actionLoading}
            />
          </div>
        </div>
      )}

      {editProperty && (
        <AdminPropertyEditModal
          form={buildEditForm(editProperty)}
          loading={editLoading}
          onSave={handleEditSave}
          onClose={() => setEditProperty(null)}
        />
      )}

      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease; }
      `}</style>
    </div>
  );
}

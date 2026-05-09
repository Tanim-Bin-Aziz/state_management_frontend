/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  getPendingProperties,
  approveProperty,
  rejectProperty,
  Property,
} from "@/lib/api";
import AdminPropertyPreview from "../admin/AdminPropertyPreview";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {},
  );
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  // ✅ Animation state — modal open হলে true, close করলে false হয়ে তারপর unmount
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchPending();
  }, []);

  // ✅ selectedProperty set হলে এক tick পরে isVisible = true (enter animation trigger)
  useEffect(() => {
    if (selectedProperty) {
      requestAnimationFrame(() => setIsVisible(true));
    }
  }, [selectedProperty]);

  function closeModal() {
    setIsVisible(false);
    // ✅ exit animation শেষ হওয়ার পর unmount
    setTimeout(() => setSelectedProperty(null), 250);
  }

  async function fetchPending() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPendingProperties();
      setProperties(data);
    } catch (err: any) {
      setError(err.message || "Properties loading error!");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    setActionLoading((prev) => ({ ...prev, [`approve-${id}`]: true }));
    try {
      await approveProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      closeModal();
    } catch (err: any) {
      alert(err.message || "Approve Error!");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`approve-${id}`]: false }));
    }
  }

  async function handleReject(id: string) {
    setActionLoading((prev) => ({ ...prev, [`reject-${id}`]: true }));
    try {
      await rejectProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      closeModal();
    } catch (err: any) {
      alert(err.message || "Reject Error!");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`reject-${id}`]: false }));
    }
  }

  function getPrice(property: Property): string {
    const price = property.flatDetails?.pricePerSqFt;
    return price ? `৳${Number(price).toLocaleString("en-BD")} /sqft` : "N/A";
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Pending properties review</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-3xl font-bold text-yellow-500 mt-1">
                {loading ? "—" : properties.length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm text-gray-500">Today&#39;s Date</p>
              <p className="text-lg font-semibold text-gray-700 mt-1">
                {new Date().toLocaleDateString("en-US")}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <p className="text-sm text-gray-500">Role</p>
              <p className="text-lg font-semibold text-green-600 mt-1">
                Admin ✓
              </p>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20 text-gray-400">
              <svg
                className="animate-spin h-6 w-6 mr-3"
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
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-center gap-3">
              <span>⚠️</span>
              <span>{error}</span>
              <button
                onClick={fetchPending}
                className="ml-auto text-sm underline hover:no-underline"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && properties.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">🎉</p>
              <p className="text-lg font-medium">No pending property</p>
              <p className="text-sm mt-1">All reviews finished</p>
            </div>
          )}

          {/* Property List */}
          {!loading && properties.length > 0 && (
            <div className="space-y-4">
              {properties.map((property) => {
                const isSelected = selectedProperty?._id === property._id;
                return (
                  <div
                    key={property._id}
                    onClick={() => {
                      if (isSelected) {
                        closeModal();
                      } else {
                        setSelectedProperty(property);
                      }
                    }}
                    className={`bg-white rounded-xl border shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer transition-all duration-200
                      ${
                        isSelected
                          ? "border-emerald-400 ring-2 ring-emerald-100"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                        <span className="text-xs text-gray-400">
                          {property.plotDetails &&
                          Object.keys(property.plotDetails as any).length > 0
                            ? "Plot"
                            : "Flat"}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-gray-900 truncate">
                        {property.title || "Untitled"}
                      </h2>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                        {property.lat && property.lng && (
                          <span>
                            📍 {property.lat.toFixed(4)},{" "}
                            {property.lng.toFixed(4)}
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
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        {actionLoading[`approve-${property._id}`]
                          ? "..."
                          : "✓ Approve"}
                      </button>
                      <button
                        onClick={() => handleReject(property._id)}
                        disabled={!!actionLoading[`reject-${property._id}`]}
                        className="px-4 py-2 bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 text-sm font-medium rounded-lg border border-red-200 transition-colors"
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
      </main>

      {selectedProperty && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-250
            ${isVisible ? "bg-black/40 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none"}`}
          onClick={closeModal}
        >
          <div
            className={`w-full max-w-lg transition-all duration-250
              ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <AdminPropertyPreview
              property={selectedProperty as any}
              onClose={closeModal}
              onApprove={handleApprove}
              onReject={handleReject}
              actionLoading={actionLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  getPendingProperties,
  approveProperty,
  rejectProperty,
  Property,
} from "@/lib/api";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>(
    {},
  );

  useEffect(() => {
    fetchPending();
  }, []);

  async function fetchPending() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPendingProperties();
      setProperties(data);
    } catch (err: any) {
      setError(err.message || "Properties loading error !");
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id: string) {
    setActionLoading((prev) => ({ ...prev, [`approve-${id}`]: true }));
    try {
      await approveProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err.message || "Approve Error !");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`approve-${id}`]: false }));
    }
  }

  async function handleReject(id: string) {
    setActionLoading((prev) => ({ ...prev, [`reject-${id}`]: true }));
    try {
      await rejectProperty(id);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      alert(err.message || "Reject Error !");
    } finally {
      setActionLoading((prev) => ({ ...prev, [`reject-${id}`]: false }));
    }
  }

  function getPrice(property: Property): string {
    const sales = property.salesInformation as any;
    const price = sales?.price ?? sales?.totalPrice ?? sales?.amount;
    return price ? `৳${Number(price).toLocaleString("bn-BD")}` : "N/A";
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Pending properties review</p>
        </div>

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
              {new Date().toLocaleDateString("en-us")}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-lg font-semibold text-green-600 mt-1">Admin ✓</p>
          </div>
        </div>

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

        {!loading && !error && properties.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🎉</p>
            <p className="text-lg font-medium">No pending property </p>
            <p className="text-sm mt-1">All Review Finished</p>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="space-y-4">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                    {property.plotDetails &&
                    Object.keys(property.plotDetails as any).length > 0 ? (
                      <span className="text-xs text-gray-400">Plot</span>
                    ) : (
                      <span className="text-xs text-gray-400">Flat</span>
                    )}
                  </div>

                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {property.title || "Untitled"}
                  </h2>

                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    {property.lat && property.lng && (
                      <span>
                        📍 {property.lat.toFixed(4)}, {property.lng.toFixed(4)}
                      </span>
                    )}
                    <span>
                      💰 {getPrice(property.flatDetails.pricePerSqFt)}
                    </span>
                    {property.createdAt && (
                      <span>
                        🕐{" "}
                        {new Date(property.createdAt).toLocaleDateString(
                          "en-us",
                        )}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

"use client";

import { X } from "lucide-react";
import { Property } from "@/types/property";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import Link from "next/link";

interface Props {
  data: Property | null;
  onClose: () => void;
}

function useLocalStorage(key: string) {
  return useSyncExternalStore(
    () => () => {},
    () => (typeof window !== "undefined" ? localStorage.getItem(key) : null),
    () => null,
  );
}

const PropertyDetails = ({ data, onClose }: Props) => {
  const token = useLocalStorage("token");
  const isLoggedIn = !!token;

  if (!data) return null;

  return (
    <div className="w-[380px] h-full bg-white/95 backdrop-blur-xl flex flex-col min-h-0 shadow-2xl">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{data.title}</h2>

          <p className="text-xs text-gray-500 mt-1">Property Information</p>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar">
        <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-sm">
          <Image
            src={data.plotDetails.plotPhoto}
            alt="property"
            fill
            className="object-cover hover:scale-105 transition duration-300"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
            Active
          </span>

          <span className="text-sm text-gray-500">
            {data.salesInformation.totalFlats} Flats
          </span>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4">
          <h3 className="font-semibold mb-4 text-gray-900">Plot Details</h3>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-3 gap-4">
              <span className="text-gray-500">Plot Owner</span>

              <span className="col-span-2 font-medium text-gray-900">
                {data.plotDetails.plotOwnerName}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <span className="text-gray-500">Plot Size</span>

              <span className="col-span-2 font-medium text-gray-900">
                {data.plotDetails.plotSize}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <span className="text-gray-500">Address</span>

              <span className="col-span-2 font-medium text-gray-900 leading-relaxed">
                {data.plotDetails.address}
              </span>
            </div>
          </div>
        </div>

        {/* PLOT PHOTO */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Plot Photo</h3>

          <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-sm">
            <Image
              src={data.plotDetails.plotPhoto}
              alt="plot"
              fill
              className="object-cover hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        {/* FLAT DETAILS */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <h3 className="font-semibold mb-4 text-gray-900">Flat Details</h3>

          <div className="flex flex-col gap-3 text-sm">
            {data.flatDetails.flatSize.map((flat, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm"
              >
                <div>
                  <span className="inline-flex items-center py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
                    Type: {flat.type}
                  </span>
                  <p className="text-sm font-semibold text-emerald-600 mt-1">
                    Total: ৳
                    {Number(flat.size) * Number(data.flatDetails.pricePerSqFt)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-gray-500 font-semibold">
                    Size: {flat.size} sqft
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    ৳{data.flatDetails.pricePerSqFt}/sqft
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FLAT PLAN */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">Flat Plan</h3>

          <div className="grid grid-cols-2 gap-3">
            {data.flatDetails.flatPlan.map((plan, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100"
              >
                <div className="relative w-full h-32">
                  <Image
                    src={plan.image}
                    alt={plan.name}
                    fill
                    className="object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-2 text-center">
                  <p className="text-xs font-medium text-gray-700">
                    {plan.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SALES INFO */}
        <div>
          <h3 className="font-semibold mb-3 text-gray-900">
            Sales Information
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                {data.salesInformation.soldFlats}
              </p>

              <p className="text-sm text-gray-500 mt-1">Sold Flats</p>
            </div>

            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">
                {data.salesInformation.totalFlats}
              </p>

              <p className="text-sm text-gray-500 mt-1">Total Flats</p>
            </div>
          </div>
        </div>

        {/* AVAILABLE */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-emerald-700 font-medium">
              Available Flats
            </span>

            <span className="text-2xl font-bold text-emerald-600">
              {(data.salesInformation.totalFlats || 0) -
                (data.salesInformation.soldFlats || 0)}
            </span>
          </div>
        </div>
      </div>

      {!isLoggedIn && (
        <div className="p-4 border-t border-gray-100 bg-white shrink-0">
          <Link href="/contact">
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white py-3 rounded-2xl font-medium shadow-md transition-all duration-200">
              Contact Agent
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;

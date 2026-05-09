"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { X, Check, Ban, MapPin, LayoutGrid, Layers } from "lucide-react";
import { Property } from "@/types/property";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

type Props = {
  property: (Property & { _id: string }) | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  actionLoading: Record<string, boolean>;
};

const formatPrice = (price?: number) =>
  price ? `৳${Number(price).toLocaleString("en-BD")}` : "N/A";

const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <span className="text-emerald-500">{icon}</span>
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const AdminPropertyPreview = ({
  property,
  onClose,
  onApprove,
  onReject,
  actionLoading,
}: Props) => {
  if (!property) return null;

  const totalFlats = property.salesInformation?.totalFlats ?? 0;
  const soldFlats = property.salesInformation?.soldFlats ?? 0;
  const availableFlats = totalFlats - soldFlats;
  const soldPercent = totalFlats > 0 ? (soldFlats / totalFlats) * 100 : 0;

  const isApproving = !!actionLoading[`approve-${property._id}`];
  const isRejecting = !!actionLoading[`reject-${property._id}`];

  return (
    <div className="bg-white flex flex-col rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full mb-2">
            <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
            Pending Review
          </span>
          <h2 className="text-lg font-bold text-gray-900 leading-snug truncate">
            {property.title}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
            <MapPin size={11} />
            {property.plotDetails?.address || "No address"}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-1 shrink-0 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={16} />
        </button>
      </div>

      <div className="overflow-y-auto max-h-[65vh]">
        <div className="relative h-52 w-full bg-gray-100">
          <Image
            src={property.plotDetails?.plotPhoto || "/placeholder.png"}
            alt={property.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        <div className="p-5 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 rounded-xl p-3 text-center">
              <p className="text-[11px] text-emerald-600 font-medium uppercase tracking-wide">
                Price / SqFt
              </p>
              <p className="text-base font-bold text-emerald-700 mt-1">
                {formatPrice(property.flatDetails?.pricePerSqFt)}
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 text-center">
              <p className="text-[11px] text-blue-600 font-medium uppercase tracking-wide">
                Available
              </p>
              <p className="text-base font-bold text-blue-700 mt-1">
                {availableFlats} flats
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-[11px] text-gray-500 font-medium uppercase tracking-wide">
                Total
              </p>
              <p className="text-base font-bold text-gray-700 mt-1">
                {totalFlats} flats
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>Sales Progress</span>
              <span>
                {soldFlats} sold of {totalFlats}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${soldPercent}%` }}
              />
            </div>
          </div>
          <Section icon={<MapPin size={14} />} title="Location">
            <div className="rounded-xl overflow-hidden h-[200px] border border-gray-200">
              <MapView properties={[property]} selected={property} />
            </div>
          </Section>
          {(property.flatDetails?.flatSize?.length ?? 0) > 0 && (
            <Section icon={<LayoutGrid size={14} />} title="Flat Sizes">
              <div className="space-y-2">
                {property.flatDetails.flatSize.map((flat, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {flat.type}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {flat.size}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-emerald-600">
                      {formatPrice(property.flatDetails?.pricePerSqFt)}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}
          {(property.flatDetails?.flatPlan?.length ?? 0) > 0 && (
            <Section icon={<Layers size={14} />} title="Floor Plans">
              <div className="grid grid-cols-2 gap-3">
                {property.flatDetails.flatPlan.map((plan, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm"
                  >
                    <div className="relative h-28">
                      <Image
                        src={plan.image}
                        alt={plan.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-xs font-medium text-gray-700 px-3 py-2 truncate">
                      {plan.name}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-100 flex gap-3 bg-white">
        <button
          onClick={() => onApprove(property._id)}
          disabled={isApproving || isRejecting}
          className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Check size={16} />
          {isApproving ? "Approving…" : "Approve"}
        </button>
        <button
          onClick={() => onReject(property._id)}
          disabled={isApproving || isRejecting}
          className="flex-1 bg-red-50 hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed text-red-600 py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 border border-red-200 transition-colors"
        >
          <Ban size={16} />
          {isRejecting ? "Rejecting…" : "Reject"}
        </button>
      </div>
    </div>
  );
};
export default AdminPropertyPreview;

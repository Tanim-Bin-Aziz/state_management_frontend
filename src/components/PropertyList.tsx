/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, Plus, MapPin } from "lucide-react";
import { Property } from "@/types/property";
import Image from "next/image";

export default function PropertyList({
  data,
  onSelect,
  searchTerm,
  setSearchTerm,
}: any) {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          All Projects
          <span className="text-gray-400 text-sm font-normal"></span>
        </h2>
        <button className="bg-[#2dcc87] text-white px-2 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus size={15} /> Add New
        </button>
      </div>

      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          value={searchTerm || ""}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2  hide-scrollbar">
        {data.map((p: Property) => (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            className="flex gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-all cursor-pointer group bg-white active:scale-[0.98]"
          >
            <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
              <Image
                src={p.plotDetails?.plotPhoto || "/placeholder.png"}
                alt={p.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-800 group-hover:text-[#2dcc87] truncate">
                  {p.title}
                </h4>
                <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase">
                  ACTIVE
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                <MapPin size={12} className="shrink-0" />
                <span className="truncate">{p.plotDetails?.address}</span>
              </div>
              <div className="mt-3 text-[11px] text-gray-500 font-medium">
                {p.salesInformation?.totalFlats} Flats •{" "}
                {p.salesInformation?.soldFlats} Sold •{" "}
                {(p.salesInformation?.totalFlats || 0) -
                  (p.salesInformation?.soldFlats || 0)}{" "}
                Available
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

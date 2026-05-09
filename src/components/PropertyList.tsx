"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Search,
  Plus,
  MapPin,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { Property } from "@/types/property";
import Image from "next/image";

const PropertyList = ({
  data,
  onSelect,
  searchTerm,
  setSearchTerm,
  onAddNew,
  isOpen,
  setIsOpen,
}: any) => {
  return (
    <div
      className={`h-full  bg-white/70 backdrop-blur-xl border-r border-gray-200/60 shadow-xl transition-all duration-300 flex flex-col
      ${isOpen ? "w-[350px]" : "w-[70px]"}`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-3 py-4 border-b border-gray-100 bg-white/60 backdrop-blur-md">
        {isOpen && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Projects
            </h2>
            <p className="text-xs text-gray-500">Explore available listings</p>
          </div>
        )}

        {isOpen && (
          <button
            onClick={onAddNew}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-medium shadow-md transition"
          >
            <Plus size={14} />
            Add
          </button>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {isOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
        </button>
      </div>

      {/* SEARCH */}
      {isOpen && (
        <div className="px-4 py-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none transition"
              value={searchTerm || ""}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* LIST */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-2">
        {data.map((p: Property) => (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            className="group flex gap-3 p-2 rounded-2xl bg-white hover:bg-emerald-50/40 border border-gray-100 hover:border-emerald-200 cursor-pointer transition-all duration-200 active:scale-[0.98]"
          >
            {/* IMAGE */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0 shadow-sm">
              <Image
                src={p.plotDetails?.plotPhoto || "/placeholder.png"}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* CONTENT (hidden when collapsed) */}
            {isOpen && (
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-emerald-600">
                  {p.title}
                </h4>

                <div className="flex items-center gap-1 text-gray-500 text-[11px] mt-1">
                  <MapPin size={12} />
                  <span className="truncate">{p.plotDetails?.address}</span>
                </div>

                <div className="mt-2 text-[10px] text-gray-500 font-medium">
                  {p.salesInformation?.totalFlats} Flats •{" "}
                  {p.salesInformation?.soldFlats} Sold •{" "}
                  {(p.salesInformation?.totalFlats || 0) -
                    (p.salesInformation?.soldFlats || 0)}{" "}
                  Available
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* glow */}
      <div className="h-6 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default PropertyList;

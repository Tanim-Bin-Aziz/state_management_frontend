"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PropertyList from "@/components/PropertyList";
import PropertyDetails from "@/components/PropertyDetails";
import getProperties from "@/lib/api";
import { Property } from "@/types/property";
import AddPropertyModal from "./AddPropertyModal";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

const Hero = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selected, setSelected] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [isOpen, setIsOpen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProperties();
        setProperties(data as unknown as Property[]);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSelect = (property: Property) => {
    setSelected(property);
    setShowDetails(true);
  };

  return (
    <div
      className="
      flex
      h-screen
      w-full
      overflow-hidden
      bg-gradient-to-b from-white via-slate-50 to-slate-100
      relative
      pt-2
      z-0
    "
    >
      <div
        className={`
          relative
          transition-all
          duration-300
          ease-in-out
          ${isOpen ? "w-[350px]" : "w-[72px]"}
        `}
      >
        <PropertyList
          data={filteredProperties}
          onSelect={handleSelect}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddNew={() => setShowModal(true)}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>

      <div className="flex-1 relative  overflow-hidden rounded-xl mx-2">
        <MapView properties={filteredProperties} selected={selected} />
      </div>
      <div
        className={`
          transition-all
          duration-300
          ease-in-out
          border-l
          border-gray-200
          bg-white/80
          backdrop-blur-xl
          shadow-2xl
          overflow-hidden
          ${showDetails ? "w-[380px] opacity-100" : "w-0 opacity-0"}
        `}
      >
        <div
          className={`
            h-full
            transition-transform
            duration-300
            ease-in-out
            ${showDetails ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <PropertyDetails
            data={selected}
            onClose={() => setShowDetails(false)}
          />
        </div>
      </div>
      {showModal && (
        <AddPropertyModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            alert("Submitted! waiting for admin approval.");
          }}
        />
      )}
    </div>
  );
};

export default Hero;

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import PropertyList from "@/components/PropertyList";
import PropertyDetails from "@/components/PropertyDetails";
import getProperties from "@/lib/api";
import { Property } from "@/types/property";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

const Hero = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selected, setSelected] = useState<Property | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };
    fetchData();
  }, []);

  const filteredProperties = properties.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="flex h-full w-full overflow-hidden">
      <div className="w-[350px]">
        <PropertyList
          data={filteredProperties}
          onSelect={setSelected}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div className="flex-1 relative">
        <MapView properties={filteredProperties} selected={selected} />
      </div>
      <PropertyDetails data={selected} />
    </main>
  );
};

export default Hero;

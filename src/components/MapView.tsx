/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";

import icon2x from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon2x,
  iconUrl: icon,
  shadowUrl: shadow,
});

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 14);
    }
  }, [lat, lng, map]);

  return null;
}

const MapView = ({ selected, properties }: any) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[23.7937, 90.4066]}
        zoom={7}
        className="h-full w-full z-0"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {properties.map((p: any) =>
          p.lat && p.lng ? (
            <Marker
              key={p.id}
              position={[p.lat, p.lng]}
              opacity={p.status === "pending" ? 0.4 : 1}
            />
          ) : null,
        )}

        {selected && <FlyTo lat={selected.lat} lng={selected.lng} />}
      </MapContainer>
    </div>
  );
};
export default MapView;

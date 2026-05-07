"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon2x from "leaflet/dist/images/marker-icon-2x.png";
import icon from "leaflet/dist/images/marker-icon.png";
import shadow from "leaflet/dist/images/marker-shadow.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon2x,
  iconUrl: icon,
  shadowUrl: shadow,
});

function ClickHandler({
  onPick,
}: {
  onPick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapPickerProps {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
}

const MapPicker = ({ lat, lng, onChange }: MapPickerProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-gray-500">Choose Property Location</p>

      <div
        style={{
          height: "180px",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
          isolation: "isolate",
          position: "relative",
          zIndex: 0,
        }}
      >
        <MapContainer
          center={[23.7937, 90.4066]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <ClickHandler onPick={onChange} />
          {lat && lng && <Marker position={[lat, lng]} />}
        </MapContainer>
      </div>

      {lat && lng ? (
        <p className="text-xs text-green-600">
          ✅ Lat: {lat.toFixed(5)}, Lng: {lng.toFixed(5)}
        </p>
      ) : (
        <p className="text-xs text-gray-400">location not selected</p>
      )}
    </div>
  );
};

export default MapPicker;

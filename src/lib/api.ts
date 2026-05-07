/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";

// ── Property Types ────────────────────────────────────────────────────────────

export interface Property {
  _id: string;
  id: number;
  title: string;
  lat: number;
  lng: number;
  status: "pending" | "approved";
  plotDetails: Record<string, unknown>;
  flatDetails: Record<string, unknown>;
  salesInformation: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// ── Existing Functions ────────────────────────────────────────────────────────

const getProperties = async () => {
  const res = await api.get("/properties");
  return res.data.data;
};

const createProperty = async (data: any) => {
  const res = await api.post("/properties", data);
  return res.data.data;
};

// ── Admin API Functions ───────────────────────────────────────────────────────

export const getPendingProperties = async (): Promise<Property[]> => {
  const res = await api.get("/admin/properties?status=pending");
  return res.data.data;
};

export const approveProperty = async (
  propertyId: string,
): Promise<Property> => {
  const res = await api.patch(`/admin/properties/${propertyId}/approve`);
  return res.data.data;
};

export const rejectProperty = async (propertyId: string): Promise<Property> => {
  const res = await api.patch(`/admin/properties/${propertyId}/reject`);
  return res.data.data;
};

// ── Exports ───────────────────────────────────────────────────────────────────

export { createProperty };
export default getProperties;

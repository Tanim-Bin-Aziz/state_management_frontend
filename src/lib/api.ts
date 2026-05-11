/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/axios";
import { ReactNode } from "react";

export interface Property {
  image: string;
  tag: string;
  location: ReactNode;
  beds: number;
  baths: number;
  sqft: string;
  _id: string;
  id: number;
  title: string;
  lat: number;
  lng: number;
  status: "pending" | "approved" | "rejected";
  plotDetails: Record<string, unknown>;
  flatDetails: Record<string, unknown>;
  salesInformation: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// public api
const getProperties = async (): Promise<Property[]> => {
  const res = await api.get("/properties");
  return res.data.data;
};

const createProperty = async (data: any): Promise<Property> => {
  const res = await api.post("/properties", data);
  return res.data.data;
};

// admin api
export const getAllProperties = async (): Promise<Property[]> => {
  const res = await api.get("/properties");
  return res.data.data;
};

export const getPendingProperties = async (): Promise<Property[]> => {
  const res = await api.get("/properties/pending");
  return res.data.data;
};

export const approveProperty = async (id: string): Promise<Property> => {
  const res = await api.patch(`/properties/${id}/approve`);
  return res.data.data;
};

export const rejectProperty = async (id: string): Promise<Property> => {
  const res = await api.patch(`/properties/${id}/reject`);
  return res.data.data;
};

export const deleteProperty = async (id: string): Promise<void> => {
  await api.delete(`/properties/${id}`);
};

export const updateProperty = async (
  id: string,
  data: Partial<Property>,
): Promise<Property> => {
  const res = await api.patch(`/properties/${id}`, data);
  return res.data.data;
};

export { createProperty };
export default getProperties;

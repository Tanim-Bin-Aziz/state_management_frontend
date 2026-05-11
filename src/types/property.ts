export type PlotDetails = {
  plotOwnerName: string;
  plotSize: string;
  address: string;
  plotPhoto: string;
};

export type FlatSize = {
  type: string;
  size: string;
};

export type FlatPlan = {
  name: string;
  image: string;
};

export type FlatDetails = {
  flatSize: FlatSize[];
  pricePerSqFt: number;
  flatPlan: FlatPlan[];
};

export type SalesInformation = {
  totalFlats: number;
  soldFlats: number;
};

export type Property = {
  _id: string;
  id: number;
  title: string;
  lat: number;
  lng: number;

  plotDetails: PlotDetails;
  flatDetails: FlatDetails;
  salesInformation: SalesInformation;
};

export interface FlatSizeItem {
  type: string;
  size: string;
}

export type TypedProperty = {
  _id: string;
  title: string;
  lat: number;
  lng: number;
  status: "pending" | "approved" | "rejected";
  createdAt?: string;

  plotDetails?: PlotDetails;
  flatDetails?: FlatDetails;
  salesInformation?: SalesInformation;
};

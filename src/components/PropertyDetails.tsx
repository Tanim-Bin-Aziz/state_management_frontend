"use client";

import { Property } from "@/types/property";
import Image from "next/image";

const PropertyDetails = ({ data }: { data: Property | null }) => {
  if (!data) {
    return (
      <div className="w-[350px] h-full flex items-center justify-center text-gray-500">
        Select a property
      </div>
    );
  }

  return (
    <div className="w-[350px] h-full  bg-white flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto p-6 space-y-6  hide-scrollbar">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{data.title}</h2>
          <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
            Active
          </span>
        </div>
        <div className="relative w-full h-40 rounded-lg overflow-hidden">
          <Image
            src={data.plotDetails.plotPhoto}
            alt="property"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold mb-4">Plot Details</h3>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-3 gap-4">
              <span className="text-gray-500">Plot Owner</span>
              <span className="col-span-2 font-medium">
                {data.plotDetails.plotOwnerName}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="text-gray-500">Plot Size</span>
              <span className="col-span-2 font-medium">
                {data.plotDetails.plotSize}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <span className="text-gray-500">Address</span>
              <span className="col-span-2 font-medium">
                {data.plotDetails.address}
              </span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Plot Photo</h3>
          <div className="relative w-full h-40 rounded-lg overflow-hidden">
            <Image
              src={data.plotDetails.plotPhoto}
              alt="plot"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Flat Details</h3>
          <div className="flex flex-col gap-3 text-sm">
            {data.flatDetails.flatSize.map((flat, index) => (
              <div key={index} className="flex justify-between">
                <span className="font-medium">Type: {flat.type}</span>
                <span className="text-gray-600">Size: {flat.size}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Sales Information</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50  rounded-lg p-2 text-center">
              <p className="text-2xl font-bold text-green-600">
                {data.salesInformation.soldFlats}
              </p>
              <p className="text-sm text-gray-500">Sold Flats</p>
            </div>
            <div className="bg-blue-50  rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {data.salesInformation.totalFlats}
              </p>
              <p className="text-sm text-gray-500">Total Flats</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4  bg-white">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Contact Agent
        </button>
      </div>
    </div>
  );
};
export default PropertyDetails;

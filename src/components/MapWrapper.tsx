/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
});

const MapWrapper = (props: any) => {
  return <MapView {...props} />;
};
export default MapWrapper;

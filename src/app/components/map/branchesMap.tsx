"use client";

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import useFrontBranches from "../../../../dataFetchs/frontBranchesContext";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);

  return null;
}

export default function BranchesMap() {
  const { FrontBranchesData } = useFrontBranches();

  const [branchMarkers, setBranchMarkers] = useState<[number, number][]>([]);

  // Update multiple branch markers
  useEffect(() => {
    if (FrontBranchesData?.length > 0) {
      const positions: [number, number][] = FrontBranchesData.filter(
        (b: any) => b.Latitude != null && b.Longitude != null,
      ).map((b: any) => [b.Latitude, b.Longitude]);

      setBranchMarkers(positions);
    }
  }, [FrontBranchesData]);

  const defaultCenter: [number, number] = branchMarkers[0] || [
    41.724771, 44.790349,
  ];

  return (
    <div className="w-full h-full flex flex-col gap-y-[10px]">
      <div className="bg-gray-200 w-full h-full overflow-hidden rounded-[8px] z-0">
        <MapContainer
          center={defaultCenter}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* Render multiple branch markers */}
          {branchMarkers.map((pos, idx) => (
            <Marker key={idx} position={pos} />
          ))}

          <RecenterMap position={defaultCenter} />
        </MapContainer>
      </div>
    </div>
  );
}

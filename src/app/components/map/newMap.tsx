"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import { useContext, useEffect, useState } from "react";
import useGetStreetLatLng from "../../../../dataFetchs/getStreetLatLngHook";
import DropDown1value from "../DropDowns/DropDown1value";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const tbilisiBounds = {
  north: 41.81897133532913,
  south: 41.65347051949873,
  west: 44.699971374597546,
  east: 45.02338140877723,
};

function RecenterMap({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);

  return null;
}

function ClickableMarker({
  markerPosition,
  setMarkerPosition,
  notClickable,
  chooseTbilisiArea,
  name,
  setAllValues,
  setAlertShow,
  setAlertStatus,
  setAlertText,
}: any) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (notClickable) return;

      const newPos: [number, number] = [lat, lng];

      // If Tbilisi-only mode
      if (chooseTbilisiArea) {
        const inside =
          lat >= tbilisiBounds.south &&
          lat <= tbilisiBounds.north &&
          lng >= tbilisiBounds.west &&
          lng <= tbilisiBounds.east;

        if (!inside) {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("მიუთითე მხოლოდ თბილისის მასშტაბით");
          return;
        }
      }

      // Only update if position actually changed
      setMarkerPosition((prev: [number, number]) => {
        if (prev[0] === newPos[0] && prev[1] === newPos[1]) return prev;
        return newPos;
      });

      setAllValues((prev: any) => {
        const current = prev[name];
        if (current?.[0] === newPos[0] && current?.[1] === newPos[1])
          return prev;
        return { ...prev, [name]: newPos };
      });
    },
  });

  if (!markerPosition) return null;
  return <Marker position={markerPosition} />;
}

export default function NewMap({
  activeArea,
  name,
  name1,
  setAllValues,
  chooseTbilisiArea,
  notClickable,
}: any) {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates,
  );

  const [pickStreetName, setPickStreetName] = useState({
    streetName: "",
  });

  useEffect(() => {
    if (name1) {
      setAllValues((prev: any) => ({
        ...prev,
        [name1]: pickStreetName.streetName,
      }));
    }
  }, [name1, pickStreetName.streetName, setAllValues]);

  const streetLatLng = useGetStreetLatLng({
    streetName: pickStreetName.streetName,
  });

  const [markerPosition, setMarkerPosition] = useState<[number, number]>(
    activeArea ?? [41.724771, 44.790349],
  );

  useEffect(() => {
    if (activeArea) {
      setMarkerPosition(activeArea);
    }
  }, []);

  useEffect(() => {
    if (streetLatLng) {
      const { lat, lng } = streetLatLng;

      // enforce Tbilisi bounds
      const inside =
        lat >= tbilisiBounds.south &&
        lat <= tbilisiBounds.north &&
        lng >= tbilisiBounds.west &&
        lng <= tbilisiBounds.east;

      if (!inside) {
        setAlertShow(true);
        setAlertStatus(false);
        setAlertText("მიუთითე მხოლოდ თბილისის მასშტაბით");
        return;
      }

      // Only update if position is different
      setMarkerPosition((prev) => {
        if (prev[0] === lat && prev[1] === lng) return prev;
        return [lat, lng];
      });

      // Update form/state if needed
      setAllValues?.((prev: any) => ({ ...prev, [name]: [lat, lng] }));
    }
  }, [streetLatLng]);

  return (
    <div className="w-full h-full flex flex-col gap-y-[10px]">
      {!notClickable && (
        <div className="w-[330px] max-sm:w-full">
          <DropDown1value
            title="ქუჩები"
            data={[]}
            name="streetName"
            setAllValues={setPickStreetName}
            searchable={true}
          />
        </div>
      )}
      <div className="bg-gray-200 w-full h-full overflow-hidden rounded-[8px] z-0">
        <MapContainer
          center={markerPosition}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {markerPosition && (
            <ClickableMarker
              markerPosition={markerPosition}
              setMarkerPosition={setMarkerPosition}
              notClickable={notClickable}
              chooseTbilisiArea={chooseTbilisiArea}
              name={name}
              setAllValues={setAllValues}
              setAlertShow={setAlertShow}
              setAlertStatus={setAlertStatus}
              setAlertText={setAlertText}
            />
          )}
          <RecenterMap position={markerPosition} />
        </MapContainer>
      </div>
    </div>
  );
}
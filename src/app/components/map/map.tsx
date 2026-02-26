"use client";

import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
import DropDown1value from "../DropDowns/DropDown1value";
import useGetStreetLatLng from "../../../../dataFetchs/getStreetLatLngHook";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const tbilisiBounds = {
  north: 41.81897133532913,
  south: 41.65347051949873,
  west: 44.699971374597546,
  east: 45.02338140877723,
};

export default function Map({
  activeArea,
  name,
  name1,
  setAllValues,
  chooseTbilisiArea,
  notClickable,
}: any) {
  const { setAlertShow, setAlertStatus, setAlertText } = useContext(
    ContextForSharingStates
  );
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
  });

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

  const [defaultCenter, setDefaultCenter] = useState<any>({
    lat: 41.7151,
    lng: 44.8271,
  });

  const [markerPosition, setMarkerPosition] = useState<any>(null);

  const isInsideTbilisi = (lat: number, lng: number) => {
    return (
      lat >= tbilisiBounds.south &&
      lat <= tbilisiBounds.north &&
      lng >= tbilisiBounds.west &&
      lng <= tbilisiBounds.east
    );
  };

  useEffect(() => {
    if (streetLatLng || activeArea) {
      setDefaultCenter(streetLatLng || activeArea);
      if (isInsideTbilisi(streetLatLng?.lat, streetLatLng?.lng)) {
        if (streetLatLng) {
          setMarkerPosition(streetLatLng);
        }
        if (setAllValues && streetLatLng) {
          setAllValues((prev: any) => ({
            ...prev,
            [name]: { lat: streetLatLng.lat, lng: streetLatLng.lng },
          }));
        }
      }
    }
  }, [activeArea, streetLatLng]);

  useEffect(() => {
    if (activeArea) {
      setMarkerPosition(activeArea);
    }
  }, []);

  const handleMapClick = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    if (notClickable) {
    } else {
      if (chooseTbilisiArea) {
        if (isInsideTbilisi(lat, lng)) {
          setMarkerPosition({ lat, lng });
          setAllValues((prev: any) => ({
            ...prev,
            [name]: { lat, lng },
          }));
        } else {
          setAlertShow(true);
          setAlertStatus(false);
          setAlertText("მიუთითე მხოლოდ თბილისის მასშტაბით");
        }
      } else {
        setMarkerPosition({ lat, lng });
        setAllValues((prev: any) => ({
          ...prev,
          [name]: { lat, lng },
        }));
      }
    }
  };

  return isLoaded ? (
    <div className="w-full flex flex-col gap-y-[10px]">
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
      <div className="bg-gray-200 w-full h-[300px] overflow-hidden rounded-[8px]">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={defaultCenter}
          zoom={streetLatLng ? 16 : 10}
          onClick={handleMapClick}
          options={{
            disableDefaultUI: false,
          }}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}

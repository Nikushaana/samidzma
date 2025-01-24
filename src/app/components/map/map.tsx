"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import Image from "next/image";
import Link from "next/link";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function Map({
  activeCenter,
  activeMarkerPosition,
  name,
  setAllValues,
}: any) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyA6DmkyAFw9yTF8KMQRJj8YtoazR14tE3I",
  });

  const [defaultCenter, setDefaultCenter] = useState<any>({
    lat: 41.7151,
    lng: 44.8271,
  });

  const [markerPosition, setMarkerPosition] = useState<any>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (activeCenter) {
      setDefaultCenter(activeCenter);
    }
  }, [activeCenter]);

  useEffect(() => {
    if (activeMarkerPosition) {
      setMarkerPosition(activeMarkerPosition);
    }
  }, []);

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({
        ...prev,
        [name]: markerPosition,
      }));
    }
  }, [markerPosition]);

  const handleMapClick = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={10}
      onClick={handleMapClick}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  ) : (
    <></>
  );
}
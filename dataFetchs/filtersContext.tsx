"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useFilter = () => {
  const [pathnameItems, setPathnameItems] = useState<any>([]);

  const [forma, setForma] = useState([]);
  const [zoma, setZoma] = useState([]);
  const [saxeoba, setSaxeoba] = useState([]);
  const [masala, setMasala] = useState([]);
  const [moculoba, setMoculoba] = useState([]);
  const [type, setType] = useState([]);
  const [feri, setFeri] = useState([]);
  const [xangrdzlivoba, setxangrdzlivoba] = useState([]);
  const [tema, setTema] = useState([]);
  const [sqesi, setSqesi] = useState([]);
  const [raodenobaShefutvashi, setRaodenobaShefutvashi] = useState([]);

  const [filterLoader, setFilterLoader] = useState<boolean>(true);

  const fetchFilter = async () => {
    try {
      const [
        formaResponse,
        zomaResponse,
        saxeobaResponse,
        masalaResponse,
        moculobaResponse,
        typeResponse,
        feriResponse,
        xangrdzlivobaResponse,
        temaResponse,
        sqesiResponse,
        raodenobaShefutvashiResponse,
      ] = await Promise.all([
        axiosUser.get(
          `filter/forma?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/zoma?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/saxeoba?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/masala?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/moculoba?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/type?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/feri?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/xangrdzlivoba?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/tema?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/sqesi?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
        axiosUser.get(
          `filter/raodenobaShefutvashi?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode}`
              : ""
          }&${
            pathnameItems[2]?.pathCode
              ? `IdProdType=${pathnameItems[2]?.pathCode}`
              : ""
          }`
        ),
      ]);

      setForma(formaResponse.data);
      setZoma(zomaResponse.data);
      setSaxeoba(saxeobaResponse.data);
      setMasala(masalaResponse.data);
      setMoculoba(moculobaResponse.data);
      setType(typeResponse.data);
      setFeri(feriResponse.data);
      setxangrdzlivoba(xangrdzlivobaResponse.data);
      setTema(temaResponse.data);
      setSqesi(sqesiResponse.data);
      setRaodenobaShefutvashi(raodenobaShefutvashiResponse.data);

      setFilterLoader(false);
    } catch (error) {}
  };

  useEffect(() => {
    fetchFilter();
  }, [pathnameItems]);

  return {
    pathnameItems,
    setPathnameItems,

    forma,
    zoma,
    saxeoba,
    masala,
    moculoba,
    type,
    feri,
    xangrdzlivoba,
    tema,
    sqesi,
    raodenobaShefutvashi,
    filterLoader,
    fetchFilter,
  };
};

export default useFilter;

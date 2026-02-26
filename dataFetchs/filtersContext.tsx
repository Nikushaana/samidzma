"use client";

import { useContext, useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";
import { ContextForSharingStates } from "./sharedStates";

const useFilter = () => {
  const { pathnameItems } = useContext(ContextForSharingStates);
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
          `ourFilter/forma?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/zoma?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/saxeoba?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/masala?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/moculoba?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/type?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/feri?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/xangrdzlivoba?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/tema?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/sqesi?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
              : ""
          }`
        ),
        axiosUser.get(
          `ourFilter/raodenobaShefutvashi?${
            pathnameItems[1]?.pathCode
              ? `IdProdGroupType=${pathnameItems[1]?.pathCode.split("_").pop()}`
              : ""
          }${
            pathnameItems[2]?.pathCode
              ? `&IdProdType=${pathnameItems[2]?.pathCode.split("_").pop()}`
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

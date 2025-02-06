"use client";

import { useEffect, useState } from "react";
import { axiosUser } from "./AxiosToken";

const useFilter = () => {
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
        axiosUser.get("front/forma"),
        axiosUser.get("front/zoma"),
        axiosUser.get("front/saxeoba"),
        axiosUser.get("front/masala"),
        axiosUser.get("front/moculoba"),
        axiosUser.get("front/type"),
        axiosUser.get("front/feri"),
        axiosUser.get("front/xangrdzlivoba"),
        axiosUser.get("front/tema"),
        axiosUser.get("front/sqesi"),
        axiosUser.get("front/raodenobaShefutvashi"),
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
  }, []);

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

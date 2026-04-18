import { axiosUser } from "../../dataFetchs/AxiosToken";

type FetchProductsParams = {
  pageNumber: number;

  key?: string;

  sale?: number;
  aqcia?: number;
  minPrice?: number;
  maxPrice?: number;

  FeriCode?: string[];
  FormaCode?: string[];
  StyleCode?: string[];
  SqesiCode?: string[];
  SizeCode?: string[];

  IdAttribute1?: string[];
  IdAttribute2?: string[];
  IdAttribute3?: string[];
  IdAttribute4?: string[];
  IdAttribute5?: string[];
  IdAttribute6?: string[];

  pathnameItems?: any[];
};

export const fetchOurProducts = async (params: FetchProductsParams) => {
  const query = new URLSearchParams();

  query.set("pageNumber", String(params.pageNumber));
  query.set("itemsOnPage", "12");

  if (params.key) query.set("key", params.key);

  query.set("sale", String(params.sale ?? 0));
  query.set("aqcia", String(params.aqcia ?? 0));

  if (params.minPrice !== undefined)
    query.set("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined)
    query.set("maxPrice", String(params.maxPrice));

  if (params.FeriCode?.length) {
    query.set("FeriCode", JSON.stringify(params.FeriCode));
  }

  if (params.FormaCode?.length) {
    query.set("FormaCode", JSON.stringify(params.FormaCode));
  }

  if (params.StyleCode?.length) {
    query.set("StyleCode", JSON.stringify(params.StyleCode));
  }

  if (params.SqesiCode?.length) {
    query.set("SqesiCode", JSON.stringify(params.SqesiCode));
  }

  if (params.SizeCode?.length) {
    query.set("SizeCode", JSON.stringify(params.SizeCode));
  }

  if (params.IdAttribute1?.length) {
    query.set("IdAttribute1", JSON.stringify(params.IdAttribute1));
  }

  if (params.IdAttribute2?.length) {
    query.set("IdAttribute2", JSON.stringify(params.IdAttribute2));
  }

  if (params.IdAttribute3?.length) {
    query.set("IdAttribute3", JSON.stringify(params.IdAttribute3));
  }

  if (params.IdAttribute4?.length) {
    query.set("IdAttribute4", JSON.stringify(params.IdAttribute4));
  }

  if (params.IdAttribute5?.length) {
    query.set("IdAttribute5", JSON.stringify(params.IdAttribute5));
  }

  if (params.IdAttribute6?.length) {
    query.set("IdAttribute6", JSON.stringify(params.IdAttribute6));
  }

  if (params.pathnameItems?.[0]) {
    query.set(
      "IdProdSaxeoba",
      params.pathnameItems[0].pathCode.split("_").pop()
    );
  }

  if (params.pathnameItems?.[1]) {
    query.set(
      "IdProdTypeGroup",
      params.pathnameItems[1].pathCode.split("_").pop()
    );
  }

  if (params.pathnameItems?.[2]) {
    query.set(
      "IdProdType",
      params.pathnameItems[2].pathCode.split("_").pop()
    );
  }

  const res = await axiosUser.get(`/front/ourProduct?${query.toString()}`);

  return {
    data: res.data.data,
    total: res.data.total,
  };
};
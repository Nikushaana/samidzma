import { axiosUser } from "../../dataFetchs/AxiosToken";

const buildParams = (pathnameItems: PathnameItem[]) => {
  const groupId = pathnameItems?.[1]?.pathCode?.split("_").pop();
  const typeId = pathnameItems?.[2]?.pathCode?.split("_").pop();

  const params = new URLSearchParams();

  if (groupId) params.append("IdProdGroupType", groupId);
  if (typeId) params.append("IdProdType", typeId);

  return params.toString();
};

export const fetchFilters = async (pathnameItems: PathnameItem[]) => {
  const query = buildParams(pathnameItems);

  const endpoints = [
    "forma",
    "zoma",
    "saxeoba",
    "masala",
    "moculoba",
    "type",
    "feri",
    "xangrdzlivoba",
    "tema",
    "sqesi",
    "raodenobaShefutvashi",
  ];

  const responses = await Promise.all(
    endpoints.map((endpoint) =>
      axiosUser.get(`ourFilter/${endpoint}?${query}`)
    )
  );

  return endpoints.reduce((acc, key, index) => {
    acc[key] = responses[index].data;
    return acc;
  }, {} as Record<any, any>);
};
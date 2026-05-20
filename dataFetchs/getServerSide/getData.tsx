export const getServerSideBlogs = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/info/blog`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
};

export const getServerSideBlogCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/info/blogCategory`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
};

export const getServerSideCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/categories`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
};

export const getServerSideBanner = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/info/mainBanner`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
};

export const getServerSidePopularProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/getTopSellingProducts`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
};

export const getServerSideSiteInfo = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/info/siteInfo/${id}`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
};

export const getServerSideBranchesImages = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/info/branchPhoto`,
    {
      cache: "no-cache",
    },
  );

  return res.json();
};

export const getServerSideBlogs = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/info/blog`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
};

export const getServerSideCategories = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/categories`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
};

export const getServerSideBanner = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/info/mainBanner`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
};

export const getServerSideRecomendedProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/front/recProduct`,
    {
      cache: "no-cache",
    }
  );

  return res.json();
};

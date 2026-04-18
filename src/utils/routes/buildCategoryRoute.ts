
export const buildCategoryRoute = (
    type: "category" | "category-for-set",
    data: any[],
    slugify: (v: string) => string,
) => {
    if (!data?.length) return "/";

    const firstCategory = data.find(
        (i) => i.ProdSaxeobaName !== "ნაკრებები",
    );

    const setCategory = data.find(
        (i) => i.ProdSaxeobaName === "ნაკრებები",
    );

    if (type === "category") {
        if (!firstCategory) return "/category";

        return `/category/${slugify(firstCategory.ProdSaxeobaName)}_${firstCategory.IdProdSaxeoba}`;
    }

    if (type === "category-for-set") {
        if (!setCategory) return "/category-for-set";

        return `/category-for-set/${slugify(setCategory.ProdSaxeobaName)}_${setCategory.IdProdSaxeoba}`;
    }

    return "/";
};
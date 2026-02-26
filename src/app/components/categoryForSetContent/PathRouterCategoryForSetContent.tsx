// "use client";

// import { usePathname, useRouter } from "next/navigation";
// import React, { useContext, useEffect } from "react";
// import { IoChevronForward } from "react-icons/io5";
// import useFilter from "../../../../dataFetchs/filtersContext";
// import { ContextForSharingStates } from "../../../../dataFetchs/sharedStates";
// import useFrontCategories from "../../../../dataFetchs/frontCategoriesContext";

// export default function PathRouterCategoryForSetContent() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const { setFilterValues, slugify, pathnameItems, setPathnameItems } =
//     useContext(ContextForSharingStates);
//   const { FrontCategoriesData } = useFrontCategories();

//   useEffect(() => {
//     if (pathname && FrontCategoriesData.length > 0) {
//       const extractedNumbers = pathname
//         .split("/")
//         .filter((segment) => segment.includes("_")) // only keep segments with _
//         .map((segment) => segment.split("_").pop()) // take the part after _
//         .map(Number);

//       if (!extractedNumbers.length) return;

//       // Extract data for each category
//       const firstCategory = FrontCategoriesData.find(
//         (item: any) => item.IdProdSaxeoba === extractedNumbers[0]
//       );

//       const secondCategory = firstCategory?.productTypeGroup?.find(
//         (item: any) => item.IdProdTypeGroup === extractedNumbers[1]
//       );

//       const thirdCategory = secondCategory?.productTypes?.find(
//         (item: any) => item.IdProdType === extractedNumbers[2]
//       );

//       // Create updated pathnameItems
//       const updatedItems = extractedNumbers.map((number, index) => {
//         let categoryData: any = {};
//         if (index === 0) categoryData = firstCategory || {};
//         else if (index === 1) categoryData = secondCategory || {};
//         else if (index === 2) categoryData = thirdCategory || {};

//         const name =
//           index === 0
//             ? categoryData.ProdSaxeobaName
//             : index === 1
//             ? categoryData.ProdTypeGroupName
//             : categoryData.ProdTypeName;

//         return {
//           id: index + 1,
//           pathCode: slugify(name) + "_" + number, // 👈 store slug+id
//           pathCategName: name,
//           pathCategDescr: categoryData.description || "",
//         };
//       });

//       setPathnameItems(updatedItems);
//     }
//   }, [pathname, FrontCategoriesData]);

//   return (
//     <>
//       {pathname.split("/")[2] && (
//         <div className="flex flex-wrap items-center gap-[5px]">
//           <p
//             onClick={() => {
//               router.push("/");
//             }}
//             className="text-[14px] cursor-pointer"
//           >
//             მთავარი
//           </p>
//           <IoChevronForward className="text-[13px]" />
//           {pathnameItems.map((item: any, index: number) => (
//             <div
//               key={item.id}
//               onClick={() => {
//                 setFilterValues((prev: any) => ({
//                   ...prev,
//                   key: "",
//                 }));

//                 setTimeout(() => {
//                   router.push(
//                     `/category-for-set/${pathnameItems
//                       .slice(0, index + 1)
//                       .map((i: any) => i.pathCode)
//                       .join("/")}?key=`
//                   );
//                 }, 0);
//               }}
//             >
//               {index + 1 === pathnameItems.length && item.pathCategName ? (
//                 <p
//                   key={index}
//                   className="text-[14px] cursor-pointer font-semibold"
//                 >
//                   {item.pathCategName}
//                 </p>
//               ) : (
//                 <div key={index} className="flex items-center gap-[5px]">
//                   <p className="text-[14px] cursor-pointer">
//                     {item.pathCategName}
//                   </p>{" "}
//                   <IoChevronForward className="text-[13px]" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

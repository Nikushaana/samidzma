  interface Children {
    children: React.ReactNode;
  }

  interface setFilterType {
    IdProdSaxeoba: string,
    ProdSaxeobaName: string,
    ProdSaxeobaDescription: string
  }
  
  interface prodFilterType {
    IdProdSaxeoba: string,
    IdProdTypeGroup: string,
    IdProdType: string,
    FeriCode: string,
    StyleCode: string,
    SqesiCode: string,
    SizeCode: string,
    salaryValue: number[],
    ProdSaxeobaName: string,
    ProdSaxeobaDescription: string
  }

  interface BlogCategType {
    color: string;
    createdAt: string; // Consider using Date if you parse the string to a date
    id: number;
    img: string | null;
    meta_description: string;
    meta_name: string;
    name: string;
    name_eng: string;
    name_rus: string;
    sort: string; // Consider using a number if sorting requires numerical operations
    status: number; // Use an enum if there are specific predefined statuses
    updatedAt: string; // Same note as createdAt
  }

  interface BlogType {
    id: number;
    blogs_category: BlogCategType;
    blogs_category_id: number;
    createdAt: string; // Consider using Date if you parse the string to a date
    updatedAt: string; // Same as createdAt
    name: string;
    name_eng: string | null;
    name_rus: string | null;
    description: string;
    description_eng: string | null;
    description_rus: string | null;
    description2: string | null;
    description2_eng: string | null;
    description2_rus: string | null;
    description3: string | null;
    description3_eng: string | null;
    description3_rus: string | null;
    main_img: string | null; // Could also be a URL if applicable
    meta_name: string;
    meta_description: string;
    status: number; // Use an enum if you have specific predefined statuses
  }

  interface GroupCategType {
    IdProdTypeGroup: number;
    IdProdSaxeoba: number;
    ProdTypeGroupENG: string | null;
    ProdTypeGroupName: string;
    ProdTypeGroupRUS: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    description: string | null;
    description_eng: string | null;
    description_rus: string | null;
    icon: string | null;
    image: string | null;
    productTypes: any[];
    status: number;
  }

  interface SaxeobebiCategType {
    IdProdSaxeoba: number;
    ProdSaxeobaENG: string;
    ProdSaxeobaName: string;
    ProdSaxeobaRUS: string;
    createdAt: string; // Consider parsing this string to a Date object if needed
    updatedAt: string; // Same note as createdAt
    description: string | null;
    description_eng: string | null;
    description_rus: string | null;
    icon: string | null; // Could also be a URL if applicable
    image: string; // Use a string if it represents a file path or URL
    productTypeGroup?: ProductType[];
    status: number; // Use an enum if specific statuses are predefined
  }

  interface PayMethod {
    id: number;
    pay_method: string;
    name: string;
    status: boolean; // Assuming the `status` is a boolean; adjust as needed.
  }

  interface SmallCategoryType {
    IdProductCategory: number;
    ProductCategoryName: string;
  }

  interface ProductType {
    Attribute1: string | null;
    Attribute2: string | null;
    Attribute3: string | null;
    Attribute4: string | null;
    Attribute5: string | null;
    Attribute6: string | null;
    ComplectPrice: number;
    CountInComplect: number;
    CreateDate: string; // ISO date string
    Description1: string | null;
    Description2: string | null;
    Description3: string | null;
    Description4: string | null;
    Description5: string | null;
    Description6: string | null;
    DescriptionENG: string | null;
    DescriptionName: string | null;
    DescriptionRUS: string | null;
    Fasi1: number;
    Fasi2: number;
    Fasi3: number;
    Fasi4: number;
    Fasi5: number;
    Fasi6: number;
    Fasi7: number;
    Fasi8: number;
    Fasi9: number;
    Fasi10: number;
    Fasi11: number;
    Fasi12: number;
    Fasi13: number;
    Fasi14: number;
    Fasi15: number;
    Fasi16: number;
    Fasi17: number;
    Fasi18: number;
    Fasi19: number;
    Fasi20: number;
    FeriCode: number;
    FeriName: string | null;
    FormaCode: number;
    FormaGroup: string | null;
    FormaName: string | null;
    IdAttribute1: number;
    IdAttribute2: number;
    IdAttribute3: number;
    IdAttribute4: number;
    IdAttribute5: number;
    IdAttribute6: number;
    IdFormaGroup: number;
    IdProdGroup: number;
    IdProdSaxeoba: number;
    IdProdType: number;
    IdProdTypeGroup: number;
    IsActive: boolean;
    IsProducedProduct: boolean;
    Point: number;
    ProdAdditionalCode: string | null;
    ProdCode: string | null;
    ProdGroup: string | null;
    ProdSaxeoba: string | null;
    ProdType: string | null;
    ProdTypeGroup: string | null;
    ProductCategories: SmallCategoryType[];
    ProductName: string | null;
    ProductNameENG: string | null;
    ProductNameRUS: string | null;
    Shenishvna: string | null;
    SqesiCode: number;
    SqesiName: string | null;
    StiliCode: number;
    StiliName: string | null;
    Unit: string | null;
    UnitId: number;
    Variations: string | null;
    ZomaCode: number;
    ZomaName: string | null;
  }

  interface VacanciesType {
    id: number;
    position: string;
    position_eng: string | null;
    position_rus: string | null;
    description: string | null;
    description_eng: string | null;
    description_rus: string | null;
    sort: number;
    status: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  }

  interface AnimInfoType {
    id: number;
    value: string;
    name: string | null;
  }


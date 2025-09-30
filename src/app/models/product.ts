export interface IProduct {
    productId: number;
    productName: string;
    productCompany: string;
    price: number;
    description: string;
    image1Base64?: string;
    image2Base64?: string;
    image3Base64?: string;
    image4Base64?: string;
    createdOn: string;
    sellerId: number;
    sellerName: string;
}

export interface ProductCreate {
  productName: string;
  productCompany: string;
  price: number;
  description: string;
  sellerId: number;
  image1?: File;
  image2?: File;
  image3?: File;
  image4?: File;
}
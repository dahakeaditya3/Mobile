export interface IProduct {
  id: number;
  productId: number;
  productName: string;
  productCompany: string;
  price: number;
  model: string;
  originalPrice: number;
  condition: string;
  color: string;
  ram: string;
  storage: string;
  displaySize?: number;
  batteryCapacity?: string;
  camera?: string;
  operatingSystem: string;
  network: string;
  warranty?: string;
  description: string;
  image1Base64?: string;
  image2Base64?: string;
  image3Base64?: string;
  image4Base64?: string;
  createdOn: string;
  sellerId: number;
  sellerName: string;
  isActive:boolean;
}
export interface ProductCreate {
  productName: string;
  productCompany: string;
  price: number;
  model: string;
  originalPrice: number;
  condition: string;
  color: string;
  ram: string;
  storage: string;
  displaySize?: string;
  batteryCapacity?: string;
  camera?: string;
  operatingSystem: string;
  network: string;
  warranty?: string;
  description: string;
  sellerId: number;
  image1?: File;
  image2?: File;
  image3?: File;
  image4?: File;
}



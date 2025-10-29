export interface ICartItemCreate {
  customerId: number;
  productId: number;
  quantity?: number;
}

export interface ICartItemUpdate {
  id: number;
  quantity: number;
}

export interface ICartItemRead {
  id: number;
  customerId: number;
  productId: number;
  productName?: string;
  productCompany?: string;
  image1Base64?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  createdOn: string;
}

export interface IBulkCheckoutDto {
  customerId: number;
  cartItemIds: number[];
  receiverName?: string;
  receiverContactNumber?: string;
  orderAddress?: string;
  postalCode?: string;
}


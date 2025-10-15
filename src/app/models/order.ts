export interface Order {
  id: number;
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  receiverName: string;
  receiverContactNumber: string;
  orderAddress: string;
  postalCode: string;
  createdOn: string;
}


export interface OrderCreate {
 customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
  receiverName: string;
  receiverContactNumber: string;
  orderAddress: string;
  postalCode: string;
}



export interface CustomerOrder {
  id: number;
  customerId: number;
  customerName: string;
  productId: number;
  productName: string;
  productCompany: string;
  productPrice: number;
  productDescription: string;
  images: {
    image1: string | null;
    image2: string | null;
    image3: string | null;
    image4: string | null;
  };
  seller: {
    sellerName: string;
    storeName: string;
    contact: string;
    address: string;
  };
  quantity: number;
  totalPrice: number;
  createdOn: string;
  receiverName: string;
  receiverContactNumber: string;
  orderAddress: string;
  postalCode: string;
}


export interface SellerOrder {
  id: number;
  quantity: number;
  totalPrice: number;
  receiverName: string;
  receiverContactNumber: string;
  orderAddress: string;
  postalCode: string;
  createdOn: string;
  customer: {
    customerId: number;
    name: string;
    contact: string;
    gender: string;
    city: string;
    email: string;
  };
  product: {
    productId: number;
    name: string;
    company: string;
    price: number;
    images: {
      image1: string | null;
      image2: string | null;
      image3: string | null;
      image4: string | null;
    };
    seller: {
      sellerId: number;
      sellerName: string;
      storeName: string;
      phone: string;
      address: string;
    };
  };
}
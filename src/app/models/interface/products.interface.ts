export interface IProduct {
    productId: number;
    productName: string;
    productCompany: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string;
    imageUrl4: string;
    sellerId: number;
    sellers: any | null;   // replace any with ISeller if you have
    orders: any[];
}

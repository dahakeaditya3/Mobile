export interface Seller {
    sellerId: number;
    sellerName: string;
    storeName: string;
    email: string;
    contact: string;
    state: string;
    city: string;
    address: string;
    password: string;
    createdOn: Date;
    profilePictureUrl?: string;
}
export interface ISeller {
    sellerId: number;
    sellerName: string;
    storeName: string;
    email: string;
    phoneNo: string;
    state: string;
    city: string;
    address: string;
    passwordHash: string;
    confirmPasswordHash: string;
    createdAt: Date;
}
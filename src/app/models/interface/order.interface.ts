// models/interface/order.interface.ts
export interface IOrder {
    id: number;
    customer_id: number;
    product: string;
    price: number;
    status: string;

}

export interface Customer {
  customerId: number;
  customerName: string;
  email: string;
  contact: string;
  gender: string;
  city: string;
  password:string;
  createdOn: Date;
  profilePictureUrl?: string;
}
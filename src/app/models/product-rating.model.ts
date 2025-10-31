export interface ProductRating {
  productId: number;
  customerId: number;
  ratingValue: number;
  review?: string;
}

export interface ProductRatingResponse {
  ratingId: number;
  ratingValue: number;
  review: string;
  ratedOn: string;
  customerId: number;
  customerName: string;
  productId: number;
  customer: {
    customerName: string;
  };
}

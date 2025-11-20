export interface ProductRating {
  productId: number;
  customerId: number;
  ratingValue: number;
  review?: string;

  image1?: File | null;
  image2?: File | null;
  image3?: File | null;
  image4?: File | null;
}


export interface ProductRatingResponse {
  ratingId: number;
  ratingValue: number;
  review: string | null;
  ratedOn: string;
  productId: number;
  customerId: number;

  image1?: string | null;  // base64
  image2?: string | null;
  image3?: string | null;
  image4?: string | null;

  customerName?: string;  

  customer: {
    customerName: string;
  };
}

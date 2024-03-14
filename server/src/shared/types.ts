export type KosType = {
  _id: string;
  userId: string;
  name: string;
  phoneNumber: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  price: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

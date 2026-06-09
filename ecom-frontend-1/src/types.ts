export interface Product {
  id: number;
  name: string;
  desc: string;
  brand: string;
  price: number | string;
  category: string;
  releaseDate: string;
  available: boolean;
  quantity: number | string;
  imageName?: string;
  imageType?: string;
  imageData?: string;
}

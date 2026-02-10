export interface ProductReadDto {
  productId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
  createdAt: Date;
  createdBy: string;
}
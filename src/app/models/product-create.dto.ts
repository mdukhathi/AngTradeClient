export interface ProductCreateDto {
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  categoryId: number;
}